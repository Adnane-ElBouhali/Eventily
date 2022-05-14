import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';


const app = initializeApp({
    apiKey: "AIzaSyBXZzoJSwm_WNFIuMwBfSxPAV0p-JJL3jk",
    authDomain: "eventilyy.firebaseapp.com",
    projectId: "eventilyy",
    storageBucket: "eventilyy.appspot.com",
    messagingSenderId: "409686331672",
    appId: "1:409686331672:web:59d66d47a574aad0c98e6d",
  });


export const auth = getAuth();



onAuthStateChanged(auth, user => {
    /*if(user !=null) {
        console.log('logged in!');
    } else {
        console.log('No user');
    }*/

    console.log("user status changed : ", user)

});



/*
const signupForm = document.getElementById('C7');
const btn = document.getElementById('C9');

btn.addEventListener('submit', (e) => {

    console.log("hey");
    console.log(document.getElementById('C7').elements["C4"].value);
    //const firstName = signUpForm.firstName.value;
    //const lastName = signUpForm.lastName.value;
    //const email = emailInput.email.value;
    //const password = passwordInput.password.value;

    const emailInput = document.getElementById('C4').value;
    const passwordInput = document.getElementById('C5').value;

    

    createUserWithEmailAndPassword(auth,emailInput,passwordInput)
    .then((cred) => {
        console.log('user created : ', cred.user)
        signupForm.reset();
    })
    .catch((err) => {
        console.log(err.message)
    })

})
*/


