import React, { useEffect, useMemo, useState } from 'react';
import Modal from '../shared/Modal.jsx';
import NavBar from '../shared/NavBar.jsx';

function useDateInfo() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const dateDisplay = useMemo(() => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('en-US', options);
  }, [now]);

  const timeDisplay = useMemo(() => {
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }, [now]);

  const nextMeal = useMemo(() => {
    const meals = [
      { time: '7:30 AM', name: 'Breakfast', hour: 7 },
      { time: '12:00 PM', name: 'Lunch', hour: 12 },
      { time: '5:30 PM', name: 'Dinner', hour: 17 },
      { time: '8:00 PM', name: 'Evening Snack', hour: 20 }
    ];
    const hour = now.getHours();
    const match = meals.find((m) => hour < m.hour);
    if (match) return match;
    return { ...meals[0], name: 'Breakfast (Tomorrow)' };
  }, [now]);

  return { dateDisplay, timeDisplay, nextMeal };
}

function Home() {
  const { dateDisplay, timeDisplay, nextMeal } = useDateInfo();
  const [modal, setModal] = useState(null);

  const showTime = () => setModal({ title: 'Current Time', body: (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#2c3e50', margin: '20px 0' }}>{timeDisplay}</div>
      <div style={{ fontSize: '24px', color: '#7f8c8d' }}>{dateDisplay}</div>
    </div>
  ) });

  const showWeather = () => setModal({ title: "Today's Weather", body: (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '64px', margin: '20px 0' }}>☀️</div>
      <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#e74c3c', margin: '10px 0' }}>72°F</div>
      <div style={{ fontSize: '24px', color: '#2c3e50', margin: '10px 0' }}>Sunny</div>
      <div style={{ fontSize: '20px', color: '#7f8c8d' }}>Humidity: 45%</div>
    </div>
  ) });

  const closeModal = () => setModal(null);

  return (
    <>
      <NavBar activePage="Home" />

      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Welcome to Your Home</h2>
            <p className="hero-text">Stay connected with activities, meals, and important information</p>
            <div className="quick-actions">
              <button className="big-button" onClick={showTime} title="Click to see the current time in large text">
                <span className="icon">🕒</span>
                Current Time
                <span className="button-hint">Click to view</span>
              </button>
              <button className="big-button" onClick={() => document.getElementById('summary-strip')?.scrollIntoView({ behavior: 'smooth' })} title="Jump to today's summary">
                <span className="icon">📅</span>
                Today's Summary
                <span className="button-hint">See meals, date, notice</span>
              </button>
            </div>
          </div>
        </section>

        <section className="dashboard minimal" id="summary-strip">
          <div className="dashboard-grid three-up">
            <div className="card">
              <h3>🍽️ Next Meal</h3>
              <div className="info-display">
                <p className="meal-time">{nextMeal.time}</p>
                <p className="meal-name">{nextMeal.name}</p>
              </div>
            </div>

            <div className="card">
              <h3>📅 Today</h3>
              <div className="info-display">
                <p className="date-display">{dateDisplay}</p>
              </div>
            </div>

            <div className="card">
              <h3>📢 Notice</h3>
              <div className="info-display">
                <p className="notice-text">Visiting hours: 2-5 PM daily</p>
              </div>
            </div>
          </div>
        </section>
        <section className="essentials">
          <h2>Stay Connected</h2>
          <div className="simple-grid">
            <div className="simple-card">
              <h3>💬 Family Messages</h3>
              <p>Open WhatsApp, Messenger, or text to reach loved ones.</p>
              <button className="big-button" onClick={() => setModal({ title: 'Messaging', body: <p>Use your preferred messaging app to reach family.</p> })} title="Open messaging apps">
                <span className="icon">📱</span>
                Open Messaging
              </button>
            </div>
            <div className="simple-card">
              <h3>📞 Call Staff</h3>
              <p>Need help right now? Call the front desk and we’ll assist.</p>
              <button className="big-button" onClick={() => (window.location.href = 'tel:911')} title="Call staff">
                <span className="icon">☎️</span>
                Call for Help
              </button>
            </div>
            <div className="simple-card">
              <h3>❓ Need Assistance</h3>
              <p>Short guide on using the site and making text larger.</p>
              <button className="big-button" onClick={showTime} title="View quick help">
                <span className="icon">📖</span>
                Quick Help
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <p>© 2024 Sunshine Group Home. Caring for our community.</p>
          <div className="emergency-info">
            <p><strong>Emergency:</strong> Press the red Emergency button above or call extension 911</p>
          </div>
        </div>
      </footer>

      {modal && <Modal title={modal.title} onClose={closeModal}>{modal.body}</Modal>}
    </>
  );
}

export default Home;
