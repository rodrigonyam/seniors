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

// Community Building Functions
function findActivityBuddy() {
    const partnersDiv = document.getElementById('activity-partners');
    if (!partnersDiv) return;
    
    // Simulate finding activity partners
    const activities = [
        { name: 'Bingo', partners: ['Mary from Room 205', 'John from Room 118'] },
        { name: 'Gardening', partners: ['Susan from Room 301', 'Robert from Room 220'] },
        { name: 'Book Club', partners: ['Eleanor from Room 150', 'William from Room 103'] },
        { name: 'Arts & Crafts', partners: ['Dorothy from Room 189', 'Frank from Room 207'] }
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    
    partnersDiv.innerHTML = `
        <div class="partner-results">
            <h4>🎯 ${randomActivity.name} Partners Found!</h4>
            <ul class="partner-list">
                ${randomActivity.partners.map(partner => `
                    <li class="partner-item">
                        <span class="partner-name">${partner}</span>
                        <button class="connect-button" onclick="connectWithPartner('${partner}')">Say Hello!</button>
                    </li>
                `).join('')}
            </ul>
            <p class="partner-tip">💡 Tip: Staff can help you meet these neighbors in person!</p>
        </div>
    `;
    
    // Add success feedback
    showSuccessFeedback('Activity partners found!');
}

function showBuddySystem() {
    const buddyDiv = document.getElementById('current-buddy');
    if (!buddyDiv) return;
    
    // Simulate buddy matching
    const buddies = [
        { name: 'Margaret', room: '205', interests: 'Reading, Tea', activity: 'Daily 3 PM tea time' },
        { name: 'Harold', room: '118', interests: 'Chess, News', activity: 'Morning newspaper chat' },
        { name: 'Rose', room: '301', interests: 'Gardening, Cooking', activity: 'Afternoon garden walks' },
        { name: 'Albert', room: '220', interests: 'Music, Cards', activity: 'Evening card games' }
    ];
    
    const buddy = buddies[Math.floor(Math.random() * buddies.length)];
    
    buddyDiv.innerHTML = `
        <div class="buddy-match">
            <h4>👫 Your Buddy Match: ${buddy.name}</h4>
            <div class="buddy-details">
                <p><strong>Room:</strong> ${buddy.room}</p>
                <p><strong>Shared Interests:</strong> ${buddy.interests}</p>
                <p><strong>Regular Activity:</strong> ${buddy.activity}</p>
            </div>
            <div class="buddy-actions">
                <button class="connect-button" onclick="arrangeMeeting('${buddy.name}')">Arrange Meeting</button>
                <button class="connect-button" onclick="sendBuddyMessage('${buddy.name}')">Send Message</button>
            </div>
            <p class="buddy-tip">💝 Your buddy is looking forward to meeting you!</p>
        </div>
    `;
    
    showSuccessFeedback('Buddy matched successfully!');
}

function openDailyChat() {
    const chatDiv = document.getElementById('chat-preview');
    if (!chatDiv) return;
    
    // Simulate daily chat topics
    const chatTopics = [
        { topic: 'Weather & Gardens', participants: 8, recent: 'Susan: The roses are blooming beautifully!' },
        { topic: 'Family Stories', participants: 12, recent: 'Robert: My grandson just graduated!' },
        { topic: 'Recipe Sharing', participants: 6, recent: 'Mary: Anyone want my apple pie recipe?' },
        { topic: 'Memory Lane', participants: 15, recent: 'Eleanor: Remember when we had that dance?' }
    ];
    
    const currentChat = chatTopics[Math.floor(Math.random() * chatTopics.length)];
    
    chatDiv.innerHTML = `
        <div class="chat-room">
            <h4>💬 Today's Topic: ${currentChat.topic}</h4>
            <div class="chat-info">
                <p><strong>Active Participants:</strong> ${currentChat.participants} neighbors</p>
                <p class="recent-message"><strong>Recent:</strong> ${currentChat.recent}</p>
            </div>
            <div class="chat-actions">
                <button class="connect-button" onclick="joinChat('${currentChat.topic}')">Join Conversation</button>
                <button class="connect-button" onclick="startNewTopic()">Start New Topic</button>
            </div>
            <p class="chat-tip">🌟 Share your thoughts - everyone loves to hear from you!</p>
        </div>
    `;
    
    showSuccessFeedback('Chat room opened!');
}

function showCommunityBoard() {
    // Create modal for community board
    const modal = document.createElement('div');
    modal.className = 'community-modal';
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
    modalContent.className = 'modal-content community-board';
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 25px;
        max-width: 90%;
        max-height: 90%;
        overflow: auto;
        position: relative;
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
        border: 4px solid #4caf50;
    `;
    
    modalContent.innerHTML = `
        <span class="close-modal" onclick="this.parentElement.parentElement.remove()" style="
            position: absolute;
            top: 15px;
            right: 20px;
            background: #e74c3c;
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        ">&times;</span>
        <h2 style="color: #4caf50; font-size: 32px; margin-bottom: 30px; text-align: center;">📋 Community Message Board</h2>
        <div class="board-messages">
            <div class="message-item" style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 15px 0; border-left: 5px solid #4caf50;">
                <div class="message-header" style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #2c3e50;">
                    Mary (Room 205) - 2 hours ago
                </div>
                <div class="message-content" style="font-size: 20px; margin: 15px 0; color: #2c3e50;">
                    Looking for a bridge partner! I play every Tuesday and Thursday at 2 PM. 🃏
                </div>
                <button class="reply-button" onclick="replyToMessage('Mary')" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; font-size: 16px;">Reply</button>
            </div>
            
            <div class="message-item" style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 15px 0; border-left: 5px solid #4caf50;">
                <div class="message-header" style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #2c3e50;">
                    Robert (Room 118) - 4 hours ago
                </div>
                <div class="message-content" style="font-size: 20px; margin: 15px 0; color: #2c3e50;">
                    Thank you everyone for the wonderful birthday wishes! The cake was delicious! 🎂
                </div>
                <button class="reply-button" onclick="replyToMessage('Robert')" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; font-size: 16px;">Reply</button>
            </div>
            
            <div class="message-item" style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 15px 0; border-left: 5px solid #4caf50;">
                <div class="message-header" style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #2c3e50;">
                    Susan (Room 301) - 1 day ago
                </div>
                <div class="message-content" style="font-size: 20px; margin: 15px 0; color: #2c3e50;">
                    Anyone want to join me for afternoon tea tomorrow at 3 PM in the garden? ☕
                </div>
                <button class="reply-button" onclick="replyToMessage('Susan')" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; font-size: 16px;">Reply</button>
            </div>
        </div>
        <div class="post-new-message" style="margin-top: 30px; padding: 20px; background: #e8f5e8; border-radius: 15px;">
            <h3 style="color: #2e7d32; font-size: 24px; margin-bottom: 15px;">Post Your Own Message:</h3>
            <textarea id="new-message" placeholder="What would you like to share with your neighbors?" style="width: 100%; height: 100px; padding: 15px; border: 2px solid #4caf50; border-radius: 10px; font-size: 18px; resize: vertical;"></textarea>
            <br><br>
            <button onclick="submitMessage()" style="background: #4caf50; color: white; border: none; padding: 15px 30px; border-radius: 25px; font-size: 20px; cursor: pointer; font-weight: bold;">Post Message</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    showSuccessFeedback('Community board opened!');
}

function postMessage() {
    const messageText = prompt('What would you like to share with your neighbors?');
    if (messageText) {
        const messagesDiv = document.getElementById('recent-messages');
        if (messagesDiv) {
            const messagePreview = messagesDiv.querySelector('.message-preview');
            const newMessage = document.createElement('p');
            newMessage.innerHTML = `<strong>You:</strong> ${messageText}`;
            newMessage.style.cssText = 'background: #e8f5e8; padding: 10px; border-radius: 10px; margin: 5px 0;';
            messagePreview.insertBefore(newMessage, messagePreview.firstChild);
            
            // Remove oldest message if more than 3
            if (messagePreview.children.length > 3) {
                messagePreview.removeChild(messagePreview.lastChild);
            }
        }
        showSuccessFeedback('Message posted successfully!');
    }
}

function connectWithPartner(partnerName) {
    showModal('🤝 Connect with Neighbor', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">👥</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Great choice! Staff will help you connect with <strong>${partnerName}</strong>
            </p>
            <div style="background: #f0f8ff; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 20px; color: #1976d2; margin: 0;">
                    📍 They'll arrange a meeting in the main lounge<br>
                    ⏰ You'll be notified of the time<br>
                    ☕ Light refreshments will be available
                </p>
            </div>
            <p style="font-size: 18px; color: #666;">
                Staff will contact you both shortly to arrange the meeting!
            </p>
        </div>
    `);
    showSuccessFeedback('Connection request sent!');
}

function arrangeMeeting(buddyName) {
    showModal('📅 Meeting Arranged!', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🗓️</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Perfect! Staff will arrange a meeting with <strong>${buddyName}</strong>
            </p>
            <div style="background: #f0f8ff; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 20px; color: #1976d2; margin: 0;">
                    📍 Location: Main Lounge<br>
                    ⏰ Time: You'll be notified soon<br>
                    📞 Staff will call your room with details
                </p>
            </div>
            <p style="font-size: 18px; color: #666;">
                ${buddyName} is looking forward to meeting you!
            </p>
        </div>
    `);
    showSuccessFeedback('Meeting arranged!');
}

function sendBuddyMessage(buddyName) {
    const message = prompt(`What would you like to say to ${buddyName}?`);
    if (message) {
        showModal('💌 Message Sent!', `
            <div style="text-align: center;">
                <div style="font-size: 48px; margin: 20px 0;">📬</div>
                <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                    Your message has been sent to <strong>${buddyName}</strong>!
                </p>
                <div style="background: #f0f8ff; padding: 20px; border-radius: 15px; margin: 20px 0;">
                    <p style="font-size: 18px; color: #666; font-style: italic;">
                        "${message}"
                    </p>
                </div>
                <p style="font-size: 18px; color: #666;">
                    They'll receive it shortly and can respond back to you!
                </p>
            </div>
        `);
        showSuccessFeedback('Message sent!');
    }
}

function joinChat(topic) {
    showModal('💬 Welcome to the Chat!', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🗣️</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Welcome to the "<strong>${topic}</strong>" chat!
            </p>
            <div style="background: #fff8e1; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 20px; color: #e65100; margin: 0;">
                    📍 Community Room - Table by the window<br>
                    ⏰ Chat is happening now!<br>
                    ☕ Coffee and cookies available
                </p>
            </div>
            <p style="font-size: 18px; color: #666;">
                Staff will help you join the conversation in person!
            </p>
        </div>
    `);
    showSuccessFeedback('Joined chat successfully!');
}

function startNewTopic() {
    const newTopic = prompt('What topic would you like to discuss with your neighbors?');
    if (newTopic) {
        showModal('🎉 New Topic Created!', `
            <div style="text-align: center;">
                <div style="font-size: 48px; margin: 20px 0;">💡</div>
                <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                    Great idea! Your topic "<strong>${newTopic}</strong>" has been added!
                </p>
                <div style="background: #e8f5e8; padding: 20px; border-radius: 15px; margin: 20px 0;">
                    <p style="font-size: 20px; color: #2e7d32; margin: 0;">
                        🔔 Other residents will be notified<br>
                    📍 Discussion will be in the Community Room<br>
                    👥 Staff will help organize the conversation
                    </p>
                </div>
                <p style="font-size: 18px; color: #666;">
                    Your neighbors will love discussing this topic!
                </p>
            </div>
        `);
        showSuccessFeedback('New topic created!');
    }
}

function replyToMessage(personName) {
    const reply = prompt(`What would you like to say to ${personName}?`);
    if (reply) {
        showModal('📝 Reply Sent!', `
            <div style="text-align: center;">
                <div style="font-size: 48px; margin: 20px 0;">💬</div>
                <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                    Your reply has been sent to <strong>${personName}</strong>!
                </p>
                <div style="background: #f0f8ff; padding: 20px; border-radius: 15px; margin: 20px 0;">
                    <p style="font-size: 18px; color: #666; font-style: italic;">
                        "${reply}"
                    </p>
                </div>
                <p style="font-size: 18px; color: #666;">
                    They'll see your message on the community board!
                </p>
            </div>
        `);
        showSuccessFeedback('Reply sent!');
    }
}

function submitMessage() {
    const messageInput = document.getElementById('new-message');
    if (messageInput && messageInput.value.trim()) {
        showModal('✅ Message Posted!', `
            <div style="text-align: center;">
                <div style="font-size: 48px; margin: 20px 0;">📋</div>
                <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                    Your message has been posted to the community board!
                </p>
                <div style="background: #e8f5e8; padding: 20px; border-radius: 15px; margin: 20px 0;">
                    <p style="font-size: 18px; color: #666; font-style: italic;">
                        "${messageInput.value}"
                    </p>
                </div>
                <p style="font-size: 18px; color: #666;">
                    All residents can now see and respond to your message!
                </p>
            </div>
        `);
        messageInput.value = '';
        showSuccessFeedback('Message posted!');
    }
}

// Success feedback function
function showSuccessFeedback(message) {
    // Create a temporary success message
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4caf50, #45a049);
        color: white;
        padding: 20px 25px;
        border-radius: 25px;
        font-size: 18px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
        animation: slideIn 0.3s ease-out;
    `;
    feedback.textContent = `✓ ${message}`;
    
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
    
    // Announce to screen readers
    announceToScreenReader(message);
}

// Activity Participation Functions
function joinActivity(activityName) {
    showModal('🎉 Activity Joined!', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">✅</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Great choice! You've joined <strong>${activityName}</strong>
            </p>
            <div style="background: #e8f5e8; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 20px; color: #2e7d32; margin: 0;">
                    📍 Staff will remind you before it starts<br>
                    👥 You'll meet other participants there<br>
                    ❓ Ask staff if you need directions
                </p>
            </div>
            <p style="font-size: 18px; color: #666;">
                Looking forward to seeing you there with your neighbors!
            </p>
        </div>
    `);
    showSuccessFeedback(`Joined ${activityName}!`);
}

function findActivityBuddies(activityName) {
    const buddyData = {
        'Morning Stretch': {
            buddies: ['Eleanor (Room 150)', 'Harold (Room 118)'],
            description: 'Both enjoy gentle morning exercises and are very encouraging!'
        },
        'Arts & Crafts': {
            buddies: ['Dorothy (Room 189)', 'Susan (Room 301)'],
            description: 'Creative and helpful with sharing art supplies and techniques!'
        },
        'Bingo': {
            buddies: ['Mary (Room 205)', 'Robert (Room 220)'],
            description: 'Experienced players who love helping newcomers learn!'
        },
        'Music Time': {
            buddies: ['Frank (Room 207)', 'Margaret (Room 285)'],
            description: 'Great singers who know all the classic songs!'
        },
        'Movie Night': {
            buddies: ['William (Room 103)', 'Rose (Room 301)'],
            description: 'Movie buffs who love discussing films and sharing popcorn!'
        }
    };
    
    const activityInfo = buddyData[activityName] || {
        buddies: ['Friendly neighbors', 'Welcoming residents'],
        description: 'Great people who would love to have you join them!'
    };
    
    showModal('👫 Activity Buddies Found!', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🤝</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Perfect matches for <strong>${activityName}</strong>!
            </p>
            <div style="background: #fff8e1; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #ef6c00; margin-bottom: 15px;">Your Activity Buddies:</h3>
                ${activityInfo.buddies.map(buddy => `
                    <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 10px; border: 2px solid #ffcc80;">
                        <p style="font-size: 20px; font-weight: bold; color: #2c3e50; margin: 5px 0;">${buddy}</p>
                        <button onclick="connectWithActivityBuddy('${buddy}', '${activityName}')" style="
                            background: #ff9800; color: white; border: none; padding: 10px 20px; 
                            border-radius: 20px; font-size: 16px; cursor: pointer; margin: 5px;
                        ">Connect</button>
                    </div>
                `).join('')}
            </div>
            <p style="font-size: 18px; color: #666; font-style: italic;">
                ${activityInfo.description}
            </p>
            <p style="font-size: 16px; color: #999; margin-top: 20px;">
                💡 Staff will introduce you at the activity!
            </p>
        </div>
    `);
    showSuccessFeedback('Activity buddies found!');
}

function connectWithActivityBuddy(buddyName, activityName) {
    showModal('🎯 Connection Arranged!', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🎊</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Wonderful! You'll meet <strong>${buddyName}</strong> at <strong>${activityName}</strong>
            </p>
            <div style="background: #e8f5e8; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 20px; color: #2e7d32; margin: 0;">
                    🤝 Staff will introduce you both<br>
                    📍 You'll sit or work together<br>
                    💬 They're excited to meet you!<br>
                    ☕ Feel free to chat and become friends
                </p>
            </div>
            <p style="font-size: 18px; color: #666;">
                This is going to be the start of a great friendship!
            </p>
        </div>
    `);
    showSuccessFeedback('Activity buddy connection arranged!');
}

// Special Weekly Activities Functions
function joinSpecialActivity(activityName) {
    const activityDetails = {
        'Beach Day': {
            icon: '🏖️',
            time: 'Thursday 10:00 AM - 3:00 PM',
            details: 'Transportation leaves at 10 AM sharp! Bring sunglasses and a hat.',
            preparation: 'We provide chairs, snacks, and shade. Just bring yourself and a smile!'
        },
        'Donation Day': {
            icon: '💝',
            time: 'Monday 2:00 PM - 4:00 PM',
            details: 'Bring unused items to the main lounge. Staff will help sort and pack everything.',
            preparation: 'Clean, gently used items only. Clothes, books, small household items welcome!'
        },
        'Pet Adventures': {
            icon: '🐾',
            time: 'Tuesday 1:00 PM - 3:30 PM',
            details: 'Visit local pet stores and animal therapy centers. Hand sanitizer provided.',
            preparation: 'Comfortable shoes recommended. We visit pet-friendly locations with gentle animals!'
        }
    };
    
    const activity = activityDetails[activityName];
    
    showModal(`${activity.icon} ${activityName} - You're In!`, `
        <div style="text-align: center;">
            <div style="font-size: 64px; margin: 25px 0;">${activity.icon}</div>
            <p style="font-size: 26px; color: #2c3e50; margin: 25px 0; font-weight: 600;">
                Wonderful! You've joined <strong>${activityName}</strong>!
            </p>
            <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f0f8ff 100%); padding: 25px; border-radius: 20px; margin: 25px 0; border: 3px solid #4caf50;">
                <p style="font-size: 20px; color: #2e7d32; margin: 15px 0; font-weight: 600;">
                    📅 <strong>When:</strong> ${activity.time}
                </p>
                <p style="font-size: 18px; color: #1976d2; margin: 15px 0; line-height: 1.6;">
                    ℹ️ <strong>Details:</strong> ${activity.details}
                </p>
                <p style="font-size: 18px; color: #ef6c00; margin: 15px 0; line-height: 1.6;">
                    ✨ <strong>What to Know:</strong> ${activity.preparation}
                </p>
            </div>
            <div style="background: #fff3e0; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 18px; color: #e65100; font-weight: 600; margin: 0;">
                    🔔 Staff will remind you 30 minutes before departure!
                </p>
            </div>
            <p style="font-size: 16px; color: #666; margin: 20px 0;">
                Looking forward to this amazing experience with you!
            </p>
        </div>
    `);
    showSuccessFeedback(`Joined ${activityName}!`);
}

function findBeachBuddy() {
    const beachBuddies = [
        { name: 'Margaret', room: '205', interests: 'Shell collecting, photography', quote: 'I love watching the sunset over the waves!' },
        { name: 'Robert', room: '118', interests: 'Ocean breeze, peaceful walks', quote: 'The beach reminds me of my Navy days.' },
        { name: 'Eleanor', room: '150', interests: 'Reading by the sea, bird watching', quote: 'There\'s nothing like a good book with ocean sounds!' },
        { name: 'Frank', room: '207', interests: 'Beach games, socializing', quote: 'Let\'s build some sandcastles together!' }
    ];
    
    const buddy = beachBuddies[Math.floor(Math.random() * beachBuddies.length)];
    
    showModal('🏖️ Beach Buddy Found!', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🌊</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Perfect beach companion: <strong>${buddy.name}</strong>!
            </p>
            <div style="background: linear-gradient(135deg, #e3f2fd 0%, #fff8e1 100%); padding: 25px; border-radius: 20px; margin: 20px 0; border: 3px solid #03a9f4;">
                <p style="font-size: 18px; margin: 10px 0;"><strong>🏠 Room:</strong> ${buddy.room}</p>
                <p style="font-size: 18px; margin: 10px 0;"><strong>🌊 Beach Interests:</strong> ${buddy.interests}</p>
                <p style="font-size: 18px; margin: 15px 0; color: #1976d2; font-style: italic;">
                    "${buddy.quote}"
                </p>
            </div>
            <div style="background: #fff3e0; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 18px; color: #ef6c00; margin: 0;">
                    🤝 You'll sit together on the bus and enjoy the beach as buddies!
                </p>
            </div>
            <button onclick="connectWithSpecialBuddy('${buddy.name}', 'Beach Day')" style="
                background: linear-gradient(135deg, #03a9f4 0%, #0288d1 100%); color: white; border: none; 
                padding: 15px 30px; border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                margin: 10px; box-shadow: 0 4px 15px rgba(3, 169, 244, 0.3);
            ">Connect with ${buddy.name}</button>
        </div>
    `);
    showSuccessFeedback('Beach buddy found!');
}

function findDonationBuddy() {
    const donationBuddies = [
        { name: 'Susan', room: '301', specialty: 'Clothing sorting and folding', quote: 'I love organizing things to help families!' },
        { name: 'Dorothy', room: '189', specialty: 'Book and toy categorizing', quote: 'Every donation could change someone\'s day.' },
        { name: 'William', room: '103', specialty: 'Household items and electronics', quote: 'One person\'s extra is another\'s treasure!' },
        { name: 'Rose', room: '301', specialty: 'General organizing and packing', quote: 'Giving feels better than receiving!' }
    ];
    
    const buddy = donationBuddies[Math.floor(Math.random() * donationBuddies.length)];
    
    showModal('💝 Donation Partner Found!', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🤲</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Great giving partner: <strong>${buddy.name}</strong>!
            </p>
            <div style="background: linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%); padding: 25px; border-radius: 20px; margin: 20px 0; border: 3px solid #e91e63;">
                <p style="font-size: 18px; margin: 10px 0;"><strong>🏠 Room:</strong> ${buddy.room}</p>
                <p style="font-size: 18px; margin: 10px 0;"><strong>💝 Specialty:</strong> ${buddy.specialty}</p>
                <p style="font-size: 18px; margin: 15px 0; color: #c2185b; font-style: italic;">
                    "${buddy.quote}"
                </p>
            </div>
            <div style="background: #e8f5e8; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 18px; color: #2e7d32; margin: 0;">
                    🤝 You'll work together to sort and prepare donations for local families!
                </p>
            </div>
            <button onclick="connectWithSpecialBuddy('${buddy.name}', 'Donation Day')" style="
                background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%); color: white; border: none; 
                padding: 15px 30px; border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                margin: 10px; box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
            ">Connect with ${buddy.name}</button>
        </div>
    `);
    showSuccessFeedback('Donation partner found!');
}

function findPetBuddy() {
    const petBuddies = [
        { name: 'Harold', room: '118', petLove: 'Dogs and cats', quote: 'Animals have always been my therapy!' },
        { name: 'Margaret', room: '285', petLove: 'Rabbits and small animals', quote: 'Soft fur and gentle hearts heal the soul.' },
        { name: 'Albert', room: '220', petLove: 'All animals', quote: 'Every animal has a story to tell!' },
        { name: 'Eleanor', room: '150', petLove: 'Therapy dogs', quote: 'Dogs know exactly when you need a friend.' }
    ];
    
    const buddy = petBuddies[Math.floor(Math.random() * petBuddies.length)];
    
    showModal('🐾 Animal-Loving Friend Found!', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🐕‍🦺</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Perfect pet companion: <strong>${buddy.name}</strong>!
            </p>
            <div style="background: linear-gradient(135deg, #fff8e1 0%, #f3e5f5 100%); padding: 25px; border-radius: 20px; margin: 20px 0; border: 3px solid #ff9800;">
                <p style="font-size: 18px; margin: 10px 0;"><strong>🏠 Room:</strong> ${buddy.room}</p>
                <p style="font-size: 18px; margin: 10px 0;"><strong>🐾 Loves:</strong> ${buddy.petLove}</p>
                <p style="font-size: 18px; margin: 15px 0; color: #f57c00; font-style: italic;">
                    "${buddy.quote}"
                </p>
            </div>
            <div style="background: #e3f2fd; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 18px; color: #1976d2; margin: 0;">
                    🐶 You'll visit pet stores together and share the joy of animal companionship!
                </p>
            </div>
            <button onclick="connectWithSpecialBuddy('${buddy.name}', 'Pet Adventures')" style="
                background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); color: white; border: none; 
                padding: 15px 30px; border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                margin: 10px; box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
            ">Connect with ${buddy.name}</button>
        </div>
    `);
    showSuccessFeedback('Pet buddy found!');
}

function connectWithSpecialBuddy(buddyName, activityName) {
    const activityEmojis = {
        'Beach Day': '🏖️',
        'Donation Day': '💝',
        'Pet Adventures': '🐾'
    };
    
    const emoji = activityEmojis[activityName] || '🤝';
    
    showModal(`${emoji} Special Connection Made!`, `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🎊</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Fantastic! You and <strong>${buddyName}</strong> are now ${activityName} buddies!
            </p>
            <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f0f8ff 100%); padding: 25px; border-radius: 20px; margin: 20px 0; border: 3px solid #4caf50;">
                <p style="font-size: 20px; color: #2e7d32; margin: 15px 0;">
                    🤝 Staff will introduce you before the activity<br>
                    ${emoji} You'll enjoy ${activityName} together<br>
                    📞 ${buddyName} is excited to meet you!<br>
                    💬 This could be the start of a wonderful friendship!
                </p>
            </div>
            <div style="background: #fff8e1; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 18px; color: #ef6c00; font-weight: 600; margin: 0;">
                    ✨ Special activities are always better with a friend by your side!
                </p>
            </div>
        </div>
    `);
    showSuccessFeedback(`Connected with ${buddyName} for ${activityName}!`);
}