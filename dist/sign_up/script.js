import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
//import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';

import { auth } from '../index.js';

const btn = document.getElementById("C9");

btn.addEventListener('click', (e)=> {
    e.preventDefault();


    const email = document.getElementsByClassName("eds-field-styled__input")[2].value;
    const password = document.getElementsByClassName("eds-field-styled__input")[3].value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log('user created : ', cred.user)
        signUpForm.reset();
    })
    .catch((err) => {
        console.log(err.message)
    })

})









//const signUpForm = document.querySelector("#C7");
/*
signUpForm.addEventListener('submit', (e) => {
    console.log("hey");

    const firstName = signUpForm.firstName.value;
    const lastName = signUpForm.lastName.value;
    //const email = emailInput.email.value;
    //const password = passwordInput.password.value;

    const emailInput = signUpForm.elements['C4'].value;
    const passwordInput = signUpForm.elements['C5'].value;

    console.log(emailInput, passwordInput);

    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
    .then((cred) => {
        console.log('user created : ', cred.user)
        signUpForm.reset();
    })
    .catch((err) => {
        console.log(err.message)
    })
})
*/

