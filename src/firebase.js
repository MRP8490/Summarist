import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDzSOoNwvXdwu745SumtRrky3noj8mCes",
  authDomain: "summarist-project-505e4.firebaseapp.com",
  projectId: "summarist-project-505e4",
  storageBucket: "summarist-project-505e4.firebasestorage.app",
  messagingSenderId: "375796390802",
  appId: "1:375796390802:web:72892479e45e29be05bf4b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);