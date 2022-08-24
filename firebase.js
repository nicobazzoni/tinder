// Import the functions you need from the SDKs you need
import { getAuth } from  "firebase/auth"
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import useAuth from '../hooks/useAuth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn0lMDq508JNBLvDnmTE69n-Bu6W7o0eM",
  authDomain: "tinder-ace41.firebaseapp.com",
  projectId: "tinder-ace41",
  storageBucket: "tinder-ace41.appspot.com",
  messagingSenderId: "1022600936103",
  appId: "1:1022600936103:web:f11c3a22560a2b9b55b982"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()

export { auth, db,}