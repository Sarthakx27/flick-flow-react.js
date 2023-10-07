import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB_nhEHcjLrhQF7CGZovo13wdYTd6BohwU", 
  authDomain: "flickflow-86d6f.firebaseapp.com",
  projectId: "flickflow-86d6f",
  storageBucket: "flickflow-86d6f.appspot.com",
  messagingSenderId: "90144872136",
  appId: "1:90144872136:web:b687051c1f2c455f4eb7fd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;