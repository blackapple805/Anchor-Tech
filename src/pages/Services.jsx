import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { Eyebrow } from '../components/SectionHead.jsx';
import { Chevron, Arrow } from '../components/icons.jsx';
import { SVCS } from '../data/services.js';

/* ---------------- Services index ---------------- */
const heroFacts = [
  ['01', '8 core services', 'Setup, security, backups and day-to-day support'],
  ['02', '2-hour response', 'Average time to reach a real person who knows you'],
  ['03', 'Flat-rate quotes', 'Approved up front — before any work begins'],
  ['04', 'No long contracts', 'You stay because it works, not because you’re locked in'],
];
const processSteps = [
  ['1', 'Free consultation', 'We learn your business, walk your space, and listen to what’s actually slowing you down — no obligation, no jargon.'],
  ['2', 'Clear plan & quote', 'You get a plain-English plan with flat, up-front pricing. You approve it before we lift a finger.'],
  ['3', 'Setup & ongoing care', 'We install everything cleanly, show your team the ropes, and stay on call whenever you need us.'],
];

export default function Services() {
  return (
    <>
      <section className="page-hero page-hero--split">
        <div className="wrap">
          <div className="hero-lead">
            <Reveal className="crumbs"><Link to="/">Home</Link><Chevron /><span>Services</span></Reveal>
            <Reveal as="h1" delay={60}>One local team for everything tech.</Reveal>
            <Reveal as="p" delay={120}>Whether you’re opening a new location or finally fixing the Wi-Fi that’s been driving you crazy, we handle the setup, the security and the day-to-day support — so technology stops being a headache and starts being an advantage.</Reveal>
            <Reveal className="hero-actions" delay={180}>
              <Link className="btn" to="/contact">Book a Free Consultation <Arrow /></Link>
              <a className="btn btn--ghost" href="#services-list">Jump to the list</a>
            </Reveal>
          </div>
          <Reveal className="hero-aside" delay={140}>
            <span className="hero-figure" aria-hidden="true">08</span>
            <div className="hero-rail">
              <div className="rail-head"><span className="rh-ix">—</span><span className="rh-label">At a glance</span></div>
              {heroFacts.map(([n, t, d]) => (
                <div className="hero-fact" key={n}>
                  <span className="hf-n">{n}</span>
                  <div><b>{t}</b><span>{d}</span></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="services-list">
        <div className="wrap">
          <Reveal className="head-split" style={{ marginBottom: 14 }}>
            <div className="section-head"><Eyebrow ix="01">The full list</Eyebrow><h2 className="title">Eight ways we keep you running</h2></div>
            <div className="head-rail"><p className="rail-line">Every engagement is sized to your business and priced up front. Tap any service for what’s included.</p></div>
          </Reveal>
          <div className="svc-list">
            {SVCS.map((s, i) => (
              <Reveal as={Link} to={`/services/${s.slug}`} className="svc-row" key={s.slug} delay={(i % 2) * 70}>
                <span className="svc-n">{String(i + 1).padStart(2, '0')}</span>
                <div><h3>{s.title}</h3><p>{s.short}</p></div>
                <span className="svc-go" aria-hidden="true"><Arrow /></span>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" style={{ color: 'var(--muted)', marginTop: 34, fontSize: '15.5px' }}>
            Don’t see exactly what you need? We tackle most small-business tech challenges — <Link className="textlink" to="/contact" style={{ display: 'inline' }}>just ask</Link>.
          </Reveal>
        </div>
      </section>

      <section className="section mist">
        <div className="wrap">
          <Reveal className="head-split">
            <div className="section-head"><Eyebrow ix="02">How we work</Eyebrow><h2 className="title title--display">Simple, start to finish</h2></div>
            <div className="head-rail"><p className="rail-line">No drawn-out sales process. Three straightforward steps to get your tech sorted.</p></div>
          </Reveal>
          <div className="steps" style={{ marginTop: 52 }}>
            {processSteps.map(([n, t, d], i) => (
              <Reveal className="step" key={n} delay={i * 90}>
                <span className="n">{n}</span><h3>{t}</h3><p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand ix="03" eyebrow="Not sure yet?" heading="Not sure where to start?" sub="That’s exactly what the free consultation is for. Tell us what’s bugging you and we’ll map out the fix." />
    </>
  );
}
