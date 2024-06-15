// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "twitter-clone-853c2.firebaseapp.com",
  projectId: "twitter-clone-853c2",
  storageBucket: "twitter-clone-853c2.appspot.com",
  messagingSenderId: "641781519883",
  appId: "1:641781519883:web:0c06e7aee0df5fb287190e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// kimlik doğrulama yapısının referansını al;
export const auth = getAuth(app);

// google provider kurulumu;
export const provider = new GoogleAuthProvider();

// veritabanının referansını alma;
export const db = getFirestore(app);

// medya depolama alnı kurulumu;
export const storage = getStorage(app);
