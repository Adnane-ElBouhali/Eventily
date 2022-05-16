import { getDatabase, set, ref } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js'
import { app } from '../index.js';

var event_id = 0;
const database = getDatabase(app);
const addBtn = document.getElementById("E1");
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
      })
      .catch((error) => {
        // The write failed...
        alert(error);
      });
    event_id++;
})