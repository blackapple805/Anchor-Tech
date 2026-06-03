# Photos — curated Unsplash list

The site now ships with on-theme Unsplash photos wired in as defaults. They load
straight from Unsplash's CDN, so they work out of the box. You can swap any of
them two ways:

1. **Quick (per browser):** hover the image on the live site and click the small
   button to upload your own — it's saved locally in that browser.
2. **Permanent (in code):** replace the `src="..."` URL on the matching
   `<ImageSlot>` in the page file (see "Where" below).

All photos below are free under the Unsplash license (free for commercial use,
no attribution required). If you'd rather self-host, open the photo page, click
**Download**, drop the file in a `public/` folder, and point `src` at it
(e.g. `src="/photos/hero.jpg"`).

## Currently wired in

| Slot | Where | Photo | Page to download / view |
|------|-------|-------|-------------------------|
| Home hero | `src/pages/Home.jsx` (`home-hero`) | Blue network cables | https://unsplash.com/photos/cable-network-M5tzZtFCOfs |
| Home "why us" | `src/pages/Home.jsx` (`home-why`) | Tech working on a laptop | https://unsplash.com/photos/woman-in-black-top-using-surface-laptop-glRqyWJgUeY |
| About story | `src/pages/About.jsx` (`about-story`) | Team meeting | https://unsplash.com/photos/group-of-people-having-a-meeting-VBLHICVh-lI |
| About service area | `src/pages/About.jsx` (`about-area`) | Server hallway | https://unsplash.com/photos/a-long-hallway-with-glass-doors-leading-to-another-room-s0XabTAKvak |

## More on-theme options (swap in any time)

Networks / cabling / IT:
- Blue wires bundle — https://unsplash.com/photos/a-bunch-of-blue-wires-connected-to-each-other-PSpf_XgOM5w
- Close-up network patch panel — https://unsplash.com/photos/a-close-up-of-a-network-with-wires-connected-to-it-dyUp7WPu5q4
- Technician with tablet in server room — https://unsplash.com/photos/technician-using-digital-tablet-in-server-room-repair-card-mainboard-checking-network-link-status-nANa9lAOkMI
- Server rack — https://unsplash.com/photos/a-rack-of-servers-in-a-server-room-2JJ3wBHu4_0

People / local business feel:
- Team meeting — https://unsplash.com/photos/group-of-people-having-a-meeting-VBLHICVh-lI
- Working on a laptop — https://unsplash.com/photos/woman-in-black-top-using-surface-laptop-glRqyWJgUeY

## How the direct URL is built

The `src` uses Unsplash's CDN with sizing params, e.g.:

```
https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&q=80&auto=format&fit=crop
```

- `w=1000` — max width in px (raise for the hero if you want it crisper)
- `q=80` — quality
- `auto=format` — serves WebP/AVIF where supported
- `fit=crop` — crops to the slot's aspect ratio

To use a different Unsplash photo, open its page, copy the photo ID from the URL
(the part after the last `-`, or the `photo-XXXX` id from the image), and slot it
into the same URL shape.
