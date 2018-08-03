if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

//(function () {
//    'use strict';

//    // TODO add service worker code here
//    if ('serviceWorker' in navigator) {
//        navigator.serviceWorker
//            .register('serviceworker.js')
//            .then(function () {
//                console.log('Service Worker Registered');
//            });
//    }
//})();

//if ('serviceWorker' in navigator) {
//    navigator.serviceWorker.register('serviceworker.js');
//}