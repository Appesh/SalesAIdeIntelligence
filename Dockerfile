# Motivio Production Dockerfile
FROM node:20-alpine AS base



# Rebuild the source code only when needed
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install ALL dependencies (including devDependencies for build)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
ENV NODE_ENV=production
RUN npm run build:railway

# Production image, copy all the files and run the app
FROM base AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 motivio

# Copy built application
COPY --from=builder --chown=salesaide:nodejs /app/dist ./dist
COPY --from=builder --chown=salesaide:nodejs /app/package.json ./package.json

# Install only production dependencies for runtime
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Create necessary directories
RUN mkdir -p /app/logs && chown salesaide:nodejs /app/logs

USER salesaide

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", "dist/index.js"]
