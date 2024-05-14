// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-A5RQX6W6_CrzJSMO2n6DMSNgV7SP3TQ",
  authDomain: "music-central-bd2cd.firebaseapp.com",
  projectId: "music-central-bd2cd",
  storageBucket: "music-central-bd2cd.appspot.com",
  messagingSenderId: "557724694647",
  appId: "1:557724694647:web:597eb4e8cd21af1c02ae72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getFirestore(app);
