# 🚀 Deployment Guide for WinLEW App

1. For -Local and v2 Only
2. run dev has been removed to save face.

## Frontend (Vercel)
1. Push repo to GitHub
2. Import to [Vercel](https://vercel.com/import)
3. Set root directory to `client/` and framework to Vite

## Backend (Render)
1. Create new Web Service on [Render](https://render.com)
2. Set root directory to `server/`
3. Use `npm install` and `npm run dev` for build/start
4. Add `.env` with your private key + mint

See `.env.example` for required environment variables.
