const GAME_NAME = "NXTALE";
const GAME_VERSION = "1.0.1"; // bumped so old bad cache is cleared

const CACHE_NAME = JSON.stringify({ name: GAME_NAME, version: GAME_VERSION });

// Only cache small files. Never cache game.unx / runner.data / runner.wasm / audio
const CACHE_FILES = [
  "runner.js",
  "audio-worklet.js",
  "index.html"
];

self.addEventListener("install", (event) => {
  // Force the new worker to take over immediately
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          try {
            const data = JSON.parse(key);
            if (data && data.name === GAME_NAME && data.version !== GAME_VERSION) {
              return caches.delete(key);
            }
          } catch (e) {
            // delete non-JSON / old caches
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // Never intercept the big binary files - let the browser fetch them normally
  if (
    url.endsWith("game.unx") ||
    url.endsWith("runner.data") ||
    url.endsWith("runner.wasm") ||
    url.endsWith(".ogg")
  ) {
    return; // do not call event.respondWith → browser handles it
  }

  const shouldCache = CACHE_FILES.some((f) => url.endsWith(f));

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        if (shouldCache && response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
