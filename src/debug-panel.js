// On-device iOS header diagnostics overlay.
//
// This module is imported only when the URL carries ?debug=1 (see the guarded
// dynamic import in main.jsx). Because that import is conditional and dynamic,
// Vite/Rollup emit this code as its own chunk that a normal visitor never
// fetches — it tree-shakes out of the default load.
//
// The panel is pinned to the BOTTOM of the screen (bottom: 40vh) on purpose:
// it stays out of both toolbar-tint sample zones and never covers the top strip
// being photographed for the iOS header bug.

function mountDebugPanel() {
  // env(safe-area-inset-*) cannot be read back through a custom property — the
  // only reliable read is to let CSS resolve it into a real box and measure the
  // box. These hidden probes exist solely to be measured with getBoundingClientRect.
  const probeTop = document.createElement('div');
  probeTop.style.cssText =
    'position:fixed;top:0;left:0;width:0;height:env(safe-area-inset-top,0px);' +
    'pointer-events:none;visibility:hidden;';
  const probeBottom = document.createElement('div');
  probeBottom.style.cssText =
    'position:fixed;bottom:0;left:0;width:0;height:env(safe-area-inset-bottom,0px);' +
    'pointer-events:none;visibility:hidden;';
  document.body.appendChild(probeTop);
  document.body.appendChild(probeBottom);

  // --- panel shell
  const panel = document.createElement('div');
  panel.style.cssText =
    'position:fixed;left:0;right:0;bottom:40vh;z-index:2147483647;' +
    'font:11px/1.35 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;' +
    'background:rgba(0,0,0,.82);color:#fff;padding:8px 10px;box-sizing:border-box;' +
    'white-space:pre-wrap;pointer-events:auto;max-height:40vh;overflow:auto;' +
    '-webkit-user-select:text;user-select:text;';

  const readout = document.createElement('div');

  const controls = document.createElement('div');
  controls.style.cssText = 'margin-top:6px;display:flex;gap:8px;';

  const btnStyle =
    'font:11px/1 monospace;background:#222;color:#fff;border:1px solid #666;' +
    'padding:5px 9px;pointer-events:auto;';

  const grainBtn = document.createElement('button');
  grainBtn.textContent = 'grain off';
  grainBtn.style.cssText = btnStyle;

  const hdrBtn = document.createElement('button');
  hdrBtn.textContent = 'hdr bg off';
  hdrBtn.style.cssText = btnStyle;

  controls.appendChild(grainBtn);
  controls.appendChild(hdrBtn);
  panel.appendChild(readout);
  panel.appendChild(controls);
  document.body.appendChild(panel);

  // --- toggles (tap once to inject, tap again to remove)
  let grainStyleEl = null;
  grainBtn.addEventListener('click', () => {
    if (grainStyleEl) {
      grainStyleEl.remove();
      grainStyleEl = null;
      grainBtn.textContent = 'grain off';
    } else {
      grainStyleEl = document.createElement('style');
      grainStyleEl.textContent = 'body::after{display:none!important}';
      document.head.appendChild(grainStyleEl);
      grainBtn.textContent = 'grain ON (hidden)';
    }
  });

  let hdrStyleEl = null;
  hdrBtn.addEventListener('click', () => {
    if (hdrStyleEl) {
      hdrStyleEl.remove();
      hdrStyleEl = null;
      hdrBtn.textContent = 'hdr bg off';
    } else {
      hdrStyleEl = document.createElement('style');
      hdrStyleEl.textContent = '.site-header{background-color:transparent!important}';
      document.head.appendChild(hdrStyleEl);
      hdrBtn.textContent = 'hdr bg ON (transp)';
    }
  });

  // --- live readout
  const fmt = (n) => (typeof n === 'number' ? Math.round(n * 100) / 100 : n);
  const backdropOf = (cs) => cs.backdropFilter || cs.webkitBackdropFilter || 'none';

  function render() {
    const sat = probeTop.getBoundingClientRect().height;
    const sab = probeBottom.getBoundingClientRect().height;

    const hdr = document.querySelector('.site-header');
    const hdrRect = hdr ? hdr.getBoundingClientRect() : null;
    const hdrBg = hdr ? getComputedStyle(hdr).backgroundColor : '(no .site-header)';

    const vv = window.visualViewport;

    const lines = [];
    lines.push('SAT   ' + fmt(sat));
    lines.push('SAB   ' + fmt(sab));
    lines.push('HDR   ' + (hdrRect ? 'top=' + fmt(hdrRect.top) + ' h=' + fmt(hdrRect.height) : '(none)'));
    lines.push('HDRBG ' + hdrBg);
    lines.push('IH    ' + window.innerHeight);
    lines.push('CH    ' + document.documentElement.clientHeight);
    lines.push('VV    ' + (vv
      ? 'h=' + fmt(vv.height) + ' off=' + fmt(vv.offsetTop) + ' page=' + fmt(vv.pageTop) + ' scale=' + fmt(vv.scale)
      : '(none)'));
    lines.push('SY    ' + fmt(window.scrollY));

    // body::after is the grain overlay. Pseudo-elements are not in the DOM, so
    // its computed style has to be read off the pseudo directly.
    const after = getComputedStyle(document.body, '::after');
    lines.push('body::after bg=' + after.backgroundColor + ' backdrop=' + backdropOf(after));

    // CAND: every fixed/sticky element pinned to the top strip (rect.top <= 8).
    lines.push('CAND (fixed/sticky, top<=8):');
    let found = 0;
    for (const el of document.querySelectorAll('*')) {
      if (el === panel || panel.contains(el) || el === probeTop || el === probeBottom) continue;
      const cs = getComputedStyle(el);
      if (cs.position !== 'fixed' && cs.position !== 'sticky') continue;
      const r = el.getBoundingClientRect();
      if (r.top > 8) continue;
      found++;
      // className is an SVGAnimatedString on SVG nodes, so guard the type.
      const cls = (typeof el.className === 'string' && el.className.trim())
        ? '.' + el.className.trim().replace(/\s+/g, '.')
        : '';
      lines.push('  ' + el.tagName.toLowerCase() + cls +
        ' t=' + fmt(r.top) + ' h=' + fmt(r.height) + ' w=' + fmt(r.width) +
        ' bg=' + cs.backgroundColor +
        ' backdrop=' + backdropOf(cs));
    }
    if (!found) lines.push('  (none)');

    readout.textContent = lines.join('\n');
  }

  render();
  const vv = window.visualViewport;
  if (vv) {
    vv.addEventListener('scroll', render);
    vv.addEventListener('resize', render);
  }
  window.addEventListener('scroll', render, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountDebugPanel);
} else {
  mountDebugPanel();
}
