#!/bin/bash

# SalesAIde Database Setup Script
# This script helps set up the local PostgreSQL database for development

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DB_NAME="salesaide"
DB_USER="salesaide"
DB_PASSWORD="salesaide_password"
DB_HOST="localhost"
DB_PORT="5432"

# Functions
print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  SalesAIde Database Setup${NC}"
    echo -e "${BLUE}================================${NC}"
    echo
}

print_step() {
    echo -e "${YELLOW}➤ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_success "Docker and Docker Compose are available"
}

check_env_file() {
    if [ ! -f ".env" ]; then
        print_step "Creating .env file from .env.local template..."
        cp .env.local .env
        print_success ".env file created"
        echo -e "${YELLOW}Please review and update the .env file if needed${NC}"
    else
        print_success ".env file already exists"
    fi
}

start_database() {
    print_step "Starting PostgreSQL database with Docker..."
    
    # Check if we want development or production setup
    if [ "$1" = "dev" ]; then
        print_step "Starting development database (with sample data)..."
        docker-compose -f docker-compose.dev.yml up -d postgres-dev
        
        # Wait for database to be ready
        print_step "Waiting for database to be ready..."
        sleep 10
        
        # Check if database is ready
        until docker-compose -f docker-compose.dev.yml exec -T postgres-dev pg_isready -U $DB_USER -d salesaide_dev; do
            echo "Waiting for database..."
            sleep 2
        done
        
        print_success "Development database is ready!"
        echo -e "${GREEN}Database URL: postgresql://$DB_USER:salesaide_dev_password@localhost:5433/salesaide_dev${NC}"
        
        if [ "$2" = "pgadmin" ]; then
            print_step "Starting pgAdmin..."
            docker-compose -f docker-compose.dev.yml up -d pgadmin-dev
            print_success "pgAdmin is available at http://localhost:8081"
            echo -e "${YELLOW}Login: admin@salesaide.local / admin123${NC}"
        fi
    else
        print_step "Starting production-style database..."
        docker-compose up -d postgres
        
        # Wait for database to be ready
        print_step "Waiting for database to be ready..."
        sleep 10
        
        # Check if database is ready
        until docker-compose exec -T postgres pg_isready -U $DB_USER -d $DB_NAME; do
            echo "Waiting for database..."
            sleep 2
        done
        
        print_success "Database is ready!"
        echo -e "${GREEN}Database URL: postgresql://$DB_USER:$DB_PASSWORD@localhost:$DB_PORT/$DB_NAME${NC}"
        
        if [ "$2" = "pgadmin" ]; then
            print_step "Starting pgAdmin..."
            docker-compose --profile dev up -d pgadmin
            print_success "pgAdmin is available at http://localhost:8080"
            echo -e "${YELLOW}Login: admin@salesaide.local / admin123${NC}"
        fi
    fi
}

run_migrations() {
    print_step "Running database migrations..."
    
    if [ -f "package.json" ]; then
        npm run db:push
        print_success "Database migrations completed"
    else
        print_error "package.json not found. Please run this script from the project root."
        exit 1
    fi
}

show_status() {
    print_step "Database status:"
    
    if [ "$1" = "dev" ]; then
        docker-compose -f docker-compose.dev.yml ps
    else
        docker-compose ps postgres pgadmin
    fi
}

show_help() {
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo
    echo "Commands:"
    echo "  setup [dev|prod] [pgadmin]  Set up database (default: prod)"
    echo "  start [dev|prod] [pgadmin]  Start database services"
    echo "  stop [dev|prod]             Stop database services"
    echo "  restart [dev|prod]          Restart database services"
    echo "  status [dev|prod]           Show database status"
    echo "  logs [dev|prod]             Show database logs"
    echo "  shell [dev|prod]            Connect to database shell"
    echo "  reset [dev|prod]            Reset database (WARNING: destroys data)"
    echo "  help                        Show this help"
    echo
    echo "Examples:"
    echo "  $0 setup dev pgadmin        # Set up development database with pgAdmin"
    echo "  $0 start prod               # Start production database"
    echo "  $0 shell dev                # Connect to development database"
}

# Main script logic
print_header

case "$1" in
    "setup")
        check_docker
        check_env_file
        start_database "$2" "$3"
        run_migrations
        show_status "$2"
        print_success "Database setup completed!"
        ;;
    "start")
        check_docker
        start_database "$2" "$3"
        ;;
    "stop")
        if [ "$2" = "dev" ]; then
            docker-compose -f docker-compose.dev.yml down
        else
            docker-compose down postgres pgadmin redis
        fi
        print_success "Database services stopped"
        ;;
    "restart")
        if [ "$2" = "dev" ]; then
            docker-compose -f docker-compose.dev.yml restart postgres-dev
        else
            docker-compose restart postgres
        fi
        print_success "Database services restarted"
        ;;
    "status")
        show_status "$2"
        ;;
    "logs")
        if [ "$2" = "dev" ]; then
            docker-compose -f docker-compose.dev.yml logs -f postgres-dev
        else
            docker-compose logs -f postgres
        fi
        ;;
    "shell")
        if [ "$2" = "dev" ]; then
            docker-compose -f docker-compose.dev.yml exec postgres-dev psql -U salesaide -d salesaide_dev
        else
            docker-compose exec postgres psql -U salesaide -d salesaide
        fi
        ;;
    "reset")
        echo -e "${RED}WARNING: This will destroy all data in the database!${NC}"
        read -p "Are you sure? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            if [ "$2" = "dev" ]; then
                docker-compose -f docker-compose.dev.yml down -v
                docker-compose -f docker-compose.dev.yml up -d postgres-dev
            else
                docker-compose down -v postgres
                docker-compose up -d postgres
            fi
            print_success "Database reset completed"
        else
            print_success "Database reset cancelled"
        fi
        ;;
    "help"|"")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac
