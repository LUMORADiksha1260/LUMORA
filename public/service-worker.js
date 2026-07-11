/**
 * Lumora Service Worker
 * -------------------------------------------------------------------------
 * Strategy:
 *  - App shell (/, manifest, icons, offline page) is precached on install.
 *  - Navigations: network-first, falling back to the cached shell offline.
 *  - Same-origin built assets (/assets/*.js, *.css): stale-while-revalidate,
 *    cached at runtime so we never need to know Vite's hashed filenames
 *    ahead of time.
 *  - Images/fonts/video (including cross-origin CDNs): cache-first with a
 *    background refresh, so repeat visits are instant and partially usable
 *    offline.
 * -------------------------------------------------------------------------
 */

const VERSION = "lumora-v2";
const SHELL_CACHE = `${VERSION}-shell`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

const SHELL_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/offline.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS)).catch(() => {
      // Non-fatal: individual missing assets shouldn't block install
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith("lumora-") && key !== SHELL_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

function isNavigationRequest(request) {
  return request.mode === "navigate" || (request.method === "GET" && request.headers.get("accept")?.includes("text/html"));
}

function isStaticAsset(url) {
  return /\.(js|css|woff2?|ttf)$/.test(url.pathname);
}

function isMedia(url) {
  return /\.(png|jpg|jpeg|svg|webp|gif|mp4|mp3)$/.test(url.pathname) || url.hostname.includes("mixkit.co") || url.hostname.includes("unsplash.com");
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // 1. Navigations — network-first, offline fallback to cached shell
  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put("/index.html", copy));
          return res;
        })
        .catch(() =>
          caches.match("/index.html").then((cached) => cached || caches.match("/offline.html"))
        )
    );
    return;
  }

  // 2. Built JS/CSS/fonts — stale-while-revalidate
  if (url.origin === self.location.origin && isStaticAsset(url)) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const network = fetch(request)
            .then((res) => {
              cache.put(request, res.clone());
              return res;
            })
            .catch(() => cached);
          return cached || network;
        })
      )
    );
    return;
  }

  // 3. Images / fonts / video (incl. cross-origin CDNs) — cache-first
  if (isMedia(url) || url.hostname.includes("fonts.gstatic.com") || url.hostname.includes("fonts.googleapis.com")) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then((cache) =>
        cache.match(request).then(
          (cached) =>
            cached ||
            fetch(request)
              .then((res) => {
                if (res.ok) cache.put(request, res.clone());
                return res;
              })
              .catch(() => cached)
        )
      )
    );
    return;
  }

  // 4. Everything else — pass through to network
});
