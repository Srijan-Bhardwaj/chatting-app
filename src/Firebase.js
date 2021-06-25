import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA20No1Szz3Gu2aLWUjv-AwqLALwHCl12Y",
  authDomain: "sandesh-chatting-app.firebaseapp.com",
  projectId: "sandesh-chatting-app",
  storageBucket: "sandesh-chatting-app.appspot.com",
  messagingSenderId: "128133152544",
  appId: "1:128133152544:web:01b451d3fdae452fc16145"
});

const db = firebaseApp.firestore();

export default db;