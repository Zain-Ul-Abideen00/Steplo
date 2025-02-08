# Environment Setup Guide - Steplo Marketplace

## Development and Production Environment Configuration

### Local Development Environment

1. **Project Setup**

   ```bash
   # Clone repository
   git clone https://github.com/yourusername/steplo.git
   cd steplo

   # Install dependencies
   npm install

   # Create environment file
   cp .env.example .env.local
   ```

2. **Environment Variables**

   ```env
   # .env.local
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Development Commands**

   ```bash
   # Start development server
   npm run dev

   # Build project
   npm run build

   # Start production server locally
   npm run start
   ```

### Staging Environment (Vercel)

1. **Environment Configuration**

   - Branch: `staging`
   - URL Pattern: `staging-steplo.vercel.app`
   - Environment Type: Non-Production

2. **Environment Variables**

   ```env
   NEXT_PUBLIC_SUPABASE_URL=staging_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=staging_supabase_key
   NEXT_PUBLIC_SITE_URL=https://staging-steplo.vercel.app
   NODE_ENV=staging
   ```

3. **Build Settings**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install"
   }
   ```

### Production Environment (Vercel)

1. **Environment Configuration**

   - Branch: `main`
   - URL: `steplo.vercel.app`
   - Environment Type: Production

2. **Environment Variables**

   ```env
   NEXT_PUBLIC_SUPABASE_URL=production_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=production_supabase_key
   NEXT_PUBLIC_SITE_URL=https://steplo.vercel.app
   NODE_ENV=production
   ```

3. **Production Optimizations**
   - Edge Network Caching
   - Image Optimization
   - Serverless Functions

### Environment-Specific Features

1. **Development**

   - Hot Module Replacement
   - Debug Logging
   - Development Tools

2. **Staging**

   - Testing Features
   - Performance Monitoring
   - Error Tracking

3. **Production**
   - Analytics
   - Error Reporting
   - Performance Optimization

### Database Environments

1. **Supabase Configuration**

   - Development Database
   - Staging Database
   - Production Database

2. **Database Access**

   ```typescript
   // lib/supabase.ts
   import { createClient } from "@supabase/supabase-js";

   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
   const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

   export const supabase = createClient(supabaseUrl, supabaseKey);
   ```

### Security Considerations

1. **Environment Variables**

   - Never commit .env files
   - Use different keys per environment
   - Rotate keys regularly

2. **Access Control**

   - Restrict environment access
   - Implement role-based access
   - Monitor access logs

3. **Data Protection**
   - Encrypt sensitive data
   - Implement backup strategies
   - Regular security audits

### Monitoring and Logging

1. **Development**

   - Console Logging
   - Error Tracking
   - Performance Monitoring

2. **Staging/Production**
   - Error Reporting
   - Analytics
   - Performance Metrics

### Deployment Workflow

1. **Development to Staging**

   ```bash
   # Create feature branch
   git checkout -b feature/new-feature

   # Development work
   git add .
   git commit -m "Add feature"

   # Push to staging
   git push origin feature/new-feature
   ```

2. **Staging to Production**
   ```bash
   # Merge to main after testing
   git checkout main
   git merge feature/new-feature
   git push origin main
   ```

### Environment Testing

1. **Local Testing**

   ```bash
   # Run tests
   npm run test

   # Build check
   npm run build
   ```

2. **Staging Testing**

   - Functional Testing
   - Integration Testing
   - Performance Testing

3. **Production Testing**
   - Smoke Testing
   - Load Testing
   - Security Testing

---

_Last Updated: [Current Date]_
_Environment Setup Guide created by: Developer_
