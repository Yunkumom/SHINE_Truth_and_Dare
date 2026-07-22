/* global self, caches, fetch, URL */
const CACHE_NAME = 'encounter-cards-v22-5e3ed29edb14'
const PRECACHE_URLS = ["./","./assets/deities/baosheng-dadi-taiwan.png","./assets/deities/baosheng-dadi-taiwan.webp","./assets/deities/guansheng-dijun-taiwan.png","./assets/deities/guansheng-dijun-taiwan.webp","./assets/deities/guanyin-taiwan.png","./assets/deities/guanyin-taiwan.webp","./assets/deities/mazu-taiwan.png","./assets/deities/mazu-taiwan.webp","./assets/deities/tudigong-taiwan.png","./assets/deities/tudigong-taiwan.webp","./assets/deities/wenchang-dijun-taiwan.png","./assets/deities/wenchang-dijun-taiwan.webp","./assets/deities/xuantian-shangdi-taiwan.png","./assets/deities/xuantian-shangdi-taiwan.webp","./assets/deities/yue-lao-taiwan.png","./assets/deities/yue-lao-taiwan.webp","./assets/deities/zhusheng-niangniang-taiwan.png","./assets/deities/zhusheng-niangniang-taiwan.webp","./assets/icons/icon-192.svg","./assets/icons/icon-512.svg","./assets/index-D1s6aUx9.css","./assets/index-D_df5XB0.js","./index.html","./manifest.webmanifest"]

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
