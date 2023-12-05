import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBi6VlC56K8DT9cjQxmk8LLpYIMQ_TRxY",
  authDomain: "utopian-courier-406815.firebaseapp.com",
  projectId: "utopian-courier-406815",
  storageBucket: "utopian-courier-406815.appspot.com",
  messagingSenderId: "220968435630",
  appId: "1:220968435630:web:91717d5a3a3dc0a0d4123f"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db,storage }