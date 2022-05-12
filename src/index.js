import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';

const app = initializeApp({
    apiKey: "AIzaSyBXZzoJSwm_WNFIuMwBfSxPAV0p-JJL3jk",
    authDomain: "eventilyy.firebaseapp.com",
    projectId: "eventilyy",
    storageBucket: "eventilyy.appspot.com",
    messagingSenderId: "409686331672",
    appId: "1:409686331672:web:59d66d47a574aad0c98e6d",
  });

const auth = getAuth(app);

onAuthStateChanged(auth, user => {
    if(user !=null) {
        console.log('logged in!');
    } else {
        console.log('No user');
    }
});

