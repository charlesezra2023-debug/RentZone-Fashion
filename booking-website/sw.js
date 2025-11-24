const CACHE_NAME = 'nguo-booking-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './style.css',  // kama una style ya nje
  './sw.js',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  // Ongeza picha za products
  './suti.jpg',
  './shela.jpg',
  './dress.jpg',
  './top.jpg',
  './kids1.jpg',
  './kids2.jpg',
  './swim.jpg',
  './beachdress.jpg'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching all assets');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch assets (offline support)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request)
          .catch(() => caches.match('./index.html'));
      })
  );
});
