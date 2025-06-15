# 🚀 SalesAIde Production Deployment Guide

This guide covers deploying SalesAIde to production environments with proper security, performance, and monitoring configurations.

## 📋 Prerequisites

- Node.js 20+ 
- PostgreSQL 16+ database
- SSL certificate (for HTTPS)
- Domain name
- Minimum 2GB RAM, 2 CPU cores

## 🔧 Environment Setup

### 1. Environment Variables

Copy the example environment file and configure for production:

```bash
cp .env.example .env
```

**Required Production Variables:**

```env
# Application
NODE_ENV=production
PORT=5000
HOST=0.0.0.0

# Database (PostgreSQL required for production)
DATABASE_URL=postgresql://username:password@host:port/database

# Security (CRITICAL - Change these!)
SESSION_SECRET=your-super-secret-session-key-minimum-32-characters-long
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Production Settings
TRUST_PROXY=true
SECURE_COOKIES=true
LOG_LEVEL=info
```

### 2. Database Setup

**Option A: Managed Database (Recommended)**
- Use services like Neon, Supabase, AWS RDS, or Google Cloud SQL
- Ensure SSL is enabled
- Configure connection pooling

**Option B: Self-hosted PostgreSQL**
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE salesaide;
CREATE USER salesaide WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE salesaide TO salesaide;
\q
```

## 🚀 Deployment Methods

### Method 1: Direct Deployment

1. **Prepare the server:**
```bash
# Clone repository
git clone https://github.com/your-username/SalesAIdeIntelligence.git
cd SalesAIdeIntelligence

# Make deployment script executable
chmod +x deploy.sh

# Run deployment script
./deploy.sh
```

2. **Start the application:**
```bash
# Start production server
npm run start:prod

# Or use PM2 for process management (recommended)
npm install -g pm2
pm2 start dist/index.js --name "salesaide"
pm2 startup
pm2 save
```

### Method 2: Docker Deployment (Recommended)

1. **Build and run with Docker Compose:**
```bash
# Production deployment
docker-compose up -d

# Check logs
docker-compose logs -f salesaide

# Check health
curl http://localhost:5000/health
```

2. **Custom Docker build:**
```bash
# Build image
docker build -t salesaide:latest .

# Run container
docker run -d \
  --name salesaide \
  -p 5000:5000 \
  --env-file .env \
  salesaide:latest
```

### Method 3: Cloud Platform Deployment

**Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**Railway:**
```bash
npm install -g @railway/cli
railway login
railway deploy
```

**Heroku:**
```bash
# Install Heroku CLI
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=your-database-url
git push heroku main
```

## 🔒 Security Configuration

### 1. Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. Firewall Configuration

```bash
# UFW (Ubuntu)
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

# Block direct access to application port
sudo ufw deny 5000
```

## 📊 Monitoring & Logging

### 1. Health Checks

The application provides health check endpoints:

- **Application Health:** `GET /health`
- **API Status:** `GET /api/status`

### 2. Log Management

```bash
# View logs with PM2
pm2 logs salesaide

# View Docker logs
docker-compose logs -f salesaide

# Log rotation with logrotate
sudo nano /etc/logrotate.d/salesaide
```

### 3. Performance Monitoring

Consider integrating:
- **APM:** New Relic, DataDog, or Sentry
- **Uptime:** Pingdom, UptimeRobot
- **Analytics:** Google Analytics, Mixpanel

## 🔄 Maintenance

### 1. Updates

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
npm run build:prod
pm2 restart salesaide

# Or with Docker
docker-compose down
docker-compose up -d --build
```

### 2. Database Backups

```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Automated backup script
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > $BACKUP_DIR/salesaide_$DATE.sql
find $BACKUP_DIR -name "salesaide_*.sql" -mtime +7 -delete
```

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use:**
```bash
sudo lsof -ti:5000
sudo kill -9 <PID>
```

2. **Database connection issues:**
```bash
# Test database connection
psql $DATABASE_URL -c "SELECT 1;"
```

3. **Memory issues:**
```bash
# Check memory usage
free -h
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run start:prod
```

### Logs Location

- **PM2 logs:** `~/.pm2/logs/`
- **Docker logs:** `docker-compose logs`
- **Application logs:** Check LOG_LEVEL in .env

## 📞 Support

For deployment issues:
1. Check the logs first
2. Verify environment variables
3. Test database connectivity
4. Check firewall/security group settings
5. Review the troubleshooting section

## 🔐 Security Checklist

- [ ] Environment variables configured
- [ ] Database uses SSL
- [ ] HTTPS enabled with valid certificate
- [ ] Firewall configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Session secret is secure (32+ characters)
- [ ] Regular security updates scheduled
- [ ] Backup strategy implemented
- [ ] Monitoring and alerting configured

---

**🎉 Congratulations!** Your SalesAIde application is now production-ready!
