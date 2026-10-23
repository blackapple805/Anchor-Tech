import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// On-device diagnostics: load the debug overlay only when ?debug=1 is present
// anywhere in the URL (search or hash, since the app uses HashRouter). The
// dynamic import keeps debug-panel.js in its own chunk that normal loads never
// fetch.
if (/[?&]debug=1\b/.test(window.location.href)) {
  import('./debug-panel.js');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);