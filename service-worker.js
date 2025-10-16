/**
 * Service Worker
 * Caching für Offline-Funktionalität
 */

const CACHE_NAME = 'sky-runner-v1';
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './src/main.js',
    './src/game.js',
    './src/player.js',
    './src/world.js',
    './src/obstacles.js',
    './src/coins.js',
    './src/input.js',
    './src/audio.js',
    './src/ui.js',
    './src/utils.js',
    './src/storage.js',
    './manifest.webmanifest',
    './icons/icon-192.svg',
    './icons/icon-512.svg',
    './icons/apple-touch-icon.svg',
    './icons/splash-640x1136.svg'
];

// Install Event - Cache Assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching app assets');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Event - Cleanup old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event - Serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                
                // Clone the request
                const fetchRequest = event.request.clone();
                
                return fetch(fetchRequest).then(response => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                    
                    return response;
                });
            })
    );
});

