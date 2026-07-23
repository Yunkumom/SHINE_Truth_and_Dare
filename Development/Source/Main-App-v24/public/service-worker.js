/* global self, caches, fetch, URL */
const CACHE_NAME = 'encounter-cards-v24-__BUILD_HASH__'
const PRECACHE_URLS = /*__PRECACHE__*/ ['./', './index.html', './manifest.webmanifest']

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)))
})
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('encounter-cards-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()))
})
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(response => {
    if (response.ok && new URL(event.request.url).origin === self.location.origin) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()))
    return response
  }).catch(() => caches.match('./index.html'))))
})
