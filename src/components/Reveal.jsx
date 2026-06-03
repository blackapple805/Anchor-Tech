import { useEffect, useRef, useState } from 'react';

/** Reveal — fade/slide content in on scroll, with failsafes so nothing ever stays hidden. */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return reduce || !('IntersectionObserver' in window);
  });
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const reveal = () => setShown(true);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { reveal(); io.unobserve(en.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    const r = el.getBoundingClientRect();
    const raf = (r.top < window.innerHeight && r.bottom > 0) ? requestAnimationFrame(reveal) : 0;
    const t = setTimeout(reveal, 1200);
    return () => { io.disconnect(); clearTimeout(t); if (raf) cancelAnimationFrame(raf); };
  }, [shown]);
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`.trim()}
      style={{ ...style, ...(delay && shown ? { transitionDelay: `${delay}ms` } : null) }} {...rest}>
      {children}
    </Tag>
  );
}
