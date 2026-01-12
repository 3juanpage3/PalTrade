# Fix: "Internal server error" on Registration

## The Problem

You're getting "Internal server error" when trying to create an account. This is most likely because **the database tables don't exist yet** in your PostgreSQL database.

When you switched from SQLite to PostgreSQL, the database structure (tables) needs to be created.

## The Solution: Run Database Migrations

### Option 1: Automatic (Recommended - Already Updated)

I've updated your `package.json` to automatically run migrations during build. After the next deployment, migrations will run automatically.

**Just redeploy your app:**
1. Go to Vercel → Deployments
2. Click "Redeploy" on latest deployment
3. Uncheck "Use existing Build Cache"
4. Click "Redeploy"

The build will now run: `prisma generate && prisma migrate deploy && next build`

---

### Option 2: Manual Migration (If Option 1 Doesn't Work)

If you want to run migrations manually:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Link your project**:
   ```bash
   vercel link
   ```

3. **Pull environment variables** (to get DATABASE_URL):
   ```bash
   vercel env pull .env.local
   ```

4. **Run migrations**:
   ```bash
   npx prisma migrate deploy
   ```

   This will create all the necessary tables in your PostgreSQL database.

---

## What Migrations Do

Migrations create the database tables based on your Prisma schema:
- `User` table
- `Account` table (for OAuth)
- `Session` table
- `VerificationToken` table
- `Listing` table

Without these tables, the app can't create users or store data.

---

## Verify Migrations Ran

After redeploying, check:

1. **Vercel Build Logs**:
   - Go to Deployments → Latest deployment → Logs
   - Look for: `✔ Applied migration` or `Migration applied successfully`

2. **Try Registering Again**:
   - Go to `/register`
   - Try creating an account
   - Should work now!

---

## If Still Not Working

### Check Vercel Logs

1. Go to Vercel → Deployments → Latest
2. Click on "Functions" or "Runtime Logs"
3. Try registering again
4. Check logs for specific error messages

### Common Issues:

**Issue 1: Migration Failed**
- Check that `DATABASE_URL` is correct
- Verify database is accessible
- Check build logs for migration errors

**Issue 2: Tables Still Don't Exist**
- Manually run: `npx prisma migrate deploy` (see Option 2 above)
- Or check if migrations folder exists: `prisma/migrations/`

**Issue 3: Connection Timeout**
- Database might be sleeping (free tier)
- Wait a moment and try again
- Or upgrade database plan

---

## Quick Checklist

- [ ] Updated `package.json` includes `prisma migrate deploy` in build script
- [ ] Redeployed app after update
- [ ] Checked build logs for migration success
- [ ] Tried registering again
- [ ] Checked Vercel runtime logs for errors

---

## After Fix

Once migrations run successfully, you should be able to:
- ✅ Create new accounts
- ✅ Log in
- ✅ Create listings
- ✅ Browse listings

---

## Need More Help?

If you're still getting errors after running migrations:

1. **Share the error from Vercel logs**:
   - Deployments → Latest → Logs
   - Copy the specific error message

2. **Check database connection**:
   - Verify `DATABASE_URL` in Vercel settings
   - Test connection to your PostgreSQL database

3. **Verify schema matches**:
   - Make sure `prisma/schema.prisma` has `provider = "postgresql"`
   - Not `provider = "sqlite"`

