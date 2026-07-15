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

        alert("1");

        if (!("Notification" in window)) {

            alert("Notifications not supported");

            return;

        }

        alert("2");

        const permission =
            await Notification.requestPermission();

        alert("3");

        if (permission !== "granted") {

            alert("Permission denied");

            return;

        }

        alert("4");

        const registration =
            await navigator.serviceWorker.ready;

        alert("5");

        alert("Before getToken");

        const token = await messaging.getToken({

            vapidKey:
            "BCdXfKqT58ND6UoSY6UXAiNqfOp3BlYCLoqsD9oWC3IjiIcrT27JePdkWHWe17AYT7o_KUsztimpUh6adviylrM",

            serviceWorkerRegistration: registration

        });

        alert("After getToken");

        console.log("FCM Token:", token);

    } catch (err) {

        alert("ERROR:\n\n" + err.message);

        console.error(err);

    }

}