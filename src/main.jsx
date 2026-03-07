import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/Home.jsx';
import '../styles.css';

// Service worker registration (keeps existing offline flow)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.error('Service worker registration failed', err);
    });
  });
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
