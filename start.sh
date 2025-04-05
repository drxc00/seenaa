#!/bin/sh

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
while ! nc -z db 5432; do
  sleep 1
done
echo "PostgreSQL is ready!"

# Run migrations
echo "Running database migrations..."
# Make sure DATABASE_URL_EXTERNAL is set correctly for production
export NODE_ENV=production
npx drizzle-kit generate || exit 1
npx drizzle-kit push || exit 1

# Start the application
echo "Starting the application..."
node server.js