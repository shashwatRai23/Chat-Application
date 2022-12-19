import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCEES12pQbDvsJ94Zuw6kd2EjZr8my9Z9M",
  authDomain: "chat-application-7736d.firebaseapp.com",
  projectId: "chat-application-7736d",
  storageBucket: "chat-application-7736d.appspot.com",
  messagingSenderId: "713405909058",
  appId: "1:713405909058:web:d261b0fd65981dfbc005db",
  measurementId: "G-0JHY0MSSXL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;
