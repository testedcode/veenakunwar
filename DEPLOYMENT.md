# Deployment Guide - Hasya Yoga Website

## Step 1: Initialize Git Repository

1. Open terminal in your project folder
2. Run these commands:

```bash
git init
git add .
git commit -m "Initial commit - Hasya Yoga website"
```

## Step 2: Push to GitHub

1. Go to https://github.com/testedcode
2. Create a new repository (if it doesn't exist)
   - Repository name: `hasya-yoga-website` (or any name you prefer)
   - Make it **Public** or **Private** (your choice)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

3. After creating the repository, GitHub will show you commands. Run:

```bash
git remote add origin https://github.com/testedcode/hasya-yoga-website.git
git branch -M main
git push -u origin main
```

(Replace `hasya-yoga-website` with your actual repository name)

## Step 3: Deploy to Vercel

### Option A: Via Vercel Website (Recommended)

1. Go to https://vercel.com
2. Sign in with your GitHub account
3. Click **"Add New Project"** or **"Import Project"**
4. Select your GitHub repository (`testedcode/hasya-yoga-website`)
5. Vercel will auto-detect Vite settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. Click **"Deploy"**
7. Wait for deployment (usually 2-3 minutes)
8. Your site will be live at: `https://your-project-name.vercel.app`

### Option B: Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts and deploy!

## Step 4: Configure Environment Variables (Optional)

If you want to use environment variables instead of hardcoding Firebase config:

1. In Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these (optional, since Firebase config is already in code):
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - etc.

**Note:** Your Firebase config is already in `src/firebase.js`, so this is optional.

## Step 5: Set Up Firebase Admin User

1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project: `veenakunwar-50d5d`
3. Go to **Authentication** → **Users**
4. Click **"Add User"**
5. Add:
   - Email: `veena@veenakunwar.com`
   - Password: `veena135`
6. This user can now login to `/admin` page

## Step 6: Set Up Firestore Collections

In Firebase Console → Firestore Database:

Create these collections (they'll be created automatically when you add data, but you can create them manually):

1. **sessions** - For yoga session schedules
2. **products** - For wellness products
3. **testimonials** - For student testimonials
4. **settings** - For site settings (optional)

## Step 7: Set Up Firebase Storage Folders

In Firebase Console → Storage:

Create these folders:
- `gallery/` - For gallery images
- `product-images/` - For product images
- `qr/` - For QR code images
- `profile/` - For profile images (optional)

## Step 8: Test Your Deployment

1. Visit your Vercel URL
2. Test all pages:
   - Home page
   - About page
   - Sessions page
   - Shop page
   - Gallery page
   - Social page
   - Contact page
3. Test Admin Panel:
   - Go to `/admin`
   - Login with: `veena@veenakunwar.com` / `veena135`
   - Try adding a session, product, or testimonial

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Run `npm install` locally first to test
- Check Vercel build logs

### Firebase Errors
- Verify Firebase config in `src/firebase.js`
- Check Firebase project settings
- Ensure Firestore and Storage are enabled

### Admin Login Not Working
- Verify user exists in Firebase Authentication
- Check email/password are correct
- Check Firebase Auth is enabled in console

## Custom Domain (Optional)

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Continuous Deployment

Once connected to GitHub, every push to `main` branch will automatically deploy!

---

**Your site is now live! 🎉**

