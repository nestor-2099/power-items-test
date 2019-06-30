;
// Power Items
// Service Worker ver. 1.0
// Progressive Web App

// Asignar un nombre y versión al cache
const CACHE_NAME = 'v2_power_items',
  urlsToCache = [
    './',
    'https://fonts.googleapis.com/css?family=Roboto:300,500',
    './resources/css/w3.min.css',
    './resources/css/style.min.css',
    
    './resources/js/main.js',
    './resources/js/blazy.min.js',
  ]

// Durante la fase de instalación, generalmente se almacenan en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

// Una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]
  console.log('[Service Worker] Installing...');

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})
  

// Cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  console.log('[Service Worker] Fetch.')
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})

/* =========== PUSH EVENT =========== */
/*
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Power Items';
  const options = {
    body: `${event.data.text()}`,
    icon: './android-chrome-192x192.png',
    badge: './android-chrome-192x192.png'
  };

  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);

});


self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('http://mortalkombat.com/')
  );
});
*/
console.log('End of SW File');
