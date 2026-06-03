import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { services, getService } from '../data/services.js';
import { Chevron, Check, Arrow } from '../components/icons.jsx';
import { Eyebrow } from '../components/SectionHead.jsx';

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = getService(slug);

  useEffect(() => {
    if (slug && !service) navigate('/services', { replace: true });
  }, [slug, service, navigate]);

  if (!service) return null;

  const idx = services.findIndex((s) => s.slug === slug);
  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="hero-figure" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
          <Reveal className="crumbs">
            <Link to="/">Home</Link><Chevron />
            <Link to="/services">Services</Link><Chevron />
            <span>{service.title}</span>
          </Reveal>
          <Reveal as="h1" delay={60}>{service.title}</Reveal>
          <Reveal as="p" delay={120}>{service.intro}</Reveal>
        </div>
      </section>

      {/* Included + why it matters */}
      <section className="section">
        <div className="wrap split split--top">
          <Reveal>
            <Eyebrow ix="01">What’s included</Eyebrow>
            <h2 className="title">Everything you get</h2>
            <ul className="svc-includes" style={{ marginTop: 26 }}>
              {service.includes.map((item) => (<li key={item}><span className="tick"><Check /></span><b>{item}</b></li>))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <Eyebrow ix="02">Why it matters</Eyebrow>
            <h2 className="title">What it means for you</h2>
            <ul className="check-list" style={{ marginTop: 26 }}>
              {service.outcomes.map(([b, d]) => (<li key={b}><div><b>{b}</b><span className="d">{d}</span></div></li>))}
            </ul>
            <div style={{ marginTop: 32 }}><Link className="btn" to="/contact">Get a free quote <Arrow /></Link></div>
          </Reveal>
        </div>
      </section>

      {/* Signs */}
      <section className="section mist">
        <div className="wrap">
          <Reveal className="head-split">
            <div className="section-head"><Eyebrow ix="03">Sound familiar?</Eyebrow><h2 className="title title--display">Signs it’s time to call us</h2></div>
            <div className="head-rail"><p className="rail-line">If any of these ring true, this is exactly the kind of thing we sort out — usually faster and for less than you’d expect.</p></div>
          </Reveal>
          <div className="signs-grid" style={{ marginTop: 48 }}>
            {service.signs.map((sign, i) => (
              <Reveal className="sign" key={sign} delay={i * 70}>
                <span className="sign-n">{String(i + 1).padStart(2, '0')}</span><p>{sign}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section">
        <div className="wrap split split--top">
          <Reveal>
            <Eyebrow ix="04">Questions</Eyebrow>
            <h2 className="title">Good to know</h2>
            <p className="lead" style={{ marginTop: 18 }}>Straight answers to what business owners ask us most about {service.title.toLowerCase()}. Have another? Just ask — no jargon, no pressure.</p>
            <div style={{ marginTop: 30 }}><Link className="btn btn--ghost" to="/contact">Ask us anything <Arrow /></Link></div>
          </Reveal>
          <Reveal delay={100}>
            <div className="faq-list">
              {service.faqs.map(([q, a]) => (
                <details className="faq" key={q}>
                  <summary>{q}<span className="faq-mark" aria-hidden="true"><Chevron /></span></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      <section className="section mist">
        <div className="wrap">
          <Reveal className="head-split">
            <div className="section-head"><Eyebrow ix="05">Explore more</Eyebrow><h2 className="title">Other services</h2></div>
            <div className="head-rail"><Link className="textlink" to="/services">All eight services <Arrow /></Link></div>
          </Reveal>
          <div className="cards" style={{ marginTop: 52 }}>
            {others.map((s, i) => (
              <Reveal as={Link} to={`/services/${s.slug}`} className="card card--link" key={s.slug} delay={i * 60}>
                <span className="num">{String(services.findIndex((x) => x.slug === s.slug) + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3><p>{s.short}</p>
                <span className="card-go">Learn more <Arrow /></span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand ix="06" eyebrow="Ready when you are" heading={`Ready to sort out your ${service.title.toLowerCase()}?`} sub="Book a free, no-pressure consultation. We’ll learn your business, walk your space, and send a clear plan and quote — no obligation." />
    </>
  );
}
