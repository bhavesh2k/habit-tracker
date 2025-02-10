// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnMU-CzSmD4d2AiS20bcIMrr1_eneft68",
  authDomain: "habit-tracker-580d5.firebaseapp.com",
  projectId: "habit-tracker-580d5",
  storageBucket: "habit-tracker-580d5.firebasestorage.app",
  messagingSenderId: "1088854789740",
  appId: "1:1088854789740:web:80261dbf30bb078c89d249"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };