# Project Status — Veena Hasya Yoga (`vk`)

Last updated: **2026-07-04**

Use this file as the single place to see what's live, what's broken, and what changed.

---

## Live URLs

| Service | URL |
|---------|-----|
| Production site | https://veenakunwar.vercel.app |
| GitHub repo | https://github.com/testedcode/veenakunwar |
| Firebase project | `veenakunwar-50d5d` |
| Vercel project | `veenakunwar` (CLI user: `abhi86813-1061`) |

---

## Backend: Firebase only (not Supabase)

This repo uses **Firebase** (Firestore + Storage + Auth). There is **no Supabase** code, config, or dependency anywhere in the project.

| Firebase service | Used for |
|------------------|----------|
| Firestore | products, sessions, testimonials, banners |
| Storage | gallery images, product images, QR codes |
| Auth | `/admin` login |

---

## Shop page — root cause & fix

### What was wrong

1. **Firestore database not created** — SDK returns `NOT_FOUND` for project `veenakunwar-50d5d`. The shop (and admin data) cannot load until Firestore exists in Firebase Console.
2. **Infinite spinner** — `useCollection` used `getDocs()` which could hang when Firestore backend is missing. Shop stayed on loader forever.
3. **Variant schema mismatch** — Admin saved `{ size, price }`; Shop expected `{ id, name, price }`. Even with data, cart buttons would fail.

### Code fixes applied (2026-07-04)

- `src/hooks/useFirebase.js` — 15s timeout, `getDocsFromServer`, clear error messages
- `src/utils/products.js` — normalize variants for Shop + legacy admin data
- `src/pages/Shop.jsx` — error / empty states instead of infinite loader
- `src/pages/Admin.jsx` — save variants as `{ id, name, price }`

### What you must do in Firebase Console (one-time)

1. Open https://console.firebase.google.com → project **veenakunwar-50d5d**
2. **Build → Firestore Database → Create database**
   - Mode: Production (then add rules below) or Test (dev only)
   - Region: **asia-south1** (Mumbai) recommended for India traffic
3. **Build → Storage → Get started** (if not already enabled)
4. **Authentication → Sign-in method → Email/Password → Enable**
5. **Authentication → Users → Add user** for admin email
6. Deploy Firestore rules (see `docs/firestore.rules`)

After Firestore exists: go to `/admin` → Products tab → add products with at least one variant (size + price).

---

## Pages & data sources

| Page | Data source | Notes |
|------|-------------|-------|
| `/shop` | Firestore `products` | Fixed UX; needs Firestore + products |
| `/admin` | Firestore + Storage | Needs Auth + Firestore + Storage |
| `/gallery` | Static images in `/public/assets` | Works without Firestore |
| `/sessions` | Mostly static UI | Firestore `sessions` used in admin only |
| `/` hero | Firestore `banners` or local fallback | HeroSlider has local fallback |

---

## Deploy

```bash
npm install
npm run build    # must pass before push
git push origin main   # Vercel auto-deploys
```

---

## Security note

`req.txt` and several `.md` files contain plaintext passwords. Rotate those credentials and move secrets to `.env` / Vercel env vars. Do not paste passwords into new docs.

---

## Changelog

### 2026-07-04
- Diagnosed shop: Firestore NOT_FOUND + infinite loader + variant mismatch
- Fixed shop loading/error handling and variant normalization
- Added this status file and `docs/firestore.rules`
