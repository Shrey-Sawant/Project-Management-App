# Render Deployment Guide - Project Management App Backend

## 🚨 CRITICAL FIX FOR "Cannot find module" ERROR

**The Problem:** Render was running `node src/index.ts` instead of `node dist/index.js`

**The Solution:** Use the `render.yaml` configuration file (already created in your project root)

## 🚀 Deployment Methods

### Method 1: Using render.yaml (RECOMMENDED)

1. **Commit the render.yaml file:**
   ```bash
   git add render.yaml build.sh start.sh
   git commit -m "Add Render configuration"
   git push
   ```

2. **In Render Dashboard:**
   - Click **"New +"** → **"Blueprint"**
   - Connect your repository
   - Render will automatically detect `render.yaml`
   - Click **"Apply"**

3. **Add Environment Variables** in Render dashboard:
   - `DATABASE_URL` = Your MongoDB connection string
   - `DB_NAME` = `Project0`

### Method 2: Manual Configuration (Alternative)

If you prefer manual setup:

**Root Directory:**
```
server
```

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:** ⚠️ **THIS IS CRITICAL**
```bash
npm start
```

**DO NOT USE:** ❌
- `node src/index.ts`
- `node index.ts`
- `ts-node src/index.ts`

**Environment:**
- Select: **Node**
- Node Version: **18** or higher

## 🔧 What Was Fixed

### 1. **TypeScript Build Issue**
- **Problem:** Render couldn't compile TypeScript files
- **Solution:** Moved `typescript` and `rimraf` to `dependencies` (not devDependencies)

### 2. **Module Resolution**
- **Problem:** Node couldn't find compiled `.js` files
- **Solution:** Added `rimraf dist && tsc` to clean and rebuild properly

### 3. **ESM Configuration**
- **Problem:** Import/export syntax errors
- **Solution:** Added `"type": "module"` to package.json

## 📋 Deployment Checklist

Before deploying, ensure:

- ✅ `package.json` has `typescript` in dependencies
- ✅ `package.json` has `rimraf` in dependencies
- ✅ Build command is `npm install && npm run build`
- ✅ Start command is `npm start`
- ✅ Root directory is set to `server`
- ✅ Environment variables are configured
- ✅ MongoDB connection string is correct
- ✅ `.gitignore` includes `dist/` and `node_modules/`

## 🐛 Troubleshooting

### Error: "Cannot find module"
**Cause:** Build didn't complete or dist folder is missing
**Fix:** Check build logs, ensure `tsc` runs successfully

### Error: "MONGODB_URI is not defined"
**Cause:** Environment variable not set
**Fix:** Add `DATABASE_URL` in Render environment variables

### Error: "Port already in use"
**Cause:** Hardcoded port conflicts with Render's assigned port
**Fix:** Code already uses `process.env.PORT || 3000` ✅

## 🔄 Redeployment

After making code changes:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Render auto-deploys** if enabled, or click "Manual Deploy" → "Deploy latest commit"

## 📊 Expected Build Output

```
==> Installing dependencies
npm install
...
added 203 packages

==> Building
npm run build
> rimraf dist && tsc
Compilation successful

==> Starting service
npm start
> node dist/index.js
Database connected successfully
Server running on port 10000
```

## 🌐 Testing Your Deployment

Once deployed, test these endpoints:

```bash
# Health check
curl https://your-app.onrender.com/

# Get projects
curl https://your-app.onrender.com/projects

# Get users
curl https://your-app.onrender.com/users
```

## 🔗 Connect Frontend

Update your frontend `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-app-name.onrender.com
```

Replace `your-app-name` with your actual Render service name.

## ⚡ Performance Tips

1. **Free Tier Spin Down:** Free services sleep after 15 min of inactivity
2. **Keep Alive:** Consider using a service like UptimeRobot to ping your API
3. **Upgrade:** For production, use a paid plan to avoid spin-down

---

**Need Help?** Check Render logs in the dashboard for detailed error messages.
