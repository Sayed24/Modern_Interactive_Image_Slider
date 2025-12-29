self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
