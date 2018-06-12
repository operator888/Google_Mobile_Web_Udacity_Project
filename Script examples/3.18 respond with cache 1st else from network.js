  // TODO: respond with an entry from the cache if there is one.
  // If there isn't, fetch from the network.
event.respondWith(
  cashes.match(event.request).then(function(response){
    if(response) return(event.request);
    return fetch(event.request);
  })
);
});