import { Link } from 'react-router-dom';
import { Anchor } from './icons.jsx';
import { EMAIL, PHONE, PHONE_DISPLAY } from '../data/services.js';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link className="brand" to="/" aria-label="Anchor Tech Solutions home">
              <Anchor className="mark" />
              <span className="name">Anchor Tech<span>Solutions · Ventura</span></span>
            </Link>
            <p className="footer-about">Friendly, dependable IT for the small businesses that make Ventura County tick. Setup, security and support from a team right down the road.</p>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services/network-setup">Network Setup</Link></li>
              <li><Link to="/services/wifi-installation">Wi-Fi Installation</Link></li>
              <li><Link to="/services/security-cameras">Security Cameras</Link></li>
              <li><Link to="/services/data-backup">Data Backup</Link></li>
              <li><Link to="/services/tech-support">Tech Support</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Get in touch</h4>
            <ul className="footer-contact">
              <li><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li>Serving all of Ventura County</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Anchor Tech Solutions. All rights reserved.</span>
          <span>Ventura · Oxnard · Camarillo · Thousand Oaks · Ojai · Santa Barbara</span>
        </div>
      </div>
    </footer>
  );
}
export default Footer;