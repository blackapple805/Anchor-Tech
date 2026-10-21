# Anchor Tech RMM skin

A small Cloudflare Worker that makes the Breeze RMM at
**rmm.anchortechvta.com** look like anchortechvta.com. It applies the navy and
gold palette, Fraunces headings, Inter text, the gold pill button, the anchor
favicon and "Anchor Tech RMM" in the tab title and sign-in heading.

## How it works

```
browser ─▶ Cloudflare Access ─▶ this Worker ─▶ Cloudflare Tunnel ─▶ Caddy ─▶ Breeze
```

- Every request is passed to Breeze untouched.
- On the way back, HTML pages get one `<link>` to `/anchor-skin/skin.css`,
  the anchor favicon, and "Anchor Tech RMM" in the `<title>`.
- Nothing on the Breeze server changes, so Breeze updates can't undo it.
- If the Worker ever errors, Cloudflare sends the request straight to Breeze
  (`passThroughOnException`). Worst case, the RMM loads unstyled; it never
  goes down.
- The CSS, fonts and images are served from the same hostname, which Breeze's
  Content-Security-Policy already allows (`'self'`).

| Path | What |
| --- | --- |
| `src/worker.js` | The Worker |
| `public/anchor-skin/skin.css` | All the styling. The colour table is at the top |
| `public/anchor-skin/fonts/` | Copies of the site's Fraunces and Inter files |
| `public/anchor-skin/favicon.svg` | Anchor mark for the browser tab |
| `public/anchor-skin/anchor-watermark.svg` | Faint anchor behind the sign-in panel |
| `wrangler.jsonc` | Worker name and the `rmm.anchortechvta.com/*` route |

## Deploy

From the repo on your desktop:

```bash
git fetch && git checkout rmm-branding   # or main, once merged
cd rmm-skin
npx wrangler login     # first time only, opens the browser
npx wrangler deploy
```

That creates the `anchor-rmm-skin` Worker and attaches it to
`rmm.anchortechvta.com/*`. Hard-refresh the RMM (Ctrl+F5) to see it.

To redeploy automatically on every push, connect this repo in **Workers &
Pages → anchor-rmm-skin → Settings → Builds**, with root directory
`rmm-skin`.

### Optional: keep API calls off the Worker

Breeze's dashboard makes many API calls. They pass straight through, but
each one still counts toward the Workers free plan (100,000 requests a
day). To skip them, go to **Websites → anchortechvta.com → Workers Routes**
and add a route `rmm.anchortechvta.com/api/*` with **Worker: None**.

## Turn it off

Delete the `rmm.anchortechvta.com/*` route (Workers Routes), or delete the
Worker. Breeze goes back to stock immediately.

## Breeze settings that go with it

Partner Settings → Login Branding:
- Logo: `brand/rmm/login-lockup.datauri.txt`
- Accent: `#0B1B30`
- Headline: `Technology that just works — so your business can too.`

The skin already says "Sign in to Anchor Tech RMM" on the form side, so the
headline can echo the website instead.
