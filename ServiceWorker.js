const cacheName = "Ruan Patrick-FlowMod-0.2.5";
const contentToCache = [
    "Build/0.2.5_SicrediEdition_Firebasse.loader.js",
    "Build/0.2.5_SicrediEdition_Firebasse.framework.js",
    "Build/0.2.5_SicrediEdition_Firebasse.data",
    "Build/0.2.5_SicrediEdition_Firebasse.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
