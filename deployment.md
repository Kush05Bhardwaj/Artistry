# Deployment Guide for Artistry AI

## 🚀 Deployment Overview

This guide covers deployment options for the Artistry AI application across different platforms.

## 📋 Pre-Deployment Checklist

### Environment Setup
- [ ] All environment variables configured
- [ ] Firebase project set up and configured
- [ ] Google AI API key obtained
- [ ] Domain and SSL certificate ready
- [ ] Database and storage configured

### Code Quality
- [ ] All tests passing (`npm test`)
- [ ] Linting passed (`npm run lint`)
- [ ] TypeScript checks passed (`npm run typecheck`)
- [ ] Build successful (`npm run build`)
- [ ] Security audit clean (`npm audit`)

### Performance
- [ ] Bundle size optimized
- [ ] Images optimized and compressed
- [ ] Core Web Vitals within acceptable ranges
- [ ] CDN configured (if applicable)

## 🌐 Deployment Platforms

### 1. Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

#### Setup
1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel
   ```

2. **Environment Variables**
   Configure in Vercel dashboard:
   ```
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   FIREBASE_API_KEY=your-api-key
   GOOGLE_AI_API_KEY=your-google-ai-api-key
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_APP_NAME=Artistry AI
   RATE_LIMIT_MAX_REQUESTS=10
   RATE_LIMIT_WINDOW_MS=60000
   MAX_FILE_SIZE=10485760
   ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-id
   ```

3. **Custom Domain**
   - Add domain in Vercel dashboard
   - Configure DNS records
   - SSL certificate automatically provisioned

#### Advantages
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Preview deployments
- Built-in analytics

### 2. Netlify

#### Setup
1. **Build Configuration**
   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [build.environment]
     NODE_VERSION = "18"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Environment Variables**
   Configure in Netlify dashboard under Site Settings > Environment Variables.

### 3. AWS Amplify

#### Setup
1. **amplify.yml**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

2. **Environment Variables**
   Configure in Amplify Console under App Settings > Environment Variables.

### 4. Docker Deployment

#### Dockerfile
```dockerfile
# Multi-stage build
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  artistry-ai:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_FIREBASE_PROJECT_ID=${NEXT_PUBLIC_FIREBASE_PROJECT_ID}
      - NEXT_PUBLIC_FIREBASE_APP_ID=${NEXT_PUBLIC_FIREBASE_APP_ID}
      - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}
      - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
      - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}
      - FIREBASE_API_KEY=${FIREBASE_API_KEY}
      - GOOGLE_AI_API_KEY=${GOOGLE_AI_API_KEY}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
      - NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}
      - RATE_LIMIT_MAX_REQUESTS=${RATE_LIMIT_MAX_REQUESTS}
      - RATE_LIMIT_WINDOW_MS=${RATE_LIMIT_WINDOW_MS}
      - MAX_FILE_SIZE=${MAX_FILE_SIZE}
      - ALLOWED_FILE_TYPES=${ALLOWED_FILE_TYPES}
      - NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID}
    restart: unless-stopped
```

### 5. Google Cloud Run

#### Setup
1. **Build and Deploy**
   ```bash
   # Build container
   docker build -t artistry-ai .
   
   # Tag for Google Container Registry
   docker tag artistry-ai gcr.io/PROJECT_ID/artistry-ai
   
   # Push to registry
   docker push gcr.io/PROJECT_ID/artistry-ai
   
   # Deploy to Cloud Run
   gcloud run deploy artistry-ai \
     --image gcr.io/PROJECT_ID/artistry-ai \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars NODE_ENV=production
   ```

## 🔧 Environment-Specific Configurations

### Development
```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:9002
```

### Staging
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://staging.artistry-ai.com
```

### Production
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://artistry-ai.com
```

## 📊 Monitoring and Analytics

### Performance Monitoring
- Core Web Vitals tracking
- Error monitoring (Sentry recommended)
- User analytics (Google Analytics)
- Server monitoring

### Health Checks
```typescript
// pages/api/health.ts
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
}
```

## 🔒 Security Considerations

### Production Security
- HTTPS everywhere
- Security headers configured
- Rate limiting enabled
- Input validation active
- Regular security updates

### SSL/TLS
- Automatic SSL with Vercel/Netlify
- Manual SSL certificate for custom domains
- HSTS headers configured

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and rebuild
   rm -rf .next node_modules
   npm install
   npm run build
   ```

2. **Environment Variables**
   - Verify all required variables are set
   - Check variable names (case-sensitive)
   - Ensure proper escaping

3. **Performance Issues**
   - Check bundle size
   - Optimize images
   - Enable compression
   - Use CDN

4. **Authentication Issues**
   - Verify Firebase configuration
   - Check domain whitelist
   - Validate API keys

## 📈 Scaling Considerations

### Horizontal Scaling
- Stateless application design
- Session management with external storage
- Load balancer configuration

### Vertical Scaling
- Memory optimization
- CPU optimization
- Database connection pooling

### Caching Strategy
- Static asset caching
- API response caching
- CDN configuration
- Browser caching headers

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linting
        run: npm run lint
      
      - name: Build application
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📞 Support

For deployment issues:
- Check platform-specific documentation
- Review error logs
- Contact platform support
- Consult the troubleshooting guide

---

**Last Updated**: December 2024
**Version**: 1.0 