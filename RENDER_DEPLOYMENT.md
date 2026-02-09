# Render Deployment Guide - Project Management App Backend

## 🚀 Quick Setup

### Step 1: Create New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the repository: `Project-Management-App`

### Step 2: Configure Build Settings

**Root Directory:**
```
server
```

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Environment:**
- Select: **Node**

### Step 3: Environment Variables

Add these in the Render dashboard under "Environment":

| Key | Value | Example |
|-----|-------|---------|
| `DATABASE_URL` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/?appName=ProjectManagement` |
| `DB_NAME` | Your database name | `Project0` |
| `PORT` | Leave empty (Render sets this automatically) | - |
| `NODE_ENV` | `production` | `production` |

### Step 4: Advanced Settings (Optional)

**Auto-Deploy:**
- ✅ Enable "Auto-Deploy" for automatic deployments on git push

**Health Check Path:**
- Leave as default `/` or create a health endpoint

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
