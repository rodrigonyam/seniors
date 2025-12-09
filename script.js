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
    addEmergencyHelpButton();
    addButtonFeedback();
    addSimplifiedNavigation();
    announcePageLoad();
    showWelcomeMessage();
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
        padding: 50px;
        border-radius: 25px;
        max-width: 95%;
        max-height: 95%;
        overflow: auto;
        position: relative;
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
        border: 4px solid #3498db;
        min-width: 400px;
    `;
    
    modalContent.innerHTML = `
        <button onclick="closeModal()" style="
            position: absolute;
            top: 20px;
            right: 25px;
            background: #e74c3c;
            color: white;
            border: 3px solid #c0392b;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            font-size: 32px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
        " title="Close this window">×</button>
        <h2 style="font-size: 32px; margin-bottom: 30px; color: #2c3e50; text-align: center;">${title}</h2>
        ${content}
        <div style="text-align: center; margin-top: 30px;">
            <button onclick="closeModal()" style="
                background: #3498db;
                color: white;
                border: 3px solid #2980b9;
                padding: 20px 40px;
                border-radius: 15px;
                font-size: 24px;
                font-weight: 700;
                cursor: pointer;
                min-width: 200px;
                box-shadow: 0 6px 20px rgba(52, 152, 219, 0.3);
            ">✓ Close Window</button>
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

// Show welcome message for first-time users
function showWelcomeMessage() {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (!hasSeenWelcome && window.location.pathname.endsWith('index.html')) {
        setTimeout(() => {
            showModal('Welcome to Your Website! 👋', `
                <div style="text-align: center;">
                    <div style="font-size: 48px; margin: 20px 0;">🏠</div>
                    <p style="font-size: 24px; margin: 20px 0; color: #2c3e50;">
                        This website is designed to be easy to use!
                    </p>
                    <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 20px 0;">
                        <p style="font-size: 20px; color: #2c3e50; margin-bottom: 20px;">
                            <strong>How to use this website:</strong>
                        </p>
                        <div style="text-align: left; font-size: 18px; color: #2c3e50; line-height: 1.8;">
                            • <strong>Click anywhere on big buttons</strong> - they're designed to be easy to press<br>
                            • <strong>Use the menu at the top</strong> to go to different pages<br>
                            • <strong>Press the red Emergency button</strong> anytime you need help<br>
                            • <strong>Make text larger</strong> using the A+ buttons in the corner<br>
                            • <strong>Ask any staff member</strong> if you need assistance
                        </div>
                    </div>
                    <p style="font-size: 18px; color: #7f8c8d;">
                        Don't worry if you make a mistake - you can always start over!
                    </p>
                </div>
            `);
            localStorage.setItem('hasSeenWelcome', 'true');
        }, 2000);
    }
}

// Add emergency help button to all pages
function addEmergencyHelpButton() {
    const emergencyBtn = document.createElement('button');
    emergencyBtn.className = 'emergency-help-button';
    emergencyBtn.innerHTML = '🚨';
    emergencyBtn.title = 'Emergency Help - Click for immediate assistance';
    emergencyBtn.onclick = handleEmergency;
    document.body.appendChild(emergencyBtn);
}

// Add button feedback for better user experience
function addButtonFeedback() {
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
            
            // Add loading state
            button.classList.add('button-loading');
            
            // Play click sound (if available)
            playClickSound();
            
            // Remove loading state after a short delay
            setTimeout(() => {
                button.classList.remove('button-loading');
                button.classList.add('success-feedback');
                
                setTimeout(() => {
                    button.classList.remove('success-feedback');
                }, 600);
            }, 300);
        }
    });
}

// Add simplified navigation helpers
function addSimplifiedNavigation() {
    // Add breadcrumb-style navigation help
    const currentPage = getCurrentPageName();
    if (currentPage !== 'Home') {
        const breadcrumb = document.createElement('div');
        breadcrumb.className = 'simplified-nav-help';
        breadcrumb.innerHTML = `
            📍 You are viewing: <strong>${currentPage}</strong> page 
            | <a href="index.html">🏠 Go back to Home</a>
        `;
        
        const main = document.querySelector('main');
        if (main) {
            main.insertBefore(breadcrumb, main.firstChild);
        }
    }
    
    // Add page instructions for each page
    addPageSpecificInstructions(currentPage);
}

// Add helpful instructions specific to each page
function addPageSpecificInstructions(pageName) {
    const instructions = {
        'Activities': 'Click on activity cards to learn more, or use the buttons at the bottom to join activities.',
        'Meals': 'View today\'s menu above, or scroll down to see the weekly menu and make special requests.',
        'News': 'Read the latest announcements and upcoming events. New items are added regularly.',
        'Contact': 'Find staff phone numbers and contact information. Use the big buttons to call or get directions.',
        'Emergency': 'Important emergency contacts and procedures. The red buttons will get you immediate help.'
    };
    
    if (instructions[pageName]) {
        const instructionBox = document.createElement('div');
        instructionBox.style.cssText = `
            background: #fff8e1;
            border: 3px solid #ffb74d;
            padding: 20px;
            border-radius: 15px;
            margin: 20px auto;
            max-width: 1200px;
            text-align: center;
            font-size: 20px;
            color: #e65100;
            font-weight: 600;
        `;
        instructionBox.innerHTML = `💡 <strong>Page Tips:</strong> ${instructions[pageName]}`;
        
        const main = document.querySelector('main');
        const firstSection = main.querySelector('section');
        if (firstSection && firstSection.nextSibling) {
            main.insertBefore(instructionBox, firstSection.nextSibling);
        }
    }
}

// Get current page name for navigation help
function getCurrentPageName() {
    const path = window.location.pathname;
    if (path.includes('activities')) return 'Activities';
    if (path.includes('meals')) return 'Meals';
    if (path.includes('news')) return 'News';
    if (path.includes('contact')) return 'Contact';
    if (path.includes('emergency')) return 'Emergency';
    return 'Home';
}

// Play click sound for feedback (silent fallback)
function playClickSound() {
    try {
        // Create a subtle audio feedback
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Silently fail if audio is not supported
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

// Show comprehensive help guide
function showFullHelp() {
    showModal('📖 How to Use This Website', `
        <div style="text-align: left; max-width: 600px;">
            <div style="background: #e3f2fd; padding: 20px; border-radius: 15px; margin: 20px 0; text-align: center;">
                <h3 style="color: #1976d2; font-size: 24px; margin-bottom: 10px;">Don't Worry - It's Easy!</h3>
                <p style="font-size: 18px; color: #2c3e50;">This website is designed to be simple and helpful for you.</p>
            </div>
            
            <div style="margin: 25px 0;">
                <h4 style="color: #2c3e50; font-size: 22px; margin-bottom: 15px;">🖱️ Using Your Mouse or Finger:</h4>
                <p style="font-size: 18px; line-height: 1.8; color: #2c3e50;">
                    • <strong>Big buttons are easy to click</strong> - you can click anywhere on them<br>
                    • <strong>Don't worry about precision</strong> - the buttons are large on purpose<br>
                    • <strong>One click is enough</strong> - you don't need to double-click<br>
                    • <strong>If nothing happens</strong> - try clicking again, it's okay!
                </p>
            </div>
            
            <div style="margin: 25px 0;">
                <h4 style="color: #2c3e50; font-size: 22px; margin-bottom: 15px;">📱 Making Things Easier to See:</h4>
                <p style="font-size: 18px; line-height: 1.8; color: #2c3e50;">
                    • <strong>Look for A+ buttons</strong> in the corner to make text bigger<br>
                    • <strong>Try the contrast button</strong> (🌓) if text is hard to read<br>
                    • <strong>Ask staff to adjust your screen</strong> if needed
                </p>
            </div>
            
            <div style="margin: 25px 0;">
                <h4 style="color: #2c3e50; font-size: 22px; margin-bottom: 15px;">🧭 Moving Around the Website:</h4>
                <p style="font-size: 18px; line-height: 1.8; color: #2c3e50;">
                    • <strong>Use the menu at the top</strong> - Home, Activities, Meals, etc.<br>
                    • <strong>Click "Home" anytime</strong> to go back to the main page<br>
                    • <strong>Look for the back arrow</strong> (←) to go to previous pages<br>
                    • <strong>Each page tells you where you are</strong> at the top
                </p>
            </div>
            
            <div style="margin: 25px 0;">
                <h4 style="color: #e74c3c; font-size: 22px; margin-bottom: 15px;">🚨 Getting Help:</h4>
                <p style="font-size: 18px; line-height: 1.8; color: #2c3e50;">
                    • <strong>Red Emergency button</strong> - use for urgent help<br>
                    • <strong>Round red button</strong> in corner - quick emergency access<br>
                    • <strong>Ask any staff member</strong> - they're happy to help you<br>
                    • <strong>It's okay to make mistakes</strong> - nothing will break!
                </p>
            </div>
            
            <div style="background: #f0f8ff; padding: 20px; border-radius: 15px; margin: 20px 0; text-align: center;">
                <p style="font-size: 20px; color: #2c3e50; font-weight: 600;">
                    Remember: There's no wrong way to use this website!<br>
                    Take your time and explore. Staff is always here to help.
                </p>
            </div>
        </div>
    `);
}

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