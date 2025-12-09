// Senior-Friendly Website JavaScript
// Designed with accessibility and ease of use in mind

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute
    updateNextMeal();
    createAccessibilityControls();
    announcePageLoad();
}

// Date and Time Functions
function updateDateTime() {
    const now = new Date();
    
    // Update current date display
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const dateDisplay = dateElement.querySelector('.date-display');
        if (dateDisplay) {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            dateDisplay.textContent = now.toLocaleDateString('en-US', options);
        }
    }
}

function showTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    
    // Create and show modal with large time display
    showModal('Current Time', `
        <div style="text-align: center;">
            <div style="font-size: 48px; font-weight: bold; color: #2c3e50; margin: 20px 0;">
                ${timeString}
            </div>
            <div style="font-size: 24px; color: #7f8c8d;">
                ${new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                })}
            </div>
        </div>
    `);
    
    // Announce time for screen readers
    announceToScreenReader(`The current time is ${timeString}`);
}

// Weather Function (Mock data for demo)
function showWeather() {
    // In a real implementation, you'd fetch from a weather API
    const mockWeather = {
        temperature: 72,
        condition: 'Sunny',
        humidity: 45,
        icon: '☀️'
    };
    
    showModal('Today\'s Weather', `
        <div style="text-align: center;">
            <div style="font-size: 64px; margin: 20px 0;">
                ${mockWeather.icon}
            </div>
            <div style="font-size: 36px; font-weight: bold; color: #e74c3c; margin: 10px 0;">
                ${mockWeather.temperature}°F
            </div>
            <div style="font-size: 24px; color: #2c3e50; margin: 10px 0;">
                ${mockWeather.condition}
            </div>
            <div style="font-size: 20px; color: #7f8c8d;">
                Humidity: ${mockWeather.humidity}%
            </div>
        </div>
    `);
    
    announceToScreenReader(`Today's weather: ${mockWeather.temperature} degrees and ${mockWeather.condition}`);
}

// Meal Schedule Functions
function updateNextMeal() {
    const now = new Date();
    const currentHour = now.getHours();
    
    const meals = [
        { time: '7:30 AM', name: 'Breakfast', hour: 7 },
        { time: '12:00 PM', name: 'Lunch', hour: 12 },
        { time: '5:30 PM', name: 'Dinner', hour: 17 },
        { time: '8:00 PM', name: 'Evening Snack', hour: 20 }
    ];
    
    let nextMeal = meals[0]; // Default to breakfast
    
    for (let meal of meals) {
        if (currentHour < meal.hour) {
            nextMeal = meal;
            break;
        }
    }
    
    // If it's after the last meal, next meal is tomorrow's breakfast
    if (currentHour >= meals[meals.length - 1].hour) {
        nextMeal = { ...meals[0], name: 'Breakfast (Tomorrow)' };
    }
    
    const mealElement = document.getElementById('next-meal');
    if (mealElement) {
        const timeElement = mealElement.querySelector('.meal-time');
        const nameElement = mealElement.querySelector('.meal-name');
        
        if (timeElement) timeElement.textContent = nextMeal.time;
        if (nameElement) nameElement.textContent = nextMeal.name;
    }
}

// Navigation Functions
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navMenu && menuToggle) {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        
        // Update button text and announce to screen readers
        menuToggle.textContent = isOpen ? '✕' : '☰';
        announceToScreenReader(isOpen ? 'Menu opened' : 'Menu closed');
    }
}

// Modal Functions
function showModal(title, content) {
    // Remove existing modal
    const existingModal = document.getElementById('info-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'info-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        max-width: 90%;
        max-height: 90%;
        overflow: auto;
        position: relative;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;
    
    modalContent.innerHTML = `
        <button onclick="closeModal()" style="
            position: absolute;
            top: 15px;
            right: 20px;
            background: #e74c3c;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        ">×</button>
        <h2 style="font-size: 32px; margin-bottom: 30px; color: #2c3e50; text-align: center;">${title}</h2>
        ${content}
        <div style="text-align: center; margin-top: 30px;">
            <button onclick="closeModal()" style="
                background: #3498db;
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 10px;
                font-size: 20px;
                font-weight: 600;
                cursor: pointer;
            ">Close</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Focus on close button for accessibility
    const closeBtn = modalContent.querySelector('button');
    if (closeBtn) {
        closeBtn.focus();
    }
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.remove();
        announceToScreenReader('Modal closed');
    }
}

// Accessibility Functions
function createAccessibilityControls() {
    const controls = document.createElement('div');
    controls.className = 'accessibility-controls';
    
    controls.innerHTML = `
        <button class="text-size-btn" onclick="adjustTextSize('normal')" title="Normal text size">A</button>
        <button class="text-size-btn" onclick="adjustTextSize('large')" title="Large text size">A+</button>
        <button class="text-size-btn" onclick="adjustTextSize('extra-large')" title="Extra large text size">A++</button>
        <button class="text-size-btn" onclick="toggleHighContrast()" title="Toggle high contrast">🌓</button>
    `;
    
    document.body.appendChild(controls);
}

function adjustTextSize(size) {
    const body = document.body;
    
    // Remove existing size classes
    body.classList.remove('large-text', 'extra-large-text');
    
    // Add new size class
    switch(size) {
        case 'large':
            body.classList.add('large-text');
            announceToScreenReader('Text size increased to large');
            break;
        case 'extra-large':
            body.classList.add('extra-large-text');
            announceToScreenReader('Text size increased to extra large');
            break;
        default:
            announceToScreenReader('Text size reset to normal');
    }
    
    // Save preference
    localStorage.setItem('textSize', size);
}

function toggleHighContrast() {
    const body = document.body;
    const isHighContrast = body.style.filter === 'contrast(150%) brightness(120%)';
    
    if (isHighContrast) {
        body.style.filter = '';
        announceToScreenReader('High contrast mode disabled');
        localStorage.setItem('highContrast', 'false');
    } else {
        body.style.filter = 'contrast(150%) brightness(120%)';
        announceToScreenReader('High contrast mode enabled');
        localStorage.setItem('highContrast', 'true');
    }
}

// Screen Reader Functions
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

function announcePageLoad() {
    const pageTitle = document.title;
    announceToScreenReader(`Page loaded: ${pageTitle}`);
}

// Emergency Functions
function handleEmergency() {
    // Create emergency modal
    showModal('🚨 EMERGENCY ALERT', `
        <div style="text-align: center; color: #e74c3c;">
            <div style="font-size: 48px; margin: 20px 0;">🚨</div>
            <div style="font-size: 24px; font-weight: bold; margin: 20px 0;">
                Emergency services have been contacted
            </div>
            <div style="font-size: 20px; margin: 20px 0;">
                Help is on the way
            </div>
            <div style="font-size: 18px; color: #2c3e50;">
                Stay calm and wait for assistance
            </div>
        </div>
    `);
    
    // In a real implementation, this would contact emergency services
    announceToScreenReader('Emergency alert activated. Help has been called.');
    
    // You could add actual emergency contact functionality here
    console.log('EMERGENCY: Alert sent to staff');
}

// Load user preferences
function loadUserPreferences() {
    const textSize = localStorage.getItem('textSize');
    const highContrast = localStorage.getItem('highContrast');
    
    if (textSize) {
        adjustTextSize(textSize);
    }
    
    if (highContrast === 'true') {
        toggleHighContrast();
    }
}

// Initialize preferences when page loads
document.addEventListener('DOMContentLoaded', loadUserPreferences);

// Utility Functions
function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Add event listeners for emergency button in navigation
document.addEventListener('DOMContentLoaded', function() {
    const emergencyLink = document.querySelector('.emergency-btn');
    if (emergencyLink) {
        emergencyLink.addEventListener('click', function(e) {
            e.preventDefault();
            handleEmergency();
        });
    }
});

// Voice command support (basic implementation)
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = function(event) {
        const command = event.results[0][0].transcript.toLowerCase();
        
        if (command.includes('time')) {
            showTime();
        } else if (command.includes('weather')) {
            showWeather();
        } else if (command.includes('emergency')) {
            handleEmergency();
        }
    };
    
    // Add voice control button
    document.addEventListener('DOMContentLoaded', function() {
        const voiceBtn = document.createElement('button');
        voiceBtn.innerHTML = '🎤';
        voiceBtn.title = 'Voice Commands';
        voiceBtn.className = 'text-size-btn';
        voiceBtn.style.fontSize = '20px';
        voiceBtn.onclick = () => recognition.start();
        
        const controls = document.querySelector('.accessibility-controls');
        if (controls) {
            controls.appendChild(voiceBtn);
        }
    });
}