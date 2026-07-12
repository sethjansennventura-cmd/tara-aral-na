// ======================================
// TARA ARAL NA!
// SERVICE WORKER
// ======================================

const CACHE_NAME = "tara-aral-na-v6";

const APP_FILES = [
  
  "/",
  "/index.html",
  "/dashboard.html",
  "/assignments.html",
  "/lectures.html",
  "/reviewer.html",
  "/favorites.html",
  "/recent-viewed.html",
  "/announcements.html",
  "/about.html",
  "/file-viewer.html",
  
  "/css/style.css",
  
  "/js/app.js",
  "/js/auth.js",
  "/js/menu.js",
  "/js/ripple.js",
  "/js/storage.js",
  "/js/toast.js",
  "/js/ui.js",
  "/js/file-utils.js",
  "/js/favorites.js",
  "/js/recent-viewed.js",
  "/js/offline.js",
  "/js/dark-mode.js",
  "/js/api/supabase-api.js"
  
];

// INSTALL

self.addEventListener("install", event => {
  
  self.skipWaiting();
  
  event.waitUntil(
    
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(APP_FILES))
    
  );
  
});

// ACTIVATE

self.addEventListener("activate", event => {
  
  event.waitUntil(
    
    caches.keys()
    
    .then(keys =>
      
      Promise.all(
        
        keys.map(key => {
          
          if (key !== CACHE_NAME) {
            
            return caches.delete(key);
            
          }
          
        })
        
      )
      
    )
    
    .then(() => self.clients.claim())
    
  );
  
});

// FETCH

self.addEventListener("fetch", event => {
  
  if (event.request.method !== "GET") return;
  
  event.respondWith(
    
    fetch(event.request)
    
    .then(response => {
      
      if (event.request.url.startsWith(self.location.origin)) {
        
        const copy = response.clone();
        
        caches.open(CACHE_NAME)
          
          .then(cache => cache.put(event.request, copy));
        
      }
      
      return response;
      
    })
    
    .catch(() => caches.match(event.request))
    
  );
  
});