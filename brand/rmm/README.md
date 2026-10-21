# Anchor Tech RMM: Breeze branding kit

These files make the self-hosted Breeze RMM at **rmm.anchortechvta.com** look
like part of anchortechvta.com: the same navy and gold, the same anchor mark,
and the same Fraunces/Inter type in the logo.

Nothing in this folder is built or deployed by the website. The images under
`public/brand/rmm/` are served by the site once this branch reaches `main`, at
`https://anchortechvta.com/brand/rmm/…`.

## Files

| File | What it is | Where it goes in Breeze |
| --- | --- | --- |
| `public/brand/rmm/login-lockup.png` | Anchor + "Anchor Tech / RMM · Ventura", transparent, 984×258 (3.8:1) | Login Branding → Logo URL |
| `brand/rmm/login-lockup.datauri.txt` | The same PNG as a `data:` URI (35 KB, limit 400 KB) | Login Branding → Logo URL (works before the site is deployed) |
| `public/brand/rmm/anchor-mark-256.png` | Gold anchor on a navy rounded tile, 256×256 | Branding → Logo (sidebar icon) |
| `public/brand/rmm/anchor-mark.svg` | Vector source of the mark | Spare / future use |
| `brand/rmm/portal.css` | Navy and gold theme for the customer portal | Branding → Custom CSS |
| `brand/rmm/render.py` | Regenerates the PNGs from the site's fonts | Not uploaded |

## Apply it (Breeze → Partner Settings)

### Company tab
- **Company Name:** `Anchor Tech`. This is the name beside the anchor in the
  sidebar, and Breeze also uses it on invoices, PDFs and emails. If
  the business's legal name is longer (for example "Anchor Tech Solutions"),
  use that here instead.
- **Website:** `https://anchortechvta.com`

### Login Branding tab
- **Logo URL:** paste the whole contents of `login-lockup.datauri.txt`.
  After this branch is merged to `main`, you can use
  `https://anchortechvta.com/brand/rmm/login-lockup.png` instead. Don't use a
  staging URL: staging is behind Cloudflare Access, so the login page couldn't
  load it.
- **Accent color:** `#0B1B30`. This paints the login side panel in the site's navy.
- **Headline:** `Sign in to Anchor Tech RMM`
- Save, then open the login page in a private window to check it.

### Branding tab
- **Logo:** upload `anchor-mark-256.png`.
- **Primary Color:** `#0B1B30` (navy). Breeze uses this as the accent on
  invoices and proposals, which print on white paper. Navy on white is 17:1;
  gold on white would be 1.8:1 and hard to read.
- **Secondary Color:** `#E8B84B` (gold).
- **Theme:** `Dark`
- **Custom CSS:** paste all of `portal.css`.

## What Breeze lets you brand, and what it doesn't

- **Branded:**
  - the login screen (logo, navy panel, headline)
  - the sidebar (anchor mark and company name)
  - invoice and proposal accents
  - the customer portal your clients log into (colors, through `portal.css`)
- **Not brandable from settings:**
  - the technician dashboard's own colors and fonts (it keeps Breeze's own theme; its dark mode is the closest match to the site)
  - the browser tab icon
  - the three feature bullets on the login panel

  Changing these would mean patching Breeze's code, which every update would undo.
- `portal.css` forces the portal into the site's dark navy whatever the
  visitor's OS setting. Check a couple of portal pages with a test client after
  pasting it. To undo it, clear the Custom CSS field.

## Palette (from `src/index.css`)

| Token | Hex | Breeze HSL | Use |
| --- | --- | --- | --- |
| navy | `#0B1B30` | `214 63% 12%` | page background, login panel |
| card | `#122844` | `214 58% 17%` | cards |
| ink | `#ECF1F8` | `215 46% 95%` | text (15:1 on navy) |
| muted | `#93A3B8` | `214 21% 65%` | secondary text (6.7:1 on navy) |
| gold | `#E8B84B` | `42 77% 60%` | buttons, links, the anchor (9.4:1 on navy) |
| bronze | `#B0883A` | `40 50% 46%` | rules and dividers |
| line-2 | `#2C435F` | `213 37% 27%` | borders |

## Regenerating the images

```bash
pip install playwright pillow   # Chromium must be available to Playwright
python3 brand/rmm/render.py . public/brand/rmm
mv public/brand/rmm/login-lockup.datauri.txt brand/rmm/
```
