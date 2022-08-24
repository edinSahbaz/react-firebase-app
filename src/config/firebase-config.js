import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuPqG15n92yrtrikZUFSJo9y14drZ0OHQ",
  authDomain: "react-firebase-app-7a69e.firebaseapp.com",
  projectId: "react-firebase-app-7a69e",
  storageBucket: "react-firebase-app-7a69e.appspot.com",
  messagingSenderId: "376641011153",
  appId: "1:376641011153:web:980c19e6158767da05b4f0",
  measurementId: "G-9DTJ93MYTR",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
