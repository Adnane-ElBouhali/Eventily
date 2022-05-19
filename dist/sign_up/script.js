import { createUserWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
//import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
import { set, ref } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js';
import { auth } from '../index.js';
import { database } from '../create_event/script.js';

const btn = document.getElementById("C9");
//const signUpForm = document.getElementsByClassName("signUP");


// onAuthStateChanged(auth, user => {

//     if(user) {


//     }

//     else {
        


//     }

        
   
// });



    btn.addEventListener('click', (e)=> { 
        
        
        e.preventDefault();
        
        const firstName = document.getElementsByClassName("eds-field-styled__input")[0].value;
        const lastName = document.getElementsByClassName("eds-field-styled__input")[1].value;
        const email = document.getElementsByClassName("eds-field-styled__input")[2].value;
        const password = document.getElementsByClassName("eds-field-styled__input")[3].value;
    


        createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            const u = auth.currentUser.uid;
            
            set(ref(database, u+'/'), {
                first_name: firstName,
                last_name: lastName,
                email: email
              }).then(() => {
                // Data saved successfully!
                
              })
              .catch((error) => {
                // The write failed...
                console.log(error.message)
              });

            //console.log('user created : ', cred.user)
            window.location = "../index.html";
        })
        .catch((err) => {
            console.log(err.message)
        })
    
    })

   


    
