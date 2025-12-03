# Fix: auth/invalid-credential Error

## 🔴 The Problem

You're getting `auth/invalid-credential` error. This means:
- Email/password combination is incorrect, OR
- User doesn't exist, OR
- Email/Password authentication is not properly configured

## ✅ Solution Steps

### Step 1: Verify User Exists in Firebase

1. Go to: https://console.firebase.google.com
2. Select project: **veenakunwar-50d5d**
3. Go to **Authentication** → **Users** tab
4. **Check if** `veena@veenakunwar.com` exists
5. If it exists, note the **UID** (should be: `ND86mmohrxV9TlarAwR61ksMs8U2`)

### Step 2: Verify Email/Password Auth is Enabled

1. In Firebase Console → **Authentication** → **Sign-in method**
2. Find **Email/Password**
3. **MUST be ENABLED** (toggle ON)
4. Click **Save** if you just enabled it

### Step 3: Reset or Verify Password

**Option A: Reset Password in Firebase**

1. In **Authentication** → **Users**
2. Find `veena@veenakunwar.com`
3. Click the **3 dots (⋮)** next to the user
4. Click **"Reset password"** or **"Change password"**
5. Set password to: `veena135`
6. Save

**Option B: Delete and Recreate User**

1. In **Authentication** → **Users**
2. Find `veena@veenakunwar.com`
3. Click **Delete** (trash icon)
4. Click **"Add user"**
5. Email: `veena@veenakunwar.com`
6. Password: `veena135`
7. **Uncheck** "Send email verification" (optional)
8. Click **Add user**

### Step 4: Disable Email Verification (If Needed)

Email verification is **NOT required** for admin login, but if it's causing issues:

1. In Firebase Console → **Authentication** → **Settings**
2. Look for **"Email action handlers"**
3. Email verification is optional - you can leave it as is
4. The user doesn't need to verify email to login

### Step 5: Test Login

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. Go to your website: `https://your-site.vercel.app/admin`
3. Open browser console (F12)
4. Try login with:
   - Email: `veena@veenakunwar.com` (exact, no spaces)
   - Password: `veena135`
5. Check console for any errors

### Step 6: Check Firebase Storage Rules (If Still Failing)

Sometimes Storage rules can affect auth. Check:

1. Firebase Console → **Storage** → **Rules**
2. Make sure rules allow authenticated users:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Step 7: Verify Firebase Config

Check that `src/firebase.js` has correct config:
- Project ID: `veenakunwar-50d5d`
- Auth Domain: `veenakunwar-50d5d.firebaseapp.com`

---

## 🧪 Quick Test: Create New Test User

To verify everything works:

1. In Firebase Console → **Authentication** → **Users**
2. Click **"Add user"**
3. Email: `test@test.com`
4. Password: `test123`
5. Click **Add user**
6. Try logging in with these credentials
7. If this works, the issue is with the original user credentials

---

## 📋 Checklist

- [ ] User `veena@veenakunwar.com` EXISTS in Firebase Authentication
- [ ] Email/Password authentication is **ENABLED**
- [ ] Password is set to `veena135` (or you know the correct password)
- [ ] No extra spaces in email when typing
- [ ] Browser console shows no other errors
- [ ] Tried clearing browser cache
- [ ] Tried in incognito/private window

---

## 🔍 Debugging Tips

1. **Open browser console (F12)** when trying to login
2. Look for the console.log messages:
   - "Attempting login with: [email]"
   - "Login error details: [error info]"
3. Check the **Network tab** in browser console
4. Look for Firebase requests and their responses

---

## 💡 Most Common Causes

1. **Password is wrong** → Reset it in Firebase
2. **Email has typo** → Check for spaces, case sensitivity
3. **Email/Password auth not enabled** → Enable it in Firebase
4. **User doesn't exist** → Create user in Firebase

---

**Try Step 3 (Reset Password) first - this fixes 90% of cases!**

