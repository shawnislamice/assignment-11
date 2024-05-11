import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIqK_qahLu_aviNH29qqR4wl0P_bauuK0",
  authDomain: "assignment-11-prebon-hotels.firebaseapp.com",
  projectId: "assignment-11-prebon-hotels",
  storageBucket: "assignment-11-prebon-hotels.appspot.com",
  messagingSenderId: "441956710200",
  appId: "1:441956710200:web:73ed5a884e315a2c72b3cd",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
