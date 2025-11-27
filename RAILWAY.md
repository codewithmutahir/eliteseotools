# Railway Deployment Guide

This guide explains how to deploy SmallSEOTools to Railway.

## Quick Deployment (Single Service)

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Railway configuration"
   git push origin main
   ```

2. **Create a new project on Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Configure Environment Variables**
   In the Railway dashboard, go to your service → Variables and add:
   
   | Variable | Description |
   |----------|-------------|
   | `OPENAI_API_KEY` | Your OpenAI/OpenRouter API key |
   | `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` (or OpenAI's URL) |
   | `NEXT_PUBLIC_SITE_URL` | Your Railway app URL (e.g., `https://your-app.railway.app`) |
   | `NEXT_PUBLIC_SITE_NAME` | Your site name |
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
   | `CLERK_SECRET_KEY` | Clerk secret key |

4. **Deploy!**
   Railway will automatically detect the Dockerfile and deploy.

### Option 2: Deploy via Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and link project**
   ```bash
   railway login
   railway init
   ```

3. **Deploy**
   ```bash
   railway up
   ```

## Full Deployment (With PDF Server)

If you need the PDF-to-Image conversion feature with full server-side rendering:

### Step 1: Deploy the Main App (as above)

### Step 2: Deploy the PDF Server

1. **Create a new service in the same project**
   - In Railway dashboard, click "+ New" → "Empty Service"
   - Name it "pdf-server"

2. **Configure the PDF Server service**
   - Go to Settings → Build
   - Set "Dockerfile Path" to `Dockerfile.pdf-server`

3. **Add environment variables for PDF Server**
   | Variable | Value |
   |----------|-------|
   | `PDF_SERVER_PORT` | `3002` |
   | `NODE_ENV` | `production` |

4. **Link the services**
   - In your main app service, add:
   | Variable | Value |
   |----------|-------|
   | `PDF_SERVER_URL` | `http://pdf-server.railway.internal:3002` |

   Note: Railway provides internal networking between services using `.railway.internal` domain.

## Environment Variables Reference

### Required Variables

```env
# AI Configuration
OPENAI_API_KEY=sk-your-key-here
OPENAI_BASE_URL=https://openrouter.ai/api/v1

# Site Configuration  
NEXT_PUBLIC_SITE_URL=https://your-app.railway.app
NEXT_PUBLIC_SITE_NAME=SmallSEOTools

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx
```

### Optional Variables

```env
# PDF Server (only if deploying PDF server separately)
PDF_SERVER_URL=http://pdf-server.railway.internal:3002
```

## Troubleshooting

### Build Fails

1. **Check logs** in Railway dashboard
2. **Ensure** `output: 'standalone'` is in `next.config.mjs`
3. **Verify** all environment variables are set

### Sharp/Canvas Issues

The main Dockerfile uses `node:20-alpine` which works with Sharp.
For canvas (PDF server), use `Dockerfile.pdf-server` which includes system dependencies.

### Memory Issues

If you encounter memory issues during build:
- Go to Service Settings → Deploy
- Increase "Build Memory" (recommended: 2GB+)

## Local Development with Docker

To test the Docker setup locally:

```bash
# Build and run both services
docker-compose up --build

# Or run just the main app
docker build -t smallseotools .
docker run -p 3000:3000 --env-file .env.local smallseotools
```

## Architecture Notes

- **Main App (Port 3000)**: Next.js application with API routes
- **PDF Server (Port 3002)**: Optional Express server for PDF-to-Image conversion with canvas support

The PDF-to-Image feature has multiple fallbacks:
1. Server-side conversion (if canvas available)
2. Standalone PDF server (if deployed)
3. Client-side conversion (browser fallback)

## Cost Optimization

Railway offers a free tier with:
- $5 free credit/month
- 512MB RAM
- Shared CPU

For production, consider:
- Starter plan for higher limits
- Using only the main app (PDF to image works client-side)

