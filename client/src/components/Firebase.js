// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNla1tifIVoAE3-04na2Yb4oES9viaa_0",
  authDomain: "eoapp29june23.firebaseapp.com",
  projectId: "eoapp29june23",
  storageBucket: "eoapp29june23.appspot.com",
  messagingSenderId: "865924699302",
  appId: "1:865924699302:web:ec521895ba7e20f6229067"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app,auth}