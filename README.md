# Anchor Tech Solutions — Editorial site (React)

The editorial single-page design, rebuilt in React (Vite) with a
**navy + bronze** palette. Newsreader serif + Hanken Grotesk, grain
overlay, scroll reveals, smooth-scroll nav, mobile menu, and a working
contact form — all carried over from the original and recolored.

## Run it locally

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # preview the build locally
```

Upload the contents of `dist/` to any static host (Netlify, Vercel,
Cloudflare Pages, GitHub Pages). It's a single page, so no SPA routing
config is needed.

## Where things live

```
index.html          title, fonts, favicon
src/
  main.jsx          entry point
  App.jsx           the entire page (header, sections, footer, form)
  index.css         full design system + the navy/bronze color tokens
  components/
    Reveal.jsx      scroll-in animation wrapper
    ImageSlot.jsx   click/drag-to-fill image placeholder (saves to localStorage)
```

## Things to change

- **Phone / email:** top of `src/App.jsx` (the `PHONE`, `PHONE_DISPLAY`,
  `EMAIL` constants).
- **Images:** the two `ImageSlot` placeholders (hero + why-us). Click to
  upload; stored in the browser. To hard-code an image, drop a file in a new
  `src/assets/` folder and swap `ImageSlot` for an `<img>`.
- **Contact form:** currently shows a success state without sending. Wire the
  `handleSubmit` in `App.jsx` to Formspree, EmailJS, or your own endpoint to
  actually deliver messages.

## Color palette

| Token    | Value     | Use                          |
|----------|-----------|------------------------------|
| --ink    | #0D2540   | navy text + light buttons    |
| --dark   | #0B1F38   | dark sections, footer        |
| --accent | #B0883A   | bronze/gold accents, italics |
| --paper  | #F5F2EA   | warm ivory background        |
