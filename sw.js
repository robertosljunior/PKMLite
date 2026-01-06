const CACHE_NAME = 'md-reader-v1.6';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    // Libs Core
    'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
    'https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js',
    // Syntax & Math
    'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js',
    'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
    'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js',
    'https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js',
    // Fontes (Loader CSS)
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=JetBrains+Mono:wght@400;500&family=Merriweather:wght@300;400;700&display=swap'
];

self.addEventListener('install', (evt) => {
    evt.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    evt.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys.map((key) => key !== CACHE_NAME && caches.delete(key))
        ))
    );
    self.clients.claim();
});

// Estratégia Stale-While-Revalidate para CDNs e Fontes
self.addEventListener('fetch', (evt) => {
    const url = new URL(evt.request.url);
    
    // Se for recurso externo (CDN/Fonts) ou o próprio index.html
    if (url.origin !== location.origin || url.pathname.endsWith('index.html') || url.pathname === '/') {
        evt.respondWith(
            caches.match(evt.request).then((cachedResponse) => {
                const fetchPromise = fetch(evt.request).then((networkResponse) => {
                    // Atualiza cache em background
                    if(networkResponse.ok) {
                        const clone = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(evt.request, clone));
                    }
                    return networkResponse;
                });
                // Retorna cache se existir, senão espera rede
                return cachedResponse || fetchPromise;
            })
        );
        return;
    }

    // Cache First padrão para outros assets locais
    evt.respondWith(
        caches.match(evt.request).then((res) => res || fetch(evt.request))
    );
});