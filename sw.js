const CACHE_NAME = 'appacertos-cache-v2';
const urlsToCache = [
  '/',
  'https://www.appacertos.club/',
  'https://api.appacertos.club/app.js',
  'https://api.appacertos.club/manifest.json',
  'https://api.appacertos.club/pwa/192.png',
  'https://api.appacertos.club/pwa/512.png',
  'https://api.appacertos.club/banner.webp',
  'https://api.appacertos.club/favicon.ico',
  'https://api.appacertos.club/favicon.png',
  'https://api.appacertos.club/menu.js'
];

// Install the service worker and cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event to serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
