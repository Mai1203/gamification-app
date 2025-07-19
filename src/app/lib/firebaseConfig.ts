// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-KB2tnKlgwX74JxlWOhhi3wCDoWbi_6I",
  authDomain: "edocode-a3c19.firebaseapp.com",
  projectId: "edocode-a3c19",
  storageBucket: "edocode-a3c19.firebasestorage.app",
  messagingSenderId: "602124641418",
  appId: "1:602124641418:web:0c2178fc20c557b3cd7973",
  measurementId: "G-8QBXTK9MN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
