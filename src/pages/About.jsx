import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { Eyebrow } from '../components/SectionHead.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { Chevron, Arrow, Pin } from '../components/icons.jsx';

/* ---------------- About ---------------- */
const aboutFacts = [
  ['Locally owned', 'Based in Ventura, serving the whole county'],
  ['One team', 'Setup, security, backups and support under one roof'],
  ['On-site', 'Same- or next-day visits across the county'],
  ['Plain English', 'Honest advice, no jargon and no pressure'],
];
const aboutValues = [
  { t: 'We’re truly local', d: 'Based in Ventura, serving the whole county. When you need us on-site, we’re a short drive away — not a plane ticket.' },
  { t: 'Honest, no pressure', d: 'We recommend what your business actually needs — never the most expensive option to pad an invoice.' },
  { t: 'We speak plain English', d: 'No acronym soup. We explain what’s going on and what your options are, in words that actually make sense.' },
  { t: 'We don’t disappear', d: 'Setup is just the start. We stick around for the updates, the questions and the emergencies — year after year.' },
];
const aboutAreas = ['Ventura', 'Oxnard', 'Camarillo', 'Thousand Oaks', 'Ojai', 'Santa Barbara', 'Santa Paula'];

function About() {
  return (
    <>
      <section className="page-hero page-hero--split">
        <div className="wrap">
          <div className="hero-lead">
            <Reveal className="crumbs"><Link to="/">Home</Link><Chevron /><span>About</span></Reveal>
            <Reveal as="h1" delay={60}>Your neighbors in tech, here for the long haul.</Reveal>
            <Reveal as="p" delay={120}>We’re a small, locally owned team that believes great IT support shouldn’t require a corporate contract or a call center. We keep Ventura County’s small businesses running — quietly handling the tech so you don’t have to.</Reveal>
            <Reveal className="hero-actions" delay={180}>
              <Link className="btn" to="/contact">Work with us <Arrow /></Link>
              <Link className="btn btn--ghost" to="/services">See our services</Link>
            </Reveal>
          </div>
          <Reveal className="hero-aside" delay={140}>
            <span className="hero-figure" aria-hidden="true">VC</span>
            <div className="hero-rail">
              <div className="rail-head"><span className="rh-ix">—</span><span className="rh-label">At a glance</span></div>
              {aboutFacts.map(([b, s], i) => (
                <div className="hero-fact" key={b}>
                  <span className="hf-n">{String(i + 1).padStart(2, '0')}</span>
                  <div><b>{b}</b><span>{s}</span></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="wrap split split--wide-l">
          <Reveal>
            <Eyebrow ix="01">Our story</Eyebrow>
            <h2 className="title">Built on showing up</h2>
            <p className="lead">Anchor Tech Solutions grew out of a simple frustration: local shops, clinics and offices were being treated like an afterthought by big IT firms — long wait times, confusing bills, and nobody who actually understood their business.</p>
            <p style={{ marginTop: 18, color: 'var(--muted)' }}>So we built the opposite. A local company small enough to know your name and your setup, but experienced enough to handle anything from a single laptop to a multi-site network. Most of our clients come to us from a neighbor’s recommendation.</p>
            <p style={{ marginTop: 18, color: 'var(--muted)' }}>We’re not trying to be the biggest. We’re trying to be the team you’re genuinely glad you called.</p>
            <div style={{ marginTop: 30 }}><Link className="btn" to="/contact">Work with us <Arrow /></Link></div>
          </Reveal>
          <Reveal delay={100}>
            <img className="split-slot split-slot--tall" src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=1000&q=80&auto=format&fit=crop" width="1000" height="1200" alt="The Anchor Tech team in a working meeting" loading="lazy" />
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="wrap">
          <Reveal className="head-split">
            <div className="section-head"><Eyebrow ix="02">Why local businesses hire us</Eyebrow><h2 className="title title--display">What you can count on</h2></div>
            <div className="head-rail"><p className="rail-line">Four promises we make to every client, from the corner café to the multi-site clinic.</p></div>
          </Reveal>
          <div className="feature-index" style={{ marginTop: 48 }}>
            {aboutValues.map(({ t, d }, i) => (
              <Reveal className="findex" key={t} delay={i * 70}>
                <span className="fn">{String(i + 1).padStart(2, '0')}</span>
                <div><h3>{t}</h3><p>{d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="section mist">
        <div className="wrap split split--wide-r">
          <Reveal delay={100}>
            <Eyebrow ix="03">Where we work</Eyebrow>
            <h2 className="title">Proudly serving Ventura County</h2>
            <p className="lead">From the harbor to the foothills, we cover the communities that make this stretch of coast home. If you’re nearby and not on the list, just ask — we likely cover you too.</p>
            <div className="chips">{aboutAreas.map((a) => (<span className="chip" key={a}><Pin />{a}</span>))}</div>
          </Reveal>
          <Reveal>
            <img className="split-slot split-slot--tall" src="https://images.unsplash.com/photo-1707159960677-2790b1ca0b43?w=1000&q=80&auto=format&fit=crop" width="1000" height="1200" alt="Ventura Pier on the Ventura County coast" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <CtaBand ix="04" eyebrow="Let’s talk" heading="Let’s put a local team in your corner." sub="Book a free consultation and find out how stress-free your business tech can be." />
    </>
  );
}
export default About;
