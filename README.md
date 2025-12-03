# Veena Hasya Yoga Website

A modern, senior-friendly website for Hasya Yoga sessions, wellness products, and community connection.

## Tech Stack

- React 18 + Vite
- React Router
- Firebase (Firestore + Storage)
- Vercel Deployment

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (optional, or use firebase.js directly):
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Deployment

Deploy to Vercel:
1. Connect your GitHub repository
2. Vercel will auto-detect Vite
3. Build command: `npm run build`
4. Output directory: `dist`

## Admin Access

Navigate to `/admin` and login with Firebase Auth credentials.
