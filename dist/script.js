import { signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { auth } from "./index.js";

const LogOutBtn = document.getElementById("D1");

LogOutBtn.addEventListener('click', () => {
    console.log("hey1")
    signOut(auth)
        .then(() => {
            console.log("The user is fsigned out");
        })
        .catch((err) => {
            console.log(err.message)
        })
    console.log("hey2")
})
