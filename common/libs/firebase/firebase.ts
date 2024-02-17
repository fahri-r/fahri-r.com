import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0Po55Ko-41AbeXLHbpZy1J7kPK46u4DI",
  authDomain: "fahri-personal-web.firebaseapp.com",
  projectId: "fahri-personal-web",
  storageBucket: "fahri-personal-web.appspot.com",
  messagingSenderId: "368127561112",
  appId: "1:368127561112:web:e26fa204f684ad976b2fed",
  measurementId: "G-RFPPGM2YJ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions };