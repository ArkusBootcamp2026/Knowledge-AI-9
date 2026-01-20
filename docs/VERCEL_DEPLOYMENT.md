# Vercel Deployment Guide

This guide will help you deploy KnowledgeHub AI to Vercel.

## Prerequisites

- A Vercel account ([sign up here](https://vercel.com/signup))
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Supabase project credentials
- OpenAI API key

## Step 1: Prepare Your Repository

Make sure your project is pushed to a Git repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your Git repository
4. Vercel will auto-detect Vite configuration from `vercel.json`
5. Verify the following settings (should be auto-detected):

   **Build Settings:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build` (includes PDF.js worker copy)
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Node.js Version: `18.x` (specified in vercel.json)

6. Click **"Deploy"**

**Note**: The build command automatically copies the PDF.js worker file during build, so no manual step is needed.

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Link to existing project or create new
   - Confirm settings
   - Deploy

## Step 3: Configure Environment Variables

After deployment, configure environment variables in Vercel:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

   | Variable Name | Value | Environment |
   |--------------|-------|-------------|
   | `VITE_SUPABASE_URL` | Your Supabase project URL | Production, Preview, Development |
   | `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Preview, Development |
   | `VITE_OPENAI_API_KEY` | Your OpenAI API key | Production, Preview, Development |

4. **Important**: After adding environment variables, redeploy your project:
   - Go to **Deployments** tab
   - Click the **"..."** menu on the latest deployment
   - Select **"Redeploy"**

## Step 4: Verify Deployment

1. Visit your Vercel deployment URL
2. Check browser console for any errors
3. Test the following:
   - Upload a document
   - Ask a question in the chat
   - Verify document processing works

## Configuration Files

### `vercel.json`

The project includes a `vercel.json` file with the following configuration:

- **Build Command**: `npm run build` (automatically copies PDF.js worker)
- **Output Directory**: `dist`
- **Node.js Version**: `18.x` (required for the project)
- **Rewrites**: All routes redirect to `index.html` for React Router SPA support
- **Headers**: 
  - Cache control for static assets (1 year cache)
  - Content-Type header for PDF.js worker file

## Troubleshooting

### Build Fails

1. Check build logs in Vercel Dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version (Vercel uses Node 18.x by default)

### Environment Variables Not Working

1. Make sure variables start with `VITE_` prefix
2. Redeploy after adding/changing variables
3. Check variable names match exactly (case-sensitive)

### Routing Issues (404 on Refresh)

- The `vercel.json` includes rewrites for SPA routing
- If issues persist, verify the rewrites configuration

### API Errors

1. Verify environment variables are set correctly
2. Check Supabase project is active
3. Verify OpenAI API key has credits
4. Check browser console for specific error messages

## Custom Domain

To add a custom domain:

1. Go to **Settings** → **Domains**
2. Add your domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

## Continuous Deployment

Vercel automatically deploys when you push to your main branch:

- **Production**: Deploys from `main` branch
- **Preview**: Deploys from pull requests and other branches

## Performance Optimization

Vercel automatically:
- Optimizes static assets
- Enables CDN caching
- Compresses responses
- Provides edge network distribution

## Monitoring

- View deployment logs in Vercel Dashboard
- Check Analytics for performance metrics
- Monitor error logs in the dashboard

## Support

For Vercel-specific issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

