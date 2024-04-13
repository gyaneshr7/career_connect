import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZicA2jJVP9PK-J-H62_t9XJgoDx0X3ys",
  authDomain: "careerconnect-5c089.firebaseapp.com",
  projectId: "careerconnect-5c089",
  storageBucket: "careerconnect-5c089.appspot.com",
  messagingSenderId: "946557289970",
  appId: "1:946557289970:web:7ea19b948950ed842ed76b",
  measurementId: "G-WHT88P30HT",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
