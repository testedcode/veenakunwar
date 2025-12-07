# Instagram Reels Feed Setup Guide

## ✅ Current Status

- Instagram URL updated to: `https://instagram.com/veena_kunwar`
- Instagram feed component ready for reels
- Reels placeholder grid showing

## 🎬 To Show Real Instagram Reels Feed

### Option 1: SnapWidget (Recommended - Free, Shows Reels)

**Steps:**
1. Go to: https://snapwidget.com/
2. Click "Get Started" (free)
3. Sign up with your email
4. Click "Add Widget"
5. Select "Instagram Feed"
6. Enter username: `veena_kunwar`
7. Choose layout (Grid, Carousel, etc.)
8. Configure to show **Reels** (enable in settings)
9. Copy the embed code (iframe URL)
10. Open: `src/components/Social/InstagramFeed.jsx`
11. Find the commented section:
    ```jsx
    {/* Uncomment and add your SnapWidget iframe code here:
    <div className="instagram-embed-wrapper">
      <iframe
        src="YOUR_SNAPWIDGET_EMBED_URL_FROM_SNAPWIDGET.COM"
        ...
      ></iframe>
    </div>
    */}
    ```
12. Replace `YOUR_SNAPWIDGET_EMBED_URL_FROM_SNAPWIDGET.COM` with your actual SnapWidget URL
13. Uncomment the entire section
14. Comment out or remove the placeholder section above it

**Free Tier:**
- ✅ Up to 20 posts (including reels)
- ✅ Auto-updates
- ✅ Responsive design
- ✅ Shows reels automatically

---

### Option 2: Elfsight (Free Tier - 6 Posts)

**Steps:**
1. Go to: https://elfsight.com/instagram-feed-instashow/
2. Sign up (free)
3. Connect Instagram account
4. Get widget ID
5. Update `src/components/Social/InstagramFeed.jsx`:
   - Replace `your-widget-id` with your Elfsight widget ID
   - Uncomment the Elfsight script loader

**Note:** Elfsight free tier shows 6 posts, may not specifically filter for reels.

---

## 📱 Current Fallback

Right now, the site shows:
- A grid of 9 reel placeholders
- Links to your Instagram reels page
- "Follow @veena_kunwar" button

This works immediately but doesn't show actual reels content.

---

## 🚀 After Adding Widget

1. **Commit changes:**
   ```bash
   git add src/components/Social/InstagramFeed.jsx
   git commit -m "Add SnapWidget Instagram reels feed"
   git push origin main
   ```

2. **Vercel will auto-deploy** (2-3 minutes)

3. **Check your live site** - Instagram feed with reels will appear!

---

## ✅ What's Already Done

- ✅ Instagram URL updated to `veena_kunwar`
- ✅ Component ready for widget integration
- ✅ Reels placeholder grid showing
- ✅ All links point to correct Instagram profile
- ✅ Code pushed to GitHub

---

**Next Step:** Get your SnapWidget embed code and add it to the component!

