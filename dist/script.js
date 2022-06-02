import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

import { auth, database, storage } from "./index.js";
import { onValue, ref } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
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

//M=[]

// for (let i = 1; i < 10; i++) {
//   M[i] = Math.random()*100;



// }


// firebase.database().ref("events").orderByChild("id").startAt(Math.random).limitToFirst(1);

// let key = ref(database, 'events/').push().getKey();
// console.log(key);



var whosgonnatelluurnotpretty = ref(database, 'events');

var list_of_event_ids = []
onValue(whosgonnatelluurnotpretty, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;

    list_of_event_ids.push(childKey)
    // var P = []
    // for (let i in childKey) {
    //   P.push(childKey[i])
    // }
    // console.log(P)
  });
  console.log(list_of_event_ids)

  for (let j = 1; j < 5; j++) {
    const starCountRef = ref(database, 'events/' + list_of_event_ids[j-1]);
    onValue(starCountRef, (snapshot) => {

      const pathReference = sref(storage, "Images/" + list_of_event_ids[j-1] + ".png")
      var event_image = document.getElementById("image" + j)
      getDownloadURL(pathReference).then((url) => {
        event_image.setAttribute("src", url);
      })

      const data = snapshot.val();
      var L = []
      for (let i in data) {
        L.push(data[i])
      }
      console.log(L)
      var eventTitle = L[9];
      var startDate = L[7] + ', ' + L[8]
      var location = L[4]
      // var description = L[0]
      var price = L[6]
      var user_uid = L[11]
      var participants = L[5]

      document.getElementById("event-title" + j).innerHTML = eventTitle;
      document.getElementById("date-time" + j).innerHTML = startDate;
      document.getElementById("location" + j).innerHTML = location;
      document.getElementById("price" + j).innerHTML = price + " DHS";
 
      const organiser = ref(database, user_uid );
      onValue(organiser, (snapshot) => {
        var M = []
        const dataa = snapshot.val();
        //console.log(dataa)
        for (let i in dataa) {
          M.push(dataa[i])
        }
        //console.log(M)
        const organiser_name = M[2] + ' ' + M[3]
        document.getElementById("organiser" + j).innerHTML = organiser_name;
      })
      document.getElementById("participants" + j).innerHTML = participants + ' participants';

    });

  }





})


//--------------------------------------------

//---------------------------------------------





