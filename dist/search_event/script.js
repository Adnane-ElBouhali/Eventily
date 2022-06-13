import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { auth, database, storage } from "../index.js";
import { onValue, ref } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
import { getDownloadURL, ref as sref } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js';

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







var eventRef2 = ref(database, 'events');

var list_of_event_ids2 = []
onValue(eventRef2, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;

    list_of_event_ids2.push(childKey)
    // var P = []
    // for (let i in childKey) {
    //   P.push(childKey[i])
    // }
    // console.log(P)
  });
  console.log(list_of_event_ids2)

  for (let j = 1; j < list_of_event_ids2.length + 1 ; j++) {
    const starCountRef = ref(database, 'events/' + list_of_event_ids2[j-1]);
    onValue(starCountRef, (snapshot) => {

      const pathReference = sref(storage, "Images/" + list_of_event_ids2[j-1] + ".png")
      var event_image1 = document.getElementById("image" + j)
      var event_image2 = document.getElementById("image" + j + "/2")
      getDownloadURL(pathReference).then((url) => {
        event_image1.setAttribute("src", url);
        event_image2.setAttribute("src", url);
      })

      const data = snapshot.val();
      var L = []
      for (let i in data) {
        L.push(data[i])
      }
      console.log(L)
      var eventTitle = L[13];
      var startDateTime = L[10] + ', ' + L[11]
      var location = L[5]
      // var description = L[0]
      // var price = L[9]
      var user_uid = L[0]
      var number_of_participants = L[7]

      document.getElementById("event_title" + j).innerHTML = eventTitle;
      document.getElementById("event_title" + j + "/2").innerHTML = eventTitle;

      document.getElementById("date_time" + j).innerHTML = startDateTime;
      document.getElementById("date_time" + j + "/2").innerHTML = startDateTime;

      document.getElementById("location" + j).innerHTML = location;
      document.getElementById("location" + j + "/2").innerHTML = location;

      //document.getElementById("price" + j).innerHTML = price + " DHS";
 
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
        document.getElementById("organiser" + j + "/2").innerHTML = organiser_name;

        // $(".event"+j).click(function() {
        //   getDownloadURL(pathReference).then((url) => {
        //     document.getElementById("eventImage").setAttribute("src", url);
        //   })
        //   document.getElementById("event_price").innerHTML = price;
        //   document.getElementById("titleEvent").innerHTML = title;
        //   document.getElementById("organizer-link-org-panel").innerHTML = organiser_name;
        //   window.location = "../profiles/event.html"; 
        //   return true;
        // });
      })
      document.getElementById("participants" + j).innerHTML = number_of_participants + ' participants';
      document.getElementById("participants" + j + "/2").innerHTML = number_of_participants + ' participants';
    });

  }


})

console.log(list_of_event_ids2);

const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
    var searchInput = document.getElementById("searchInput").value;
    console.log(searchInput)
    
})
