IndexController.prototype._registerServiceWorker = function() {
  //TODO: register a service worker
  if (!navigator.serviceWorker) return;
  navigator.serviceWorker.register('/sw.js').then(function() {
  console.log('Registration worked!');
}).catch(function(){
  console.log('Registration failed!');
});
};