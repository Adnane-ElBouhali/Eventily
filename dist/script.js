import { signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { auth } from "./index.js";

const LogOutBtn = document.getElementById("D1");

LogOutBtn.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log("The user is signed out");
        })
        .catch((err) => {
            console.log(err.message)
        })
})
