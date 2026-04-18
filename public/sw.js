// Ce fichier est mis à jour automatiquement à chaque déploiement
// Le CACHE_VERSION est remplacé par Vite au build
const CACHE_VERSION = 'baby-essentials-v3'; // sera remplacé par hash à chaque build

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_VERSION).then(c => c.addAll(['/', '/index.html']))
  );
  // Activer immédiatement sans attendre la fermeture des onglets
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    // Supprimer TOUS les anciens caches (différente version = nouveau déploiement)
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_VERSION)
          .map(k => {
            console.log('[SW] Suppression ancien cache:', k);
            return caches.delete(k);
          })
      )
    )
  );
  // Prendre le contrôle de tous les clients ouverts immédiatement
  self.clients.claim();
});

// Network first — jamais servir une version périmée
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('/api/')) return; // API Notion jamais cachée

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Mettre en cache la réponse fraîche
        const clone = res.clone();
        caches.open(CACHE_VERSION).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => {
        // Hors ligne : servir depuis le cache si disponible
        return caches.match(e.request);
      })
  );
});

// Message de l'app pour forcer la mise à jour
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
