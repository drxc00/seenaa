#!/bin/bash

# Script Vars
APP_DIR=~/myapp

# Helper function for error handling
handle_error() {
  echo "ERROR: $1"
  exit 1
}

# Change to app directory
cd $APP_DIR || handle_error "Failed to change to app directory $APP_DIR"

# Pull latest changes
echo "Pulling latest code changes..."
git pull || handle_error "Failed to pull latest changes"

# Rebuild and restart only the web service
echo "Rebuilding and restarting web container..."
sudo docker-compose -f docker-compose.prod.yaml up --build -d web || handle_error "Failed to update web container"

echo "Update complete. Web container has been rebuilt and restarted."