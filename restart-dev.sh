#!/bin/bash

# SalesAIde Development Server Restart Script
# This script safely kills existing services and restarts the development server

echo "🚀 SalesAIde Development Server Restart Script"
echo "=============================================="

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

# Step 1: Kill existing Node.js processes on port 5000
print_status "Checking for existing services on port 5000..."

# Find processes using port 5000
PORT_PROCESSES=$(lsof -ti:5000 2>/dev/null)

if [ ! -z "$PORT_PROCESSES" ]; then
    print_warning "Found processes using port 5000. Killing them..."
    echo "$PORT_PROCESSES" | xargs kill -9 2>/dev/null
    sleep 2
    
    # Verify they're killed
    REMAINING=$(lsof -ti:5000 2>/dev/null)
    if [ -z "$REMAINING" ]; then
        print_success "Successfully killed processes on port 5000"
    else
        print_error "Some processes may still be running on port 5000"
    fi
else
    print_status "No processes found on port 5000"
fi

# Step 2: Kill any Node.js processes related to this project
print_status "Killing any remaining Node.js processes for this project..."

# Kill processes with 'tsx' or 'node' that might be related to our project
pkill -f "tsx.*server/index.ts" 2>/dev/null
pkill -f "node.*server/index.ts" 2>/dev/null
pkill -f "npm.*run.*dev" 2>/dev/null

sleep 1
print_success "Cleaned up existing Node.js processes"

# Step 3: Clear any potential locks or cache issues
print_status "Clearing potential cache and lock issues..."

# Remove node_modules/.cache if it exists
if [ -d "node_modules/.cache" ]; then
    rm -rf node_modules/.cache
    print_status "Cleared node_modules cache"
fi

# Clear npm cache (optional, uncomment if needed)
# npm cache clean --force 2>/dev/null

print_success "Cache cleanup completed"

# Step 4: Check if package.json exists
if [ ! -f "package.json" ]; then
    print_error "package.json not found! Make sure you're in the project root directory."
    exit 1
fi

# Step 5: Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_warning "node_modules not found. Installing dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
fi

# Step 6: Wait a moment to ensure everything is clean
print_status "Waiting for system to stabilize..."
sleep 2

# Step 7: Start the development server
print_status "Starting development server..."
echo ""
echo "🎯 Starting SalesAIde development server on http://localhost:5000"
echo "📝 Press Ctrl+C to stop the server"
echo "🔄 The server will auto-reload when you make changes"
echo ""

# Start the development server
npm run dev

# If we reach here, the server was stopped
echo ""
print_status "Development server stopped"
