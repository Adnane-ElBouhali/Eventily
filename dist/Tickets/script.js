import { auth } from "../index.js"
import{ onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js"

onAuthStateChanged(auth, user => {
    if (user != null) {
      const email = user.email;
      document.getElementById("user-email").innerHTML = email;
  
      const LogOutBtn = document.querySelector("#P1");
  
      LogOutBtn.addEventListener('click', () => {
  
        signOut(auth)
          .then(() => {
            window.location="../index.html"
            //console.log("The user is signed out");
          })
          .catch((err) => {
            console.log(err.message)
          })
      })

      

    }
  })