import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
import { auth } from '../index.js';


const logInBtn = document.querySelector("#C1");

logInBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.getElementsByClassName("eds-field-styled__input")[0].value;
    const password = document.getElementsByClassName("eds-field-styled__input")[1].value;

    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log("User logged in : ", user.cred)
    })
    .catch((err) => {
        console.log(err.message)
    })
})