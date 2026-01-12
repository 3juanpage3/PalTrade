#!/bin/bash

# Generate Prisma client
echo "Generating Prisma client..."
prisma generate

# Build Next.js
echo "Building Next.js..."
next build

# Run migrations
echo "Running database migrations..."
npx prisma migrate deploy

echo "Build and migration complete!"
