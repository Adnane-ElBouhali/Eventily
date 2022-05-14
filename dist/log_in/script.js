import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
import { auth } from '../index.js';


const logInBtn = document.getElementById("C1");

logInBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.getElementsByClassName("eds-field-styled__input")[0].value;
    const password = document.getElementsByClassName("eds-field-styled__input")[1].value;

    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        //console.log("User logged in : ",cred.user)
        window.location = "../index.html";
    })
    .catch((err) => {
        console.log(err.message)
    })
})

