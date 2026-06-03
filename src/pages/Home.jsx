import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import ImageSlot from '../components/ImageSlot.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { Arrow, Star } from '../components/icons.jsx';

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
  { t: 'Fast response', d: 'A 2-hour average response time means problems don\u2019t sit and cost you a day of business.' },
  { t: 'Familiar faces', d: 'You work with the same small team every time — people who already know your setup.' },
  { t: 'No surprise bills', d: 'Up-front quotes and simple monthly plans. You always know what you\u2019re paying for.' },
  { t: 'Security first', d: 'Backups, updates and protection handled quietly in the background, before trouble starts.' },
];

const testimonials = [
  { av: 'MR', name: 'Maria Reyes', role: 'Owner, Reyes Family Kitchen — Oxnard', q: 'Our Wi-Fi used to drop every lunch rush. Anchor mapped the whole restaurant, swapped a few things out, and it\u2019s been rock solid for a year. They actually explained what was wrong.' },
  { av: 'DT', name: 'David Tran', role: 'Manager, Coastline Auto Care — Ventura', q: 'They set up our cameras and back-office network for the new location and had us open on schedule. When a POS terminal acted up, someone was here within the hour. Worth every penny.' },
  { av: 'SK', name: 'Dr. Susan Kim', role: 'Camarillo Family Dental', q: 'As a small dental office, losing patient records would be a nightmare. Anchor set up automatic backups and walks us through a test restore every quarter. I finally sleep at night.' },
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
            <ImageSlot id="home-hero" className="hero-slot" placeholder="Drop a hero photo — your team, a job site, or local storefront" src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&q=80&auto=format&fit=crop" />
            <div className="hero-badge hero-badge--tl">
              <div><b>2-hr</b><small>avg. response time</small></div>
            </div>
            <div className="hero-badge hero-badge--br">
              <div><b>120+</b><small>local businesses served</small></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROOF STRIP */}
      <div className="proof">
        <div className="wrap proof-inner">
          <span>Trusted by Ventura County</span>
          <div className="proof-stat"><b>120+</b><small>businesses supported</small></div>
          <div className="proof-sep" />
          <div className="proof-stat"><b>12 yrs</b><small>serving the coast</small></div>
          <div className="proof-sep" />
          <div className="proof-stat"><b>4.9★</b><small>average review</small></div>
          <div className="proof-sep" />
          <div className="proof-stat"><b>2 hrs</b><small>avg. response</small></div>
        </div>
      </div>

      {/* SERVICES PREVIEW */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section-head center">
            <p className="eyebrow">What we do</p>
            <h2 className="title">Everything your business needs to stay connected</h2>
            <p className="lead">One local team for setup, security and support — so you’re not juggling five different vendors and a stack of help-desk tickets.</p>
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
          <Reveal>
            <ImageSlot id="home-why" className="split-slot" placeholder="Drop a photo — on-site work, a happy client, or your shop" src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1000&q=80&auto=format&fit=crop" />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">Why local businesses choose us</p>
            <h2 className="title">A real local partner, not a faraway help desk</h2>
            <p className="lead">We live and work in Ventura County. When something breaks, you reach a neighbor who can drive over — not a call center reading from a script three time zones away.</p>
            <ul className="check-list">
              {whyPoints.map(([b, d]) => (
                <li key={b}><div><b>{b}</b><span className="d">{d}</span></div></li>
              ))}
            </ul>
            <div style={{ marginTop: 32 }}><Link className="btn" to="/about">More about our team <Arrow /></Link></div>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section-head center">
            <p className="eyebrow">The Anchor difference</p>
            <h2 className="title">Built around how small businesses actually run</h2>
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

      {/* TESTIMONIALS */}
      <section className="section mist">
        <div className="wrap">
          <Reveal className="section-head center">
            <p className="eyebrow">What our clients say</p>
            <h2 className="title">Trusted by the businesses down the street</h2>
          </Reveal>
          <div className="tcards" style={{ marginTop: 52 }}>
            {testimonials.map(({ av, name, role, q }, i) => (
              <Reveal as="figure" className="tcard" key={name} delay={i * 80}>
                <div className="stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} />)}
                </div>
                <blockquote>&ldquo;{q}&rdquo;</blockquote>
                <figcaption className="who"><span className="av">{av}</span><div><b>{name}</b><small>{role}</small></div></figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Let’s get your tech working for you."
        sub="Book a free, no-pressure consultation. We’ll learn your business, walk your space, and send a clear plan and quote — no obligation."
      />
    </>
  );
}
