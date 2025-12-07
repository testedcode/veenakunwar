# Deployment Steps - Push to Server

## 🚀 Quick Deployment Guide

Your code is already on GitHub at: `https://github.com/testedcode/veenakunwar`

### Step 1: Install Dependencies (If Not Done)

```bash
npm install
```

This installs:
- Swiper.js (for slider)
- AOS (for animations)

### Step 2: Commit Any Local Changes

```bash
git add .
git commit -m "Add placeholder images and final updates"
git push origin main
```

### Step 3: Deploy to Vercel

#### Option A: Automatic (If Already Connected)

1. **Your GitHub repo is already connected to Vercel**
2. **Every push to `main` branch auto-deploys**
3. **Just wait 2-3 minutes** after pushing
4. **Check**: https://vercel.com/dashboard

#### Option B: Manual Deployment

1. Go to: https://vercel.com
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import: `testedcode/veenakunwar`
5. Vercel auto-detects Vite settings
6. Click **"Deploy"**

### Step 4: Verify Deployment

1. Go to your Vercel dashboard
2. Click on your project
3. Check **"Deployments"** tab
4. Wait for build to complete (green checkmark)
5. Click on the deployment URL

---

## 📦 What Gets Deployed

- ✅ All React components
- ✅ All images in `public/` folder
- ✅ All CSS and styling
- ✅ Firebase configuration
- ✅ All pages and routes

---

## 🔍 Troubleshooting

### Build Fails?

1. **Check Vercel build logs**
2. **Common issues**:
   - Missing dependencies → Run `npm install` locally first
   - Build errors → Check console for errors
   - Environment variables → Not needed (Firebase config is in code)

### Images Not Showing?

1. **Check image paths**: Should be `/assets/placeholders/filename.jpg`
2. **Verify images are in `public/assets/placeholders/`**
3. **Clear browser cache** after deployment

### Slider Not Working?

1. **Check if Swiper.js is installed**: `npm install`
2. **Check browser console** for errors
3. **Verify banner images exist** in `public/assets/placeholders/`

---

## ✅ Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] Hero slider works
- [ ] Images display properly
- [ ] Instagram feed shows (or placeholder)
- [ ] Facebook feed shows
- [ ] All pages accessible
- [ ] Mobile responsive
- [ ] Footer badge visible

---

## 🔄 Continuous Deployment

**Once connected to Vercel:**
- Every `git push` to `main` = Auto-deploy
- No manual steps needed
- Deployment takes 2-3 minutes
- Get notified via email

---

## 📱 Your Live URL

After deployment, your site will be at:
- `https://veenakunwar.vercel.app` (or similar)
- Or your custom domain if configured

---

## 🎯 Quick Commands

```bash
# Install dependencies
npm install

# Test locally
npm run dev

# Build for production
npm run build

# Push to GitHub (auto-deploys on Vercel)
git add .
git commit -m "Your message"
git push origin main
```

---

**Your site is ready to deploy! Just push to GitHub and Vercel will handle the rest!** 🚀

