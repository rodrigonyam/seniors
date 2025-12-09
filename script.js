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

// Practical Support Functions
// Daily Routines Support
function showMedicationReminder() {
    const currentTime = new Date();
    const medications = [
        { name: 'Blood Pressure', time: '8:00 AM', taken: true },
        { name: 'Vitamin D', time: '12:00 PM', taken: false, next: true },
        { name: 'Heart Medication', time: '6:00 PM', taken: false },
        { name: 'Sleep Aid', time: '9:00 PM', taken: false }
    ];
    
    showModal('💊 Medication Reminder', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">💊</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Your Daily Medication Schedule
            </p>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0; text-align: left;">
                ${medications.map(med => `
                    <div style="
                        background: ${med.taken ? '#e8f5e8' : med.next ? '#fff3e0' : 'white'};
                        padding: 15px; margin: 10px 0; border-radius: 10px;
                        border: 2px solid ${med.taken ? '#4caf50' : med.next ? '#ff9800' : '#ddd'};
                        display: flex; justify-content: space-between; align-items: center;
                    ">
                        <div>
                            <strong style="font-size: 18px; color: #2c3e50;">${med.name}</strong><br>
                            <span style="color: #666; font-size: 16px;">${med.time}</span>
                        </div>
                        <div style="font-size: 24px;">
                            ${med.taken ? '✅' : med.next ? '⏰' : '⭕'}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="background: ${medications.some(m => m.next) ? '#fff3e0' : '#e8f5e8'}; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 18px; color: ${medications.some(m => m.next) ? '#ef6c00' : '#2e7d32'}; margin: 0; font-weight: 600;">
                    ${medications.some(m => m.next) ? '⏰ Next medication due soon! Staff will remind you.' : '✅ All current medications taken. Great job!'}
                </p>
            </div>
            <button onclick="requestMedicationHelp()" style="
                background: #2196f3; color: white; border: none; padding: 15px 30px;
                border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                margin: 10px; box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
            ">Need Help with Medications?</button>
        </div>
    `);
    showSuccessFeedback('Medication schedule displayed!');
}

function showDailySchedule() {
    const today = new Date();
    const schedule = [
        { time: '7:00 AM', activity: 'Wake Up & Personal Care', status: 'completed' },
        { time: '8:00 AM', activity: 'Breakfast & Medications', status: 'completed' },
        { time: '10:00 AM', activity: 'Morning Exercise', status: 'current' },
        { time: '11:30 AM', activity: 'Free Time / Reading', status: 'upcoming' },
        { time: '12:30 PM', activity: 'Lunch', status: 'upcoming' },
        { time: '2:00 PM', activity: 'Bingo Activity', status: 'upcoming' },
        { time: '4:00 PM', activity: 'Rest Time', status: 'upcoming' },
        { time: '6:00 PM', activity: 'Dinner', status: 'upcoming' },
        { time: '8:00 PM', activity: 'Evening Social Time', status: 'upcoming' }
    ];
    
    showModal('🕐 Your Daily Schedule', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">📅</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Today's Personal Schedule
            </p>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0; text-align: left; max-height: 400px; overflow-y: auto;">
                ${schedule.map(item => `
                    <div style="
                        background: ${item.status === 'completed' ? '#e8f5e8' : item.status === 'current' ? '#fff8e1' : 'white'};
                        padding: 15px; margin: 10px 0; border-radius: 10px;
                        border: 3px solid ${item.status === 'completed' ? '#4caf50' : item.status === 'current' ? '#ff9800' : '#e0e0e0'};
                        display: flex; justify-content: space-between; align-items: center;
                    ">
                        <div>
                            <strong style="font-size: 18px; color: #2c3e50;">${item.time}</strong><br>
                            <span style="color: #666; font-size: 16px;">${item.activity}</span>
                        </div>
                        <div style="font-size: 28px;">
                            ${item.status === 'completed' ? '✅' : item.status === 'current' ? '👆' : '⏳'}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="background: #e3f2fd; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 18px; color: #1976d2; margin: 0; font-weight: 600;">
                    📍 Current Activity: ${schedule.find(s => s.status === 'current')?.activity || 'Free Time'}
                </p>
            </div>
            <button onclick="customizeSchedule()" style="
                background: #4caf50; color: white; border: none; padding: 15px 30px;
                border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                margin: 5px; box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
            ">Customize Schedule</button>
        </div>
    `);
    showSuccessFeedback('Daily schedule loaded!');
}

function showMealPlanner() {
    const mealPreferences = {
        dietary: ['Low Sodium', 'Diabetic Friendly'],
        allergies: ['Nuts'],
        preferences: ['Extra Vegetables', 'Soft Foods']
    };
    
    showModal('🍽️ Meal Planning Helper', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🍽️</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Your Personalized Meal Plan
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0; text-align: left;">
                <h3 style="color: #2e7d32; margin-bottom: 15px;">Your Dietary Profile:</h3>
                <div style="background: #e8f5e8; padding: 15px; border-radius: 10px; margin: 10px 0;">
                    <strong>Dietary Needs:</strong> ${mealPreferences.dietary.join(', ')}
                </div>
                <div style="background: #ffebee; padding: 15px; border-radius: 10px; margin: 10px 0;">
                    <strong>Allergies:</strong> ${mealPreferences.allergies.join(', ')}
                </div>
                <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; margin: 10px 0;">
                    <strong>Preferences:</strong> ${mealPreferences.preferences.join(', ')}
                </div>
            </div>
            
            <div style="background: #fff8e1; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #ef6c00; margin-bottom: 15px;">Today's Recommended Meals:</h3>
                <div style="text-align: left; font-size: 16px; line-height: 1.8;">
                    <strong>Breakfast:</strong> Oatmeal with berries (low sodium)<br>
                    <strong>Lunch:</strong> Grilled chicken with steamed vegetables<br>
                    <strong>Dinner:</strong> Soft fish with mashed sweet potatoes<br>
                    <strong>Snack:</strong> Apple slices with cheese (nut-free)
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button onclick="requestMealChange()" style="
                    background: #ff9800; color: white; border: none; padding: 12px 25px;
                    border-radius: 20px; font-size: 16px; cursor: pointer; font-weight: bold;
                ">Request Meal Change</button>
                <button onclick="updateDietaryNeeds()" style="
                    background: #2196f3; color: white; border: none; padding: 12px 25px;
                    border-radius: 20px; font-size: 16px; cursor: pointer; font-weight: bold;
                ">Update Dietary Needs</button>
            </div>
        </div>
    `);
    showSuccessFeedback('Meal planner opened!');
}

// Health Monitoring Functions
function showHealthTracker() {
    const healthData = {
        bloodPressure: { systolic: 128, diastolic: 82, status: 'normal', lastCheck: 'Today 9:00 AM' },
        heartRate: { bpm: 72, status: 'good', lastCheck: 'Today 9:00 AM' },
        weight: { current: 165, trend: 'stable', lastCheck: 'Yesterday' },
        mood: { rating: 8, status: 'great', lastCheck: 'Today' }
    };
    
    showModal('📊 Health Tracker Dashboard', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">📊</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Your Health Overview
            </p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0;">
                <div style="background: #e8f5e8; padding: 20px; border-radius: 15px; border: 2px solid #4caf50;">
                    <div style="font-size: 24px; margin-bottom: 10px;">🩸</div>
                    <strong style="color: #2e7d32;">Blood Pressure</strong><br>
                    <span style="font-size: 20px; font-weight: bold;">${healthData.bloodPressure.systolic}/${healthData.bloodPressure.diastolic}</span><br>
                    <span style="color: #666;">Status: ${healthData.bloodPressure.status}</span><br>
                    <span style="font-size: 14px; color: #999;">${healthData.bloodPressure.lastCheck}</span>
                </div>
                
                <div style="background: #e3f2fd; padding: 20px; border-radius: 15px; border: 2px solid #2196f3;">
                    <div style="font-size: 24px; margin-bottom: 10px;">💗</div>
                    <strong style="color: #1976d2;">Heart Rate</strong><br>
                    <span style="font-size: 20px; font-weight: bold;">${healthData.heartRate.bpm} BPM</span><br>
                    <span style="color: #666;">Status: ${healthData.heartRate.status}</span><br>
                    <span style="font-size: 14px; color: #999;">${healthData.heartRate.lastCheck}</span>
                </div>
                
                <div style="background: #fff8e1; padding: 20px; border-radius: 15px; border: 2px solid #ff9800;">
                    <div style="font-size: 24px; margin-bottom: 10px;">⚖️</div>
                    <strong style="color: #ef6c00;">Weight</strong><br>
                    <span style="font-size: 20px; font-weight: bold;">${healthData.weight.current} lbs</span><br>
                    <span style="color: #666;">Trend: ${healthData.weight.trend}</span><br>
                    <span style="font-size: 14px; color: #999;">${healthData.weight.lastCheck}</span>
                </div>
                
                <div style="background: #fce4ec; padding: 20px; border-radius: 15px; border: 2px solid #e91e63;">
                    <div style="font-size: 24px; margin-bottom: 10px;">😊</div>
                    <strong style="color: #c2185b;">Mood</strong><br>
                    <span style="font-size: 20px; font-weight: bold;">${healthData.mood.rating}/10</span><br>
                    <span style="color: #666;">Feeling: ${healthData.mood.status}</span><br>
                    <span style="font-size: 14px; color: #999;">${healthData.mood.lastCheck}</span>
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 20px;">
                <button onclick="logNewHealthData()" style="
                    background: #4caf50; color: white; border: none; padding: 12px 25px;
                    border-radius: 20px; font-size: 16px; cursor: pointer; font-weight: bold;
                ">Log New Reading</button>
                <button onclick="shareHealthWithDoctor()" style="
                    background: #2196f3; color: white; border: none; padding: 12px 25px;
                    border-radius: 20px; font-size: 16px; cursor: pointer; font-weight: bold;
                ">Share with Doctor</button>
            </div>
        </div>
    `);
    showSuccessFeedback('Health tracker loaded!');
}

function showAppointmentReminder() {
    const appointments = [
        { doctor: 'Dr. Smith (Cardiologist)', date: 'Tomorrow', time: '10:30 AM', type: 'Check-up', urgent: false },
        { doctor: 'Dr. Johnson (Primary Care)', date: 'Friday Dec 13', time: '2:00 PM', type: 'Routine Visit', urgent: false },
        { doctor: 'Eye Specialist', date: 'Next Monday', time: '11:00 AM', type: 'Vision Check', urgent: true }
    ];
    
    showModal('📅 Medical Appointments', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">👩‍⚕️</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Your Upcoming Appointments
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0; text-align: left;">
                ${appointments.map(apt => `
                    <div style="
                        background: ${apt.urgent ? '#ffebee' : 'white'};
                        padding: 20px; margin: 15px 0; border-radius: 12px;
                        border: 3px solid ${apt.urgent ? '#f44336' : '#4caf50'};
                    ">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <strong style="font-size: 18px; color: #2c3e50;">${apt.doctor}</strong><br>
                                <span style="color: #666; font-size: 16px;">${apt.type}</span><br>
                                <span style="color: #1976d2; font-size: 16px; font-weight: 600;">${apt.date} at ${apt.time}</span>
                            </div>
                            <div style="font-size: 24px;">${apt.urgent ? '🔴' : '📅'}</div>
                        </div>
                        ${apt.urgent ? '<div style="background: #ffcdd2; color: #d32f2f; padding: 8px; border-radius: 8px; margin-top: 10px; font-weight: 600;">Important: Don\'t forget this appointment!</div>' : ''}
                    </div>
                `).join('')}
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 18px; color: #2e7d32; margin: 0; font-weight: 600;">
                    🔔 Staff will remind you 1 hour before each appointment
                </p>
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button onclick="requestTransportation()" style="
                    background: #ff9800; color: white; border: none; padding: 12px 25px;
                    border-radius: 20px; font-size: 16px; cursor: pointer; font-weight: bold;
                ">Need Transportation?</button>
                <button onclick="rescheduleAppointment()" style="
                    background: #2196f3; color: white; border: none; padding: 12px 25px;
                    border-radius: 20px; font-size: 16px; cursor: pointer; font-weight: bold;
                ">Reschedule</button>
            </div>
        </div>
    `);
    showSuccessFeedback('Appointments displayed!');
}

function showSymptomLogger() {
    showModal('🩺 Daily Symptom Logger', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🩺</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                How are you feeling today?
            </p>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 20px 0; text-align: left;">
                <h3 style="color: #2e7d32; margin-bottom: 20px;">Quick Health Check:</h3>
                
                <div style="margin: 20px 0;">
                    <label style="font-size: 18px; color: #2c3e50; margin-bottom: 10px; display: block;"><strong>Overall Energy Level:</strong></label>
                    <div style="display: flex; gap: 10px; justify-content: center; margin: 10px 0;">
                        ${[1,2,3,4,5].map(num => `
                            <button onclick="selectEnergyLevel(${num})" style="
                                background: #e3f2fd; border: 2px solid #2196f3; width: 50px; height: 50px;
                                border-radius: 50%; font-size: 18px; font-weight: bold; cursor: pointer;
                            ">${num}</button>
                        `).join('')}
                    </div>
                    <div style="font-size: 14px; color: #666; text-align: center;">1 = Very Low, 5 = Very High</div>
                </div>
                
                <div style="margin: 20px 0;">
                    <label style="font-size: 18px; color: #2c3e50; margin-bottom: 10px; display: block;"><strong>Any Symptoms Today?</strong></label>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
                        ${['Headache', 'Fatigue', 'Dizziness', 'Nausea', 'Pain', 'Sleep Issues'].map(symptom => `
                            <button onclick="toggleSymptom('${symptom}')" style="
                                background: white; border: 2px solid #ddd; padding: 10px;
                                border-radius: 10px; cursor: pointer; font-size: 14px;
                            ">${symptom}</button>
                        `).join('')}
                    </div>
                </div>
                
                <div style="margin: 20px 0;">
                    <label style="font-size: 18px; color: #2c3e50; margin-bottom: 10px; display: block;"><strong>Additional Notes:</strong></label>
                    <textarea placeholder="Describe how you're feeling or any concerns..." style="
                        width: 100%; height: 80px; padding: 12px; border: 2px solid #ddd;
                        border-radius: 10px; font-size: 16px; font-family: inherit; resize: vertical;
                    "></textarea>
                </div>
            </div>
            
            <div style="background: #fff3e0; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 16px; color: #ef6c00; margin: 0;">
                    💡 This information helps staff provide better care and can be shared with your doctor
                </p>
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button onclick="saveSymptomLog()" style="
                    background: #4caf50; color: white; border: none; padding: 15px 30px;
                    border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                ">Save Daily Log</button>
                <button onclick="alertStaff()" style="
                    background: #f44336; color: white; border: none; padding: 15px 30px;
                    border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                ">Alert Staff Now</button>
            </div>
        </div>
    `);
    showSuccessFeedback('Symptom logger opened!');
}

// Communication Functions
function showFamilyConnector() {
    const familyContacts = [
        { name: 'Sarah (Daughter)', phone: '(555) 123-4567', relationship: 'Daughter', lastContact: 'Yesterday', available: true },
        { name: 'Michael (Son)', phone: '(555) 234-5678', relationship: 'Son', lastContact: '3 days ago', available: false },
        { name: 'Emma (Granddaughter)', phone: '(555) 345-6789', relationship: 'Granddaughter', lastContact: 'Last week', available: true }
    ];
    
    showModal('👨‍👩‍👧‍👦 Family Contacts', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">👨‍👩‍👧‍👦</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Stay Connected with Family
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0;">
                ${familyContacts.map(contact => `
                    <div style="
                        background: white; padding: 20px; margin: 15px 0; border-radius: 12px;
                        border: 3px solid ${contact.available ? '#4caf50' : '#ff9800'};
                        display: flex; justify-content: space-between; align-items: center;
                    ">
                        <div style="text-align: left;">
                            <strong style="font-size: 20px; color: #2c3e50;">${contact.name}</strong><br>
                            <span style="color: #666; font-size: 16px;">${contact.phone}</span><br>
                            <span style="color: #1976d2; font-size: 14px;">Last contact: ${contact.lastContact}</span>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="font-size: 24px;">${contact.available ? '🟢' : '🟡'}</div>
                            <span style="font-size: 12px; color: #666;">${contact.available ? 'Available' : 'May be busy'}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #2e7d32; margin-bottom: 15px;">Easy Communication Options:</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <button onclick="makePhoneCall()" style="
                        background: #4caf50; color: white; border: none; padding: 15px;
                        border-radius: 15px; font-size: 16px; cursor: pointer; font-weight: bold;
                    ">📞 Make Phone Call</button>
                    <button onclick="sendTextMessage()" style="
                        background: #2196f3; color: white; border: none; padding: 15px;
                        border-radius: 15px; font-size: 16px; cursor: pointer; font-weight: bold;
                    ">💬 Send Text Message</button>
                    <button onclick="scheduleVideoCall()" style="
                        background: #ff9800; color: white; border: none; padding: 15px;
                        border-radius: 15px; font-size: 16px; cursor: pointer; font-weight: bold;
                    ">📹 Schedule Video Call</button>
                    <button onclick="recordVoiceMessage()" style="
                        background: #9c27b0; color: white; border: none; padding: 15px;
                        border-radius: 15px; font-size: 16px; cursor: pointer; font-weight: bold;
                    ">🎤 Voice Message</button>
                </div>
            </div>
            
            <div style="background: #fff3e0; padding: 15px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 16px; color: #ef6c00; margin: 0;">
                    💡 Staff can help you with any communication method - just ask!
                </p>
            </div>
        </div>
    `);
    showSuccessFeedback('Family contacts loaded!');
}

function showVoiceMessages() {
    const voiceMessages = [
        { from: 'Sarah (Daughter)', time: '2 hours ago', duration: '1:23', listened: false },
        { from: 'Emma (Granddaughter)', time: 'Yesterday', duration: '0:45', listened: true },
        { from: 'Michael (Son)', time: '3 days ago', duration: '2:10', listened: true }
    ];
    
    showModal('🎤 Voice Messages', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🎤</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Your Voice Messages
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #2e7d32; margin-bottom: 20px;">Received Messages:</h3>
                ${voiceMessages.map(msg => `
                    <div style="
                        background: ${msg.listened ? 'white' : '#e8f5e8'}; padding: 20px; margin: 15px 0;
                        border-radius: 12px; border: 3px solid ${msg.listened ? '#ddd' : '#4caf50'};
                        display: flex; justify-content: space-between; align-items: center;
                    ">
                        <div style="text-align: left;">
                            <strong style="font-size: 18px; color: #2c3e50;">${msg.from}</strong><br>
                            <span style="color: #666; font-size: 14px;">${msg.time} • ${msg.duration}</span>
                        </div>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            ${msg.listened ? '' : '<span style="background: #4caf50; color: white; padding: 4px 8px; border-radius: 10px; font-size: 12px; font-weight: bold;">NEW</span>'}
                            <button onclick="playVoiceMessage('${msg.from}')" style="
                                background: #2196f3; color: white; border: none; padding: 10px 15px;
                                border-radius: 20px; font-size: 14px; cursor: pointer;
                            ">▶️ Play</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="background: #e3f2fd; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #1976d2; margin-bottom: 15px;">Send New Voice Message:</h3>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="recordNewMessage()" style="
                        background: #f44336; color: white; border: none; padding: 15px 25px;
                        border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                        box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
                    ">🎙️ Record Message</button>
                    <button onclick="selectRecipient()" style="
                        background: #4caf50; color: white; border: none; padding: 15px 25px;
                        border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                    ">📤 Send to Family</button>
                </div>
            </div>
        </div>
    `);
    showSuccessFeedback('Voice messages loaded!');
}

function showVideoCallHelper() {
    showModal('📹 Video Call Helper', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">📹</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Easy Video Calls with Family
            </p>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #2e7d32; margin-bottom: 20px;">Quick Start Video Call:</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <button onclick="callFamily('Sarah')" style="
                        background: #4caf50; color: white; border: none; padding: 20px;
                        border-radius: 15px; font-size: 16px; cursor: pointer; font-weight: bold;
                        display: flex; flex-direction: column; align-items: center; gap: 10px;
                    ">
                        <div style="font-size: 24px;">👩</div>
                        Call Sarah
                    </button>
                    <button onclick="callFamily('Michael')" style="
                        background: #2196f3; color: white; border: none; padding: 20px;
                        border-radius: 15px; font-size: 16px; cursor: pointer; font-weight: bold;
                        display: flex; flex-direction: column; align-items: center; gap: 10px;
                    ">
                        <div style="font-size: 24px;">👨</div>
                        Call Michael
                    </button>
                    <button onclick="callFamily('Emma')" style="
                        background: #ff9800; color: white; border: none; padding: 20px;
                        border-radius: 15px; font-size: 16px; cursor: pointer; font-weight: bold;
                        display: flex; flex-direction: column; align-items: center; gap: 10px;
                    ">
                        <div style="font-size: 24px;">👧</div>
                        Call Emma
                    </button>
                    <button onclick="groupVideoCall()" style="
                        background: #9c27b0; color: white; border: none; padding: 20px;
                        border-radius: 15px; font-size: 16px; cursor: pointer; font-weight: bold;
                        display: flex; flex-direction: column; align-items: center; gap: 10px;
                    ">
                        <div style="font-size: 24px;">👨‍👩‍👧‍👦</div>
                        Group Call
                    </button>
                </div>
            </div>
            
            <div style="background: #fff8e1; padding: 20px; border-radius: 15px; margin: 20px 0; text-align: left;">
                <h3 style="color: #ef6c00; margin-bottom: 15px;">📋 Video Call Tips:</h3>
                <ul style="font-size: 16px; line-height: 1.8; color: #2c3e50;">
                    <li>Staff will help set up the call and adjust the camera</li>
                    <li>Speak clearly and look at the camera when talking</li>
                    <li>Use the large buttons on screen to mute/unmute</li>
                    <li>Wave goodbye before hanging up!</li>
                    <li>Calls can last as long as you'd like</li>
                </ul>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 18px; color: #2e7d32; margin: 0; font-weight: 600;">
                    🕐 Schedule a video call for later, or call now if they're available!
                </p>
            </div>
            
            <button onclick="requestVideoCallHelp()" style="
                background: #ff5722; color: white; border: none; padding: 15px 30px;
                border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                margin: 10px; box-shadow: 0 4px 15px rgba(255, 87, 34, 0.3);
            ">Need Help with Video Calls?</button>
        </div>
    `);
    showSuccessFeedback('Video call helper opened!');
}

// Helper Functions for Practical Support
function requestMedicationHelp() {
    showModal('💊 Medication Assistance', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">👩‍⚕️</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Medication Help Requested
            </p>
            <div style="background: #e8f5e8; padding: 25px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 20px; color: #2e7d32; margin: 0; font-weight: 600;">
                    ✅ Staff has been notified and will come assist you shortly!
                </p>
            </div>
            <p style="font-size: 18px; color: #666;">
                A qualified staff member will help you with your medications and answer any questions.
            </p>
        </div>
    `);
    showSuccessFeedback('Medication help requested!');
}

function customizeSchedule() {
    showSuccessFeedback('Schedule customization requested - staff will help you personalize your daily routine!');
}

function requestMealChange() {
    showSuccessFeedback('Meal change requested - kitchen staff will contact you about alternatives!');
}

function updateDietaryNeeds() {
    showSuccessFeedback('Dietary needs update requested - nutritionist will review your requirements!');
}

function logNewHealthData() {
    showSuccessFeedback('Health logging started - staff will help you record new measurements!');
}

function shareHealthWithDoctor() {
    showSuccessFeedback('Health data will be shared with your doctor at your next visit!');
}

function requestTransportation() {
    showSuccessFeedback('Transportation requested - staff will arrange your ride to the appointment!');
}

function rescheduleAppointment() {
    showSuccessFeedback('Rescheduling requested - staff will contact the doctor\'s office for you!');
}

function saveSymptomLog() {
    showSuccessFeedback('Daily health log saved - information will be available for your care team!');
}

function alertStaff() {
    showModal('🚨 Staff Alert Sent', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🚨</div>
            <p style="font-size: 24px; color: #f44336; margin: 20px 0; font-weight: 600;">
                Staff Alert Activated
            </p>
            <div style="background: #ffebee; padding: 25px; border-radius: 15px; margin: 20px 0; border: 3px solid #f44336;">
                <p style="font-size: 20px; color: #d32f2f; margin: 0; font-weight: 600;">
                    ⚡ A staff member will come to check on you immediately!
                </p>
            </div>
            <p style="font-size: 18px; color: #666;">
                Please stay where you are. Help is on the way.
            </p>
        </div>
    `);
    showSuccessFeedback('Emergency staff alert sent!');
}

function makePhoneCall() {
    showSuccessFeedback('Phone call initiated - staff will help you connect with your family member!');
}

function sendTextMessage() {
    showSuccessFeedback('Text message helper opened - staff will help you send a message!');
}

function scheduleVideoCall() {
    showSuccessFeedback('Video call scheduled - staff will set up the call at your preferred time!');
}

function recordVoiceMessage() {
    showSuccessFeedback('Voice recorder ready - staff will help you record and send your message!');
}

function playVoiceMessage(sender) {
    showSuccessFeedback(`Playing voice message from ${sender} - use the volume buttons to adjust!`);
}

function recordNewMessage() {
    showSuccessFeedback('Voice recording started - speak clearly and staff will help send it!');
}

function selectRecipient() {
    showSuccessFeedback('Recipient selection opened - choose who to send your voice message to!');
}

function callFamily(member) {
    showModal(`📹 Calling ${member}`, `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">📞</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Connecting to ${member}...
            </p>
            <div style="background: #e3f2fd; padding: 25px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 18px; color: #1976d2; margin: 0;">
                    📡 Setting up video call connection<br>
                    🔄 Staff is helping establish the call<br>
                    ⏳ Please wait a moment...
                </p>
            </div>
            <p style="font-size: 16px; color: #666;">
                The call will start automatically once ${member} answers.
            </p>
        </div>
    `);
    showSuccessFeedback(`Video call to ${member} initiated!`);
}

function groupVideoCall() {
    showSuccessFeedback('Group video call initiated - connecting with all available family members!');
}

function requestVideoCallHelp() {
    showSuccessFeedback('Video call assistance requested - staff will provide step-by-step help!');
}

// Voice Interaction System
let recognition = null;
let synthesis = window.speechSynthesis;
let isListening = false;
let isSpeaking = false;
let speechEnabled = true;
let voiceCommands = {
    'hello': () => speak('Hello! I\'m here to help. You can ask me to read the page, navigate to activities, or get help with anything.'),
    'help': () => showVoiceCommands(),
    'read page': () => readPageContent(),
    'activities': () => window.location.href = 'activities.html',
    'meals': () => window.location.href = 'meals.html',
    'schedule': () => window.location.href = 'schedule.html',
    'community': () => window.location.href = 'community.html',
    'games': () => window.location.href = 'games.html',
    'home': () => window.location.href = 'index.html',
    'medication': () => showMedicationReminder(),
    'health': () => showHealthTracker(),
    'family': () => showFamilyConnector(),
    'emergency': () => alertStaff(),
    // Family Communication Voice Commands
    'video call': () => { speak('Opening video call options'); startVideoCall(); },
    'call family': () => { speak('Starting family video call'); startVideoCall(); },
    'call sarah': () => { speak('Calling Sarah'); callFamily('sarah'); },
    'call michael': () => { speak('Calling Michael'); callFamily('michael'); },
    'call grandchildren': () => { speak('Calling grandchildren'); callFamily('grandchildren'); },
    'family chat': () => { speak('Opening family messaging'); openMessaging(); },
    'send message': () => { speak('Opening family messaging'); openMessaging(); },
    'group chat': () => { speak('Opening group chat options'); openMessaging(); },
    'share photos': () => { speak('Opening photo sharing'); sharePhotos(); },
    'photo sharing': () => { speak('Opening photo sharing options'); sharePhotos(); },
    'take photo': () => { speak('Opening camera to take a photo'); takeNewPhoto(); },
    'family contacts': () => { speak('Opening family contact list'); manageContacts(); },
    'contact list': () => { speak('Opening family contacts'); manageContacts(); },
    'phone book': () => { speak('Opening family contact list'); manageContacts(); },
    // Speech Control Commands
    'stop reading': () => stopSpeaking(),
    'pause': () => pauseAllSpeech(),
    'resume': () => resumeSpeaking(),
    'louder': () => increaseSpeechVolume(),
    'quieter': () => decreaseSpeechVolume(),
    'slower': () => decreaseSpeechRate(),
    'faster': () => increaseSpeechRate(),
    'repeat': () => repeatLastSpeech()
};

// Initialize Voice Recognition
function initializeVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onstart = function() {
            isListening = true;
            updateVoiceStatus('🎤 Listening... Speak your command', 'listening');
        };
        
        recognition.onresult = function(event) {
            const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
            updateVoiceStatus(`🗣️ You said: "${command}"`, 'processing');
            processVoiceCommand(command);
        };
        
        recognition.onerror = function(event) {
            updateVoiceStatus('❌ Voice recognition error. Please try again.', 'error');
            setTimeout(() => updateVoiceStatus('🔇 Voice assistance ready - Click microphone or say "Hello"', 'ready'), 3000);
        };
        
        recognition.onend = function() {
            isListening = false;
            if (document.getElementById('micToggle').classList.contains('active')) {
                setTimeout(startVoiceRecognition, 1000);
            } else {
                updateVoiceStatus('🔇 Voice assistance ready - Click microphone or say "Hello"', 'ready');
            }
        };
        
        // Auto-start voice recognition
        startVoiceRecognition();
        speak('Voice assistance activated. Say "help" to learn voice commands, or click anywhere to begin.');
    } else {
        updateVoiceStatus('❌ Voice recognition not supported in this browser', 'error');
    }
}

// Voice Command Processing
function processVoiceCommand(command) {
    // Find matching command
    const matchedCommand = Object.keys(voiceCommands).find(cmd => 
        command.includes(cmd) || cmd.includes(command)
    );
    
    if (matchedCommand) {
        speak(`Executing ${matchedCommand}`);
        voiceCommands[matchedCommand]();
        updateVoiceStatus(`✅ Executed: ${matchedCommand}`, 'success');
    } else {
        speak('Sorry, I didn\'t understand that command. Say "help" to see available commands.');
        updateVoiceStatus('❓ Command not recognized. Say "help" for commands.', 'error');
    }
    
    setTimeout(() => {
        if (isListening) {
            updateVoiceStatus('🎤 Listening for next command...', 'listening');
        }
    }, 2000);
}

// Text-to-Speech Functions
function speak(text, priority = false) {
    if (!speechEnabled) return;
    
    if (priority) {
        synthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = parseFloat(localStorage.getItem('speechRate') || '0.8');
    utterance.pitch = parseFloat(localStorage.getItem('speechPitch') || '1.0');
    utterance.volume = parseFloat(localStorage.getItem('speechVolume') || '0.9');
    
    // Use a clear, friendly voice if available
    const voices = synthesis.getVoices();
    const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Microsoft') || 
        voice.lang.includes('en')
    );
    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }
    
    utterance.onstart = () => {
        isSpeaking = true;
        document.getElementById('speakerToggle').classList.add('active');
    };
    
    utterance.onend = () => {
        isSpeaking = false;
        document.getElementById('speakerToggle').classList.remove('active');
    };
    
    synthesis.speak(utterance);
}

// Voice Control Functions
function startVoiceRecognition() {
    if (recognition && !isListening) {
        recognition.start();
        document.getElementById('micToggle').classList.add('active');
    } else if (!recognition) {
        initializeVoiceRecognition();
    }
}

function stopVoiceRecognition() {
    if (recognition && isListening) {
        recognition.stop();
        document.getElementById('micToggle').classList.remove('active');
        updateVoiceStatus('🔇 Voice recognition stopped', 'ready');
    }
}

function toggleMicrophone() {
    if (isListening) {
        stopVoiceRecognition();
        speak('Voice recognition turned off');
    } else {
        startVoiceRecognition();
    }
}

function toggleSpeaker() {
    speechEnabled = !speechEnabled;
    const speakerBtn = document.getElementById('speakerToggle');
    
    if (speechEnabled) {
        speakerBtn.classList.add('active');
        speak('Text-to-speech enabled');
        updateVoiceStatus('🔊 Text-to-speech enabled', 'ready');
    } else {
        synthesis.cancel();
        speakerBtn.classList.remove('active');
        updateVoiceStatus('🔇 Text-to-speech disabled', 'ready');
    }
}

function pauseAllSpeech() {
    if (synthesis.speaking) {
        synthesis.pause();
        updateVoiceStatus('⏸️ Speech paused - Click resume or say "resume"', 'paused');
    }
}

function resumeSpeaking() {
    if (synthesis.paused) {
        synthesis.resume();
        updateVoiceStatus('▶️ Speech resumed', 'ready');
    }
}

function stopSpeaking() {
    synthesis.cancel();
    updateVoiceStatus('⏹️ Speech stopped', 'ready');
}

// Content Reading Functions
function readPageContent() {
    const mainContent = document.querySelector('main');
    if (mainContent) {
        const textContent = extractReadableText(mainContent);
        speak('Reading page content. Say "stop reading" or "pause" to control.', true);
        setTimeout(() => speak(textContent), 2000);
    }
}

function extractReadableText(element) {
    let text = '';
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                const parent = node.parentElement;
                if (parent.style.display === 'none' || 
                    parent.hidden || 
                    parent.classList.contains('sr-only')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );
    
    let node;
    while (node = walker.nextNode()) {
        const trimmedText = node.textContent.trim();
        if (trimmedText && trimmedText.length > 2) {
            text += trimmedText + ' ';
        }
    }
    
    return text.replace(/\s+/g, ' ').trim();
}

// Voice Command Display
function showVoiceCommands() {
    const commandsList = Object.keys(voiceCommands).map(cmd => {
        const descriptions = {
            'hello': 'Start conversation',
            'help': 'Show this command list',
            'read page': 'Read all content on current page',
            'activities': 'Go to activities page',
            'meals': 'Go to meals page',
            'schedule': 'Go to schedule page', 
            'community': 'Go to community page',
            'games': 'Go to games page',
            'home': 'Go to home page',
            'medication': 'Show medication reminders',
            'health': 'Open health tracker',
            'family': 'Open family contacts',
            'emergency': 'Alert staff immediately',
            'stop reading': 'Stop text-to-speech',
            'pause': 'Pause current speech',
            'resume': 'Resume paused speech',
            'louder': 'Increase speech volume',
            'quieter': 'Decrease speech volume',
            'slower': 'Slow down speech',
            'faster': 'Speed up speech',
            'repeat': 'Repeat last speech'
        };
        return `<strong>"${cmd}"</strong> - ${descriptions[cmd] || 'Execute command'}`;
    }).join('<br>');
    
    showModal('🎤 Voice Commands', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🗣️</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Available Voice Commands
            </p>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 20px 0; text-align: left; max-height: 400px; overflow-y: auto;">
                <h3 style="color: #2e7d32; margin-bottom: 20px; text-align: center;">📋 Say any of these commands:</h3>
                <div style="font-size: 16px; line-height: 2; color: #2c3e50;">
                    ${commandsList}
                </div>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 18px; color: #2e7d32; margin: 0; font-weight: 600;">
                    💡 Tip: Speak clearly and wait for the beep. Commands work even if the microphone button isn't pressed!
                </p>
            </div>
            
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button onclick="testVoiceCommand()" style="
                    background: #4caf50; color: white; border: none; padding: 12px 25px;
                    border-radius: 20px; font-size: 16px; cursor: pointer; font-weight: bold;
                ">Test Voice Command</button>
                <button onclick="adjustSpeechSettings()" style="
                    background: #2196f3; color: white; border: none; padding: 12px 25px;
                    border-radius: 20px; font-size: 16px; cursor: pointer; font-weight: bold;
                ">Speech Settings</button>
            </div>
        </div>
    `);
    
    speak('Here are all available voice commands. You can say any of these at any time.');
}

// Speech Settings
function adjustSpeechSettings() {
    const currentRate = parseFloat(localStorage.getItem('speechRate') || '0.8');
    const currentVolume = parseFloat(localStorage.getItem('speechVolume') || '0.9');
    const currentPitch = parseFloat(localStorage.getItem('speechPitch') || '1.0');
    
    showModal('⚙️ Speech Settings', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🔊</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Customize Text-to-Speech
            </p>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 20px 0; text-align: left;">
                <div style="margin: 20px 0;">
                    <label style="font-size: 18px; color: #2c3e50; display: block; margin-bottom: 10px;"><strong>Speech Speed:</strong></label>
                    <input type="range" id="speechRate" min="0.3" max="1.5" step="0.1" value="${currentRate}" 
                           onchange="updateSpeechRate(this.value)" 
                           style="width: 100%; height: 8px; border-radius: 5px; background: #ddd;">
                    <div style="display: flex; justify-content: space-between; font-size: 14px; color: #666; margin-top: 5px;">
                        <span>Slower</span><span>Normal</span><span>Faster</span>
                    </div>
                </div>
                
                <div style="margin: 20px 0;">
                    <label style="font-size: 18px; color: #2c3e50; display: block; margin-bottom: 10px;"><strong>Volume Level:</strong></label>
                    <input type="range" id="speechVolume" min="0.2" max="1.0" step="0.1" value="${currentVolume}" 
                           onchange="updateSpeechVolume(this.value)" 
                           style="width: 100%; height: 8px; border-radius: 5px; background: #ddd;">
                    <div style="display: flex; justify-content: space-between; font-size: 14px; color: #666; margin-top: 5px;">
                        <span>Quiet</span><span>Medium</span><span>Loud</span>
                    </div>
                </div>
                
                <div style="margin: 20px 0;">
                    <label style="font-size: 18px; color: #2c3e50; display: block; margin-bottom: 10px;"><strong>Voice Pitch:</strong></label>
                    <input type="range" id="speechPitch" min="0.8" max="1.2" step="0.1" value="${currentPitch}" 
                           onchange="updateSpeechPitch(this.value)" 
                           style="width: 100%; height: 8px; border-radius: 5px; background: #ddd;">
                    <div style="display: flex; justify-content: space-between; font-size: 14px; color: #666; margin-top: 5px;">
                        <span>Lower</span><span>Normal</span><span>Higher</span>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button onclick="testSpeechSettings()" style="
                    background: #4caf50; color: white; border: none; padding: 15px 30px;
                    border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                ">Test Speech</button>
                <button onclick="resetSpeechSettings()" style="
                    background: #ff9800; color: white; border: none; padding: 15px 30px;
                    border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                ">Reset to Default</button>
            </div>
        </div>
    `);
}

// Speech Setting Updaters
function updateSpeechRate(value) {
    localStorage.setItem('speechRate', value);
}

function updateSpeechVolume(value) {
    localStorage.setItem('speechVolume', value);
}

function updateSpeechPitch(value) {
    localStorage.setItem('speechPitch', value);
}

function testSpeechSettings() {
    speak('This is a test of your speech settings. The voice should sound clear and comfortable.', true);
}

function resetSpeechSettings() {
    localStorage.setItem('speechRate', '0.8');
    localStorage.setItem('speechVolume', '0.9');
    localStorage.setItem('speechPitch', '1.0');
    document.getElementById('speechRate').value = 0.8;
    document.getElementById('speechVolume').value = 0.9;
    document.getElementById('speechPitch').value = 1.0;
    speak('Speech settings reset to default values.');
}

// Accessibility Functions
function enableHighContrast() {
    document.body.classList.toggle('high-contrast');
    const isEnabled = document.body.classList.contains('high-contrast');
    speak(isEnabled ? 'High contrast mode enabled' : 'High contrast mode disabled');
    localStorage.setItem('highContrast', isEnabled);
}

function increaseFontSize() {
    const currentSize = parseInt(localStorage.getItem('fontSize') || '100');
    const newSize = Math.min(currentSize + 20, 200);
    document.documentElement.style.fontSize = newSize + '%';
    localStorage.setItem('fontSize', newSize);
    speak(`Font size increased to ${newSize} percent`);
}

function enableScreenReader() {
    speak('Screen reader mode activated. All clickable elements will be announced when you navigate with Tab key.');
    document.body.classList.add('screen-reader-mode');
    addScreenReaderSupport();
}

// Utility Functions
function updateVoiceStatus(message, status) {
    const statusElement = document.getElementById('voiceStatus');
    if (statusElement) {
        const iconMap = {
            'listening': '🎤',
            'processing': '🔄',
            'success': '✅',
            'error': '❌',
            'ready': '🔇',
            'paused': '⏸️'
        };
        
        statusElement.innerHTML = `
            <span class="status-icon">${iconMap[status] || '🔇'}</span>
            <span class="status-text">${message}</span>
        `;
        
        statusElement.className = `status-indicator ${status}`;
    }
}

function testVoiceCommand() {
    speak('Say "hello" to test voice recognition, or try "read page" to have this content read aloud.');
    setTimeout(startVoiceRecognition, 3000);
}

function addScreenReaderSupport() {
    // Add focus indicators and announcements
    const clickableElements = document.querySelectorAll('button, a, [onclick], input, select, textarea');
    clickableElements.forEach(element => {
        element.addEventListener('focus', () => {
            const text = element.textContent || element.value || element.title || element.alt || 'Interactive element';
            speak(`Focused on: ${text}`);
        });
    });
}

function toggleVoiceHelp() {
    showModal('❓ Voice Help', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🎤</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Voice Assistance Help
            </p>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 20px 0; text-align: left;">
                <h3 style="color: #2e7d32; margin-bottom: 20px;">🗣️ How to Use Voice Commands:</h3>
                <ul style="font-size: 18px; line-height: 2; color: #2c3e50; text-align: left;">
                    <li><strong>Activate:</strong> Click the microphone button or say "Hello"</li>
                    <li><strong>Navigate:</strong> Say "activities", "meals", "schedule", etc.</li>
                    <li><strong>Get Help:</strong> Say "help" or "emergency" for immediate assistance</li>
                    <li><strong>Control Reading:</strong> Say "read page", "pause", "stop reading"</li>
                    <li><strong>Adjust Speech:</strong> Say "louder", "slower", "faster", "repeat"</li>
                </ul>
                
                <h3 style="color: #1976d2; margin: 20px 0 15px 0;">🔊 Text-to-Speech Features:</h3>
                <ul style="font-size: 18px; line-height: 2; color: #2c3e50; text-align: left;">
                    <li>Any text can be read aloud automatically</li>
                    <li>Adjustable speed, volume, and voice pitch</li>
                    <li>Pause and resume at any time</li>
                    <li>High-quality, clear voice synthesis</li>
                </ul>
            </div>
            
            <div style="background: #fff3e0; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p style="font-size: 16px; color: #ef6c00; margin: 0;">
                    💡 <strong>Pro Tip:</strong> Voice commands work continuously - you don't need to press buttons every time!
                </p>
            </div>
            
            <button onclick="startVoiceRecognition()" style="
                background: #4caf50; color: white; border: none; padding: 15px 30px;
                border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
            ">Start Voice Control Now</button>
        </div>
    `);
    
    speak('Voice help is displayed. Voice commands are always active when the microphone is on.');
}

// Initialize voice system when page loads
window.addEventListener('load', function() {
    // Load saved accessibility settings
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
    
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.documentElement.style.fontSize = savedFontSize + '%';
    }
    
    // Initialize voice recognition after a short delay
    setTimeout(initializeVoiceRecognition, 2000);
    
    // Add keyboard shortcuts for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.altKey) {
            switch(e.key) {
                case 'v':
                    e.preventDefault();
                    toggleMicrophone();
                    break;
                case 's':
                    e.preventDefault();
                    toggleSpeaker();
                    break;
                case 'r':
                    e.preventDefault();
                    readPageContent();
                    break;
                case 'h':
                    e.preventDefault();
                    showVoiceHelp();
                    break;
            }
        }
    });
});

// Reminders & Alerts System
let notificationsEnabled = true;
let activeNotifications = [];
let medicationSchedule = [
    { id: 1, name: 'Blood Pressure Medication', time: '08:00', taken: false, frequency: 'daily', dosage: '10mg' },
    { id: 2, name: 'Vitamin D', time: '12:00', taken: false, frequency: 'daily', dosage: '1000 IU' },
    { id: 3, name: 'Heart Medication', time: '18:00', taken: false, frequency: 'daily', dosage: '5mg' },
    { id: 4, name: 'Sleep Aid', time: '21:00', taken: false, frequency: 'as needed', dosage: '25mg' }
];

let mealSchedule = [
    { id: 1, name: 'Breakfast', time: '07:30', served: false, menu: 'Oatmeal with berries' },
    { id: 2, name: 'Morning Snack', time: '10:00', served: false, menu: 'Apple slices with cheese' },
    { id: 3, name: 'Lunch', time: '12:30', served: false, menu: 'Grilled chicken salad' },
    { id: 4, name: 'Afternoon Snack', time: '15:00', served: false, menu: 'Yogurt with granola' },
    { id: 5, name: 'Dinner', time: '18:00', served: false, menu: 'Baked salmon with vegetables' },
    { id: 6, name: 'Evening Snack', time: '20:00', served: false, menu: 'Herbal tea with crackers' }
];

let activitySchedule = [
    { id: 1, name: 'Morning Exercise', time: '09:00', joined: false, type: 'physical', location: 'Recreation Room' },
    { id: 2, name: 'Bingo', time: '14:00', joined: false, type: 'social', location: 'Main Hall' },
    { id: 3, name: 'Book Club', time: '15:30', joined: false, type: 'educational', location: 'Library' },
    { id: 4, name: 'Music Therapy', time: '16:30', joined: false, type: 'therapeutic', location: 'Music Room' },
    { id: 5, name: 'Movie Night', time: '19:00', joined: false, type: 'entertainment', location: 'Theater Room' }
];

// Notification System Functions
function createNotification(type, title, message, urgency = 'normal', actionCallback = null) {
    const notification = {
        id: Date.now(),
        type: type, // 'medication', 'meal', 'activity', 'general'
        title: title,
        message: message,
        urgency: urgency, // 'low', 'normal', 'high', 'critical'
        timestamp: new Date(),
        read: false,
        actionCallback: actionCallback
    };
    
    activeNotifications.push(notification);
    updateNotificationDisplay();
    
    if (notificationsEnabled) {
        showNotificationPopup(notification);
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: getNotificationIcon(type),
                tag: notification.id
            });
        }
    }
    
    return notification.id;
}

function showNotificationPopup(notification) {
    const popup = document.createElement('div');
    popup.className = `notification-popup ${notification.urgency}`;
    popup.innerHTML = `
        <div class="notification-content">
            <div class="notification-header">
                <span class="notification-type-icon">${getNotificationIcon(notification.type)}</span>
                <strong class="notification-title">${notification.title}</strong>
                <button class="notification-close" onclick="closeNotificationPopup(this)">&times;</button>
            </div>
            <div class="notification-message">${notification.message}</div>
            ${notification.actionCallback ? `
                <div class="notification-actions">
                    <button class="notification-action-btn" onclick="${notification.actionCallback}()">Take Action</button>
                    <button class="notification-dismiss-btn" onclick="closeNotificationPopup(this)">Dismiss</button>
                </div>
            ` : `
                <div class="notification-actions">
                    <button class="notification-dismiss-btn" onclick="closeNotificationPopup(this)">OK</button>
                </div>
            `}
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Auto-dismiss after appropriate time based on urgency
    const dismissTime = {
        'low': 5000,
        'normal': 10000,
        'high': 15000,
        'critical': 0 // Don't auto-dismiss critical notifications
    };
    
    if (dismissTime[notification.urgency] > 0) {
        setTimeout(() => {
            if (document.body.contains(popup)) {
                closeNotificationPopup(popup.querySelector('.notification-close'));
            }
        }, dismissTime[notification.urgency]);
    }
    
    // Speak notification if text-to-speech is enabled
    if (speechEnabled) {
        speak(`${notification.title}. ${notification.message}`);
    }
}

function closeNotificationPopup(button) {
    const popup = button.closest('.notification-popup');
    if (popup) {
        popup.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (document.body.contains(popup)) {
                document.body.removeChild(popup);
            }
        }, 300);
    }
}

function getNotificationIcon(type) {
    const icons = {
        'medication': '💊',
        'meal': '🍽️',
        'activity': '🎯',
        'general': '📢',
        'emergency': '🚨',
        'reminder': '⏰'
    };
    return icons[type] || '📢';
}

// Medication Alert Functions
function showMedicationAlerts() {
    const currentTime = new Date();
    const upcomingMeds = medicationSchedule.filter(med => {
        const medTime = new Date();
        const [hours, minutes] = med.time.split(':');
        medTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        return !med.taken && medTime <= currentTime;
    });
    
    showModal('💊 Medication Alerts', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">💊</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Current Medication Alerts
            </p>
            
            ${upcomingMeds.length > 0 ? `
                <div style="background: #ffebee; padding: 20px; border-radius: 15px; margin: 20px 0; border: 2px solid #f44336;">
                    <h3 style="color: #d32f2f; margin-bottom: 20px;">⚠️ Medications Due Now:</h3>
                    ${upcomingMeds.map(med => `
                        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 10px; border: 2px solid #f44336;">
                            <strong style="font-size: 18px; color: #d32f2f;">${med.name}</strong><br>
                            <span style="color: #666;">Dosage: ${med.dosage} • Due: ${med.time}</span><br>
                            <button onclick="markMedicationTaken(${med.id})" style="
                                background: #4caf50; color: white; border: none; padding: 8px 15px;
                                border-radius: 15px; font-size: 14px; cursor: pointer; margin-top: 8px;
                            ">Mark as Taken</button>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div style="background: #e8f5e8; padding: 25px; border-radius: 15px; margin: 20px 0;">
                    <p style="font-size: 20px; color: #2e7d32; margin: 0; font-weight: 600;">
                        ✅ All medications are up to date!
                    </p>
                </div>
            `}
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #2e7d32; margin-bottom: 15px;">Today's Schedule:</h3>
                ${medicationSchedule.map(med => `
                    <div style="
                        background: ${med.taken ? '#e8f5e8' : 'white'}; padding: 12px; margin: 8px 0; border-radius: 8px;
                        border: 2px solid ${med.taken ? '#4caf50' : '#ddd'}; display: flex; justify-content: space-between; align-items: center;
                    ">
                        <div>
                            <strong>${med.name}</strong><br>
                            <span style="color: #666; font-size: 14px;">${med.time} • ${med.dosage}</span>
                        </div>
                        <div style="font-size: 20px;">${med.taken ? '✅' : '⏰'}</div>
                    </div>
                `).join('')}
            </div>
            
            <button onclick="setupMedicationReminders()" style="
                background: #2196f3; color: white; border: none; padding: 15px 30px;
                border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
            ">Setup Reminders</button>
        </div>
    `);
}

function markMedicationTaken(medId) {
    const medication = medicationSchedule.find(med => med.id === medId);
    if (medication) {
        medication.taken = true;
        createNotification('medication', 'Medication Confirmed', 
            `✅ ${medication.name} marked as taken at ${new Date().toLocaleTimeString()}`, 'normal');
        showSuccessFeedback(`${medication.name} marked as taken!`);
        updateNotificationDisplay();
    }
}

function setupMedicationReminders() {
    showModal('⚙️ Medication Reminder Setup', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">⚙️</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Customize Your Medication Reminders
            </p>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 20px 0; text-align: left;">
                <h3 style="color: #2e7d32; margin-bottom: 20px;">Reminder Settings:</h3>
                
                <div style="margin: 15px 0;">
                    <label style="font-size: 16px; display: block; margin-bottom: 8px;"><strong>Reminder Time Before Dose:</strong></label>
                    <select style="width: 100%; padding: 8px; font-size: 16px; border-radius: 5px; border: 2px solid #ddd;">
                        <option value="0">At dose time</option>
                        <option value="5" selected>5 minutes before</option>
                        <option value="10">10 minutes before</option>
                        <option value="15">15 minutes before</option>
                        <option value="30">30 minutes before</option>
                    </select>
                </div>
                
                <div style="margin: 15px 0;">
                    <label style="font-size: 16px; display: block; margin-bottom: 8px;"><strong>Reminder Method:</strong></label>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="font-size: 14px;"><input type="checkbox" checked> Visual notifications</label>
                        <label style="font-size: 14px;"><input type="checkbox" checked> Audio alerts</label>
                        <label style="font-size: 14px;"><input type="checkbox" checked> Voice announcements</label>
                        <label style="font-size: 14px;"><input type="checkbox"> Staff notification</label>
                    </div>
                </div>
                
                <div style="margin: 15px 0;">
                    <label style="font-size: 16px; display: block; margin-bottom: 8px;"><strong>Snooze Options:</strong></label>
                    <select style="width: 100%; padding: 8px; font-size: 16px; border-radius: 5px; border: 2px solid #ddd;">
                        <option value="5" selected>5 minutes</option>
                        <option value="10">10 minutes</option>
                        <option value="15">15 minutes</option>
                        <option value="none">No snooze</option>
                    </select>
                </div>
            </div>
            
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button onclick="saveMedicationSettings()" style="
                    background: #4caf50; color: white; border: none; padding: 15px 30px;
                    border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                ">Save Settings</button>
                <button onclick="testMedicationAlert()" style="
                    background: #ff9800; color: white; border: none; padding: 15px 30px;
                    border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                ">Test Alert</button>
            </div>
        </div>
    `);
}

// Meal Alert Functions
function showMealAlerts() {
    const currentTime = new Date();
    const upcomingMeals = mealSchedule.filter(meal => {
        const mealTime = new Date();
        const [hours, minutes] = meal.time.split(':');
        mealTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        return !meal.served && mealTime <= currentTime;
    });
    
    showModal('🍽️ Meal Time Alerts', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🍽️</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Current Meal Alerts
            </p>
            
            ${upcomingMeals.length > 0 ? `
                <div style="background: #fff8e1; padding: 20px; border-radius: 15px; margin: 20px 0; border: 2px solid #ff9800;">
                    <h3 style="color: #ef6c00; margin-bottom: 20px;">🔔 Meals Ready Now:</h3>
                    ${upcomingMeals.map(meal => `
                        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 10px; border: 2px solid #ff9800;">
                            <strong style="font-size: 18px; color: #ef6c00;">${meal.name}</strong><br>
                            <span style="color: #666;">Menu: ${meal.menu} • Time: ${meal.time}</span><br>
                            <button onclick="confirmMealAttendance(${meal.id})" style="
                                background: #4caf50; color: white; border: none; padding: 8px 15px;
                                border-radius: 15px; font-size: 14px; cursor: pointer; margin-top: 8px;
                            ">I'm Coming to Eat</button>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div style="background: #e8f5e8; padding: 25px; border-radius: 15px; margin: 20px 0;">
                    <p style="font-size: 20px; color: #2e7d32; margin: 0; font-weight: 600;">
                        ✅ No immediate meal alerts. Next meal coming up!
                    </p>
                </div>
            `}
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #2e7d32; margin-bottom: 15px;">Today's Meal Schedule:</h3>
                ${mealSchedule.map(meal => `
                    <div style="
                        background: ${meal.served ? '#e8f5e8' : 'white'}; padding: 12px; margin: 8px 0; border-radius: 8px;
                        border: 2px solid ${meal.served ? '#4caf50' : '#ddd'}; display: flex; justify-content: space-between; align-items: center;
                    ">
                        <div>
                            <strong>${meal.name}</strong><br>
                            <span style="color: #666; font-size: 14px;">${meal.time} • ${meal.menu}</span>
                        </div>
                        <div style="font-size: 20px;">${meal.served ? '✅' : '🍽️'}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `);
}

function confirmMealAttendance(mealId) {
    const meal = mealSchedule.find(m => m.id === mealId);
    if (meal) {
        meal.served = true;
        createNotification('meal', 'Meal Confirmed', 
            `🍽️ Confirmed attendance for ${meal.name}`, 'normal');
        showSuccessFeedback(`Confirmed for ${meal.name}!`);
    }
}

// Activity Alert Functions
function showActivityAlerts() {
    const currentTime = new Date();
    const upcomingActivities = activitySchedule.filter(activity => {
        const activityTime = new Date();
        const [hours, minutes] = activity.time.split(':');
        activityTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        const timeDiff = activityTime.getTime() - currentTime.getTime();
        return !activity.joined && timeDiff > 0 && timeDiff <= 3600000; // Within 1 hour
    });
    
    showModal('🎯 Activity Notifications', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🎯</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Upcoming Activity Alerts
            </p>
            
            ${upcomingActivities.length > 0 ? `
                <div style="background: #e3f2fd; padding: 20px; border-radius: 15px; margin: 20px 0; border: 2px solid #2196f3;">
                    <h3 style="color: #1976d2; margin-bottom: 20px;">🕐 Starting Soon:</h3>
                    ${upcomingActivities.map(activity => `
                        <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 10px; border: 2px solid #2196f3;">
                            <strong style="font-size: 18px; color: #1976d2;">${activity.name}</strong><br>
                            <span style="color: #666;">Time: ${activity.time} • Location: ${activity.location}</span><br>
                            <button onclick="joinActivity(${activity.id})" style="
                                background: #4caf50; color: white; border: none; padding: 8px 15px;
                                border-radius: 15px; font-size: 14px; cursor: pointer; margin-top: 8px;
                            ">Join Activity</button>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div style="background: #e8f5e8; padding: 25px; border-radius: 15px; margin: 20px 0;">
                    <p style="font-size: 20px; color: #2e7d32; margin: 0; font-weight: 600;">
                        📅 No immediate activities. Check the full schedule below!
                    </p>
                </div>
            `}
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #2e7d32; margin-bottom: 15px;">Today's Activity Schedule:</h3>
                ${activitySchedule.map(activity => `
                    <div style="
                        background: ${activity.joined ? '#e8f5e8' : 'white'}; padding: 12px; margin: 8px 0; border-radius: 8px;
                        border: 2px solid ${activity.joined ? '#4caf50' : '#ddd'}; display: flex; justify-content: space-between; align-items: center;
                    ">
                        <div>
                            <strong>${activity.name}</strong><br>
                            <span style="color: #666; font-size: 14px;">${activity.time} • ${activity.location}</span>
                        </div>
                        <div style="font-size: 20px;">${activity.joined ? '✅' : '🎯'}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `);
}

function joinActivity(activityId) {
    const activity = activitySchedule.find(a => a.id === activityId);
    if (activity) {
        activity.joined = true;
        createNotification('activity', 'Activity Joined', 
            `🎯 You're registered for ${activity.name} at ${activity.time}`, 'normal');
        showSuccessFeedback(`Joined ${activity.name}!`);
    }
}

// Notification Management Functions
function showAllNotifications() {
    showModal('📋 All Notifications', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">📋</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Notification History
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0; max-height: 400px; overflow-y: auto;">
                ${activeNotifications.length > 0 ? 
                    activeNotifications.slice().reverse().map(notif => `
                        <div style="
                            background: ${notif.read ? '#f0f0f0' : 'white'}; padding: 15px; margin: 10px 0; border-radius: 10px;
                            border: 2px solid ${getNotificationColor(notif.urgency)}; text-align: left;
                        ">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                <div>
                                    <span style="font-size: 20px; margin-right: 10px;">${getNotificationIcon(notif.type)}</span>
                                    <strong style="font-size: 16px;">${notif.title}</strong><br>
                                    <span style="color: #666; font-size: 14px;">${notif.message}</span><br>
                                    <span style="color: #999; font-size: 12px;">${notif.timestamp.toLocaleString()}</span>
                                </div>
                                ${!notif.read ? `<button onclick="markNotificationRead(${notif.id})" style="
                                    background: #2196f3; color: white; border: none; padding: 5px 10px;
                                    border-radius: 10px; font-size: 12px; cursor: pointer;
                                ">Mark Read</button>` : ''}
                            </div>
                        </div>
                    `).join('') : 
                    '<p style="color: #666; font-style: italic;">No notifications yet today.</p>'
                }
            </div>
            
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button onclick="clearAllNotifications()" style="
                    background: #ff9800; color: white; border: none; padding: 12px 25px;
                    border-radius: 20px; font-size: 16px; cursor: pointer; font-weight: bold;
                ">Clear All</button>
                <button onclick="openNotificationSettings()" style="
                    background: #2196f3; color: white; border: none; padding: 12px 25px;
                    border-radius: 20px; font-size: 16px; cursor: pointer; font-weight: bold;
                ">Settings</button>
            </div>
        </div>
    `);
}

function updateNotificationDisplay() {
    const unreadCount = activeNotifications.filter(n => !n.read).length;
    const countElement = document.getElementById('notificationCount');
    if (countElement) {
        countElement.textContent = unreadCount;
        countElement.style.display = unreadCount > 0 ? 'block' : 'none';
    }
    
    const activeContainer = document.getElementById('activeNotifications');
    if (activeContainer) {
        const recentNotifications = activeNotifications.slice(-3).reverse();
        activeContainer.innerHTML = recentNotifications.length > 0 ? 
            recentNotifications.map(notif => `
                <div class="notification-item ${notif.urgency} ${notif.read ? 'read' : 'unread'}">
                    <span class="notif-icon">${getNotificationIcon(notif.type)}</span>
                    <div class="notif-content">
                        <strong>${notif.title}</strong>
                        <p>${notif.message}</p>
                        <small>${notif.timestamp.toLocaleTimeString()}</small>
                    </div>
                </div>
            `).join('') : 
            '<p class="no-notifications">No recent notifications</p>';
    }
}

function getNotificationColor(urgency) {
    const colors = {
        'low': '#2196f3',
        'normal': '#4caf50',
        'high': '#ff9800',
        'critical': '#f44336'
    };
    return colors[urgency] || '#4caf50';
}

// Automatic Reminder System
function startReminderSystem() {
    // Check for reminders every minute
    setInterval(checkReminders, 60000);
    
    // Initial check
    setTimeout(checkReminders, 5000);
}

function checkReminders() {
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    
    // Check medication reminders
    medicationSchedule.forEach(med => {
        if (!med.taken && med.time === currentTime) {
            createNotification('medication', 'Medication Reminder', 
                `Time to take your ${med.name} (${med.dosage})`, 'high', 'showMedicationAlerts');
        }
    });
    
    // Check meal reminders (15 minutes before)
    mealSchedule.forEach(meal => {
        const mealTime = new Date();
        const [hours, minutes] = meal.time.split(':');
        mealTime.setHours(parseInt(hours), parseInt(minutes) - 15, 0, 0);
        
        if (!meal.served && mealTime.getHours() === now.getHours() && mealTime.getMinutes() === now.getMinutes()) {
            createNotification('meal', 'Meal Reminder', 
                `${meal.name} will be served in 15 minutes. Menu: ${meal.menu}`, 'normal', 'showMealAlerts');
        }
    });
    
    // Check activity reminders (30 minutes before)
    activitySchedule.forEach(activity => {
        const activityTime = new Date();
        const [hours, minutes] = activity.time.split(':');
        activityTime.setHours(parseInt(hours), parseInt(minutes) - 30, 0, 0);
        
        if (!activity.joined && activityTime.getHours() === now.getHours() && activityTime.getMinutes() === now.getMinutes()) {
            createNotification('activity', 'Activity Reminder', 
                `${activity.name} starts in 30 minutes at ${activity.location}`, 'normal', 'showActivityAlerts');
        }
    });
}

// Utility Functions
function toggleNotifications() {
    notificationsEnabled = !notificationsEnabled;
    const toggleBtn = document.getElementById('notificationToggle');
    if (toggleBtn) {
        toggleBtn.innerHTML = `<span class="notification-icon">${notificationsEnabled ? '🔔' : '🔕'}</span>`;
        toggleBtn.title = notificationsEnabled ? 'Turn Off Notifications' : 'Turn On Notifications';
    }
    
    createNotification('general', 'Notifications ' + (notificationsEnabled ? 'Enabled' : 'Disabled'), 
        `Notifications are now ${notificationsEnabled ? 'on' : 'off'}`, 'low');
}

function openNotificationSettings() {
    showModal('⚙️ Notification Settings', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">⚙️</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Customize Your Alerts
            </p>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 20px 0; text-align: left;">
                <h3 style="color: #2e7d32; margin-bottom: 20px;">Notification Types:</h3>
                
                <div style="margin: 15px 0;">
                    <label style="font-size: 16px; display: flex; align-items: center; margin-bottom: 10px;">
                        <input type="checkbox" checked style="margin-right: 10px; transform: scale(1.2);"> 
                        <strong>Medication Reminders</strong>
                    </label>
                    <label style="font-size: 16px; display: flex; align-items: center; margin-bottom: 10px;">
                        <input type="checkbox" checked style="margin-right: 10px; transform: scale(1.2);"> 
                        <strong>Meal Time Alerts</strong>
                    </label>
                    <label style="font-size: 16px; display: flex; align-items: center; margin-bottom: 10px;">
                        <input type="checkbox" checked style="margin-right: 10px; transform: scale(1.2);"> 
                        <strong>Activity Notifications</strong>
                    </label>
                    <label style="font-size: 16px; display: flex; align-items: center; margin-bottom: 10px;">
                        <input type="checkbox" style="margin-right: 10px; transform: scale(1.2);"> 
                        <strong>Staff Announcements</strong>
                    </label>
                </div>
                
                <h3 style="color: #2e7d32; margin: 20px 0 15px 0;">Alert Methods:</h3>
                <div style="margin: 15px 0;">
                    <label style="font-size: 16px; display: flex; align-items: center; margin-bottom: 10px;">
                        <input type="checkbox" checked style="margin-right: 10px; transform: scale(1.2);"> 
                        <strong>Visual Pop-ups</strong>
                    </label>
                    <label style="font-size: 16px; display: flex; align-items: center; margin-bottom: 10px;">
                        <input type="checkbox" checked style="margin-right: 10px; transform: scale(1.2);"> 
                        <strong>Audio Alerts</strong>
                    </label>
                    <label style="font-size: 16px; display: flex; align-items: center; margin-bottom: 10px;">
                        <input type="checkbox" checked style="margin-right: 10px; transform: scale(1.2);"> 
                        <strong>Voice Announcements</strong>
                    </label>
                    <label style="font-size: 16px; display: flex; align-items: center; margin-bottom: 10px;">
                        <input type="checkbox" style="margin-right: 10px; transform: scale(1.2);"> 
                        <strong>Browser Notifications</strong>
                    </label>
                </div>
            </div>
            
            <button onclick="saveNotificationSettings()" style="
                background: #4caf50; color: white; border: none; padding: 15px 30px;
                border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
            ">Save Settings</button>
        </div>
    `);
}

function saveNotificationSettings() {
    showSuccessFeedback('Notification settings saved!');
    createNotification('general', 'Settings Saved', 'Your notification preferences have been updated', 'normal');
}

function clearAllNotifications() {
    activeNotifications = [];
    updateNotificationDisplay();
    showSuccessFeedback('All notifications cleared!');
}

function markNotificationRead(notificationId) {
    const notification = activeNotifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        updateNotificationDisplay();
    }
}

// Additional utility functions for reminders
function setupMealReminders() {
    showModal('🍽️ Meal Reminder Setup', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🍽️</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Customize Your Meal Alerts
            </p>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 20px 0; text-align: left;">
                <h3 style="color: #2e7d32; margin-bottom: 20px;">Meal Reminder Settings:</h3>
                
                <div style="margin: 15px 0;">
                    <label style="font-size: 16px; display: block; margin-bottom: 8px;"><strong>Reminder Time Before Meal:</strong></label>
                    <select style="width: 100%; padding: 8px; font-size: 16px; border-radius: 5px; border: 2px solid #ddd;">
                        <option value="0">At meal time</option>
                        <option value="15" selected>15 minutes before</option>
                        <option value="30">30 minutes before</option>
                        <option value="60">1 hour before</option>
                    </select>
                </div>
                
                <div style="margin: 15px 0;">
                    <label style="font-size: 16px; display: block; margin-bottom: 8px;"><strong>Dietary Preferences:</strong></label>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="font-size: 14px;"><input type="checkbox"> Low sodium alerts</label>
                        <label style="font-size: 14px;"><input type="checkbox"> Diabetic friendly reminders</label>
                        <label style="font-size: 14px;"><input type="checkbox"> Allergy warnings</label>
                        <label style="font-size: 14px;"><input type="checkbox"> Hydration reminders</label>
                    </div>
                </div>
            </div>
            
            <button onclick="saveMealSettings()" style="
                background: #4caf50; color: white; border: none; padding: 15px 30px;
                border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
            ">Save Settings</button>
        </div>
    `);
}

function setupActivityReminders() {
    showModal('🎯 Activity Reminder Setup', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">🎯</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Customize Your Activity Alerts
            </p>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 20px 0; text-align: left;">
                <h3 style="color: #2e7d32; margin-bottom: 20px;">Activity Reminder Settings:</h3>
                
                <div style="margin: 15px 0;">
                    <label style="font-size: 16px; display: block; margin-bottom: 8px;"><strong>Reminder Time Before Activity:</strong></label>
                    <select style="width: 100%; padding: 8px; font-size: 16px; border-radius: 5px; border: 2px solid #ddd;">
                        <option value="15">15 minutes before</option>
                        <option value="30" selected>30 minutes before</option>
                        <option value="60">1 hour before</option>
                        <option value="120">2 hours before</option>
                    </select>
                </div>
                
                <div style="margin: 15px 0;">
                    <label style="font-size: 16px; display: block; margin-bottom: 8px;"><strong>Activity Types to Remind:</strong></label>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="font-size: 14px;"><input type="checkbox" checked> Physical activities</label>
                        <label style="font-size: 14px;"><input type="checkbox" checked> Social activities</label>
                        <label style="font-size: 14px;"><input type="checkbox" checked> Educational activities</label>
                        <label style="font-size: 14px;"><input type="checkbox" checked> Therapeutic sessions</label>
                        <label style="font-size: 14px;"><input type="checkbox" checked> Entertainment events</label>
                    </div>
                </div>
            </div>
            
            <button onclick="saveActivitySettings()" style="
                background: #4caf50; color: white; border: none; padding: 15px 30px;
                border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
            ">Save Settings</button>
        </div>
    `);
}

function saveMedicationSettings() {
    showSuccessFeedback('Medication reminder settings saved!');
    createNotification('medication', 'Settings Updated', 'Your medication reminder preferences have been saved', 'normal');
}

function saveMealSettings() {
    showSuccessFeedback('Meal reminder settings saved!');
    createNotification('meal', 'Settings Updated', 'Your meal reminder preferences have been saved', 'normal');
}

function saveActivitySettings() {
    showSuccessFeedback('Activity reminder settings saved!');
    createNotification('activity', 'Settings Updated', 'Your activity reminder preferences have been saved', 'normal');
}

function testMedicationAlert() {
    createNotification('medication', 'Test Alert', 'This is a test medication reminder', 'high');
    showSuccessFeedback('Test alert sent!');
}

function viewMedicationHistory() {
    showModal('📊 Medication History', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">📊</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Your Medication History
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #2e7d32; margin-bottom: 15px;">This Week's Adherence:</h3>
                <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; text-align: center;">
                    ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => `
                        <div style="padding: 10px; border-radius: 8px; background: ${index < 5 ? '#e8f5e8' : '#fff3e0'}; border: 2px solid ${index < 5 ? '#4caf50' : '#ff9800'};">
                            <strong>${day}</strong><br>
                            <span style="font-size: 24px;">${index < 5 ? '✅' : '⏰'}</span><br>
                            <small>${index < 5 ? '100%' : 'Pending'}</small>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <p style="color: #666; font-style: italic;">Detailed history and reports coming soon!</p>
        </div>
    `);
}

function viewDietaryAlerts() {
    showModal('❤️ Dietary Needs', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">❤️</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Your Dietary Preferences & Alerts
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0; text-align: left;">
                <h3 style="color: #2e7d32; margin-bottom: 15px;">Current Dietary Settings:</h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div style="background: #e8f5e8; padding: 15px; border-radius: 10px; border: 2px solid #4caf50;">
                        <strong>✅ Low Sodium</strong><br>
                        <small>Alerts enabled for high-sodium meals</small>
                    </div>
                    
                    <div style="background: #fff8e1; padding: 15px; border-radius: 10px; border: 2px solid #ff9800;">
                        <strong>⚠️ Diabetic Friendly</strong><br>
                        <small>Sugar content monitoring active</small>
                    </div>
                    
                    <div style="background: #f3e5f5; padding: 15px; border-radius: 10px; border: 2px solid #9c27b0;">
                        <strong>🚫 Food Allergies</strong><br>
                        <small>No known allergies on file</small>
                    </div>
                    
                    <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; border: 2px solid #2196f3;">
                        <strong>💧 Hydration</strong><br>
                        <small>8 glasses daily target</small>
                    </div>
                </div>
            </div>
            
            <button onclick="updateDietarySettings()" style="
                background: #4caf50; color: white; border: none; padding: 15px 30px;
                border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
            ">Update Settings</button>
        </div>
    `);
}

function managePreferences() {
    showModal('⭐ Activity Preferences', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">⭐</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Your Activity Preferences
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0; text-align: left;">
                <h3 style="color: #2e7d32; margin-bottom: 15px;">Favorite Activities:</h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
                    ${['Bingo', 'Music Therapy', 'Book Club', 'Movie Night', 'Exercise', 'Arts & Crafts'].map(activity => `
                        <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #ddd; text-align: center;">
                            <strong>${activity}</strong><br>
                            <div style="margin-top: 8px;">
                                ${'⭐'.repeat(Math.floor(Math.random() * 3) + 3)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <button onclick="updateActivityPreferences()" style="
                background: #4caf50; color: white; border: none; padding: 15px 30px;
                border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
            ">Update Preferences</button>
        </div>
    `);
}

function updateDietarySettings() {
    showSuccessFeedback('Dietary settings updated!');
    createNotification('meal', 'Settings Updated', 'Your dietary preferences have been saved', 'normal');
}

function updateActivityPreferences() {
    showSuccessFeedback('Activity preferences updated!');
    createNotification('activity', 'Preferences Saved', 'Your activity preferences have been updated', 'normal');
}

// Family Connection Functions
function startVideoCall() {
    showModal('📹 Video Calls with Family', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">📹</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Connect Face-to-Face with Loved Ones
            </p>
            
            <div style="background: #e3f2fd; padding: 25px; border-radius: 15px; margin: 20px 0; border: 2px solid #2196f3;">
                <h3 style="color: #1976d2; margin-bottom: 20px;">📱 Video Call Options:</h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #4caf50; cursor: pointer;" onclick="launchVideoCall('facetime')">
                        <div style="font-size: 36px; margin-bottom: 10px;">📱</div>
                        <strong style="color: #2e7d32;">FaceTime</strong><br>
                        <small style="color: #666;">For iPhone/iPad users</small>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #2196f3; cursor: pointer;" onclick="launchVideoCall('skype')">
                        <div style="font-size: 36px; margin-bottom: 10px;">💻</div>
                        <strong style="color: #1976d2;">Skype</strong><br>
                        <small style="color: #666;">Works on all devices</small>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #ff9800; cursor: pointer;" onclick="launchVideoCall('zoom')">
                        <div style="font-size: 36px; margin-bottom: 10px;">🔗</div>
                        <strong style="color: #f57c00;">Zoom</strong><br>
                        <small style="color: #666;">Join with meeting ID</small>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #4caf50; cursor: pointer;" onclick="launchVideoCall('whatsapp')">
                        <div style="font-size: 36px; margin-bottom: 10px;">📞</div>
                        <strong style="color: #2e7d32;">WhatsApp</strong><br>
                        <small style="color: #666;">Video & voice calls</small>
                    </div>
                </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #2e7d32; margin-bottom: 15px;">👥 Recent Family Calls:</h3>
                <div style="text-align: left;">
                    <div style="padding: 10px; margin: 5px 0; background: #e8f5e8; border-radius: 8px; border: 1px solid #4caf50;">
                        <strong>Sarah (Daughter)</strong> - Last called: Today 2:30 PM<br>
                        <button onclick="callFamily('sarah')" style="background: #4caf50; color: white; border: none; padding: 5px 15px; border-radius: 15px; font-size: 14px; cursor: pointer; margin-top: 5px;">Call Now</button>
                    </div>
                    
                    <div style="padding: 10px; margin: 5px 0; background: #fff8e1; border-radius: 8px; border: 1px solid #ff9800;">
                        <strong>Michael (Son)</strong> - Last called: Yesterday 6:15 PM<br>
                        <button onclick="callFamily('michael')" style="background: #ff9800; color: white; border: none; padding: 5px 15px; border-radius: 15px; font-size: 14px; cursor: pointer; margin-top: 5px;">Call Now</button>
                    </div>
                    
                    <div style="padding: 10px; margin: 5px 0; background: #f3e5f5; border-radius: 8px; border: 1px solid #9c27b0;">
                        <strong>Emma & Lily (Grandchildren)</strong> - Last called: Sunday 4:00 PM<br>
                        <button onclick="callFamily('grandchildren')" style="background: #9c27b0; color: white; border: none; padding: 5px 15px; border-radius: 15px; font-size: 14px; cursor: pointer; margin-top: 5px;">Call Now</button>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button onclick="scheduleVideoCall()" style="
                    background: #2196f3; color: white; border: none; padding: 15px 30px;
                    border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                ">Schedule Call</button>
                <button onclick="getVideoCallHelp()" style="
                    background: #ff9800; color: white; border: none; padding: 15px 30px;
                    border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                ">Get Help</button>
            </div>
        </div>
    `);
}

function openMessaging() {
    showModal('💬 Family Group Chat', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">💬</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Stay in Touch with Family Messages
            </p>
            
            <div style="background: #e8f5e8; padding: 25px; border-radius: 15px; margin: 20px 0; border: 2px solid #4caf50;">
                <h3 style="color: #2e7d32; margin-bottom: 20px;">📱 Messaging Apps:</h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; margin: 20px 0;">
                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #25d366; cursor: pointer;" onclick="openMessagingApp('whatsapp')">
                        <div style="font-size: 36px; margin-bottom: 10px;">💚</div>
                        <strong style="color: #25d366;">WhatsApp</strong><br>
                        <small style="color: #666;">Most popular worldwide</small>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #0084ff; cursor: pointer;" onclick="openMessagingApp('messenger')">
                        <div style="font-size: 36px; margin-bottom: 10px;">🔵</div>
                        <strong style="color: #0084ff;">Messenger</strong><br>
                        <small style="color: #666;">Facebook messaging</small>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #007aff; cursor: pointer;" onclick="openMessagingApp('imessage')">
                        <div style="font-size: 36px; margin-bottom: 10px;">💙</div>
                        <strong style="color: #007aff;">iMessage</strong><br>
                        <small style="color: #666;">For iPhone users</small>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #ff6b35; cursor: pointer;" onclick="openMessagingApp('telegram')">
                        <div style="font-size: 36px; margin-bottom: 10px;">✈️</div>
                        <strong style="color: #ff6b35;">Telegram</strong><br>
                        <small style="color: #666;">Secure messaging</small>
                    </div>
                </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #2e7d32; margin-bottom: 15px;">👨‍👩‍👧‍👦 Active Family Groups:</h3>
                <div style="text-align: left;">
                    <div style="padding: 15px; margin: 10px 0; background: #e3f2fd; border-radius: 10px; border: 2px solid #2196f3;">
                        <strong style="color: #1976d2;">📱 Smith Family Chat</strong><br>
                        <span style="color: #666; font-size: 14px;">8 members • Last message: "Looking forward to Sunday dinner!"</span><br>
                        <button onclick="openFamilyChat('smith')" style="background: #2196f3; color: white; border: none; padding: 8px 15px; border-radius: 15px; font-size: 14px; cursor: pointer; margin-top: 8px;">Open Chat</button>
                    </div>
                    
                    <div style="padding: 15px; margin: 10px 0; background: #f3e5f5; border-radius: 10px; border: 2px solid #9c27b0;">
                        <strong style="color: #7b1fa2;">👶 Grandchildren Updates</strong><br>
                        <span style="color: #666; font-size: 14px;">4 members • Last message: "Emma got an A on her math test!"</span><br>
                        <button onclick="openFamilyChat('grandchildren')" style="background: #9c27b0; color: white; border: none; padding: 8px 15px; border-radius: 15px; font-size: 14px; cursor: pointer; margin-top: 8px;">Open Chat</button>
                    </div>
                    
                    <div style="padding: 15px; margin: 10px 0; background: #fff8e1; border-radius: 10px; border: 2px solid #ff9800;">
                        <strong style="color: #f57c00;">🏡 Group Home Friends</strong><br>
                        <span style="color: #666; font-size: 14px;">12 members • Last message: "Movie night tonight at 7 PM!"</span><br>
                        <button onclick="openFamilyChat('friends')" style="background: #ff9800; color: white; border: none; padding: 8px 15px; border-radius: 15px; font-size: 14px; cursor: pointer; margin-top: 8px;">Open Chat</button>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button onclick="createNewGroup()" style="
                    background: #4caf50; color: white; border: none; padding: 15px 30px;
                    border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                ">Create Group</button>
                <button onclick="getMessagingHelp()" style="
                    background: #ff9800; color: white; border: none; padding: 15px 30px;
                    border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                ">Get Help</button>
            </div>
        </div>
    `);
}

function sharePhotos() {
    showModal('📸 Photo Sharing with Family', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">📸</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Share Special Moments with Loved Ones
            </p>
            
            <div style="background: #f3e5f5; padding: 25px; border-radius: 15px; margin: 20px 0; border: 2px solid #9c27b0;">
                <h3 style="color: #7b1fa2; margin-bottom: 20px;">📷 Photo Sharing Options:</h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px; margin: 20px 0;">
                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #4285f4; cursor: pointer;" onclick="openPhotoApp('photos')">
                        <div style="font-size: 36px; margin-bottom: 10px;">📱</div>
                        <strong style="color: #4285f4;">Google Photos</strong><br>
                        <small style="color: #666;">Easy sharing & backup</small>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #1877f2; cursor: pointer;" onclick="openPhotoApp('facebook')">
                        <div style="font-size: 36px; margin-bottom: 10px;">📘</div>
                        <strong style="color: #1877f2;">Facebook</strong><br>
                        <small style="color: #666;">Share with friends</small>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #25d366; cursor: pointer;" onclick="openPhotoApp('whatsapp')">
                        <div style="font-size: 36px; margin-bottom: 10px;">💚</div>
                        <strong style="color: #25d366;">WhatsApp</strong><br>
                        <small style="color: #666;">Send to groups</small>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #007aff; cursor: pointer;" onclick="openPhotoApp('icloud')">
                        <div style="font-size: 36px; margin-bottom: 10px;">☁️</div>
                        <strong style="color: #007aff;">iCloud</strong><br>
                        <small style="color: #666;">iPhone sharing</small>
                    </div>
                </div>
            </div>
            
            <div style="background: #fff8e1; padding: 20px; border-radius: 15px; margin: 20px 0; border: 2px solid #ff9800;">
                <h3 style="color: #f57c00; margin-bottom: 15px;">📚 Recent Photo Albums:</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div style="background: white; padding: 15px; border-radius: 10px; border: 1px solid #ddd; text-align: left;">
                        <div style="font-size: 24px; margin-bottom: 8px;">🎂</div>
                        <strong>Birthday Celebration</strong><br>
                        <span style="color: #666; font-size: 14px;">23 photos • Shared with 6 family members</span><br>
                        <button onclick="viewAlbum('birthday')" style="background: #4caf50; color: white; border: none; padding: 5px 12px; border-radius: 12px; font-size: 12px; cursor: pointer; margin-top: 8px;">View Album</button>
                    </div>
                    
                    <div style="background: white; padding: 15px; border-radius: 10px; border: 1px solid #ddd; text-align: left;">
                        <div style="font-size: 24px; margin-bottom: 8px;">🌸</div>
                        <strong>Garden Photos</strong><br>
                        <span style="color: #666; font-size: 14px;">15 photos • Shared yesterday</span><br>
                        <button onclick="viewAlbum('garden')" style="background: #4caf50; color: white; border: none; padding: 5px 12px; border-radius: 12px; font-size: 12px; cursor: pointer; margin-top: 8px;">View Album</button>
                    </div>
                    
                    <div style="background: white; padding: 15px; border-radius: 10px; border: 1px solid #ddd; text-align: left;">
                        <div style="font-size: 24px; margin-bottom: 8px;">🎨</div>
                        <strong>Art Class Creations</strong><br>
                        <span style="color: #666; font-size: 14px;">12 photos • From last week</span><br>
                        <button onclick="viewAlbum('art')" style="background: #4caf50; color: white; border: none; padding: 5px 12px; border-radius: 12px; font-size: 12px; cursor: pointer; margin-top: 8px;">View Album</button>
                    </div>
                </div>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #2e7d32; margin-bottom: 15px;">📸 Quick Actions:</h3>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="takeNewPhoto()" style="background: #4caf50; color: white; border: none; padding: 12px 25px; border-radius: 20px; font-size: 16px; cursor: pointer; font-weight: bold;">📷 Take Photo</button>
                    <button onclick="uploadFromDevice()" style="background: #2196f3; color: white; border: none; padding: 12px 25px; border-radius: 20px; font-size: 16px; cursor: pointer; font-weight: bold;">📁 Upload Photos</button>
                    <button onclick="createPhotoAlbum()" style="background: #9c27b0; color: white; border: none; padding: 12px 25px; border-radius: 20px; font-size: 16px; cursor: pointer; font-weight: bold;">📚 Create Album</button>
                </div>
            </div>
            
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button onclick="getPhotoSharingHelp()" style="
                    background: #ff9800; color: white; border: none; padding: 15px 30px;
                    border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                ">Get Help</button>
            </div>
        </div>
    `);
}

function manageContacts() {
    showModal('👥 Family Contacts', `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin: 20px 0;">👥</div>
            <p style="font-size: 24px; color: #2c3e50; margin: 20px 0;">
                Manage Your Family Contact List
            </p>
            
            <div style="background: #e8f5e8; padding: 25px; border-radius: 15px; margin: 20px 0; border: 2px solid #4caf50;">
                <h3 style="color: #2e7d32; margin-bottom: 20px;">👨‍👩‍👧‍👦 Family Members:</h3>
                
                <div style="text-align: left;">
                    <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 10px; border: 2px solid #2196f3; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-size: 24px; display: inline;">👩</div>
                            <strong style="font-size: 18px; margin-left: 10px;">Sarah Johnson (Daughter)</strong><br>
                            <span style="color: #666; font-size: 14px; margin-left: 34px;">📞 (555) 123-4567 • 📧 sarah.johnson@email.com</span><br>
                            <span style="color: #666; font-size: 14px; margin-left: 34px;">Lives in: Springfield, IL • Birthday: March 15th</span>
                        </div>
                        <div style="display: flex; gap: 8px; flex-direction: column;">
                            <button onclick="quickCall('sarah')" style="background: #4caf50; color: white; border: none; padding: 8px 15px; border-radius: 15px; font-size: 14px; cursor: pointer;">📞 Call</button>
                            <button onclick="quickMessage('sarah')" style="background: #2196f3; color: white; border: none; padding: 8px 15px; border-radius: 15px; font-size: 14px; cursor: pointer;">💬 Message</button>
                        </div>
                    </div>
                    
                    <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 10px; border: 2px solid #ff9800; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-size: 24px; display: inline;">👨</div>
                            <strong style="font-size: 18px; margin-left: 10px;">Michael Johnson (Son)</strong><br>
                            <span style="color: #666; font-size: 14px; margin-left: 34px;">📞 (555) 987-6543 • 📧 mike.j.work@email.com</span><br>
                            <span style="color: #666; font-size: 14px; margin-left: 34px;">Lives in: Chicago, IL • Birthday: July 22nd</span>
                        </div>
                        <div style="display: flex; gap: 8px; flex-direction: column;">
                            <button onclick="quickCall('michael')" style="background: #4caf50; color: white; border: none; padding: 8px 15px; border-radius: 15px; font-size: 14px; cursor: pointer;">📞 Call</button>
                            <button onclick="quickMessage('michael')" style="background: #2196f3; color: white; border: none; padding: 8px 15px; border-radius: 15px; font-size: 14px; cursor: pointer;">💬 Message</button>
                        </div>
                    </div>
                    
                    <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 10px; border: 2px solid #9c27b0; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-size: 24px; display: inline;">👧👶</div>
                            <strong style="font-size: 18px; margin-left: 10px;">Emma & Lily (Grandchildren)</strong><br>
                            <span style="color: #666; font-size: 14px; margin-left: 44px;">Parents: Sarah & Tom • Ages: 8 and 5</span><br>
                            <span style="color: #666; font-size: 14px; margin-left: 44px;">Contact through Sarah • Love video calls!</span>
                        </div>
                        <div style="display: flex; gap: 8px; flex-direction: column;">
                            <button onclick="videoCallGrandchildren()" style="background: #9c27b0; color: white; border: none; padding: 8px 15px; border-radius: 15px; font-size: 14px; cursor: pointer;">📹 Video Call</button>
                            <button onclick="sendGrandchildrenCard()" style="background: #ff9800; color: white; border: none; padding: 8px 15px; border-radius: 15px; font-size: 14px; cursor: pointer;">💌 Send Card</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="background: #fff8e1; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #f57c00; margin-bottom: 15px;">🚨 Emergency Contacts:</h3>
                <div style="text-align: left;">
                    <div style="background: #ffebee; padding: 12px; margin: 8px 0; border-radius: 8px; border: 2px solid #f44336;">
                        <strong style="color: #d32f2f;">🚑 Emergency Services: 911</strong><br>
                        <span style="color: #666; font-size: 14px;">For immediate medical emergencies</span>
                    </div>
                    <div style="background: #e8f5e8; padding: 12px; margin: 8px 0; border-radius: 8px; border: 2px solid #4caf50;">
                        <strong style="color: #2e7d32;">👩‍⚕️ Group Home Nurse: (555) 246-8101</strong><br>
                        <span style="color: #666; font-size: 14px;">Available 24/7 for health concerns</span>
                    </div>
                    <div style="background: #e3f2fd; padding: 12px; margin: 8px 0; border-radius: 8px; border: 2px solid #2196f3;">
                        <strong style="color: #1976d2;">🏠 Front Desk: (555) 246-8100</strong><br>
                        <span style="color: #666; font-size: 14px;">General assistance and information</span>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button onclick="addNewContact()" style="
                    background: #4caf50; color: white; border: none; padding: 15px 30px;
                    border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                ">Add Contact</button>
                <button onclick="getContactHelp()" style="
                    background: #ff9800; color: white; border: none; padding: 15px 30px;
                    border-radius: 25px; font-size: 18px; cursor: pointer; font-weight: bold;
                ">Get Help</button>
            </div>
        </div>
    `);
}

// Helper functions for family communication features
function launchVideoCall(platform) {
    showSuccessFeedback(`Opening ${platform} for video call - staff will help you connect!`);
}

function callFamily(person) {
    showSuccessFeedback(`Calling ${person} - connecting now!`);
}

function openMessagingApp(app) {
    showSuccessFeedback(`Opening ${app} messaging - staff will help you send messages!`);
}

function openFamilyChat(group) {
    showSuccessFeedback(`Opening ${group} chat - loading your messages!`);
}

function createNewGroup() {
    showSuccessFeedback('Creating new group chat - staff will help you add family members!');
}

function getMessagingHelp() {
    showSuccessFeedback('Getting messaging help - staff will teach you how to use family chat!');
}

function openPhotoApp(app) {
    showSuccessFeedback(`Opening ${app} for photo sharing - staff will help you share pictures!`);
}

function viewAlbum(album) {
    showSuccessFeedback(`Opening ${album} album - loading your photos!`);
}

function takeNewPhoto() {
    showSuccessFeedback('Opening camera to take a new photo - smile!');
}

function uploadFromDevice() {
    showSuccessFeedback('Opening photo library - staff will help you select photos to share!');
}

function createPhotoAlbum() {
    showSuccessFeedback('Creating new photo album - staff will help you organize your pictures!');
}

function getPhotoSharingHelp() {
    showSuccessFeedback('Getting photo sharing help - staff will show you how to share with family!');
}

function quickCall(person) {
    showSuccessFeedback(`Calling ${person} now - connecting...`);
}

function quickMessage(person) {
    showSuccessFeedback(`Opening message to ${person} - staff will help you type your message!`);
}

function videoCallGrandchildren() {
    showSuccessFeedback('Starting video call with grandchildren - they will be so excited to see you!');
}

function sendGrandchildrenCard() {
    showSuccessFeedback('Creating digital card for grandchildren - staff will help you personalize it!');
}

function addNewContact() {
    showSuccessFeedback('Adding new family contact - staff will help you enter their information!');
}

function getContactHelp() {
    showSuccessFeedback('Getting contact management help - staff will show you how to organize your family list!');
}

function getVideoCallHelp() {
    showSuccessFeedback('Getting video call help - staff will teach you how to use video calling features!');
}

// Initialize reminder system when page loads
window.addEventListener('load', function() {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    
    // Start the reminder system
    setTimeout(startReminderSystem, 3000);
    
    // Initialize notification display
    updateNotificationDisplay();
    
    // Add some sample notifications for demonstration
    setTimeout(() => {
        createNotification('medication', 'Welcome!', 'Medication reminders are now active', 'normal');
        createNotification('meal', 'Meal Alert', 'Lunch will be served in 30 minutes', 'normal');
    }, 5000);
});