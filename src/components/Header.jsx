import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Anchor } from './icons.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: sync menu to route
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Trigger the one-time entry animation after mount, on the next frame so the
  // initial (pre-animation) state paints first. This runs once and never again,
  // so a resize can't replay the drop-in.
  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <header className={`site-header ${loaded ? 'is-loaded' : ''}`}>
      <div className="wrap nav">
        <NavLink
          className="brand"
          to="/"
          aria-label="Anchor Tech Solutions home"
        >
          <Anchor className="mark" />
          <span className="name">
            Anchor Tech
            <span>Solutions · Ventura</span>
          </span>
        </NavLink>
        <nav
          className={`nav-links ${open ? 'open' : ''}`}
          aria-label="Primary"
          onClick={(e) => {
            if (e.target.closest('a')) setOpen(false);
          }}
        >
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/services">
            Services
          </NavLink>
          <NavLink to="/about">
            About
          </NavLink>
          <NavLink to="/contact">
            Contact
          </NavLink>
          <NavLink to="/contact" className="btn m-cta">
            Book a Free Consultation
          </NavLink>
        </nav>
        <div className="nav-cta">
          <NavLink className="btn" to="/contact">
            Get a Quote
          </NavLink>
          <button
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {/* Three bars morph to an X purely in CSS off aria-expanded; the
                open/close state and JS below are unchanged. */}
            <span className="nav-toggle-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}