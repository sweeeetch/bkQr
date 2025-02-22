import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "#",
  authDomain: "#m",
  projectId: "#",
  storageBucket: "#",
  messagingSenderId: "#",
  appId: "1#",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
