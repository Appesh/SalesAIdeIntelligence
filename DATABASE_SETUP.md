# 🗄️ SalesAIde Database Setup Guide

This guide will help you set up a local PostgreSQL database for SalesAIde development using Docker.

## 🚀 Quick Start

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/) for cloning the repository

### 1. One-Command Setup (Recommended)

For development with sample data and pgAdmin:
```bash
npm run db:setup:dev
```

For production-style setup:
```bash
npm run db:setup
```

### 2. Manual Setup

If you prefer manual control:

```bash
# Copy environment template
cp .env.local .env

# Start development database with pgAdmin
docker-compose -f docker-compose.dev.yml up -d postgres-dev pgadmin-dev

# Run database migrations
npm run db:push
```

## 📊 Database Configurations

### Development Database
- **Host**: localhost
- **Port**: 5433 (to avoid conflicts)
- **Database**: salesaide_dev
- **Username**: salesaide
- **Password**: salesaide_dev_password
- **URL**: `postgresql://salesaide:salesaide_dev_password@localhost:5433/salesaide_dev`

### Production Database
- **Host**: localhost
- **Port**: 5432
- **Database**: salesaide
- **Username**: salesaide
- **Password**: salesaide_password
- **URL**: `postgresql://salesaide:salesaide_password@localhost:5432/salesaide`

## 🛠️ Available Commands

### NPM Scripts
```bash
# Database setup
npm run db:setup          # Set up production database
npm run db:setup:dev       # Set up development database with sample data

# Database control
npm run db:start           # Start production database
npm run db:start:dev       # Start development database with pgAdmin
npm run db:stop            # Stop production database
npm run db:stop:dev        # Stop development database

# Database access
npm run db:shell           # Connect to production database
npm run db:shell:dev       # Connect to development database

# Database management
npm run db:push            # Apply schema changes
npm run db:generate        # Generate migration files
npm run db:reset           # Reset production database (destroys data!)
npm run db:reset:dev       # Reset development database (destroys data!)
```

### Direct Script Usage

**Linux/macOS:**
```bash
./scripts/db-setup.sh setup dev pgadmin
./scripts/db-setup.sh start prod
./scripts/db-setup.sh shell dev
```

**Windows:**
```cmd
scripts\db-setup.bat setup dev pgadmin
scripts\db-setup.bat start prod
scripts\db-setup.bat shell dev
```

## 🎯 Database Features

### Tables Created
- **chat_sessions** - Conversation sessions with context
- **chat_messages** - Individual messages with metadata
- **chat_leads** - Captured leads from conversations
- **chat_analytics** - Conversation metrics and insights
- **contacts** - General contact form submissions

### Extensions Enabled
- **uuid-ossp** - UUID generation
- **pg_stat_statements** - Query performance monitoring
- **pg_trgm** - Text search and similarity
- **btree_gin** - Better JSONB indexing

### Performance Optimizations
- Comprehensive indexing on frequently queried columns
- JSONB indexes for JSON data queries
- Optimized PostgreSQL configuration for development
- Automatic updated_at triggers

### Sample Data (Development Only)
- 5 sample chat sessions with different stages
- 13 sample messages showing conversation flows
- 3 sample leads with different qualification levels
- Analytics data for performance testing
- Contact form submissions

## 🔧 pgAdmin Access

### Development Database
- **URL**: http://localhost:8081
- **Email**: admin@salesaide.local
- **Password**: admin123

### Production Database
- **URL**: http://localhost:8080
- **Email**: admin@salesaide.local
- **Password**: admin123

The database connection is pre-configured in pgAdmin for easy access.

## 📈 Database Views

### session_analytics_summary
Provides comprehensive session analytics:
```sql
SELECT * FROM session_analytics_summary;
```

### lead_conversion_funnel
Shows conversion rates by qualification stage:
```sql
SELECT * FROM lead_conversion_funnel;
```

## 🔍 Useful Queries

### Recent Active Sessions
```sql
SELECT id, started_at, qualification_stage, business_size 
FROM chat_sessions 
WHERE is_active = true 
ORDER BY started_at DESC;
```

### Lead Conversion Analysis
```sql
SELECT 
    business_type,
    COUNT(*) as total_leads,
    COUNT(CASE WHEN is_converted THEN 1 END) as converted,
    ROUND(AVG(lead_score), 2) as avg_score
FROM chat_leads 
GROUP BY business_type;
```

### Message Volume by Hour
```sql
SELECT 
    DATE_TRUNC('hour', timestamp) as hour,
    COUNT(*) as message_count,
    COUNT(DISTINCT session_id) as unique_sessions
FROM chat_messages 
WHERE timestamp > NOW() - INTERVAL '24 hours'
GROUP BY hour 
ORDER BY hour;
```

## 🚨 Troubleshooting

### Port Conflicts
If you get port conflicts:
```bash
# Check what's using the port
lsof -i :5432  # or :5433 for dev

# Stop conflicting services
brew services stop postgresql  # macOS
sudo systemctl stop postgresql  # Linux
```

### Docker Issues
```bash
# Reset Docker containers
docker-compose down -v
docker system prune -f

# Restart Docker Desktop and try again
```

### Permission Issues
```bash
# Fix script permissions (Linux/macOS)
chmod +x scripts/db-setup.sh

# Run as administrator (Windows)
# Right-click Command Prompt -> "Run as administrator"
```

### Database Connection Issues
1. Ensure Docker is running
2. Check if containers are healthy: `docker-compose ps`
3. View logs: `docker-compose logs postgres`
4. Verify environment variables in `.env`

## 🔄 Migration Workflow

### Making Schema Changes
1. Update `shared/schema.ts`
2. Generate migration: `npm run db:generate`
3. Apply changes: `npm run db:push`
4. Test with sample data

### Resetting Database
```bash
# Development (safe - has sample data)
npm run db:reset:dev

# Production (careful - destroys real data!)
npm run db:reset
```

## 📝 Environment Variables

Required in `.env`:
```env
DATABASE_URL=postgresql://salesaide:salesaide_password@localhost:5432/salesaide
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
```

Optional tuning:
```env
DB_POOL_MIN=2
DB_POOL_MAX=10
DB_POOL_IDLE_TIMEOUT=30000
ENABLE_QUERY_LOGGING=true
```

## 🎯 Next Steps

1. **Start Development**: `npm run db:setup:dev`
2. **Access pgAdmin**: http://localhost:8081
3. **Run Application**: `npm run dev`
4. **Test Chat Features**: Use the chat widget to generate data
5. **Monitor Performance**: Check pgAdmin for query analysis

For production deployment, see the main README.md for cloud database setup instructions.
