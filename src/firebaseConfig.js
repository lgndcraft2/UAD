import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiZWRMm0KuYxoWjVX9A14Ue_XSALsqqWs",
  authDomain: "wdc-database.firebaseapp.com",
  projectId: "wdc-database",
  storageBucket: "wdc-database.firebasestorage.app",
  messagingSenderId: "450581405623",
  appId: "1:450581405623:web:6ea7f0b676da8ae0329232"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);