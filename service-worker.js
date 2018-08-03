
//var filesToCache = [
//  '.',
//  'css/normalize.css',
//  'css/styles.css',
//  'css/leaflet.css',
//  'js/leaflet.js"',
//  'js/dbhelper.js"',
//  'js/main.js"',
//  'index.html',
//  'restaurant.html' 

//];

//var staticCacheName = 'pages-cache-v1';
 
//window.addEventListener('install', function (event) {
    
//  console.log('Attempting to install service worker and cache static assets');
//  event.waitUntil(
//    caches.open(staticCacheName)
//    .then(function(cache) {
//      return cache.addAll(filesToCache);
//    })
//  );
//});


  
//const PRECACHE = 'precache-v1';
//const RUNTIME = 'runtime';
console.log("Service-worker loaded.");

const cacheName = "kaldiPWA-v1";
//Cache all images like *.jpg and not hardcode one by one each time
const filesToCache = [
     '.',
  'index.html',
  'restaurant.html',
  'css/styles.css',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
  
];

self.addEventListener("install", function (event) {
    // Perform install steps
    console.log("[Servicework] Install");
    event.waitUntil(
      caches.open(cacheName).then(function (cache) {
          console.log("[ServiceWorker] Caching app shell");
          return cache.addAll(filesToCache);
      })
    );
});

self.addEventListener("activate", function (event) {    
    console.log("[Servicework] Activate");
    event.waitUntil(
      caches.keys().then(function (keyList) {
          return Promise.all(keyList.map(function (key) {
              if (key !== cacheName) {
                  console.log("[ServiceWorker] Removing old cache shell", key);
                  return caches.delete(key);
              }
          }));
      })
    );
});


self.addEventListener("fetch", (event) => {
    console.log("[ServiceWorker] Fetch");
    event.respondWith(
      caches.match(event.request).then(function (response) {
          return response || fetch(event.request);
      })
    );

});
