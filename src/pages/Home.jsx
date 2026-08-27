import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Marquee from '../components/Marquee.jsx';
import { Eyebrow } from '../components/SectionHead.jsx';
import { Arrow, Pin } from '../components/icons.jsx';
// Self-hosted, Vite-fingerprinted hero (was a hotlink to images.unsplash.com).
import heroAvif from '../assets/hero-network-1080.avif';
import heroWebp from '../assets/hero-network-1080.webp';
import heroJpg from '../assets/hero-network-1080.jpg';

const services = [
  { n: '01', to: 'network-setup', t: 'Computer & Network Setup', d: 'New workstations, servers and wired networks installed, configured and ready to go on day one.' },
  { n: '02', to: 'wifi-installation', t: 'Wi-Fi Installation', d: 'Fast, reliable wireless that reaches every corner — back office, patio and parking lot included.' },
  { n: '03', to: 'security-cameras', t: 'Security Cameras', d: 'Modern camera systems you can check from your phone, with clear footage when it actually matters.' },
  { n: '04', to: 'pos-systems', t: 'POS Systems', d: 'Point-of-sale setup that keeps lines moving and syncs cleanly with your payments and inventory.' },
  { n: '05', to: 'data-backup', t: 'Data Backup & Recovery', d: 'Automatic backups on-site and in the cloud, so a crash or theft never means losing your business.' },
  { n: '06', to: 'tech-support', t: 'Ongoing Tech Support', d: 'A real person who knows your setup — on call for the day-to-day glitches and the late-night emergencies.' },
];

const whyPoints = [
  ['We show up in person', 'On-site visits across the county, usually same- or next-day.'],
  ['Flat, honest pricing', 'Clear quotes up front — no surprise hourly creep or mystery fees.'],
  ['One team for everything', 'Setup, security, backups and support — all under one roof.'],
  ['We speak human', 'No jargon, no condescension — just clear answers you can act on.'],
];

const features = [
  { t: 'Fast response', d: 'We treat business-critical problems as urgent, so they don’t sit and cost you a day of business.' },
  { t: 'Familiar faces', d: 'You work with the same small team every time — people who already know your setup.' },
  { t: 'No surprise bills', d: 'Up-front quotes and simple monthly plans. You always know what you’re paying for.' },
  { t: 'Security first', d: 'Backups, updates and protection handled quietly in the background, before trouble starts.' },
];

const marqueeItems = [
  'Network Setup',
  { text: 'Ventura County', muted: true },
  'Wi-Fi Installation',
  { text: 'Same-day visits', muted: true },
  'Security Cameras',
  { text: 'No jargon', muted: true },
  'POS Systems',
  'Data Backup & Recovery',
  { text: 'Locally owned', muted: true },
  'Ongoing Tech Support',
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <Reveal as="p" className="eyebrow">Locally owned · Ventura County</Reveal>
            <Reveal as="h1" delay={60}>Technology that just <span className="hl">works</span> — so your business can too.</Reveal>
            <Reveal as="p" className="lead" delay={120}>Anchor Tech Solutions sets up and manages the equipment and IT that keep local businesses running. From Wi-Fi and networks to security cameras, POS systems and backups — we handle the tech so you can get back to your customers.</Reveal>
            <Reveal className="hero-actions" delay={180}>
              <Link className="btn btn--lg" to="/contact">Book a Free Consultation <Arrow /></Link>
              <Link className="btn btn--ghost btn--lg" to="/services">See our services</Link>
            </Reveal>
            <Reveal className="trust-row" delay={240}>
              <div className="trust-item">Same-day & next-day visits</div>
              <div className="trust-item">No long-term contracts</div>
              <div className="trust-item">Plain-English, no jargon</div>
            </Reveal>
          </div>
          <Reveal className="hero-visual" delay={120}>
            <picture>
              <source srcSet={heroAvif} type="image/avif" />
              <source srcSet={heroWebp} type="image/webp" />
              <img
                className="hero-slot"
                src={heroJpg}
                width="1080"
                height="1350"
                alt="Anchor Tech technician setting up business network equipment"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </Reveal>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section">
        <div className="wrap">
          <Reveal className="head-split">
            <div className="section-head">
              <Eyebrow ix="01">What we do</Eyebrow>
              <h2 className="title">Everything your business needs to stay connected</h2>
            </div>
            <div className="head-rail">
              <p className="rail-line">One local team for setup, security and support — so you’re not juggling five vendors and a stack of help-desk tickets.</p>
              <div className="rail-meta">
                <b>6</b>
                <span><i>core services</i><i>one accountable team</i></span>
              </div>
            </div>
          </Reveal>
          <div className="cards" style={{ marginTop: 52 }}>
            {services.map(({ n, to, t, d }) => (
              <Reveal as={Link} to={`/services/${to}`} className="card card--link" key={n} delay={0}>
                <span className="num">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <span className="card-go">Learn more <Arrow /></span>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ textAlign: 'center', marginTop: 42 }}>
            <Link className="textlink" to="/services">View all services & what’s included <Arrow /></Link>
          </Reveal>
        </div>
      </section>

      {/* WHY US */}
      <section className="section mist">
        <div className="wrap split">
          <Reveal className="split-figure">
            <img className="split-slot" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80&auto=format&fit=crop" width="1000" height="750" alt="Local IT team collaborating at a laptop" loading="lazy" />
            <div className="split-badge">
              <span className="sb-pin"><Pin /></span>
              <div><b>Ventura County</b><small>On-site, same- or next-day</small></div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Eyebrow ix="02">Why local businesses choose us</Eyebrow>
            <h2 className="title">A real local partner, not a faraway help desk</h2>
            <p className="lead">We live and work in Ventura County. When something breaks, you reach a neighbor who can drive over — not a call center reading from a script three time zones away.</p>
            <ul className="check-list check-list--ix">
              {whyPoints.map(([b, d], i) => (
                <li key={b}><span className="cl-ix">{String(i + 1).padStart(2, '0')}</span><div><b>{b}</b><span className="d">{d}</span></div></li>
              ))}
            </ul>
            <div style={{ marginTop: 32 }}><Link className="btn" to="/about">More about our team <Arrow /></Link></div>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="wrap">
          <Reveal className="head-split">
            <div className="section-head">
              <Eyebrow ix="03">The Anchor difference</Eyebrow>
              <h2 className="title">Built around how small businesses actually run</h2>
            </div>
            <div className="head-rail">
              <p className="rail-line">Four habits that decide whether technology helps your day or quietly hijacks it.</p>
            </div>
          </Reveal>
          <div className="feature-grid" style={{ marginTop: 52 }}>
            {features.map(({ t, d }, i) => (
              <Reveal className="feature" key={t} delay={i * 80}>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVOLVING RIBBON */}
      <Marquee items={marqueeItems} speed={42} ariaLabel="What we do across Ventura County" />

      <CtaBand
        ix="04"
        eyebrow="Get started"
        heading="Let’s get your tech working for you."
        sub="Book a free, no-pressure consultation. We’ll learn your business, walk your space, and send a clear plan and quote — no obligation."
      />
    </>
  );
}
