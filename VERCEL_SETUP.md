# Vercel Deployment Setup Guide

## Required Environment Variables

Your app requires the following environment variables to be set in Vercel:

### 1. DATABASE_URL
**Required for:** Database connection

**For Vercel:**
- SQLite won't work on Vercel (file system is read-only)
- You need a PostgreSQL database

**Option A: Vercel Postgres (Recommended)**
1. Go to your Vercel project dashboard
2. Click on the **Storage** tab
3. Click **Create Database** → Select **Postgres**
4. After creation, Vercel will automatically add `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING` to your environment variables
5. Use `POSTGRES_PRISMA_URL` as your `DATABASE_URL`

**Option B: External PostgreSQL (Supabase, Neon, etc.)**
1. Create a PostgreSQL database on your preferred provider
2. Get the connection string (format: `postgresql://user:password@host:port/database`)
3. In Vercel project settings → Environment Variables, add:
   - Name: `DATABASE_URL`
   - Value: Your PostgreSQL connection string
   - Environment: Production, Preview, Development (check all)

### 2. NEXTAUTH_SECRET
**Required for:** NextAuth.js session encryption

**Generate a secret:**
```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

**In Vercel:**
1. Go to project settings → Environment Variables
2. Add:
   - Name: `NEXTAUTH_SECRET`
   - Value: The generated secret
   - Environment: Production, Preview, Development (check all)

### 3. NEXTAUTH_URL
**Required for:** NextAuth.js callback URLs

**Set this to your Vercel deployment URL:**
- For production: `https://your-app-name.vercel.app`
- Vercel will also provide preview URLs for each deployment

**In Vercel:**
1. Go to project settings → Environment Variables
2. Add:
   - Name: `NEXTAUTH_URL`
   - Value: `https://your-app-name.vercel.app` (or your custom domain)
   - Environment: Production (and Preview if needed)

## Database Migration

After setting up your PostgreSQL database and `DATABASE_URL`:

1. **Update Prisma schema** (if using SQLite locally):
   ```prisma
   datasource db {
     provider = "postgresql"  // Change from "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

2. **Run migrations on Vercel:**
   - Vercel will automatically run `prisma generate` during build
   - You may need to run migrations manually:
     ```bash
     npx prisma migrate deploy
     ```
   - Or add a build script to run migrations:
     ```json
     "build": "prisma generate && prisma migrate deploy && next build"
     ```

## Verification Steps

1. ✅ All environment variables are set in Vercel
2. ✅ DATABASE_URL points to a PostgreSQL database
3. ✅ Database migrations have been run
4. ✅ Redeploy your app after adding environment variables

## Troubleshooting

**"Server error" when creating listings:**
- Check that `DATABASE_URL` is set correctly
- Verify database is accessible from Vercel
- Check Vercel deployment logs for specific error messages
- Ensure migrations have been run

**"Unauthorized" errors:**
- Check that `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your deployment URL
- Clear browser cookies and try again

**Database connection errors:**
- Verify your PostgreSQL database is running
- Check connection string format
- Ensure database allows connections from Vercel IPs
- For Vercel Postgres, connection is automatic

