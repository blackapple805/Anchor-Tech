import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { Eyebrow } from '../components/SectionHead.jsx';
import { Chevron } from '../components/icons.jsx';
import { EMAIL } from '../data/services.js';

/* ---------------- Contact ---------------- */
const coverageAreas = ['Ventura', 'Oxnard', 'Camarillo', 'Thousand Oaks', 'Ojai', 'Santa Barbara', 'Santa Paula'];
const heroFacts = [
  ['01', 'One business day', 'Typical reply time — usually a lot sooner'],
  ['02', 'Free consultation', 'We learn your business first, no obligation'],
  ['03', 'Local & on-site', 'Same- or next-day across Ventura County'],
];

function ContactCard() {
  return (
    <>
      <Eyebrow ix="01">Get in touch</Eyebrow>
      <h2 className="title" style={{ fontSize: 28 }}>Email us and we’ll take it from there</h2>
      <p style={{ color: 'var(--muted)', margin: '10px 0 26px', fontSize: '15.5px' }}>
        Tell us a little about your business and what you need help with. We read every message and reply within one business day — usually a lot sooner.
      </p>
      <a className="btn btn--lg" href={`mailto:${EMAIL}`}>Email {EMAIL}</a>
      <p className="form-note">Include your business name, location, and what’s slowing you down, and we’ll come back with clear next steps.</p>
    </>
  );
}

function Contact() {
  return (
    <>
      <section className="page-hero page-hero--split">
        <div className="wrap">
          <div className="hero-lead">
            <Reveal className="crumbs"><Link to="/">Home</Link><Chevron /><span>Contact</span></Reveal>
            <Reveal as="h1" delay={60}>Let’s talk about your tech.</Reveal>
            <Reveal as="p" delay={120}>Tell us what you need and we’ll get back to you within one business day — usually a lot sooner. Free consultations, honest advice, no pressure.</Reveal>
          </div>
          <Reveal className="hero-aside" delay={140}>
            <span className="hero-figure" aria-hidden="true">Hi</span>
            <div className="hero-rail">
              <div className="rail-head"><span className="rh-ix">—</span><span className="rh-label">What to expect</span></div>
              {heroFacts.map(([n, t, d]) => (
                <div className="hero-fact" key={n}>
                  <span className="hf-n">{n}</span>
                  <div><b>{t}</b><span>{d}</span></div>
                </div>
              ))}
              <div className="rail-chips">
                {coverageAreas.slice(0, 5).map((a) => <span className="chip" key={a}>{a}</span>)}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap contact-grid">
          <Reveal className="contact-card form-card"><ContactCard /></Reveal>

          <Reveal className="contact-card info-card" delay={80}>
            <Eyebrow ix="02">Direct lines</Eyebrow>
            <h3>Get in touch directly</h3>
            <p className="sub">We’re a quick email away.</p>
            <ul className="info-list">
              <li><div><div className="lbl">Email us</div><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></li>
              <li><div><div className="lbl">Service area</div><span className="val">Ventura County, CA<small>Ventura · Oxnard · Camarillo · Thousand Oaks · Ojai · Santa Barbara &amp; nearby</small></span></div></li>
              <li><div><div className="lbl">Response time</div><span className="val">Within one business day<small>Free, no-pressure consultation</small></span></div></li>
            </ul>
          </Reveal>

          <Reveal className="contact-card next-card" delay={120}>
            <Eyebrow ix="03">After you reach out</Eyebrow>
            <h3>What happens next</h3>
            <ol className="next-steps">
              <li><span className="ns-ix">01</span><div><b>We reply within one business day</b><span>Usually a lot sooner — often the same afternoon.</span></div></li>
              <li><span className="ns-ix">02</span><div><b>A quick, no-pressure chat</b><span>We learn your business and what’s actually slowing you down.</span></div></li>
              <li><span className="ns-ix">03</span><div><b>A clear, flat-rate quote</b><span>Plain-English plan and pricing — approved before any work begins.</span></div></li>
            </ol>
          </Reveal>

          <Reveal className="contact-card coverage-card" delay={160}>
            <Eyebrow ix="04">Coverage</Eyebrow>
            <h3>Right down the road</h3>
            <p className="cov-sub">On-site across Ventura County — usually same- or next-day.</p>
            <div className="chips">{coverageAreas.map((a) => <span className="chip" key={a}>{a}</span>)}</div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
export default Contact;
