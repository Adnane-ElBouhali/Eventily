import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
//import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';

import { auth } from '../index.js';

const btn = document.getElementById("C9");
//const signUpForm = document.getElementsByClassName("signUP");

btn.addEventListener('click', (e)=> {
    e.preventDefault();


    const email = document.getElementsByClassName("eds-field-styled__input")[2].value;
    const password = document.getElementsByClassName("eds-field-styled__input")[3].value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        //console.log('user created : ', cred.user)
        window.location = "../index.html";
    })
    .catch((err) => {
        console.log(err.message)
    })

})
