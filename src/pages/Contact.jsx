import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { Eyebrow } from '../components/SectionHead.jsx';
import { Chevron } from '../components/icons.jsx';
import { AD } from '../data/services.js';



/* ---------------- Contact ---------------- */
const serviceOptions = ['Network Setup', 'Wi-Fi Installation', 'Hardware Purchasing Advice', 'Security Cameras', 'POS Systems', 'Data Backup & Recovery', 'Cybersecurity & Protection', 'Ongoing Tech Support', 'Something else'];

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [service, setService] = useState('');
  const formRef = useRef(null);
  function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setSending(true);
    const top = form.getBoundingClientRect().top + window.scrollY - 120;
    setTimeout(() => { setSending(false); setSent(true); window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' }); }, 900);
  }
  if (sent) {
    return (
      <div className="form-card">
        <div className="form-success">
          <h3>Thanks — message sent!</h3>
          <p>We’ve got your request and will be in touch within one business day. Need us sooner? Call <a href={`tel:${AD.PHONE}`} style={{ color: 'var(--accent)', fontWeight: 600 }}>{AD.PHONE_DISPLAY}</a>.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="form-card">
      <Eyebrow ix="01">Free consultation</Eyebrow>
      <h2 className="title" style={{ fontSize: 28 }}>Request your free consultation</h2>
      <p style={{ color: 'var(--muted)', margin: '10px 0 26px', fontSize: '15.5px' }}>
        Fill out the form and we’ll be in touch. Prefer to talk now? Call <a href={`tel:${AD.PHONE}`} style={{ color: 'var(--accent)', fontWeight: 600 }}>{AD.PHONE_DISPLAY}</a>.
      </p>
      <form ref={formRef} noValidate onSubmit={handleSubmit}>
        <div className="field-row">
          <div className="field-float"><input type="text" id="name" name="name" placeholder=" " required autoComplete="name" /><label htmlFor="name">Name</label></div>
          <div className="field-float"><input type="tel" id="phone" name="phone" placeholder=" " required autoComplete="tel" /><label htmlFor="phone">Phone</label></div>
        </div>
        <div className="field-float"><input type="email" id="email" name="email" placeholder=" " required autoComplete="email" /><label htmlFor="email">Email</label></div>
        <div className="field-float field-select">
          <select id="service" name="service" value={service} onChange={(e) => setService(e.target.value)} className={service ? 'filled' : ''}>
            <option value="" disabled hidden></option>
            {serviceOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
          <label htmlFor="service">What can we help with? <span className="opt">(optional)</span></label>
        </div>
        <div className="field-float"><textarea id="message" name="message" placeholder=" " required rows={4} /><label htmlFor="message">A little about your business</label></div>
        <button type="submit" className={`btn btn--lg btn--block ${sending ? 'is-loading' : ''}`} disabled={sending}>{sending ? 'Sending…' : 'Send my request'}</button>
        <p className="form-note">We’ll never share your details. We typically reply within one business day.</p>
      </form>
    </div>
  );
}

function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="hero-figure" aria-hidden="true">Hi</span>
          <Reveal className="crumbs"><Link to="/">Home</Link><Chevron /><span>Contact</span></Reveal>
          <Reveal as="h1" delay={60}>Let’s talk about your tech.</Reveal>
          <Reveal as="p" delay={120}>Tell us what you need and we’ll get back to you within one business day — usually a lot sooner. Free consultations, honest advice, no pressure.</Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap contact-grid">
          <Reveal><ContactForm /></Reveal>
          <Reveal delay={100}>
            <div className="info-card">
              <Eyebrow ix="02">Direct lines</Eyebrow>
              <h3>Get in touch directly</h3>
              <p className="sub">We’re a quick call or email away.</p>
              <ul className="info-list">
                <li><div><div className="lbl">Call us</div><a href={`tel:${AD.PHONE}`}>{AD.PHONE_DISPLAY}</a></div></li>
                <li><div><div className="lbl">Email us</div><a href={`mailto:${AD.EMAIL}`}>{AD.EMAIL}</a></div></li>
                <li><div><div className="lbl">Service area</div><span className="val">Ventura County, CA<small>Ventura · Oxnard · Camarillo · Thousand Oaks · Ojai · Santa Barbara &amp; nearby</small></span></div></li>
              </ul>
              <div className="hours">
                <div className="hours-lbl">Hours</div>
                <div className="hours-row"><span>Monday – Friday</span><b>8:00 AM – 6:00 PM</b></div>
                <div className="hours-row"><span>Saturday</span><b>9:00 AM – 2:00 PM</b></div>
                <div className="hours-row"><span>Sunday</span><b>Closed</b></div>
                <div className="hours-row emph"><span>Emergency support</span><b>24/7 for clients</b></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
export default Contact;