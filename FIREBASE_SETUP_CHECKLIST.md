# Firebase Setup Checklist - Fix Admin Login

## ✅ Step-by-Step Fix

### 1. Enable Email/Password Authentication

**This is the MOST COMMON issue!**

1. Go to: https://console.firebase.google.com
2. Select project: **veenakunwar-50d5d**
3. Click **Authentication** (left sidebar)
4. Click **Sign-in method** tab
5. Find **Email/Password** in the list
6. Click on it
7. **Toggle ON** the "Enable" switch
8. Click **Save**

**If Email/Password is not in the list:**
- Click **"Add new provider"**
- Select **Email/Password**
- Enable it
- Save

### 2. Verify User Exists

1. In Firebase Console → **Authentication** → **Users** tab
2. Look for: `veena@veenakunwar.com`
3. If NOT found:
   - Click **"Add user"** button
   - Email: `veena@veenakunwar.com`
   - Password: `veena135`
   - Click **Add user**

### 3. Check User Email

**Important:** Make sure the email in Firebase matches EXACTLY:
- ✅ `veena@veenakunwar.com` (correct)
- ❌ `Veena@veenakunwar.com` (wrong - case sensitive)
- ❌ `veena@veenakunwar.com ` (wrong - no spaces)

### 4. Reset Password (If Needed)

If user exists but password doesn't work:

1. In Firebase Console → **Authentication** → **Users**
2. Find `veena@veenakunwar.com`
3. Click the **3 dots** (⋮) next to the user
4. Click **"Reset password"**
5. Or click **"Change password"** and set it to `veena135`

### 5. Check Authorized Domains

1. Firebase Console → **Authentication** → **Settings** tab
2. Scroll to **"Authorized domains"**
3. Make sure these are listed:
   - `localhost` (for local testing)
   - Your Vercel domain (auto-added usually)
   - `veenakunwar-50d5d.firebaseapp.com`

### 6. Test Login

1. Go to your website: `https://your-site.vercel.app/admin`
2. Open browser console (F12)
3. Try logging in with:
   - Email: `veena@veenakunwar.com`
   - Password: `veena135`
4. Check console for error messages
5. The improved error handling will show you the exact issue

---

## 🔍 Common Error Codes & Solutions

| Error Code | Meaning | Solution |
|------------|---------|----------|
| `auth/user-not-found` | User doesn't exist | Create user in Firebase |
| `auth/wrong-password` | Password is incorrect | Reset password in Firebase |
| `auth/invalid-email` | Email format is wrong | Check email format |
| `auth/operation-not-allowed` | **Email/Password not enabled** | **Enable it in Firebase Console** |
| `auth/too-many-requests` | Too many failed attempts | Wait a few minutes |
| `auth/network-request-failed` | Network issue | Check internet connection |

---

## 🧪 Quick Test

After enabling Email/Password auth, test with this:

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Open incognito/private window**
3. Go to `/admin`
4. Try login again

---

## 📞 Still Not Working?

1. **Check browser console (F12)** - Look for red error messages
2. **Check Network tab** - See if Firebase requests are failing
3. **Verify Firebase config** in `src/firebase.js` matches your project
4. **Try creating a NEW user** in Firebase with a different email to test

---

## ✅ Verification Steps

Run through this checklist:

- [ ] Email/Password authentication is **ENABLED** in Firebase
- [ ] User `veena@veenakunwar.com` **EXISTS** in Firebase Authentication
- [ ] Password is set to `veena135`
- [ ] No extra spaces in email when typing
- [ ] Browser console shows no errors
- [ ] Firebase project is `veenakunwar-50d5d`
- [ ] Website is deployed on Vercel

---

**The most common issue is Email/Password authentication not being enabled! Make sure Step 1 is done!**

