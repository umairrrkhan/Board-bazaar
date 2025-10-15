// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ-GgKmuI1Poo9Eogvv-_cnqpkuOYIqc8",
  authDomain: "board-bazaar.firebaseapp.com",
  projectId: "board-bazaar",
  storageBucket: "board-bazaar.firebasestorage.app",
  messagingSenderId: "627478213427",
  appId: "1:627478213427:web:866b467eaf520700ff8446",
  measurementId: "G-SCYYD46HMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);