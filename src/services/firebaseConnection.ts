import firebase from "firebase/app";
import 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyDxNo9mKGlUeruLn_83kZEp8uTClxvON8o",
    authDomain: "boardapp-a7e83.firebaseapp.com",
    projectId: "boardapp-a7e83",
    storageBucket: "boardapp-a7e83.appspot.com",
    messagingSenderId: "360538775863",
    appId: "1:360538775863:web:eae8794de63452bdc8bab2",
    measurementId: "G-XJF27SW8EP"
  };
  
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;