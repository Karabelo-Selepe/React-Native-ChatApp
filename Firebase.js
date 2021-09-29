// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB249j45KJukIcRusHItfw0Lxvp6arqhd0",
  authDomain: "hey-chat-297fa.firebaseapp.com",
  projectId: "hey-chat-297fa",
  storageBucket: "hey-chat-297fa.appspot.com",
  messagingSenderId: "459468248594",
  appId: "1:459468248594:web:412d290a2b37b34a6e6acb"
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.firestore()

export { auth, db };
