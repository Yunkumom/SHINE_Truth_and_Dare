/* global self, caches */

/*
 * Safari recovery worker.
 *
 * An earlier cache-first worker could store a response that had followed a
 * redirect. WebKit refuses to use redirected responses returned by a service
 * worker for navigation. This worker deliberately has no fetch handler, so all
 * requests return directly from the network, and removes the affected caches
 * as soon as it takes control.
 */
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('encounter-cards-'))
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  )
})
