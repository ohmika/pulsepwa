const CACHE_NAME = 'pulse-camera-shell-v2';
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/pulse-192.png',
  './icons/pulse-512.png',
  './icons/pulse-192.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('pulse-camera-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || request.destination === 'video' || request.destination === 'audio') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isDocument = request.mode === 'navigate';
  const isStaticAsset = ['script', 'style', 'image', 'font', 'manifest'].includes(request.destination);
  if (!isDocument && !isStaticAsset) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok && isStaticAsset) await cache.put(request, response.clone());
      return response;
    } catch (error) {
      if (isDocument) return (await cache.match('./index.html')) || (await cache.match('./'));
      throw error;
    }
  })());
});
