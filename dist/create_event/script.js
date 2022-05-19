
import { getDatabase, set, ref } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js';
import { app } from '../index.js';
import { getStorage, ref as sref, uploadBytes } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js';

var event_id = event_id + 0;
export const database = getDatabase(app);


/*
const saveBtn = document.querySelector("#E2");

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

    set(ref(database, 'events/' + event_id), {
        title: event_title,
        domain: event_domain,
        description: event_description,
        location: event_location,
        start_date: event_start_date,
        start_time: event_start_time,
        end_date: event_end_date,
        end_time: event_end_time,
        visibility: event_visibility,
        price: event_price
      }).then(() => {
        // Data saved successfully!
        alert('data submitted');
        event_id++;
      })
      .catch((error) => {
        // The write failed...
        alert(error);
      });
})
var ImgName, ImgUrl;
var files = [];
var reader = new FileReader();

document.getElementById("select").onclick = function(e){
  var input = document.createElement('input');
  input.type='file';

  input.onchange = e => {
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function(){
      document.getElementById("myimg").src = reader.result;
    }
    reader.readAsDataURL(files[0]);
  }
  input.click();
}

document.getElementById('upload').onclick = function(){
  ImgName = document.getElementById('namebox').value;
  var name = "Images/"+ImgName+".png";
  const storage = getStorage(app);
  uploadBytes(sref(storage, name), files[0]).then((snapshot) => {
  console.log('Uploaded a file!');
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  document.getElementById('UpProgress').innerHTML = 'Upload'+progress+'%'
  })
};

*/