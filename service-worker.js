// Cachear los recursos iniciales al instalar el Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('mi-pwa-peso-bs-cache').then(function(cache) {
        return cache.addAll([
          '/',
          '/main.js',
          '/style.css'
        ]);
      })
    );
  });
  
  // Intercepta las solicitudes de red y sirve los recursos desde la caché
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  