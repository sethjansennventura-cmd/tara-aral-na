// ======================================
// TARA ARAL NA!
// SERVICE WORKER
// ======================================

const CACHE_NAME = "tara-aral-na-v10";

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
  "/js/api/supabase-api.js",
  "/js/firebase-config.js",
  
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
// ======================================
// FIREBASE CLOUD MESSAGING
// ======================================

importScripts("https://www.gstatic.com/firebasejs/12.2.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.2.1/firebase-messaging-compat.js");

firebase.initializeApp({
  
  apiKey: "AIzaSyBYhrfiY1BLFTL_YinHasdS8uXOPqYg8Z8",
  
  authDomain: "tara-aral-na-cd7f0.firebaseapp.com",
  
  projectId: "tara-aral-na-cd7f0",
  
  storageBucket: "tara-aral-na-cd7f0.firebasestorage.app",
  
  messagingSenderId: "841710015251",
  
  appId: "1:841710015251:web:5e5d9fc63a94cd3e3940e6"
  
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  
  self.registration.showNotification(
    
    payload.notification.title,
    
    {
      
      body: payload.notification.body,
      
      icon: "./icon-192.png",
  badge: "./icon-192.png",
      
      data: payload.data
      
    }
    
  );
  
});

self.addEventListener("notificationclick", (event) => {
  
  event.notification.close();
  
  event.waitUntil(
    
    clients.openWindow("./")
    
  );
  
});