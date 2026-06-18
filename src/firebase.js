// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;

let app = null;
let firestore = null;
let storage = null;
let auth = null;
let analytics = null;
let firebaseInitError = null;

const firebaseConfig = {
  apiKey: firebaseApiKey ?? "",
  authDomain: "nss-svnit.firebaseapp.com",
  projectId: "nss-svnit",
  storageBucket: "nss-svnit.appspot.com",
  messagingSenderId: "1087350248008",
  appId: "1:1087350248008:web:0960756a28d32b01d23e7d",
  measurementId: "G-Z2TRT1KDBZ",
};

if (!firebaseApiKey) {
  firebaseInitError = new Error(
    "Missing VITE_FIREBASE_API_KEY. Create a .env file with VITE_FIREBASE_API_KEY=<your-firebase-api-key>."
  );
  console.warn(firebaseInitError.message);
} else {
  try {
    app = initializeApp(firebaseConfig);
    firestore = getFirestore(app);
    storage = getStorage(app);
    auth = getAuth(app);
    analytics = getAnalytics(app);
  } catch (err) {
    firebaseInitError = err instanceof Error ? err : new Error(String(err));
    console.error("Firebase failed to initialize:", firebaseInitError);
  }
}

export { app, firestore, storage, auth, analytics, firebaseInitError };
