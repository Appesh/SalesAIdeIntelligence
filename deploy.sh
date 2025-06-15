#!/bin/bash

# SalesAIde Production Deployment Script
# This script builds and deploys the SalesAIde application

set -e  # Exit on any error

echo "🚀 SalesAIde Production Deployment"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_warning "Please update .env file with your production values before continuing!"
        exit 1
    else
        print_error ".env.example file not found!"
        exit 1
    fi
fi

# Check if required environment variables are set
print_status "Checking environment variables..."
source .env

if [ -z "$DATABASE_URL" ]; then
    print_error "DATABASE_URL is not set in .env file"
    exit 1
fi

if [ -z "$SESSION_SECRET" ] || [ ${#SESSION_SECRET} -lt 32 ]; then
    print_error "SESSION_SECRET is not set or too short (minimum 32 characters)"
    exit 1
fi

print_success "Environment variables validated"

# Install dependencies
print_status "Installing dependencies..."
npm ci --only=production

# Type checking
print_status "Running type checks..."
npm run check

# Build the application
print_status "Building application for production..."
npm run build:prod

print_success "Build completed successfully"

# Database migration (if using PostgreSQL)
if [[ $DATABASE_URL == postgresql* ]]; then
    print_status "Running database migrations..."
    npm run db:push
    print_success "Database migrations completed"
fi

# Create logs directory
mkdir -p logs

# Set proper permissions
chmod +x deploy.sh

print_success "🎉 Deployment preparation completed!"
echo ""
echo "Next steps:"
echo "1. Review your .env file for production settings"
echo "2. Ensure your database is accessible"
echo "3. Run 'npm run start:prod' to start the production server"
echo "4. Or use Docker: 'docker-compose up -d'"
echo ""
echo "Health check will be available at: http://your-domain/health"
echo "API status at: http://your-domain/api/status"
