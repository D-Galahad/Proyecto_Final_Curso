// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNaP4ciWxMe0JrWYwjr-n94UERvyebnCE",
  authDomain: "react-334c4.firebaseapp.com",
  databaseURL: "https://react-334c4-default-rtdb.firebaseio.com",
  projectId: "react-334c4",
  storageBucket: "react-334c4.firebasestorage.app",
  messagingSenderId: "885450256702",
  appId: "1:885450256702:web:17cdb53d9d049c39a37c6f",
  measurementId: "G-2P3CG44JLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth }