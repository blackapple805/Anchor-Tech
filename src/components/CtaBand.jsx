import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import { Eyebrow } from './SectionHead.jsx';
import { EMAIL } from '../data/services.js';

/* ---------- CtaBand ---------- */
export default function CtaBand({ ix = '—', eyebrow = 'Get started', heading, sub }) {
  return (
    <section className="section--tight">
      <div className="wrap">
        <Reveal className="cta-band">
          <div className="inner">
            <div>
              <Eyebrow ix={ix}>{eyebrow}</Eyebrow>
              <h2>{heading}</h2>
              <p>{sub}</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn--lg" to="/contact">Book a Free Consultation</Link>
              <a className="btn btn--light btn--lg" href={`mailto:${EMAIL}`}>Email Us</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

