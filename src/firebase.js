
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDYdA1VwjBOG-P1WmQlX5n9kdEVim2AKvk",
  authDomain: "dtu-connections.firebaseapp.com",
  projectId: "dtu-connections",
  storageBucket: "dtu-connections.appspot.com",
  messagingSenderId: "592736198519",
  appId: "1:592736198519:web:a0022253ebb25df15acb72",
  measurementId: "G-78J7G1N2GM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;