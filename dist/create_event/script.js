import { } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js'
 
const event_id = 0;
const event_title = document.getElementsByClassName("eds-field-styled__input")[0].value;
const event_type = document.getElementsByClassName("eds-field-styled__input")[1].value;
const event_category = document.getElementsByClassName("eds-field-styled__input")[2].value;
const event_location = document.getElementsByClassName("eds-field-styled__input")[4].value;
const event_start_date = document.getElementsByClassName("eds-field-styled__input")[5].value;
const event_start_time = document.getElementsByClassName("eds-field-styled__input")[6].value;
const event_end_date = document.getElementsByClassName("eds-field-styled__input")[7].value;
const event_end_time = document.getElementsByClassName("eds-field-styled__input")[8].value;
const event_time_zone = document.getElementsByClassName("eds-field-styled__input")[9].value;
const event_language = document.getElementsByClassName("eds-field-styled__input")[10].value;
const addBtn = document.getElementById("E1");
const saveBtn = document.getElementById("E2");

const database = firebase.database();

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    database.ref('/events/'+ (event_id++)).set({
        title: event_title,
        type: event_type,
        category: event_category,
        location: event_location,
        start_date: event_start_date,
        start_time: event_start_time,
        end_date: event_end_date,
        end_time: event_end_time,
        time_zone: event_time_zone,
        language: event_language
    })
})