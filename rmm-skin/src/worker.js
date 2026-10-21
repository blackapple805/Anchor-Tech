/* global HTMLRewriter */
// Anchor Tech skin for Breeze RMM.
//
// Sits on rmm.anchortechvta.com/* in front of the Cloudflare Tunnel. Every
// request goes to Breeze unchanged; HTML pages get one extra stylesheet, the
// anchor favicon and an "Anchor Tech RMM" tab title on the way back. Breeze
// itself is never modified, so its updates can't undo the branding.
//
// The stylesheet, fonts and images live in ../public/anchor-skin/ and are
// served by Cloudflare directly (same origin, so Breeze's CSP allows them).

const SKIN_CSS = '/anchor-skin/skin.css';
const FAVICON = '/anchor-skin/favicon.svg';

// Pages that use Breeze's two-panel sign-in layout. The stylesheet only
// restyles that layout when <html data-anchor-page="auth"> is set.
const AUTH_PAGE = /^\/(login|forgot-password|reset-password|register-partner|accept-invite|invite|mfa)(\/|$)/;

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
