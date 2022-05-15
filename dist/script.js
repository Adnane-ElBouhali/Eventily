import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { auth } from "./index.js";

const LogOutBtn = document.getElementById("D1");

LogOutBtn.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            //console.log("The user is signed out");
        })
        .catch((err) => {
            console.log(err.message)
        })
})

onAuthStateChanged(auth, user => {
    if(user !=null) {
        
    } else {
        
        document.getElementById("global-header").innerHTML = document.getElementById("header-after-login").innerHTML;
    }


});


