
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNyKCyDS-SAY3pgWCTe3ZV56h6PbIXfkQ",
  authDomain: "rising-pen-456515-h8.firebaseapp.com",
  projectId: "rising-pen-456515-h8",
  storageBucket: "rising-pen-456515-h8.firebasestorage.app",
  messagingSenderId: "1002087414265",
  appId: "1:1002087414265:web:9acbce5d7fa5d3ad6da528",
  measurementId: "G-G6LLZ59Y3B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;