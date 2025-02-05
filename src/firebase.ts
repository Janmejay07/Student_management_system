import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuQ1jwd1gu_NU3AowerxUVKakvmbI9gRo",
  authDomain: "student-management-syste-1f340.firebaseapp.com",
  projectId: "student-management-syste-1f340",
  storageBucket: "student-management-syste-1f340.appspot.com",
  messagingSenderId: "147494247582",
  appId: "1:147494247582:web:54fd259fa079aaaad3ef8f",
  measurementId: "G-54SX9X730C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Initialize Analytics only in the browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, auth, db, analytics }; // Export db to use in other parts of the app
