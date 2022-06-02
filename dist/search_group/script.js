import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { auth } from "../index.js";

onAuthStateChanged(auth, user => {
    if (user != null) {
        document.getElementById("global-header").innerHTML = document.getElementById("header-after-login").innerHTML;
        const email = user.email;
        document.getElementById("user-email").innerHTML = email;

        const LogOutBtn = document.querySelector("#P1");

        LogOutBtn.addEventListener('click', () => {

            signOut(auth)
                .then(() => {
                    //console.log("The user is signed out");
                    window.location = "../index.html"
                })
                .catch((err) => {
                    console.log(err.message)
                })
        })
    } else {
        document.getElementById("global-header").innerHTML = document.getElementById("header-before-login").innerHTML;
    }
})