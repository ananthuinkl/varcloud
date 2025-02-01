// app/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzKgVC5AR8Z0i_vTUeuj2WPHfcMmJxEqc",
  authDomain: "var-cloud-a22ea.firebaseapp.com",
  projectId: "var-cloud-a22ea",
  storageBucket: "var-cloud-a22ea.firebasestorage.app",
  messagingSenderId: "408374167522",
  appId: "1:408374167522:web:eed5d1cabfdc28912c5bbb",
  measurementId: "G-PCPY87C8MC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
