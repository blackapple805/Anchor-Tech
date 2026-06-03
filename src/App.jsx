import { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

/** Reset scroll to top whenever the route changes (SPA navigation otherwise keeps position). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <section className="page-hero">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1>That page wandered off.</h1>
        <p>The page you’re after doesn’t exist or has moved. Let’s get you back on track.</p>
        <div style={{ marginTop: 30 }}>
          <Link className="btn" to="/">Back to home</Link>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
