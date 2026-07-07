# Project Status — Veena Hasya Yoga (`vk`)

Last updated: **2026-07-07**

Use this file as the single place to see what's live, what's broken, and what changed.

---

## Live URLs

| Service | URL |
|---------|-----|
| Production site | https://veenakunwar.vercel.app |
| Shop | https://veenakunwar.vercel.app/shop |
| GitHub repo | https://github.com/testedcode/veenakunwar |
| Firebase project | `veenakunwar-50d5d` |
| Vercel project | `veenakunwar` (CLI user: `abhi86813-1061`) |

---

## Backend: Firebase only (not Supabase)

This repo uses **Firebase** (Firestore + Storage + Auth). There is **no Supabase** code, config, or dependency anywhere in the project. The only "Supabase" mentions are UI copy in `Shop.jsx` clarifying the backend.

| Firebase service | Status | Used for |
|------------------|--------|----------|
| Firestore | **Active** | products (3 docs), sessions (0 docs), testimonials, banners |
| Storage | Enabled (per user) | gallery images, product images, QR codes |
| Auth | Enabled (per user) | `/admin` login |

---

## Firebase connection — verified 2026-07-07

| Check | Result |
|-------|--------|
| `src/firebase.js` project ID | `veenakunwar-50d5d` — matches `.env.local` and Firebase Console |
| Firestore `products` | **OK** — 3 documents (variants use `{ id, name, price }`) |
| Firestore `sessions` | **OK** — 0 documents (empty, expected) |
| Previous `NOT_FOUND` error | **Resolved** — Firestore database now exists |
| Public read rules | Working — unauthenticated SDK reads succeed |

Test script: `node scripts/test-firestore.mjs` (reads `.env.local`, uses `getDocsFromServer`).

---

## Shop page — current state

### Previous issues (fixed in code, deployed)

1. **Firestore database not created** — was `NOT_FOUND`; user has since created Firestore.
2. **Infinite spinner** — `useCollection` now uses 15s timeout + `getDocsFromServer` + error UI.
3. **Variant schema mismatch** — `normalizeProduct()` handles both `{ size, price }` and `{ id, name, price }`.

### Live deploy status

- `main` is up to date with `origin/main`
- Production bundle hash matches latest local build (`index-C_c1WmZL.js`)
- Shop should display **3 products** from Firestore (not spinner, not error)

### If shop still looks wrong in browser

1. Hard refresh (Ctrl+Shift+R) to clear cached JS
2. Confirm Vercel env vars match `.env.local` (`VITE_FIREBASE_*`)
3. Run `node scripts/test-firestore.mjs` locally to confirm Firestore health

---

## Firebase Console — remaining one-time setup

Firestore is created. Still verify these if not done:

1. **Authentication → Sign-in method → Email/Password → Enable**
2. **Authentication → Users → Add user** for admin email
3. **Firestore → Rules** — deploy rules from `docs/firestore.rules` (public read, auth write)
4. **Storage → Get started** (if uploads fail in admin)

After setup: go to `/admin` → Products tab to add/edit products.

---

## Pages & data sources

| Page | Data source | Notes |
|------|-------------|-------|
| `/shop` | Firestore `products` | 3 products live; empty-state if collection cleared |
| `/admin` | Firestore + Storage | Needs Auth + Firestore + Storage |
| `/gallery` | Static images in `/public/assets` | Works without Firestore |
| `/sessions` | Mostly static UI | Firestore `sessions` used in admin only |
| `/` hero | Firestore `banners` or local fallback | HeroSlider has local fallback |

---

## Deploy

```bash
npm install
npm run build    # must pass before push — verified 2026-07-07
git push origin main   # Vercel auto-deploys
```

---

## Security note

`req.txt` and several `.md` files contain plaintext passwords. Rotate those credentials and move secrets to `.env` / Vercel env vars. Do not paste passwords into new docs.

---

## Changelog

### 2026-07-07
- Verified Firestore exists; `products` has 3 docs, `sessions` empty
- Confirmed Firebase config matches `veenakunwar-50d5d`
- Confirmed latest shop fixes deployed to Vercel (bundle hash match)
- Added `scripts/test-firestore.mjs` for quick Firestore health checks
- `npm run build` passes

### 2026-07-04
- Diagnosed shop: Firestore NOT_FOUND + infinite loader + variant mismatch
- Fixed shop loading/error handling and variant normalization
- Added this status file and `docs/firestore.rules`
