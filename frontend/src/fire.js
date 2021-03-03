import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyC_4-6FkEWFZuHlztyrLrmIQ4vFUL4FrgQ",
    authDomain: "mealsthatconnect-51223.firebaseapp.com",
    projectId: "mealsthatconnect-51223",
    storageBucket: "mealsthatconnect-51223.appspot.com",
    messagingSenderId: "837309158423",
    appId: "1:837309158423:web:fee0f8419ba42521a9b852",
    measurementId: "G-QY4CXL04D7"
  };
var fire = firebase.initializeApp(config);
export default fire;