import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './shared/NavBar.jsx';

ReactDOM.createRoot(document.getElementById('nav-root')).render(
  <React.StrictMode>
    <NavBar activePage="Emergency" />
  </React.StrictMode>
);
