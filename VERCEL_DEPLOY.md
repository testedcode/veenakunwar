# Deploy to Vercel - Quick Guide

## ✅ Step 1: Code is on GitHub
Your code is now at: https://github.com/testedcode/veenakunwar

## 🚀 Step 2: Deploy to Vercel

### Option A: Via Vercel Website (Easiest - Recommended)

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account (same account as testedcode)
3. **Click "Add New Project"** or **"Import Project"**
4. **Select your repository**: `testedcode/veenakunwar`
5. **Vercel will auto-detect settings:**
   - Framework Preset: **Vite** ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `dist` ✅
   - Install Command: `npm install` ✅
6. **Click "Deploy"** button
7. **Wait 2-3 minutes** for deployment
8. **Your site will be live!** 🎉

### Option B: Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts!

## 📝 Step 3: After Deployment

1. **Your site URL** will be: `https://veenakunwar.vercel.app` (or similar)
2. **Test all pages:**
   - Home: `/`
   - About: `/about`
   - Sessions: `/sessions`
   - Shop: `/shop`
   - Gallery: `/gallery`
   - Social: `/social`
   - Contact: `/contact`
   - Admin: `/admin` (login: veena@veenakunwar.com / veena135)

## ⚙️ Step 4: Set Up Firebase Admin User

1. Go to: https://console.firebase.google.com
2. Select project: **veenakunwar-50d5d**
3. Go to **Authentication** → **Users**
4. Click **"Add User"**
5. Add:
   - Email: `veena@veenakunwar.com`
   - Password: `veena135`
6. Enable **Email/Password** authentication if not already enabled

## 🔄 Step 5: Automatic Deployments

Once connected, **every push to GitHub main branch will automatically deploy!**

---

**Your website is ready to go live! 🚀**

