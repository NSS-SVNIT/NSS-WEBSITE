// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAnalytics } from "@firebase/analytics";
import { getStorage } from "@firebase/storage";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATpTxtw0O4jySPEt03iUrFdIYKwzOtZlM",
  authDomain: "nss-svnit.firebaseapp.com",
  projectId: "nss-svnit",
  storageBucket: "nss-svnit.appspot.com",
  messagingSenderId: "1087350248008",
  appId: "1:1087350248008:web:0960756a28d32b01d23e7d",
  measurementId: "G-Z2TRT1KDBZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
