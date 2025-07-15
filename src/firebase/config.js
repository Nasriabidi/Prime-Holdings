import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyna_E5xiCiXsj7kOzsWobDydw",
  authDomain: "prime-holdings.firebaseapp.com",
  projectId: "prime-holdings",
  storageBucket: "prime-holdings.firebasestorage.com",
  messagingSenderId: "739879969380",
  appId: "1:739879969380:web:fb45e2c21ba376bf64f571",
  measurementId: "G-8T8C5DMP73"
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
