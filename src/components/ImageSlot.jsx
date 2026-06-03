import { useEffect, useRef, useState } from 'react';
/* ---------- ImageSlot (click/drag to fill, parallax option) ---------- */
const MAX_DIM = 1400;
const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];
const SLOT_KEY = (id) => `anchor.ed.imageslot.${id}`;
async function toDataUrl(file, targetW) {
  const bitmap = await createImageBitmap(file);
  try {
    const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
    const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
    return canvas.toDataURL('image/webp', 0.85);
  } finally { bitmap.close && bitmap.close(); }
}
const PhIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>);
const ClearIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>);
function ImageSlot({ id, className = '', placeholder = 'Drop an image', src = '' }) {
  const [url, setUrl] = useState(null);
  const [err, setErr] = useState('');
  const elRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SLOT_KEY(id));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: hydrate from storage
      if (stored && /^data:image\//i.test(stored)) setUrl(stored);
    } catch { /* storage unavailable */ }
  }, [id]);
  async function ingest(file) {
    if (!file) return;
    if (!ACCEPT.includes(file.type)) { flash('Use a PNG, JPG or WebP image.'); return; }
    try {
      const w = elRef.current?.clientWidth || MAX_DIM;
      const dataUrl = await toDataUrl(file, w);
      setUrl(dataUrl);
      try { localStorage.setItem(SLOT_KEY(id), dataUrl); } catch { /* ignore */ }
    } catch { flash('Could not read that image.'); }
  }
  function flash(msg) { setErr(msg); setTimeout(() => setErr(''), 3000); }
  function clearOrReplace(e) {
    e.stopPropagation();
    if (url) { setUrl(null); try { localStorage.removeItem(SLOT_KEY(id)); } catch { /* ignore */ } }
    else inputRef.current?.click();
  }
  const shown = url || src;
  return (
    <div ref={elRef} className={`img-slot ${className}`.trim()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { e.preventDefault(); ingest(e.dataTransfer.files?.[0]); }}>
      {shown ? (
        <>
          <img src={shown} alt="" loading="lazy" />
          <button className="clear" onClick={clearOrReplace} aria-label={url ? 'Remove image' : 'Replace image'}>{url ? <ClearIcon /> : <PhIcon />}</button>
        </>
      ) : (
        <div className="ph" onClick={() => inputRef.current?.click()}>
          <PhIcon />
          <span>{err || placeholder}</span>
        </div>
      )}
      <input ref={inputRef} type="file" accept={ACCEPT.join(',')} style={{ display: 'none' }} onChange={(e) => ingest(e.target.files?.[0])} />
    </div>
  );
}

export default ImageSlot;