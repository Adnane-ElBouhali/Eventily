import { storage, database, auth } from '../index.js';
import { ref as sref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

var eventID = uuid();


const saveBtn = document.querySelector("#E2");
var files = [];
var reader = new FileReader();

// for(let i=0; i<15; i++){
//   console.log(document.getElementsByClassName("eds-field-styled__input")[i])
// }


saveBtn.addEventListener('click', (e) => {
  
  e.preventDefault();
  const event_title = document.getElementsByClassName("eds-field-styled__input")[0].value;
  const event_type = document.getElementsByClassName("eds-field-styled__input")[1].value;
  const event_description = document.getElementsByClassName("eds-field-styled__input")[2].value;
  const event_max_participants = document.getElementsByClassName("eds-field-styled__input")[3].value;
  const event_tags = document.getElementsByClassName("eds-field-styled__input")[4].value;
  //console.log(event_tags)
  const event_location = document.getElementsByClassName("eds-field-styled__input")[5].value;
  const event_start_date = document.getElementsByClassName("eds-field-styled__input")[6].value;
  const event_start_time = document.getElementsByClassName("eds-field-styled__input")[7].value;
  const event_end_date = document.getElementsByClassName("eds-field-styled__input")[8].value;
  const event_end_time = document.getElementsByClassName("eds-field-styled__input")[9].value;
  const event_visibility = document.getElementsByClassName("eds-field-styled__input")[10].value;
  const event_price = document.getElementsByClassName("eds-field-styled__input")[11].value;
  const u = auth.currentUser;
  var Name = "Images/" + eventID + ".png";
  
  uploadBytes(sref(storage, Name), files[0]).then((snapshot) => {
    console.log('Uploaded a file!');
    getDownloadURL(sref(storage, Name))
    .then((url) => {
      console.log(typeof url);
      set(ref(database, u.uid + '/events-created/' + eventID), {
        title: event_title
        
      }).then(() => {
        // Data saved successfully!
        set(ref(database, '/events/' + eventID), {
          creator: u.uid,
          title: event_title,
          type: event_type,
          description: event_description,
          tags: event_tags,
          location: event_location,
          start_date: event_start_date,
          start_time: event_start_time,
          end_date: event_end_date,
          end_time: event_end_time,
          visibility: event_visibility,
          price: event_price,
          image: url,
          number_of_participants: 1,
          max_number_of_participants: event_max_participants
        }).then(() => {
          set(ref(database, '/events/' + eventID + '/participants'), {
            user: u.uid
          }).then(() => {
            // Data saved successfully!
            window.location = "../index.html"
          }).catch((error) => {
            alert(error);
          })
          
        })
          .catch((error) => {
            // The write failed...
            alert(error);
          });

        
      })
        .catch((error) => {
          // The write failed...
          alert(error);
        });

        


    })
    .catch((error) => {
      // Handle any error
      console.log(error.message)
    });
  });

    
})

document.getElementById("select").onclick = function (e) {
  var input = document.createElement('input');
  input.type = 'file';

  input.onchange = e => {
    files = e.target.files;
    reader.onload = function () {
      document.getElementById("myimg").src = reader.result;
    }
    reader.readAsDataURL(files[0]);
  }
  input.click();
}
//document.getElementById ("eventType-label").innerHTML = document.getElementsByClassName("eds-field-styled__input")[1].value;
//var visibility1 = document.getElementById("vis1");
//var visibility2 = document.getElementById("vis2");

// visibility2.onclick = function () {
//   console.log("hey")
//   document.getElementById("visibility").innerHTML = visibility2.innerHTML
// }
