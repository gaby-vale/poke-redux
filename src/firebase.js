import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFD8fed91HC9xBV-CmeamcNWqdAkXvuVU",
  authDomain: "poke-4a7fc.firebaseapp.com",
  projectId: "poke-4a7fc",
  storageBucket: "poke-4a7fc.appspot.com",
  messagingSenderId: "991202410584",
  appId: "1:991202410584:web:2c362c095775fd88364a2d",
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth, firebase };
