# Criminal Counter

> Tracking how many days your friend hasn't hit Criminal rank.

## Deploy to Vercel (2 minutes)

### Option A — GitHub (recommended)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your repo
4. Hit **Deploy** — done. Vercel auto-detects Next.js.

### Option B — Vercel CLI
```bash
npm install -g vercel
cd criminal-counter
vercel
```
Follow the prompts. Your site will be live at a `.vercel.app` URL.

## Running locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

## Features
- **Live day counter** — auto-calculates days since the last incident
- **Editable name** — click the name to customize whose streak this is
- **Reset button** — when they blow it, hit "THEY DID IT AGAIN"
- **Milestone badges** — 7 days, 30 days, 100 days, 365 days
- **Persistent** — streak date saved in localStorage, survives refresh

## Customization
- Change the default name in `app/page.tsx` (the `criminalName` state)
- Swap in the initial date via the reset flow after deploying
