# Deployment Guide

This project is hosted on Vercel.

## Environment Variables
The following variables must be set in your Vercel dashboard:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

## Manual Deployment
If you need to manually trigger a build:
1. `npm run build`
2. `git add .`, `git commit -m "..."`, `git push`
3. Vercel will automatically deploy the `main` branch.
