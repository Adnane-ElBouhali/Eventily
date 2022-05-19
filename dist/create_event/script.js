

import { storage, database, auth } from '../index.js';
import { ref as sref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js';
import {  ref, set } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

var eventID=uuid();


const saveBtn = document.querySelector("#E2");

var ImgUrl, Name;
var files = [];
var reader = new FileReader();

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const event_title = document.getElementsByClassName("eds-field-styled__input")[0].value;
    const event_domain = document.getElementsByClassName("eds-field-styled__input")[1].value;
    const event_description = document.getElementsByClassName("eds-field-styled__input")[2].value;
    const event_location = document.getElementsByClassName("eds-field-styled__input")[4].value;
    const event_start_date = document.getElementsByClassName("eds-field-styled__input")[5].value;
    const event_start_time = document.getElementsByClassName("eds-field-styled__input")[6].value;
    const event_end_date = document.getElementsByClassName("eds-field-styled__input")[7].value;
    const event_end_time = document.getElementsByClassName("eds-field-styled__input")[8].value;
    const event_visibility = document.getElementsByClassName("eds-field-styled__input")[9].value;
    const event_price = document.getElementsByClassName("eds-field-styled__input")[10].value;
    const u = auth.currentUser;

    getDownloadURL(sref(storage, Name))
    .then((url) => {
      console.log('hey1')
      ImgUrl = url;
      console.log(ImgUrl)
      set(ref(database,u.uid + '/events-created/' + eventID), {
        title: event_title,
        domain: event_domain,
        description: event_description,
        location: event_location,
        start_date: event_start_date,
        start_time: event_start_time,
        end_date: event_end_date,
        end_time: event_end_time,
        visibility: event_visibility,
        price: event_price,
        image: ImgUrl
      }).then(() => {
        // Data saved successfully!
        console.log('hey1')
        window.location = "../index.html";
      })
      .catch((error) => {
        // The write failed...
        alert(error);
      });

    })
    .catch((error) => {
      // Handle any erro
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

document.getElementById('upload').onclick = function(){
  Name = "Images/"+eventID+".png";
  uploadBytes(sref(storage, Name), files[0]).then((snapshot) => {
  console.log('Uploaded a file!');
  });
};

