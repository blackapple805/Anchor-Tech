"""Render Anchor Tech RMM brand PNGs from HTML with the site's own fonts."""
import base64, pathlib, sys
from playwright.sync_api import sync_playwright

REPO = pathlib.Path(sys.argv[1])
OUT = pathlib.Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)
FONTS = REPO / "src/assets/fonts"

ANCHOR_PATHS = """
  <circle cx="22" cy="12.5" r="4"/>
  <line x1="22" y1="16.5" x2="22" y2="37"/>
  <path d="M12 23 H8 a14 14 0 0 0 28 0 h-4"/>
"""

FONT_CSS = f"""
@font-face {{ font-family: 'Fraunces'; font-weight: 300 600;
  src: url('{(FONTS / 'fraunces-latin.woff2').as_uri()}') format('woff2'); }}
@font-face {{ font-family: 'Inter'; font-weight: 400 700;
  src: url('{(FONTS / 'inter-latin.woff2').as_uri()}') format('woff2'); }}
html, body {{ margin: 0; background: transparent; }}
"""

# Square mark for the dashboard sidebar / partner logo (navy tile, gold anchor).
MARK_SVG = f"""<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" role="img" aria-label="Anchor Tech RMM">
  <rect width="44" height="44" rx="10" fill="#0B1B30"/>
  <g fill="none" stroke="#E8B84B" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">{ANCHOR_PATHS}</g>
</svg>
"""

# Wide lockup for the login panel (transparent; the panel itself is navy).
LOCKUP_HTML = f"""<!doctype html><html><head><style>{FONT_CSS}
#lockup {{ display: inline-flex; align-items: center; gap: 18px; padding: 6px 4px; }}
#lockup svg {{ width: 74px; height: 74px; flex: none; }}
.name {{ font-family: 'Fraunces'; font-weight: 400; font-size: 46px; line-height: 1;
  letter-spacing: -.02em; color: #ECF1F8; display: flex; flex-direction: column; gap: 9px; }}
.sub {{ font-family: 'Inter'; font-weight: 600; font-size: 14px; letter-spacing: .2em;
  text-transform: uppercase; color: #E8B84B; }}
</style></head><body>
<div id="lockup">
  <svg viewBox="0 0 44 44" fill="none"><g stroke="#E8B84B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">{ANCHOR_PATHS}</g></svg>
  <div class="name">Anchor Tech<span class="sub">RMM &middot; Ventura</span></div>
</div></body></html>"""

MARK_HTML = f"""<!doctype html><html><head><style>{FONT_CSS}
#mark svg {{ width: 256px; height: 256px; display: block; }}</style></head>
<body><div id="mark" style="display:inline-block">{MARK_SVG}</div></body></html>"""

(OUT / "anchor-mark.svg").write_text(MARK_SVG)

with sync_playwright() as p:
    b = p.chromium.launch()
    # Mark: 256px at 1x (Breeze resizes logos to fit 256x256).
    pg = b.new_page(device_scale_factor=1)
    pg.set_content(MARK_HTML)
    pg.locator("#mark").screenshot(path=str(OUT / "anchor-mark-256.png"), omit_background=True)
    # Lockup: render at 3x so it stays crisp on the 96-128px-tall login panel slot.
    pg = b.new_page(device_scale_factor=3)
    pg.set_content(LOCKUP_HTML)
    pg.wait_for_function("document.fonts.status === 'loaded'")
    pg.evaluate("document.fonts.ready")
    pg.locator("#lockup").screenshot(path=str(OUT / "login-lockup.png"), omit_background=True)
    b.close()

png = (OUT / "login-lockup.png").read_bytes()
uri = "data:image/png;base64," + base64.b64encode(png).decode()
(OUT / "login-lockup.datauri.txt").write_text(uri + "\n")
print("lockup bytes", len(png), "data-uri chars", len(uri))
