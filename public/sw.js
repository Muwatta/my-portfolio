const CACHE_PREFIX = "muwatta-portfolio";
const RUNTIME_CACHE = `${CACHE_PREFIX}-runtime`;
const ASSETS_CACHE = `${CACHE_PREFIX}-assets`;
const API_CACHE = `${CACHE_PREFIX}-api`;

const CACHE_VERSIONS = {
  runtime: 1,
  assets: 1,
  api: 1,
};

const CACHE_NAME_PREFIX = (type) =>
  `${CACHE_PREFIX}-${type}-v${CACHE_VERSIONS[type]}`;

// Assets that should be cached on install
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/robots.txt",
  "/blog.json",
];

// Install: cache essential assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...");
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME_PREFIX("runtime"));
        await cache.addAll(PRECACHE_URLS);

        console.log("[SW] Precached essential assets");
        self.skipWaiting();
      } catch (err) {
        console.error("[SW] Installation failed:", err);
      }
    })(),
  );
});

// Activate: clean up old cache versions
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker...");
  event.waitUntil(
    (async () => {
      try {
        const cacheNames = await caches.keys();
        const cachePrefix = CACHE_PREFIX;
        const cachesToDelete = cacheNames.filter(
          (name) =>
            name.startsWith(cachePrefix) &&
            !Object.values(CACHE_NAME_PREFIX("runtime")).includes(name) &&
            !Object.values(CACHE_NAME_PREFIX("assets")).includes(name) &&
            !Object.values(CACHE_NAME_PREFIX("api")).includes(name),
        );

        await Promise.all(cachesToDelete.map((name) => caches.delete(name)));
        console.log(`[SW] Cleaned up ${cachesToDelete.length} old caches`);
        self.clients.claim();
      } catch (err) {
        console.error("[SW] Activation failed:", err);
      }
    })(),
  );
});

// Fetch: implement caching strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // API requests: network first, fall back to cache
  if (
    url.pathname.startsWith("/api/") ||
    url.hostname !== self.location.hostname
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const cache = caches.open(CACHE_NAME_PREFIX("api"));
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) {
            return cached;
          }
          // Return offline fallback if available
          return new Response(
            JSON.stringify({
              error: "You are offline. This content is unavailable.",
            }),
            {
              status: 503,
              headers: { "Content-Type": "application/json" },
            },
          );
        }),
    );
    return;
  }

  // HTML pages: network first with fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const cache = caches.open(CACHE_NAME_PREFIX("runtime"));
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) {
            return cached;
          }
          // Return offline page
          return (
            caches.match("/") || new Response("Offline - page not available")
          );
        }),
    );
    return;
  }

  // Static assets: cache first with network fallback
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font" ||
    request.destination === "image" ||
    url.pathname.match(/\.(js|css|woff2?|png|jpg|jpeg|gif|svg|webp)$/)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(request)
          .then((response) => {
            if (
              !response ||
              response.status !== 200 ||
              response.type !== "basic"
            ) {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME_PREFIX("assets")).then((cache) => {
              cache.put(request, responseToCache);
            });
            return response;
          })
          .catch(() => {
            // Return offline placeholder for images
            if (request.destination === "image") {
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="#f0f0f0" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="sans-serif" font-size="14" fill="#999">Offline</text></svg>',
                { headers: { "Content-Type": "image/svg+xml" } },
              );
            }
            return new Response("Offline - asset not available");
          });
      }),
    );
    return;
  }

  // Default: network first
  event.respondWith(
    fetch(request).catch(async () => {
      const cached = await caches.match(request);
      return cached || new Response("Offline - resource not available");
    }),
  );
});

// Handle messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
  if (event.data && event.data.type === "CLEAR_CACHE") {
    caches.keys().then((names) => {
      names.forEach((name) => {
        if (name.startsWith(CACHE_PREFIX)) {
          caches.delete(name);
        }
      });
    });
  }
});
