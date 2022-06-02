import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

import { auth, database, storage } from "./index.js";
import { onValue, child, get, ref} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
import { getDownloadURL, ref as sref } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js'

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
                })
                .catch((err) => {
                    console.log(err.message)
                })
        })
    } else {
        document.getElementById("global-header").innerHTML = document.getElementById("header-before-login").innerHTML;
    }
})


const starCountRef = ref(database, 'events/' + '561f894f-8fa8-4a5b-9bcb-1708db9d65f3/' );
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  var L = []
  for(let i in data){
    L.push(data[i])
  }
  console.log(L)
  var eventTitle = L[8];
  var startDate = L[6] + ', ' + L[7]
  var location = L[4]
  var description = L[0]
  var price = L[5]
  const pathReference = sref(storage, 'Images/561f894f-8fa8-4a5b-9bcb-1708db9d65f3.png')
  var event_image = document.getElementById("image1")
  getDownloadURL(pathReference).then((url) => {
    event_image.setAttribute("src", url);
  })
  document.getElementById("event-title1").innerHTML = eventTitle;
  document.getElementById("date-time1").innerHTML = startDate;
  document.getElementById("location1").innerHTML = location;
  document.getElementById("free-notfree1").innerHTML = price + " DHS";
  document.getElementById("something1").innerHTML = description;
  
});


