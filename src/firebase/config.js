import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyBRMpFa4kJ6w3CtY_iM9R4MEMe0ZgHnwjk",
  authDomain: "prime-holdings-e056a.firebaseapp.com",
  projectId: "prime-holdings-e056a",
  storageBucket: "prime-holdings-e056a.firebasestorage.com",
  messagingSenderId: "107248636580",
  appId: "1:107248636580:web:51680fd60bf89232f10c31",
  measurementId: "G-ED6NSDQHY4"
};

// Initialize Firebase
let app;
let auth;
let db;
let analytics;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    // Analytics might not work in all environments (like SSR)
    if (typeof window !== 'undefined') {
        analytics = getAnalytics(app);
    }
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Error initializing Firebase:', error);
}

export { auth, db, analytics };
