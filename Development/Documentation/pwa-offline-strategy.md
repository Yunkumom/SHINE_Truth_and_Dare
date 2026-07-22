# PWA Offline Strategy / PWA 離線策略

Encounter Cards v22 requires one successful online visit for its PWA behavior. Its v22 build-finalization script inventories every generated application file and inserts the complete list into a release-hashed service-worker cache. Only after registration and successful precaching does the interface report offline readiness.

相遇卡 v22 的 PWA 行為首次使用需要成功連線一次。v22 build finalizer 會列出全部生成檔案，寫入含 release hash 的 service-worker cache；完成註冊與預快取後，介面才顯示可離線使用。

- Production requires HTTPS; localhost is allowed for development.
- All generated JavaScript, CSS, card data, manifest, and owned icons are precached.
- Cache activation completes before older Encounter Cards caches are removed.
- Same-origin successful GET responses may be cached at runtime.
- Failed navigation falls back to the cached application shell.
- iPhone installation: Safari → Share → Add to Home Screen.
- The product does not rely on an automatic iOS install prompt.
- Layout preferences can remain local offline; names, contacts, birthdays, answers, and inclusion choices remain memory-only and are never added to the service-worker cache.
