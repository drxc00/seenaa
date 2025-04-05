#!/bin/bash

# Script to install and deploy the seenaa app
# From the leerob next-self-host repo, with some modifications
# https://github.com/leerob/next-self-host
# Usage: Invoke the script in your VPS
# NOTE: You may need to change the permission of the script, run chmod +x deploy.sh before running

# Env Vars
POSTGRES_USER="your postgres user"
POSTGRES_PASSWORD="your postgres password"
POSTGRES_DB="your postgres database name (eg. seenaa-prod)"

# Better auth
BETTER_AUTH_SECRET="generated secret"
BETTER_AUTH_URL="your domain eg. https://seenaa.xyz"

GOOGLE_API_KEY="google api key (from google aistudio)"
DEEPSEEK_API_KEY="deepseek api from deepseek"
NEXT_PUBLIC_ORIGIN_DOMAIN="root domain eg. seenaa.xyz"

# Script Vars
REPO_URL="https://github.com/drxc00/seenaa.git"
DOMAIN_NAME="root domain eg. seenaa.xyz" # Same with NEXT_PUBLIC_ORIGIN_DOMAIN however this is for script usage
EMAIL="your email address" 
APP_DIR=~/myapp
SWAP_SIZE="1G"  # Swap size of 1GB. As mention by leerob, this helps with storage issues for cheap VPS

# Helper function for error handling
handle_error() {
  echo "ERROR: $1"
  exit 1
}

# Update package list and upgrade existing packages
echo "Updating package lists..."
sudo apt update && sudo apt upgrade -y

# Check and add Swap Space if needed
if grep -q "/swapfile" /etc/fstab; then
  echo "Swap space already configured, skipping..."
else
  echo "Adding swap space..."
  sudo fallocate -l $SWAP_SIZE /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile

  # Make swap permanent
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
  echo "Swap space added successfully."
fi

# Install Docker if not already installed
if command -v docker &> /dev/null; then
  echo "Docker is already installed."
else
  echo "Installing Docker..."
  sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" -y
  sudo apt update
  sudo apt install docker-ce -y
  echo "Docker installed successfully."
fi

# Install Docker Compose if not already installed with correct version
DOCKER_COMPOSE_VERSION="v2.24.0" # May change in the future. Please be aware.
if command -v docker-compose &> /dev/null; then
  INSTALLED_VERSION=$(docker-compose --version | grep -oP '(?<=version )[^ ]+' || echo "unknown")
  if [[ "$INSTALLED_VERSION" == *"$DOCKER_COMPOSE_VERSION"* ]]; then
    echo "Docker Compose $DOCKER_COMPOSE_VERSION is already installed."
  else
    echo "Updating Docker Compose to $DOCKER_COMPOSE_VERSION..."
    sudo rm -f /usr/local/bin/docker-compose
    sudo curl -L "https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
  fi
else
  echo "Installing Docker Compose $DOCKER_COMPOSE_VERSION..."
  sudo curl -L "https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
fi

# Verify Docker Compose installation
docker-compose --version
if [ $? -ne 0 ]; then
  handle_error "Docker Compose installation failed."
fi

# Ensure Docker starts on boot and is running
if ! systemctl is-active --quiet docker; then
  echo "Starting Docker service..."
  sudo systemctl start docker
fi

if ! systemctl is-enabled --quiet docker; then
  echo "Enabling Docker to start on boot..."
  sudo systemctl enable docker
fi

# Clone or update the Git repository
if [ -d "$APP_DIR" ]; then
  echo "Directory $APP_DIR already exists. Pulling latest changes..."
  cd $APP_DIR && git pull
else
  echo "Cloning repository from $REPO_URL..."
  git clone $REPO_URL $APP_DIR
  cd $APP_DIR
fi

# For Docker internal communication ("db" is the name of Postgres container)
DATABASE_URL="postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@db:5432/$POSTGRES_DB"

# For external tools (like Drizzle Studio)
DATABASE_URL_EXTERNAL="postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB"

# Create or update the .env file
echo "Creating/updating .env.prod file..."
echo "POSTGRES_USER=$POSTGRES_USER" > "$APP_DIR/.env.prod"
echo "POSTGRES_PASSWORD=$POSTGRES_PASSWORD" >> "$APP_DIR/.env.prod"
echo "POSTGRES_DB=$POSTGRES_DB" >> "$APP_DIR/.env.prod"
echo "DATABASE_URL=$DATABASE_URL" >> "$APP_DIR/.env.prod"
echo "DATABASE_URL_EXTERNAL=$DATABASE_URL_EXTERNAL" >> "$APP_DIR/.env.prod"

echo "BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET" >> "$APP_DIR/.env.prod"
echo "BETTER_AUTH_URL=$BETTER_AUTH_URL" >> "$APP_DIR/.env.prod"

echo "GOOGLE_API_KEY=$GOOGLE_API_KEY" >> "$APP_DIR/.env.prod"
echo "DEEPSEEK_API_KEY=$DEEPSEEK_API_KEY" >> "$APP_DIR/.env.prod"
echo "NEXT_PUBLIC_ORIGIN_DOMAIN=$NEXT_PUBLIC_ORIGIN_DOMAIN" >> "$APP_DIR/.env.prod"

# Install Nginx if not already installed
if command -v nginx &> /dev/null; then
  echo "Nginx is already installed."
else
  echo "Installing Nginx..."
  sudo apt install nginx -y
fi

# Remove old Nginx config (if it exists)
sudo rm -f /etc/nginx/sites-available/myapp
sudo rm -f /etc/nginx/sites-enabled/myapp

# Check if Certbot is installed, if not install it
if ! command -v certbot &> /dev/null; then
  echo "Installing Certbot..."
  sudo apt install certbot python3-certbot-dns-cloudflare -y
fi

# Check if certificate exists and is valid
CERT_PATH="/etc/letsencrypt/live/$DOMAIN_NAME/fullchain.pem"
if [ -f "$CERT_PATH" ]; then
  # Check expiration date
  EXPIRY=$(sudo openssl x509 -enddate -noout -in "$CERT_PATH" | cut -d= -f2)
  EXPIRY_SECONDS=$(date --date="$EXPIRY" +%s)
  NOW_SECONDS=$(date +%s)
  # If certificate expires in less than 30 days (2592000 seconds), renew it
  if [ $(($EXPIRY_SECONDS - $NOW_SECONDS)) -lt 2592000 ]; then
    echo "SSL certificate exists but will expire soon. Renewing..."
    sudo systemctl stop nginx
    sudo certbot renew
  else
    echo "SSL certificate exists and is valid."
  fi
else
  echo "SSL certificate not found. Obtaining new certificate..."
  # Stop Nginx temporarily to allow Certbot to run in standalone mode
  sudo systemctl stop nginx
  sudo certbot -d *.$DOMAIN_NAME -d $DOMAIN_NAME --manual --preferred-challenges dns certonly --agree-tos -m $EMAIL
fi

# Ensure SSL files exist or generate them
if [ ! -f /etc/letsencrypt/options-ssl-nginx.conf ]; then
  echo "Downloading SSL options file..."
  sudo wget https://raw.githubusercontent.com/certbot/certbot/main/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf -P /etc/letsencrypt/
fi

if [ ! -f /etc/letsencrypt/ssl-dhparams.pem ]; then
  echo "Generating DH parameters..."
  sudo openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 2048
fi

# Create Nginx config with reverse proxy, SSL support, rate limiting, and streaming support
echo "Creating Nginx configuration..."
cat <<EOL | sudo tee /etc/nginx/sites-available/myapp > /dev/null
limit_req_zone \$binary_remote_addr zone=mylimit:10m rate=10r/s;

server {
    listen 80;
    server_name $DOMAIN_NAME *.$DOMAIN_NAME;

    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name $DOMAIN_NAME *.$DOMAIN_NAME;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN_NAME/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN_NAME/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    proxy_set_header Host \$host;
    limit_req zone=mylimit burst=20 nodelay;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;

        proxy_buffering off;
        proxy_set_header X-Accel-Buffering no;
    }
}
EOL

# Create symbolic link if it doesn't already exist
if [ ! -L /etc/nginx/sites-enabled/myapp ]; then
  echo "Enabling Nginx site configuration..."
  sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/myapp
fi

# Test Nginx configuration
echo "Testing Nginx configuration..."
sudo nginx -t
if [ $? -ne 0 ]; then
  handle_error "Nginx configuration test failed."
fi

# Restart Nginx to apply the new configuration
echo "Restarting Nginx..."
sudo systemctl restart nginx || handle_error "Failed to restart Nginx."

# Build and run the Docker containers
echo "Building and starting Docker containers..."
cd $APP_DIR
if [ ! -f "$APP_DIR/.env.prod" ]; then
  handle_error ".env.prod not found at $APP_DIR/.env.prod. Docker may fail if this is required."
fi

echo "Starting Docker containers..."
sudo docker-compose -f docker-compose.yaml up --build -d

# Check if containers are running
if [ $(sudo docker ps | grep -c seenaa) -eq 0 ]; then
  echo "Docker containers may not be running. Check logs with 'docker-compose -f docker-compose.yaml logs'"
else
  echo "Docker containers are running."
fi

# Output final message
echo "Deployment complete. Your app is now running at https://$DOMAIN_NAME."
echo "If you experience any issues, check the logs with 'docker-compose -f docker-compose.yaml logs'"