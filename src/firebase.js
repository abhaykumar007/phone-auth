import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBfw8xumqPiQ4nVloMJA8SLMhn5g_3xCW8",
  authDomain: "borrow-request.firebaseapp.com",
  projectId: "borrow-request",
  storageBucket: "borrow-request.appspot.com",
  messagingSenderId: "607403227664",
  appId: "1:607403227664:web:e3be46e744bf56f3366895",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const database = firebase.database();
export default firebase;
