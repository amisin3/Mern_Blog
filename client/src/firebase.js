import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDP2PW26cwXbRaaYKdz9J3PcucCe8YGCyo",
  authDomain: "mern-blog-e6c28.firebaseapp.com",
  databaseURL: "https://mern-blog-e6c28.firebaseio.com",
  projectId: "mern-blog-e6c28",
  storageBucket: "mern-blog-e6c28.appspot.com",
  messagingSenderId: "1060210351623",
  appId: "1:1060210351623:web:4cb585f7c15bd32a3314a2",
  measurementId: "G-KSGC6EYTNN",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
