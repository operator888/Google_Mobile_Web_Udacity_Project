self.addEventListener('fetch', function(event) {
//TODO: only respond to requests with a
// url ending in ".jpg"
if(event.request.url.indexOf("jpg")!==-1){
  event.respondWith(
	fetch('/imgs/dr-evil.gif')
	);
}
});