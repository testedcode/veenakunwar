# Admin Panel Guide - Fix Login & Add Images

## 🔐 Fix Login Issue

### Step 1: Enable Email/Password Authentication in Firebase

1. Go to **Firebase Console**: https://console.firebase.google.com
2. Select your project: **veenakunwar-50d5d**
3. Go to **Authentication** → **Sign-in method**
4. Click on **Email/Password**
5. **Enable** it (toggle ON)
6. Click **Save**

### Step 2: Verify Admin User Exists

1. In Firebase Console, go to **Authentication** → **Users**
2. Check if user `veena@veenakunwar.com` exists
3. If NOT, click **"Add User"**:
   - Email: `veena@veenakunwar.com`
   - Password: `veena135`
   - Click **Add User**

### Step 3: Check Firebase Auth Domain

1. In Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Make sure your Vercel domain is added (or use `localhost` for testing)
3. Vercel domains are usually auto-added, but check if needed

### Step 4: Test Login

1. Go to your website: `https://your-site.vercel.app/admin`
2. Try logging in with:
   - Email: `veena@veenakunwar.com`
   - Password: `veena135`

**If still not working:**
- Check browser console (F12) for error messages
- The improved error handling will now show specific Firebase errors
- Common issues:
  - User doesn't exist → Create user in Firebase
  - Wrong password → Reset password in Firebase
  - Auth not enabled → Enable Email/Password auth

---

## 📸 How to Add Images to Gallery

### Method 1: Via Admin Panel (Recommended)

1. **Login to Admin Panel**: `/admin`
2. Click **"Gallery"** tab
3. Click **"Select Images"** button
4. **Choose multiple images** from your computer
5. Click **Open**
6. Wait for upload (you'll see "Uploading images..." message)
7. After upload, **refresh the page** to see your images
8. Images will appear in the gallery grid below
9. You can **delete images** by clicking the "Delete" button

### Method 2: Direct Upload to Firebase Storage

1. Go to **Firebase Console** → **Storage**
2. Navigate to `gallery/` folder
3. Click **"Upload file"**
4. Select your images
5. Images will appear on the website automatically

**Note:** Images uploaded via Admin Panel are automatically stored in `gallery/` folder in Firebase Storage.

---

## 🛍️ How to Add Product Images to Shop

### Step 1: Add a Product

1. **Login to Admin Panel**: `/admin`
2. Click **"Products"** tab
3. Fill in the form:
   - **Product Name**: e.g., "Yoga Mat"
   - **Price**: e.g., "999"
   - **Description**: Product details
4. **Upload Product Image**:
   - Click "Product Image" file input
   - Select an image from your computer
   - Wait for upload (you'll see preview)
5. **Upload QR Code** (optional):
   - Click "QR Code" file input
   - Select QR code image
   - Wait for upload
6. **WhatsApp Message** (optional): Custom message for orders
7. Click **"Add Product"** button
8. Product will appear in the list below

### Step 2: Edit Product Images

1. In the **Products** tab, find your product
2. Click **"Edit"** button
3. To change image:
   - Click the file input again
   - Select new image
   - New image will replace the old one
4. Click **"Update Product"**

### Step 3: Delete Product

1. Find the product in the list
2. Click **"Delete"** button
3. Confirm deletion

**Note:** 
- Product images are stored in `product-images/` folder
- QR codes are stored in `qr/` folder
- Both are in Firebase Storage

---

## 🖼️ Image Requirements

### Recommended Image Sizes:
- **Gallery Images**: 1200x800px or similar (will be auto-resized)
- **Product Images**: 800x800px (square) for best display
- **QR Codes**: 500x500px (square)

### Supported Formats:
- JPG/JPEG
- PNG
- WebP

### File Size:
- Keep images under 5MB for faster uploads
- Firebase Storage has limits, but 5MB is safe

---

## 🔧 Troubleshooting

### Images Not Uploading?
1. Check browser console (F12) for errors
2. Verify Firebase Storage is enabled
3. Check Firebase Storage rules (should allow authenticated users)
4. Make sure you're logged in as admin

### Images Not Showing?
1. Refresh the page
2. Check Firebase Storage → Check if files are there
3. Check browser console for errors
4. Verify image URLs are accessible

### Login Still Not Working?
1. **Double-check** Email/Password auth is enabled
2. **Verify** user exists in Firebase Authentication
3. **Check** browser console for specific error codes
4. **Try** resetting password in Firebase Console
5. **Clear** browser cache and cookies

---

## 📋 Quick Checklist

- [ ] Email/Password authentication enabled in Firebase
- [ ] Admin user created: `veena@veenakunwar.com`
- [ ] Firebase Storage enabled
- [ ] Storage rules allow authenticated uploads
- [ ] Can login to `/admin` page
- [ ] Can upload gallery images
- [ ] Can add products with images

---

**Need Help?** Check the browser console (F12) for detailed error messages. The improved error handling will show you exactly what's wrong!

