# Anchor Tech Solutions — Editorial Site

An editorial single-page site for Anchor Tech Solutions, built in **React (Vite)** with a navy + bronze palette. Newsreader serif paired with Hanken Grotesk, a grain overlay, scroll reveals, smooth-scroll navigation, a mobile menu, and a working contact form.

## Stack

React · Vite · vanilla CSS design system · GitHub Actions (deploy)

## Features

- Editorial layout with a navy/bronze color system
- Newsreader + Hanken Grotesk type pairing
- Grain texture overlay and scroll-in reveal animations
- Smooth-scroll anchor nav with a mobile menu
- Click/drag-to-fill image placeholders (saved to localStorage)
- Contact form with success state (ready to wire to a provider)

## Run it locally

Requires **Node.js 18+** (CI builds on Node 25).

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # preview the build locally
```

Upload the contents of `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages). It's a single page, so no SPA routing config is needed.

## Where things live
