var dataCacheName = 'BPMeter';
var cacheName = 'BPMeter';
var filesToCache = [
  '/miscwebapps/manualBPM/',
  '/miscwebapps/manualBPM/index.html',
  '/miscwebapps/manualBPM/logic.js',
  '/miscwebapps/manualBPM/style.css',
  '/miscwebapps/manualBPM/imgs/metronome.png',
  '/miscwebapps/manualBPM/imgs/metronome2.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request));
});
