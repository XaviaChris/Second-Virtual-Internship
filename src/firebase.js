import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyRMpZtC1vPpQC37Z5qOLHYdK2tRtLwf4",
  authDomain: "summarist-internship-2.firebaseapp.com",
  projectId: "summarist-internship-2",
  appId: "1:1065851825400:web:f080b9de89fab98c05df0d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);