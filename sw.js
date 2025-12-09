// Service Worker for Offline Functionality
// Senior Group Home Website - Critical Features Available Offline

const CACHE_NAME = 'senior-home-v1';
const OFFLINE_CACHE = 'senior-home-offline-v1';

// Critical files that must be cached for offline functionality
const CRITICAL_FILES = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    // Core pages
    '/activities.html',
    '/meals.html',
    '/schedule.html',
    '/community.html',
    '/games.html'
];

// Assets that enhance offline experience but aren't critical
const OPTIONAL_FILES = [
    // Add any additional assets like images, fonts, etc.
];

// Install event - Cache critical files
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache critical files
            caches.open(CACHE_NAME).then(cache => {
                console.log('Service Worker: Caching critical files');
                return cache.addAll(CRITICAL_FILES.map(url => new Request(url, { cache: 'reload' })));
            }),
            // Cache offline-specific resources
            caches.open(OFFLINE_CACHE).then(cache => {
                return cache.put('/offline.html', new Response(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Offline - Senior Group Home</title>
                        <style>
                            body { 
                                font-family: Arial, sans-serif; 
                                text-align: center; 
                                padding: 50px 20px;
                                background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
                                margin: 0;
                                min-height: 100vh;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column;
                            }
                            .offline-container {
                                background: white;
                                padding: 40px;
                                border-radius: 25px;
                                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                                border: 3px solid #2196f3;
                                max-width: 500px;
                            }
                            .offline-icon { font-size: 64px; margin-bottom: 20px; }
                            h1 { color: #2c3e50; margin-bottom: 20px; }
                            p { color: #666; font-size: 18px; line-height: 1.6; }
                            .btn { 
                                background: #4caf50; 
                                color: white; 
                                border: none; 
                                padding: 15px 30px; 
                                border-radius: 25px; 
                                font-size: 18px; 
                                cursor: pointer; 
                                margin: 10px;
                                transition: all 0.3s ease;
                            }
                            .btn:hover { 
                                background: #45a049; 
                                transform: translateY(-2px);
                                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                            }
                            .offline-features {
                                background: #f8f9fa;
                                padding: 20px;
                                border-radius: 15px;
                                margin: 20px 0;
                                border: 2px solid #e9ecef;
                            }
                            .feature-list {
                                text-align: left;
                                display: inline-block;
                            }
                            .feature-item {
                                display: flex;
                                align-items: center;
                                margin: 10px 0;
                                font-size: 16px;
                            }
                            .feature-item span {
                                margin-right: 10px;
                                font-size: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="offline-container">
                            <div class="offline-icon">📱</div>
                            <h1>You're Offline</h1>
                            <p>Don't worry! Some important features still work without internet connection.</p>
                            
                            <div class="offline-features">
                                <h3 style="color: #2e7d32; margin-bottom: 15px;">✅ Available Offline:</h3>
                                <div class="feature-list">
                                    <div class="feature-item">
                                        <span>💊</span>
                                        <span>Medication Reminders</span>
                                    </div>
                                    <div class="feature-item">
                                        <span>🍽️</span>
                                        <span>Meal Time Alerts</span>
                                    </div>
                                    <div class="feature-item">
                                        <span>🚨</span>
                                        <span>Emergency Button</span>
                                    </div>
                                    <div class="feature-item">
                                        <span>📅</span>
                                        <span>Daily Schedule</span>
                                    </div>
                                    <div class="feature-item">
                                        <span>🎤</span>
                                        <span>Voice Commands</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button class="btn" onclick="tryReconnect()">Try to Reconnect</button>
                            <button class="btn" onclick="goToHomepage()" style="background: #2196f3;">Go to Homepage</button>
                        </div>
                        
                        <script>
                            function tryReconnect() {
                                if (navigator.onLine) {
                                    location.reload();
                                } else {
                                    alert('Still offline. Please check your internet connection.');
                                }
                            }
                            
                            function goToHomepage() {
                                window.location.href = '/index.html';
                            }
                        </script>
                    </body>
                    </html>
                `, { headers: { 'Content-Type': 'text/html' } }));
            })
        ])
    );
    
    // Skip waiting to activate immediately
    self.skipWaiting();
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME && cacheName !== OFFLINE_CACHE) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    // Claim all clients immediately
    self.clients.claim();
});

// Fetch event - Serve cached content when offline
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip chrome-extension and other non-http requests
    if (!event.request.url.startsWith('http')) return;
    
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Return cached response if found
            if (cachedResponse) {
                console.log('Service Worker: Serving from cache', event.request.url);
                return cachedResponse;
            }
            
            // Try network request
            return fetch(event.request).then(networkResponse => {
                // Cache successful responses for future offline use
                if (networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Network failed - serve offline page for navigation requests
                if (event.request.mode === 'navigate') {
                    return caches.match('/offline.html');
                }
                
                // For other requests, return a basic offline response
                return new Response('Offline - Content unavailable', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: { 'Content-Type': 'text/plain' }
                });
            });
        })
    );
});

// Handle offline functionality messages from main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type) {
        switch (event.data.type) {
            case 'EMERGENCY_ALERT':
                // Store emergency alert locally for offline access
                handleOfflineEmergency(event.data.payload);
                break;
            case 'REMINDER_UPDATE':
                // Update offline reminder data
                handleOfflineReminder(event.data.payload);
                break;
            case 'CACHE_UPDATE':
                // Update cache with new critical data
                updateOfflineCache(event.data.payload);
                break;
        }
    }
});

// Emergency alert handler for offline mode
function handleOfflineEmergency(alertData) {
    // Store emergency alert in IndexedDB or localStorage
    const emergencyData = {
        timestamp: new Date().toISOString(),
        type: 'emergency',
        data: alertData,
        synced: false
    };
    
    // Attempt to store in IndexedDB, fall back to localStorage
    try {
        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'OFFLINE_EMERGENCY_STORED',
                    data: emergencyData
                });
            });
        });
    } catch (error) {
        console.error('Service Worker: Error storing offline emergency data', error);
    }
}

// Reminder handler for offline mode
function handleOfflineReminder(reminderData) {
    // Store reminder update for offline access
    const offlineReminder = {
        timestamp: new Date().toISOString(),
        type: 'reminder',
        data: reminderData,
        synced: false
    };
    
    // Notify clients about offline reminder update
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({
                type: 'OFFLINE_REMINDER_UPDATED',
                data: offlineReminder
            });
        });
    });
}

// Update offline cache with critical data
function updateOfflineCache(cacheData) {
    caches.open(OFFLINE_CACHE).then(cache => {
        cache.put('/offline-data.json', new Response(JSON.stringify(cacheData), {
            headers: { 'Content-Type': 'application/json' }
        }));
    });
}

// Periodic background sync for when connection is restored
self.addEventListener('sync', event => {
    if (event.tag === 'emergency-sync') {
        event.waitUntil(syncEmergencyData());
    } else if (event.tag === 'reminder-sync') {
        event.waitUntil(syncReminderData());
    }
});

// Sync emergency data when connection is restored
function syncEmergencyData() {
    return new Promise((resolve) => {
        // Sync any stored offline emergency data
        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'SYNC_OFFLINE_DATA',
                    category: 'emergency'
                });
            });
        });
        resolve();
    });
}

// Sync reminder data when connection is restored
function syncReminderData() {
    return new Promise((resolve) => {
        // Sync any stored offline reminder data
        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'SYNC_OFFLINE_DATA',
                    category: 'reminder'
                });
            });
        });
        resolve();
    });
}

console.log('Service Worker: Loaded and ready for offline functionality');