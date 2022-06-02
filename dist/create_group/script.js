

import { storage, database, auth } from '../index.js';
import { ref as sref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js';
import {  ref, set } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

var groupID=uuid();

const saveBtn = document.querySelector("#E2");
var files = [];
var reader = new FileReader();

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const group_name = document.getElementsByClassName("eds-field-styled__input")[0].value;
    const group_topic = document.getElementsByClassName("eds-field-styled__input")[1].value;
    const group_description = document.getElementsByClassName("eds-field-styled__input")[2].value;
    const group_location = document.getElementsByClassName("eds-field-styled__input")[3].value;
    const group_visibility = document.getElementsByClassName("eds-field-styled__input")[4].value;
    const u = auth.currentUser;
    var Name = "Groups/"+groupID+".png";
    uploadBytes(sref(storage, Name), files[0]).then((snapshot) => {
    console.log('Uploaded a file!');
    });
    getDownloadURL(sref(storage, Name))
    .then((url) => {
      set(ref(database,u.uid + '/groups-created/' + groupID), {
        name: group_name,
        topic: group_topic,
        description: group_description,
        location: group_location,
        visibility: group_visibility,
        image: url,
      }).then(() => {
        // Data saved successfully!
        set(ref(database,'groups/' + groupID), {
          user: u.uid,
          name: group_name,
          topic: group_topic,
          description: group_description,
          location: group_location,
          visibility: group_visibility,
          image: url,
        }).then(() => {
          // Data saved successfully!
          window.location="../index.html"
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
})

document.getElementById("select").onclick = function(e){
  var input = document.createElement('input');
  input.type='file';

  input.onchange = e => {
    files = e.target.files;
    reader.onload = function(){
      document.getElementById("myimg").src = reader.result;
    }
    reader.readAsDataURL(files[0]);
  }
  input.click();
}
//document.getElementById ("eventType-label").innerHTML = document.getElementsByClassName("eds-field-styled__input")[1].value;
/*var visibility1 = document.getElementById("vis1");
var visibility2 = document.getElementById("vis2");

visibility2.onclick=function(){
  console.log("hey")
  document.getElementById("visibility").innerHTML = visibility2.innerHTML
}
*/