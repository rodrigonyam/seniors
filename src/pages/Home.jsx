import React, { useEffect, useMemo, useState } from 'react';
import Modal from '../shared/Modal.jsx';

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
      <header>
        <nav className="main-nav">
          <div className="logo">
            <h1>🏠 Sunshine Group Home</h1>
          </div>
          <ul className="nav-menu">
            <li><a href="index.html" className="active">Home</a></li>
            <li><a href="activities.html">Activities</a></li>
            <li><a href="meals.html">Meals</a></li>
            <li><a href="news.html">News</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="emergency.html" className="emergency-btn">Emergency</a></li>
          </ul>
          <button className="menu-toggle" aria-label="Toggle menu">☰</button>
        </nav>
      </header>

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
              <button className="big-button" onClick={showWeather} title="Click to see today's weather information">
                <span className="icon">🌤️</span>
                Today's Weather
                <span className="button-hint">Click to view</span>
              </button>
              <button className="big-button" onClick={() => (window.location.href = 'activities.html')} title="Go to the activities page to see what's happening today">
                <span className="icon">🎯</span>
                Today's Activities
                <span className="button-hint">Click to go</span>
              </button>
            </div>
          </div>
        </section>

        <section className="dashboard">
          <div className="dashboard-grid">
            <div className="card">
              <h3>🍽️ Next Meal</h3>
              <div className="info-display">
                <p className="meal-time">{nextMeal.time}</p>
                <p className="meal-name">{nextMeal.name}</p>
              </div>
            </div>

            <div className="card">
              <h3>📅 Today's Date</h3>
              <div className="info-display">
                <p className="date-display">{dateDisplay}</p>
              </div>
            </div>

            <div className="card">
              <h3>🎪 Upcoming Activity</h3>
              <div className="info-display">
                <p className="activity-time">2:00 PM</p>
                <p className="activity-name">Bingo in the Main Hall</p>
              </div>
            </div>

            <div className="card">
              <h3>📢 Important Notice</h3>
              <div className="info-display">
                <p className="notice-text">Family visiting hours: 2-5 PM daily</p>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Support Section */}
        <section className="practical-support-section">
          <h2>🛠️ Daily Life Support</h2>
          <p className="support-intro">Get help with your daily routines, health monitoring, and staying connected!</p>

          <div className="support-categories">
            <div className="support-category daily-routines">
              <div className="category-header">
                <div className="category-icon">📋</div>
                <h3>Daily Routines</h3>
              </div>
              <div className="support-tools">
                <button className="support-btn">💊 Medication Reminder<div className="tool-hint">Never miss your medications</div></button>
                <button className="support-btn">🕐 Daily Schedule<div className="tool-hint">See your personal daily plan</div></button>
                <button className="support-btn">🍽️ Meal Planning<div className="tool-hint">Plan meals and dietary needs</div></button>
              </div>
            </div>

            <div className="support-category health-monitoring">
              <div className="category-header">
                <div className="category-icon">🏥</div>
                <h3>Health Support</h3>
              </div>
              <div className="support-tools">
                <button className="support-btn">📊 Health Tracker<div className="tool-hint">Monitor your daily wellness</div></button>
                <button className="support-btn">📅 Appointment Reminders<div className="tool-hint">Never miss doctor visits</div></button>
                <button className="support-btn">🩺 Symptom Logger<div className="tool-hint">Track how you're feeling</div></button>
              </div>
            </div>

            <div className="support-category communication">
              <div className="category-header">
                <div className="category-icon">📞</div>
                <h3>Communication Help</h3>
              </div>
              <div className="support-tools">
                <button className="support-btn">👨‍👩‍👧‍👦 Family Contacts<div className="tool-hint">Easy family communication</div></button>
                <button className="support-btn">🎤 Voice Messages<div className="tool-hint">Send and receive audio messages</div></button>
                <button className="support-btn">📹 Video Call Helper<div className="tool-hint">Simple video calls with family</div></button>
              </div>
            </div>

            <div className="support-category family-connection">
              <div className="category-header">
                <div className="category-icon">👨‍👩‍👧‍👦</div>
                <h3>Family Activities</h3>
              </div>
              <div className="support-tools">
                <button className="support-btn">📹 Video Calls<div className="tool-hint">Face-to-face calls with loved ones</div></button>
                <button className="support-btn">💬 Group Chat<div className="tool-hint">WhatsApp, Messenger & more</div></button>
                <button className="support-btn">📸 Photo Sharing<div className="tool-hint">Share special moments</div></button>
                <button className="support-btn">📞 Family Contacts<div className="tool-hint">Manage your family list</div></button>
              </div>
            </div>
          </div>
        </section>

        {/* Community Connection Section */}
        <section className="community-section">
          <h2>🤝 Connect with Your Neighbors</h2>
          <div className="community-features">
            <div className="feature-card social-card">
              <h3>🎉 Join Group Activities</h3>
              <p>Find friends to join activities with you!</p>
              <button className="big-button community-button">
                Find Activity Partners
                <div className="button-hint">Connect with others who share your interests</div>
              </button>
              <div className="activity-partners" id="activity-partners"></div>
            </div>

            <div className="feature-card buddy-card">
              <h3>👫 Buddy System</h3>
              <p>Get paired with a friendly neighbor for daily chats and activities</p>
              <button className="big-button community-button">
                Find My Buddy
                <div className="button-hint">Get connected with a companion</div>
              </button>
              <div className="current-buddy" id="current-buddy"></div>
            </div>

            <div className="feature-card social-card">
              <h3>💬 Daily Chat Corner</h3>
              <p>Share what's on your mind today with the community</p>
              <button className="big-button community-button">
                Join Today's Chat
                <div className="button-hint">Share thoughts and connect with neighbors</div>
              </button>
              <div className="chat-preview" id="chat-preview"></div>
            </div>
          </div>
        </section>

        <section className="community-board-section">
          <h2>📋 Community Message Board</h2>
          <div className="board-actions">
            <button className="big-button board-button">View Message Board<div className="button-hint">See messages from your neighbors</div></button>
            <button className="big-button board-button">Post a Message<div className="button-hint">Share something with the community</div></button>
          </div>
          <div className="recent-messages" id="recent-messages">
            <h3>Recent Messages:</h3>
            <div className="message-preview">
              <p><strong>Mary (Room 205):</strong> Looking for a bridge partner! 🃏</p>
              <p><strong>Robert (Room 118):</strong> Thank you for the birthday wishes! 🎂</p>
              <p><strong>Susan (Room 301):</strong> Anyone want to join me for afternoon tea? ☕</p>
            </div>
          </div>
        </section>

        <section className="home-special-activities">
          <h2>🌟 This Week's Special Adventures</h2>
          <p className="special-intro">Join these heartwarming weekly activities that bring our community together!</p>

          <div className="home-special-grid">
            <div className="home-special-card beach">
              <div className="special-icon">🏖️</div>
              <h3>Thursday Beach Day</h3>
              <p>Feel the ocean breeze and collect shells with friends</p>
              <div className="special-time">Every Thursday 10 AM</div>
              <button className="big-button special-join-btn">Join Beach Adventure<div className="button-hint">Transportation & snacks included!</div></button>
            </div>

            <div className="home-special-card donation">
              <div className="special-icon">💝</div>
              <h3>Monday Donation Day</h3>
              <p>Share unused items with families in need</p>
              <div className="special-time">Every Monday 2 PM</div>
              <button className="big-button special-join-btn">Help Others Give<div className="button-hint">Feel good about helping others!</div></button>
            </div>

            <div className="home-special-card pets">
              <div className="special-icon">🐾</div>
              <h3>Tuesday Pet Adventures</h3>
              <p>Visit adorable animals at local pet stores</p>
              <div className="special-time">Every Tuesday 1 PM</div>
              <button className="big-button special-join-btn">Meet Furry Friends<div className="button-hint">Therapy animals & gentle companions!</div></button>
            </div>
          </div>
        </section>

        <section className="quick-links">
          <h2>Quick Links</h2>
          <div className="links-grid">
            <a href="activities.html" className="link-card"><span className="link-icon">🎮</span><span className="link-text">Activities & Games</span></a>
            <a href="meals.html" className="link-card"><span className="link-icon">🍽️</span><span className="link-text">Meal Schedule</span></a>
            <a href="news.html" className="link-card"><span className="link-icon">📰</span><span className="link-text">News & Updates</span></a>
            <a href="contact.html" className="link-card"><span className="link-icon">📞</span><span className="link-text">Contact Staff</span></a>
          </div>
        </section>

        <section className="help-section">
          <div className="help-card">
            <h2>❓ Need Help Using This Website?</h2>
            <div className="help-grid">
              <div className="help-item"><div className="help-icon">👆</div><h3>How to Click</h3><p>Touch or click anywhere on the big colored buttons. They're designed to be easy to press!</p></div>
              <div className="help-item"><div className="help-icon">🔍</div><h3>Making Text Bigger</h3><p>Look for the A+ buttons in the corner of your screen to make text larger and easier to read.</p></div>
              <div className="help-item"><div className="help-icon">🚨</div><h3>Getting Help</h3><p>Press the red Emergency button anytime, or ask any staff member to help you use the website.</p></div>
              <div className="help-item"><div className="help-icon">🏠</div><h3>Going Back Home</h3><p>Click "Home" at the top of any page, or press the back button on your device.</p></div>
            </div>
            <div className="help-button-container">
              <button className="big-button" title="Get detailed help instructions">
                <span className="icon">📖</span>
                Show Me How to Use This
                <span className="button-hint">Step-by-step guide</span>
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
