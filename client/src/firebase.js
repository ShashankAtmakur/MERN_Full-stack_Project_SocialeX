
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "your-firebase-apikey",
  authDomain: "your-firebase-authDomain",
  projectId: "your-firebase-projectId",
  storageBucket: "your-firebase-storageBucket",
  messagingSenderId: "your-firebase-messagingSenderId",
  appId: "your-firebase-appId"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
