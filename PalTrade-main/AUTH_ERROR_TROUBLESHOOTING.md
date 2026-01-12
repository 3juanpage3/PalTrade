# Troubleshooting "Server error" on /api/auth/error

## Quick Diagnosis

This error at `/api/auth/error` means NextAuth.js cannot find required environment variables.

## Required Environment Variables

Make sure these are set in Vercel:

1. ✅ `DATABASE_URL` - You said this is working ✓
2. ❓ `NEXTAUTH_SECRET` - **Check this!**
3. ❓ `NEXTAUTH_URL` - **Check this!**

---

## Step 1: Verify Environment Variables in Vercel

### Check if variables are set:

1. Go to Vercel → Your Project → **Settings** → **Environment Variables**
2. Verify you see:
   - `DATABASE_URL` ✓
   - `NEXTAUTH_SECRET` ← **Check this exists**
   - `NEXTAUTH_URL` ← **Check this exists**

### If variables are missing:

**Add NEXTAUTH_SECRET:**
1. Click **"+ Add New"** or **"Create new"**
2. **Key**: `NEXTAUTH_SECRET`
3. **Value**: Generate one at https://generate-secret.vercel.app/32
   - Or run: `openssl rand -base64 32`
4. **Sensitive**: ✅ Enable (recommended)
5. **Environments**: Check all (Production, Preview, Development)
6. Click **Save**

**Add NEXTAUTH_URL:**
1. Click **"+ Add New"** or **"Create new"**
2. **Key**: `NEXTAUTH_URL`
3. **Value**: Your Vercel URL
   - Example: `https://paltrade.vercel.app`
   - **Important**: Must match your actual deployment URL exactly!
4. **Sensitive**: Leave disabled
5. **Environments**: Check all
6. Click **Save**

---

## Step 2: Verify Variable Values

### For NEXTAUTH_URL:
1. Check your actual Vercel deployment URL
2. Go to Vercel → **Deployments** tab
3. Find your latest deployment
4. Copy the URL shown (e.g., `https://paltrade.vercel.app`)
5. Make sure `NEXTAUTH_URL` in environment variables **exactly matches** this URL
   - ✅ Correct: `https://paltrade.vercel.app`
   - ❌ Wrong: `http://paltrade.vercel.app` (missing 's')
   - ❌ Wrong: `https://paltrade-xyz.vercel.app` (different subdomain)

### For NEXTAUTH_SECRET:
- Must be at least 32 characters long
- Should be a random string (like: `aBcD1234eFgH5678iJkL9012mNoP3456qRsT7890uVwX=`)
- If you can't see it (marked as sensitive), click the eye icon to verify it exists

---

## Step 3: Check Vercel Deployment Logs

1. Go to Vercel → **Deployments** tab
2. Click on your latest deployment
3. Click on **"Logs"** or expand the build logs
4. Look for errors like:
   - `NEXTAUTH_SECRET environment variable is not set`
   - `Missing NEXTAUTH_URL`
   - Any NextAuth-related errors

---

## Step 4: Redeploy After Adding Variables

**CRITICAL**: After adding or updating environment variables, you MUST redeploy!

### Option A: Manual Redeploy
1. Go to **Deployments** tab
2. Click the **"⋯"** (three dots) on your latest deployment
3. Click **"Redeploy"**
4. ✅ **Uncheck** "Use existing Build Cache"
5. Click **"Redeploy"**

### Option B: Trigger via Git
```bash
git commit --allow-empty -m "Redeploy with env vars"
git push
```

---

## Step 5: Verify Variables Are Being Used

After redeploying, check the runtime logs:

1. Go to Vercel → **Deployments** → Latest deployment
2. Click on **"Runtime Logs"** or **"Functions"**
3. Try accessing `/api/auth/signin` or trying to log in
4. Check logs for any errors mentioning:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - NextAuth configuration errors

---

## Common Issues and Solutions

### Issue 1: Variables Added but Not Applied
**Symptom**: Variables are in settings but app still errors

**Solution**:
- ✅ Make sure you **redeployed** after adding variables
- ✅ Check variables are enabled for **Production** environment
- ✅ Verify no typos in variable names (case-sensitive!)

### Issue 2: Wrong NEXTAUTH_URL
**Symptom**: Auth works locally but not on Vercel

**Solution**:
- Check your actual deployment URL in Vercel
- Update `NEXTAUTH_URL` to match exactly
- For preview deployments, use: `https://$VERCEL_URL`
- Redeploy after changing

### Issue 3: NEXTAUTH_SECRET Too Short or Invalid
**Symptom**: Authentication errors or session issues

**Solution**:
- Generate a new secret: `openssl rand -base64 32`
- Must be at least 32 characters
- Update the variable and redeploy
- **Note**: Changing this will log out all users

### Issue 4: Variables Not Visible
**Symptom**: Can't verify if variables are set (marked as sensitive)

**Solution**:
- Click the **eye icon (👁️)** to reveal sensitive variables
- Or temporarily disable "Sensitive" to verify, then re-enable

---

## Testing After Fix

1. ✅ Try accessing: `https://your-app.vercel.app/api/auth/signin`
   - Should show login page, not server error

2. ✅ Try registering a new user
   - Should create account successfully

3. ✅ Try logging in
   - Should authenticate and redirect correctly

4. ✅ Check browser console (F12)
   - Should see no auth-related errors

---

## Quick Checklist

Before asking for more help, verify:

- [ ] `NEXTAUTH_SECRET` exists in Vercel environment variables
- [ ] `NEXTAUTH_SECRET` is at least 32 characters long
- [ ] `NEXTAUTH_URL` exists in Vercel environment variables
- [ ] `NEXTAUTH_URL` exactly matches your deployment URL
- [ ] Both variables are enabled for Production environment
- [ ] You redeployed after adding/updating variables
- [ ] Checked Vercel logs for specific error messages

---

## Still Not Working?

If you've checked everything above and it still doesn't work:

1. **Check Vercel Logs**:
   - Deployments → Latest → Logs
   - Copy any error messages you see

2. **Verify in Vercel Dashboard**:
   - Settings → Environment Variables
   - Take a screenshot showing the variables exist

3. **Check Your Deployment URL**:
   - What URL shows in Vercel Deployments?
   - What URL did you set in `NEXTAUTH_URL`?
   - Do they match exactly?

4. **Test Locally**:
   - Try running the app locally with the same environment variables
   - Does it work locally but not on Vercel?

Share the error logs and we can diagnose further!

