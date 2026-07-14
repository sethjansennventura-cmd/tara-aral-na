// ======================================
// Firebase Configuration
// ======================================

const firebaseConfig = {
  
  apiKey: "AIzaSyBYhrfiY1BLFTL_YinHasdS8uXOPqYg8Z8",
  
  authDomain: "tara-aral-na-cd7f0.firebaseapp.com",
  
  projectId: "tara-aral-na-cd7f0",
  
  storageBucket: "tara-aral-na-cd7f0.firebasestorage.app",
  
  messagingSenderId: "841710015251",
  
  appId: "1:841710015251:web:5e5d9fc63a94cd3e3940e6"
  
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// ======================================
// REGISTER FOR PUSH NOTIFICATIONS
// ======================================

async function registerForPush() {
  
  try {
    
    if (!("Notification" in window)) {
      
      console.log("Notifications are not supported.");
      
      return;
      
    }
    
    const permission =
      await window.Notification.requestPermission();
    
    if (permission !== "granted") {
      
      console.log("Notification permission denied.");
      
      return;
      
    }
    
    const registration =
      await navigator.serviceWorker.ready;
    
    const token =
      await messaging.getToken({
        
        vapidKey: "ChjSF9xcSwwoh0MEhDSrC7zJ5G5o6LGZHUDDHy6_jSA",
        
        serviceWorkerRegistration: registration
        
      });
    
    if (!token) {
      
      console.log("No FCM token received.");
      
      return;
      
    }
    
    console.log("FCM Token:", token);
    
    const response = await fetch(
      
      SUPABASE_URL + "/rest/v1/device_tokens",
      
      {
        
        method: "POST",
        
        headers: {
          
          ...HEADERS,
          
          Prefer: "resolution=merge-duplicates"
          
        },
        
        body: JSON.stringify({
          
          role: getRole(),
          
          fcm_token: token
          
        })
        
      }
      
    );
    
    if (response.ok) {
      
      console.log("Device token saved.");
      
    } else {
      
      console.error(
        "Failed to save token:",
        await response.text()
      );
      
    }
    
  } catch (err) {
    
    console.error(
      "Push registration failed:",
      err
    );
    
  }
  
}