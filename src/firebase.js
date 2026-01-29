import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCn0m2NyhqtwbeG6umrjuDPmbcEGeFwwfo",
  authDomain: "krishok-bazar.firebaseapp.com",
  projectId: "krishok-bazar",
  storageBucket: "krishok-bazar.firebasestorage.app",
  messagingSenderId: "375319143106",
  appId: "1:375319143106:web:f9c09e8c32b42cf1aa115b",
  measurementId: "G-WGV2DYH74D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// এগুলি অবশ্যই export করতে হবে যাতে AuthContext এ কাজ করে
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);