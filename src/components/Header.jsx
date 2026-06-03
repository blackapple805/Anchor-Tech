import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Anchor, Phone, Menu, X } from './icons.jsx';
import { PHONE, PHONE_DISPLAY } from '../data/services.js';

export default function Header() {
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    let resizeTimer;
    const onResize = () => {
      document.body.classList.add('is-resizing');
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove('is-resizing');
      }, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <header className="site-header">
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
          <a className="nav-phone" href={`tel:${PHONE}`}>
            <Phone />
            {PHONE_DISPLAY}
          </a>
          <NavLink className="btn" to="/contact">
            Get a Quote
          </NavLink>
          <button
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}