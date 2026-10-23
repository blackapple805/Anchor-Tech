// Anchor Tech RMM: open Breeze Viewer against the internal address.
//
// rmm.anchortechvta.com sits behind Cloudflare Access. The browser is signed
// in to Access, but the Breeze Viewer app is a separate program that isn't,
// so a viewer pointed at rmm.anchortechvta.com gets Access's login redirect
// and shows "Failed to fetch".
//
// Breeze builds the viewer link (breeze://connect?...&api=<page address>)
// and opens it with a link click. This listener runs first and swaps the
// api= value for the internal Breeze address, which the PC reaches over the
// IPsec tunnel (or Cloudflare Mesh) without going through Access.
(function () {
  'use strict';

  var INTERNAL_API = 'https://breeze.home.arpa';

  function rewrite(href) {
    return href.replace(/([?&]api=)[^&#]*/, '$1' + encodeURIComponent(INTERNAL_API));
  }

  document.addEventListener(
    'click',
    function (event) {
      var target = event.target;
      var link = target && target.closest ? target.closest('a[href^="breeze:"]') : null;
      if (!link) return;
      var original = link.getAttribute('href') || '';
      var updated = rewrite(original);
      if (updated !== original) link.setAttribute('href', updated);
    },
    true // capture: runs before the browser hands the link to the viewer
  );
})();
