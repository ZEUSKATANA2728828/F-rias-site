const CACHE_NAME = "lista-inteligente-v1";
const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./logo.png",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
