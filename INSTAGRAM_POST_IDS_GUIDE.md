# How to Get Instagram Post IDs

## 📱 Steps to Get Post IDs from @veena_kunwar

1. **Go to Instagram**: https://www.instagram.com/veena_kunwar
2. **Click on any post** you want to display
3. **Copy the URL** from the address bar
   - Example: `https://www.instagram.com/p/ABC123XYZ/`
4. **Extract the POST_ID** (the part after `/p/`)
   - From above example: `ABC123XYZ`
5. **Replace in code**: Open `src/components/Social/InstagramFeed.jsx`
6. **Update the posts array**:
   ```jsx
   const posts = [
     "https://www.instagram.com/p/ABC123XYZ/embed",  // Replace ABC123XYZ
     "https://www.instagram.com/p/DEF456UVW/embed",  // Replace DEF456UVW
     // ... add more posts
   ]
   ```

## 🎬 For Reels

Reels work the same way:
- Click on a reel
- Copy URL: `https://www.instagram.com/reel/REEL_ID/`
- Use: `https://www.instagram.com/reel/REEL_ID/embed`

## ✅ Current Setup

The component is ready with placeholder POST_IDs. Just replace them with actual post IDs from your Instagram profile.

## 📝 Example

If you have these posts:
- Post 1: `instagram.com/p/C1a2b3c4d5e/`
- Post 2: `instagram.com/p/C6f7g8h9i0j/`
- Post 3: `instagram.com/reel/C1k2l3m4n5o/`

Update to:
```jsx
const posts = [
  "https://www.instagram.com/p/C1a2b3c4d5e/embed",
  "https://www.instagram.com/p/C6f7g8h9i0j/embed",
  "https://www.instagram.com/reel/C1k2l3m4n5o/embed",
]
```

## 🚀 After Updating

1. Save the file
2. Commit: `git add src/components/Social/InstagramFeed.jsx`
3. Push: `git push origin main`
4. Vercel will auto-deploy

---

**The component is ready - just add your actual post IDs!**

