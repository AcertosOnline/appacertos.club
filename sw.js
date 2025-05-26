self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
  console.log('Service Worker activated');
});

self.addEventListener('fetch', (event) => {
  const targetApiUrl = 'https://api.trivoweb.com/api/online/cassino/finish?VERSAO=6';
  if (event.request.url === targetApiUrl) {
    console.log('Detected API call to:', targetApiUrl);
    // Send message to all clients to trigger redirect
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: 'REDIRECT',
          url: 'https://example.com' // Replace with your target redirect URL
        });
      });
    });
    // Allow the API call to proceed
    event.respondWith(fetch(event.request));
  }
});
