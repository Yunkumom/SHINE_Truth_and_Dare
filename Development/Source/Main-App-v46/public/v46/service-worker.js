/* global self, caches, fetch, URL */
const CACHE_NAME = 'encounter-cards-v46-shine-question-book-1'
const PRECACHE_URLS = ["./","./assets/baosheng-apothecary-safe-v32-0lN6rnNC.webp","./assets/baosheng-herbs-safe-v32-DMYHEa2J.webp","./assets/guansheng-courtyard-safe-v32-C6av_cFP.webp","./assets/guansheng-guardian-safe-v32-SS7EWW8s.webp","./assets/guanyin-lotus-safe-v32-C_sVpNRU.webp","./assets/guanyin-moon-safe-v32-B-eKhL4A.webp","./assets/icons/icon-192.svg","./assets/icons/icon-512.svg","./assets/index-DKfjYbwZ.js","./assets/index-igdbqK1L.css","./assets/mazu-lantern-safe-v32-CLaxjESn.webp","./assets/mazu-sea-safe-v32-GQUDvmxH.webp","./assets/taiwan-card-back-oULXA8zi.png","./assets/tudigong-harvest-safe-v32-B3Xh4vZr.webp","./assets/tudigong-throne-safe-v32-BrQ-ThzC.webp","./assets/tw-local-zodiac-aquarius-safe-v34-CyxbripZ.webp","./assets/tw-local-zodiac-aries-safe-v34-CA4bfO2w.webp","./assets/tw-local-zodiac-cancer-safe-v34-B8FAQj4b.webp","./assets/tw-local-zodiac-capricorn-safe-v34-4XFZOhF-.webp","./assets/tw-local-zodiac-gemini-safe-v34-pBsAFa_-.webp","./assets/tw-local-zodiac-leo-safe-v34-BNJG0VqG.webp","./assets/tw-local-zodiac-libra-safe-v34-DUVIPrb5.webp","./assets/tw-local-zodiac-pisces-safe-v34-CqYwDwZQ.webp","./assets/tw-local-zodiac-sagittarius-safe-v34-CEG_q9RV.webp","./assets/tw-local-zodiac-scorpio-safe-v34-D8LqU7ji.webp","./assets/tw-local-zodiac-taurus-safe-v34-Cayp_ng3.webp","./assets/tw-local-zodiac-virgo-safe-v34-CDyGZmvr.webp","./assets/tw-zodiac-aquarius-safe-v33-_rSMTyCz.webp","./assets/tw-zodiac-aries-safe-v33-CQ5nwVZE.webp","./assets/tw-zodiac-cancer-safe-v33-BvyODl8V.webp","./assets/tw-zodiac-capricorn-safe-v33-CalbnrSw.webp","./assets/tw-zodiac-gemini-safe-v33-DUbIJxde.webp","./assets/tw-zodiac-leo-safe-v33-CTqtjAOf.webp","./assets/tw-zodiac-libra-safe-v33-yBJt7ywF.webp","./assets/tw-zodiac-pisces-safe-v33-KYjJEfcw.webp","./assets/tw-zodiac-sagittarius-safe-v33-Cu5rBSBu.webp","./assets/tw-zodiac-scorpio-safe-v33-CuF-Kv2R.webp","./assets/tw-zodiac-taurus-safe-v33-DDip4B-C.webp","./assets/tw-zodiac-virgo-safe-v33-DtdWykYZ.webp","./assets/wenchang-stars-safe-v32-C533-VV9.webp","./assets/wenchang-study-safe-v32-9jd-ely_.webp","./assets/xuantian-sea-safe-v32-CYgGnXCu.webp","./assets/xuantian-stair-safe-v32-D1bS99s8.webp","./assets/yue-lao-banyan-safe-v32-BLLbOxvs.webp","./assets/yue-lao-moon-safe-v32-DBp49orB.webp","./assets/zhusheng-lamp-safe-v32-uwvpYdec.webp","./assets/zhusheng-lotus-safe-v32-Bsa-q_f8.webp","./index.html","./manifest.webmanifest"]

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting()))
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
