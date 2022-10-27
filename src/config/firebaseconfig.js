// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2LgKEx9tLthFgP5TPqs2jidzBz7AxUKY",
  authDomain: "fbquizapp-352dd.firebaseapp.com",
  projectId: "fbquizapp-352dd",
  storageBucket: "fbquizapp-352dd.appspot.com",
  messagingSenderId: "999058597596",
  appId: "1:999058597596:web:19ba1c335ce9574eafb619",
  measurementId: "G-DR52NY4M9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app