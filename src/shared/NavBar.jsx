import React, { useState } from 'react';

const LINKS = [
  { href: 'index.html', label: 'Home' },
  { href: 'activities.html', label: 'Activities' },
  { href: 'meals.html', label: 'Meals' },
  { href: 'news.html', label: 'News' },
  { href: 'contact.html', label: 'Contact' },
];

export default function NavBar({ activePage }) {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav className="main-nav">
        <div className="logo">
          <a href="index.html" style={{ color: 'white', textDecoration: 'none' }}>
            <h1>🏠 Sunshine Group Home</h1>
          </a>
        </div>

        <ul className={`nav-menu${open ? ' active' : ''}`}>
          {LINKS.map(({ href, label }) => (
            <li key={label}>
              <a
                href={href}
                className={activePage === label ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="emergency.html" className="emergency-btn" onClick={() => setOpen(false)}>
              🚨 Emergency
            </a>
          </li>
        </ul>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>
    </header>
  );
}
