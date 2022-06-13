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



var eventRef3 = ref(database, 'groups');

var list_of_event_ids3 = []
onValue(eventRef3, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;

    list_of_event_ids3.push(childKey)
    // var P = []
    // for (let i in childKey) {
    //   P.push(childKey[i])
    // }
    // console.log(P)
  });
  console.log(list_of_event_ids3)

  for (let j = 1; j < list_of_event_ids3.length + 1 ; j++) {
    const starCountRef = ref(database, 'groups/' + list_of_event_ids3[j-1]);
    onValue(starCountRef, (snapshot) => {

      const pathReference = sref(storage, "Groups/" + list_of_event_ids3[j-1] + ".png")
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
      var eventTitle = L[3];
      var type_of_grp = L[5]
      var location = L[2]
      // var description = L[0]
      // var price = L[9]
      var user_uid = L[6]
      var number_of_participants = L[4]

      document.getElementById("event_title" + j).innerHTML = eventTitle;
      document.getElementById("event_title" + j + "/2").innerHTML = eventTitle;

      document.getElementById("date_time" + j).innerHTML = type_of_grp;
      document.getElementById("date_time" + j + "/2").innerHTML = type_of_grp;

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
        console.log(M)
        var organiser_name = "user"
        if(M.length == 4){
          organiser_name = M[2] + ' ' + M[3]
        }
        else if(M.length == 3){
          organiser_name = M[1] + ' ' + M[2]
        }
        else {
          organiser_name = M[2] + ' ' + M[4]
        }
        
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

console.log(list_of_event_ids3);

const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
    var searchInput = document.getElementById("searchInput").value;
    console.log(searchInput)
    
})
