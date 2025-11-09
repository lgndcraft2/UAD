import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth as getAuthFromApp } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiZWRMm0KuYxoWjVX9A14Ue_XSALsqqWs",
  authDomain: "wdc-database.firebaseapp.com",
  projectId: "wdc-database",
  storageBucket: "wdc-database.firebasestorage.app",
  messagingSenderId: "450581405623",
  appId: "1:450581405623:web:6ea7f0b676da8ae0329232"
};

const firebaseConfig2 = {
  apiKey: "AIzaSyCqIvat_eT67nN4E73X-SFcs6KJUFqxscY",
  authDomain: "uad-staff.firebaseapp.com",
  projectId: "uad-staff",
  storageBucket: "uad-staff.firebasestorage.app",
  messagingSenderId: "987844371625",
  appId: "1:987844371625:web:38833159484fab1295b5b8",
  measurementId: "G-ZWRZ5ZHGK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const app2 = initializeApp(firebaseConfig2, "secondary");
export const db = getFirestore(app);
export const auth = getAuthFromApp(app2);