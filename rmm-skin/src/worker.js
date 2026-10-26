/* global HTMLRewriter */
// Anchor Tech skin for Breeze RMM.
//
// Sits on rmm.anchortechvta.com/* in front of the Cloudflare Tunnel. Every
// request goes to Breeze unchanged; HTML pages get one extra stylesheet, a
// small same-origin script (viewer-link.js), the anchor favicon and an
// "Anchor Tech RMM" tab title on the way back. Breeze
// itself is never modified, so its updates can't undo the branding.
//
// The stylesheet, fonts and images live in ../public/anchor-skin/ and are
// served by Cloudflare directly (same origin, so Breeze's CSP allows them).

const SKIN_CSS = '/anchor-skin/skin.css';
const FAVICON = '/anchor-skin/favicon.svg';
// Points "Connect Desktop" at the internal Breeze address so the viewer app
// isn't stopped by Cloudflare Access (see public/anchor-skin/viewer-link.js).
const VIEWER_LINK_JS = '/anchor-skin/viewer-link.js';

// Pages built on Breeze's sign-in layouts (the two-panel AuthShellBranded and
// the centred AuthLayout). The stylesheet restyles them when
// <html data-anchor-page="auth"> is set. scripts/check-breeze.mjs lists every
// such page in a Breeze release and fails if one isn't matched here.
const AUTH_PAGE = /^\/(login|auth|forgot-password|reset-password|register-partner|accept-invite|invite|mfa|verify|quick|oauth\/consent)(\/|$)/;

export default {
  async fetch(request, env, ctx) {
    // If anything here throws, send the request straight to Breeze instead
    // of showing a Cloudflare error: the RMM must keep working without its skin.
    ctx.passThroughOnException();

    const response = await fetch(request);
    const type = response.headers.get('content-type') || '';
    if (!type.includes('text/html')) return response;

    const isAuthPage = AUTH_PAGE.test(new URL(request.url).pathname);

    return new HTMLRewriter()
      .on('html', {
        element(el) {
          el.setAttribute('data-anchor-skin', '');
          if (isAuthPage) el.setAttribute('data-anchor-page', 'auth');
        },
      })
      .on('head', {
        element(el) {
          el.append(`<link rel="stylesheet" href="${SKIN_CSS}">`, { html: true });
          el.append(`<script src="${VIEWER_LINK_JS}" defer></script>`, { html: true });
        },
      })
      .on('link[rel~="icon"]', {
        element(el) {
          el.setAttribute('href', FAVICON);
          el.setAttribute('type', 'image/svg+xml');
        },
      })
      .on('title', {
        text(chunk) {
          if (chunk.text.includes('Breeze')) {
            chunk.replace(chunk.text.replace(/Breeze(?: RMM)?/g, 'Anchor Tech RMM'));
          }
        },
      })
      .transform(response);
  },
};
