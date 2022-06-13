import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

import { auth, database, storage } from "./index.js";
import { get, child, onValue, ref, set } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
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



var eventRef = ref(database, 'events');

var list_of_event_ids = []
onValue(eventRef, (snapshot) => {
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

  for (let j = 1; j < 9; j++) {
    const starCountRef = ref(database, 'events/' + list_of_event_ids[j - 1]);
    onValue(starCountRef, (snapshot) => {

      const pathReference = sref(storage, "Images/" + list_of_event_ids[j - 1] + ".png")
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
      var eventTitle = L[13];
      var startDateTime = L[10] + ', ' + L[11]
      var location = L[5]
      // var description = L[0]
      var price = L[9]
      var user_uid = L[0]
      var number_of_participants = L[7]

      if (document.getElementById("event-title" + j) != null && document.getElementById("date-time" + j) != null && document.getElementById("location" + j) != null && document.getElementById("price" + j) != null) {
        document.getElementById("event-title" + j).innerHTML = eventTitle;
        document.getElementById("date-time" + j).innerHTML = startDateTime;
        document.getElementById("location" + j).innerHTML = location;
        document.getElementById("price" + j).innerHTML = price + " DHS";
      }


      const organiser = ref(database, user_uid);
      onValue(organiser, (snapshot) => {
        var M = []
        const dataa = snapshot.val();
        //console.log(dataa)
        for (let i in dataa) {
          M.push(dataa[i])
        }
        console.log(M)
        const organiser_name = M[2] + ' ' + M[3]
        document.getElementById("organiser" + j).innerHTML = organiser_name;

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

    });

  }


})
var groupRef = ref(database, 'groups');

var list_of_group_ids = []

onValue(groupRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    list_of_group_ids.push(childKey)
  });
  console.log(list_of_group_ids)

  for (let j = 1; j < 5; j++) {
    const starCountRef = ref(database, 'groups/' + list_of_group_ids[j - 1]);
    onValue(starCountRef, (snapshot) => {

      const pathReference = sref(storage, "Groups/" + list_of_group_ids[j - 1] + ".png")
      var event_image = document.getElementById("gimage" + j)
      getDownloadURL(pathReference).then((url) => {
        event_image.setAttribute("src", url);
      })

      const data = snapshot.val();
      var L = []
      for (let i in data) {
        L.push(data[i])
      }
      console.log(L)
      var groupTitle = L[3]
      var location = L[2]
      // var description = L[0]
      var user_id = L[6]
      var number_of_followers = L[4]

      if (document.getElementById("group-title" + j) != null && document.getElementById("glocation" + j) != null) {
        document.getElementById("group-title" + j).innerHTML = groupTitle;
        document.getElementById("glocation" + j).innerHTML = location;
      }


      const organiser = ref(database, user_id);
      onValue(organiser, (snapshot) => {
        var M = []
        const dataa = snapshot.val();
        //console.log(dataa)
        for (let i in dataa) {
          M.push(dataa[i])
        }
        console.log(M)
        const organiser_name = M[2] + ' ' + M[4]
        document.getElementById("creator" + j).innerHTML = organiser_name;

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
      document.getElementById("followers" + j).innerHTML = number_of_followers + ' followers';

    });

  }


})

window.onload = function () {
  var el1 = document.getElementById("z1");
  var el2 = document.getElementById("z2");
  var el3 = document.getElementById("z3");
  var el4 = document.getElementById("z4");
  var el5 = document.getElementById("z5");
  var el6 = document.getElementById("z6");
  var el7 = document.getElementById("z7");
  var el8 = document.getElementById("z8");

  var gr1 = document.getElementById("g1");
  var gr2 = document.getElementById("g2");
  var gr3 = document.getElementById("g3");
  var gr4 = document.getElementById("g4");

  el1.onclick = (function () {
    get(child(ref(database), "events")).then((snapshot) => {
      if (snapshot.exists()) {
        var K = []
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;

          K.push(childKey)
        });
        const starCountRef = ref(database, 'events');
        get(child(starCountRef, K[0])).then((snapshot) => {
          const pathReference = sref(storage, "Images/" + K[0] + ".png")
          var event_image = document.getElementById("eventImage")
          getDownloadURL(pathReference).then((url) => {
            event_image.setAttribute("src", url);
          })

          const data = snapshot.val();
          var L = []
          for (let i in data) {
            L.push(data[i])
          }
          console.log(L)
          // var eventTitle = L[12];
          // console.log(L[12])
          // var startDateTime = L[10] + ', ' + L[11]
          // var location = L[5]
          // var description = L[0]
          // var price = L[9]
          var user_uid = L[0]
          // var number_of_participants = L[7]

          document.getElementById("titleEvent").innerHTML = L[13];
          document.getElementById("share-inline-heading").innerHTML = L[1];
          document.getElementById("tags").innerHTML = L[12];
          document.getElementById("event-time").innerHTML = L[2] + ', ' + L[3];
          document.getElementById("event-date").innerHTML = L[10] + ', ' + L[11];
          document.getElementById("eventLocation").innerHTML = L[5];
          document.getElementById("EP").innerHTML = L[9] + " DHS";
          get(child(ref(database), user_uid)).then((snapshot) => {
            var M = []
            const dataa = snapshot.val();
            //console.log(dataa)
            for (let i in dataa) {
              M.push(dataa[i])
            }
            //console.log(M)
            const organiser_name = M[2] + ' ' + M[3]
            document.getElementById("organizer-link-org-panel").innerHTML = organiser_name;

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
        });
        document.getElementById("homepage").innerHTML = document.getElementById("eventProfile").innerHTML;

        console.log(document.querySelector("#hamid17").innerHTML)
        document.getElementById("hamid17").addEventListener('click', (e) => {
          console.log("Hey")
          e.preventDefault();
          onAuthStateChanged(auth, user => {
            if (user != null) {
              var eventID = K[0];
              var seventRef = ref(database, 'events/');
              get(child(seventRef, eventID)).then((snapshot) => {
                const data = snapshot.val();
                var L = []
                for (let i in data) {
                  L.push(data[i])
                }

                if (L[7] == L[6]) {
                  alert("the event is full")
                }
                else {
                  set(ref(database, '/events/' + eventID), {
                    creator: L[0],
                    title: L[13],
                    type: L[14],
                    description: L[1],
                    tags: L[12],
                    location: L[5],
                    start_date: L[10],
                    start_time: L[11],
                    end_date: L[2],
                    end_time: L[3],
                    visibility: L[15],
                    price: L[9],
                    image: L[4],
                    number_of_participants: ++L[7],
                    max_number_of_participants: L[6],
                    participants: L[8]
                  }).then(() => {
                    set(ref(database, '/events/' + eventID + '/participants/' + user.uid), {
                      user: user.uid
                    }).then(() => {
                      set(ref(database, user.uid + '/zevents_joined/' + eventID), {
                        event: eventID
                      }).then(() => {
                        alert("event joined successfully")
                        window.location = "index.html"
                      }).catch((error) => {
                        alert(error);
                      })
                    }).catch((error) => {
                      alert(error);
                    })
                  }).catch((error) => {
                    alert(error);
                  })
                }
              });
            } else {
              window.location = "log_in/index.html";
            }

          });
        });

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  });
  el2.onclick = (function () {
    get(child(ref(database), "events")).then((snapshot) => {
      if (snapshot.exists()) {
        var K = []
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;

          K.push(childKey)
        });
        console.log(K)
        const starCountRef = ref(database, 'events');
        get(child(starCountRef, K[1])).then((snapshot) => {
          const pathReference = sref(storage, "Images/" + K[1] + ".png")
          var event_image = document.getElementById("eventImage")
          getDownloadURL(pathReference).then((url) => {
            event_image.setAttribute("src", url);
          })

          const data = snapshot.val();
          var L = []
          for (let i in data) {
            L.push(data[i])
          }
          console.log(L)
          // var eventTitle = L[12];
          // console.log(L[12])
          // var startDateTime = L[10] + ', ' + L[11]
          // var location = L[5]
          // var description = L[0]
          // var price = L[9]
          var user_uid = L[0]
          // var number_of_participants = L[7]

          document.getElementById("titleEvent").innerHTML = L[12];
          document.getElementById("event-date").innerHTML = L[10] + ', ' + L[11];
          document.getElementById("eventLocation").innerHTML = L[5];
          document.getElementById("EP").innerHTML = L[9] + " DHS";
          get(child(ref(database), user_uid)).then((snapshot) => {
            var M = []
            const dataa = snapshot.val();
            //console.log(dataa)
            for (let i in dataa) {
              M.push(dataa[i])
            }
            //console.log(M)
            const organiser_name = M[2] + ' ' + M[3]
            document.getElementById("organizer-link-org-panel").innerHTML = organiser_name;

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
        });
        document.getElementById("homepage").innerHTML = document.getElementById("eventProfile").innerHTML;
        console.log(document.querySelector("#hamid17").innerHTML)
        document.getElementById("hamid17").addEventListener('click', (e) => {
          console.log("Hey")
          e.preventDefault();
          onAuthStateChanged(auth, user => {
            if (user != null) {
              var eventID = K[1];
              var seventRef = ref(database, 'events/');
              get(child(seventRef, eventID)).then((snapshot) => {
                const data = snapshot.val();
                var L = []
                for (let i in data) {
                  L.push(data[i])
                }

                if (L[7] == L[6]) {
                  alert("the event is full")
                }
                else {
                  set(ref(database, '/events/' + eventID), {
                    creator: L[0],
                    title: L[13],
                    type: L[14],
                    description: L[1],
                    tags: L[12],
                    location: L[5],
                    start_date: L[10],
                    start_time: L[11],
                    end_date: L[2],
                    end_time: L[3],
                    visibility: L[15],
                    price: L[9],
                    image: L[4],
                    number_of_participants: 1,
                    max_number_of_participants: ++L[7],
                    participants: L[8]
                  }).then(() => {
                    set(ref(database, '/events/' + eventID + '/participants/' + user.uid), {
                      user: user.uid
                    }).then(() => {
                      set(ref(database, user.uid + '/zevents_joined/' + eventID), {
                        event: eventID
                      }).then(() => {
                        alert("event joined successfully")
                        window.location = "index.html"
                      }).catch((error) => {
                        alert(error);
                      })
                    }).catch((error) => {
                      alert(error);
                    })
                  }).catch((error) => {
                    alert(error);
                  })
                }
              });
            } else {
              window.location = "log_in/index.html";
            }

          });
        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  });
  el3.onclick = (function () {
    get(child(ref(database), "events")).then((snapshot) => {
      if (snapshot.exists()) {
        var K = []
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;

          K.push(childKey)
        });
        console.log(K)
        const starCountRef = ref(database, 'events');
        document.getElementById("eventIDH").innerHTML = K[2];
        get(child(starCountRef, K[2])).then((snapshot) => {
          const pathReference = sref(storage, "Images/" + K[2] + ".png")
          var event_image = document.getElementById("eventImage")
          getDownloadURL(pathReference).then((url) => {
            event_image.setAttribute("src", url);
          })

          const data = snapshot.val();
          var L = []
          for (let i in data) {
            L.push(data[i])
          }
          console.log(L)
          // var eventTitle = L[12];
          // console.log(L[12])
          // var startDateTime = L[10] + ', ' + L[11]
          // var location = L[5]
          // var description = L[0]
          // var price = L[9]
          var user_uid = L[0]
          // var number_of_participants = L[7]

          document.getElementById("titleEvent").innerHTML = L[12];
          document.getElementById("event-date").innerHTML = L[10] + ', ' + L[11];
          document.getElementById("eventLocation").innerHTML = L[5];
          document.getElementById("EP").innerHTML = L[9] + " DHS";
          get(child(ref(database), user_uid)).then((snapshot) => {
            var M = []
            const dataa = snapshot.val();
            //console.log(dataa)
            for (let i in dataa) {
              M.push(dataa[i])
            }
            //console.log(M)
            const organiser_name = M[2] + ' ' + M[3]
            document.getElementById("organizer-link-org-panel").innerHTML = organiser_name;

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
        });
        document.getElementById("homepage").innerHTML = document.getElementById("eventProfile").innerHTML;
        console.log(document.querySelector("#hamid17").innerHTML)
        document.getElementById("hamid17").addEventListener('click', (e) => {
          console.log("Hey")
          e.preventDefault();
          onAuthStateChanged(auth, user => {
            if (user != null) {
              var eventID = K[2];
              var seventRef = ref(database, 'events/');
              get(child(seventRef, eventID)).then((snapshot) => {
                const data = snapshot.val();
                var L = []
                for (let i in data) {
                  L.push(data[i])
                }

                if (L[7] == L[6]) {
                  alert("the event is full")
                }
                else {
                  set(ref(database, '/events/' + eventID), {
                    creator: L[0],
                    title: L[13],
                    type: L[14],
                    description: L[1],
                    tags: L[12],
                    location: L[5],
                    start_date: L[10],
                    start_time: L[11],
                    end_date: L[2],
                    end_time: L[3],
                    visibility: L[15],
                    price: L[9],
                    image: L[4],
                    number_of_participants: 1,
                    max_number_of_participants: ++L[7],
                    participants: L[8]
                  }).then(() => {
                    set(ref(database, '/events/' + eventID + '/participants/' + user.uid), {
                      user: user.uid
                    }).then(() => {
                      set(ref(database, user.uid + '/zevents_joined/' + eventID), {
                        event: eventID
                      }).then(() => {
                        alert("event joined successfully")
                        window.location = "index.html"
                      }).catch((error) => {
                        alert(error);
                      })
                    }).catch((error) => {
                      alert(error);
                    })
                  }).catch((error) => {
                    alert(error);
                  })
                }
              });
            } else {
              window.location = "log_in/index.html";
            }

          });
        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  });
  el4.onclick = (function () {
    get(child(ref(database), "events")).then((snapshot) => {
      if (snapshot.exists()) {
        var K = []
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;

          K.push(childKey)
        });
        console.log(K)
        const starCountRef = ref(database, 'events');
        get(child(starCountRef, K[3])).then((snapshot) => {
          const pathReference = sref(storage, "Images/" + K[3] + ".png")
          var event_image = document.getElementById("eventImage")
          getDownloadURL(pathReference).then((url) => {
            event_image.setAttribute("src", url);
          })

          const data = snapshot.val();
          var L = []
          for (let i in data) {
            L.push(data[i])
          }
          console.log(L)
          // var eventTitle = L[12];
          // console.log(L[12])
          // var startDateTime = L[10] + ', ' + L[11]
          // var location = L[5]
          // var description = L[0]
          // var price = L[9]
          var user_uid = L[0]
          // var number_of_participants = L[7]

          document.getElementById("titleEvent").innerHTML = L[12];
          document.getElementById("event-date").innerHTML = L[10] + ', ' + L[11];
          document.getElementById("eventLocation").innerHTML = L[5];
          document.getElementById("EP").innerHTML = L[9] + " DHS";
          get(child(ref(database), user_uid)).then((snapshot) => {
            var M = []
            const dataa = snapshot.val();
            //console.log(dataa)
            for (let i in dataa) {
              M.push(dataa[i])
            }
            //console.log(M)
            const organiser_name = M[2] + ' ' + M[3]
            document.getElementById("organizer-link-org-panel").innerHTML = organiser_name;

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
        });
        document.getElementById("homepage").innerHTML = document.getElementById("eventProfile").innerHTML;
        console.log(document.querySelector("#hamid17").innerHTML)
        document.getElementById("hamid17").addEventListener('click', (e) => {
          console.log("Hey")
          e.preventDefault();
          onAuthStateChanged(auth, user => {
            if (user != null) {
              var eventID = K[3];
              var seventRef = ref(database, 'events/');
              get(child(seventRef, eventID)).then((snapshot) => {
                const data = snapshot.val();
                var L = []
                for (let i in data) {
                  L.push(data[i])
                }

                if (L[7] == L[6]) {
                  alert("the event is full")
                }
                else {
                  set(ref(database, '/events/' + eventID), {
                    creator: L[0],
                    title: L[13],
                    type: L[14],
                    description: L[1],
                    tags: L[12],
                    location: L[5],
                    start_date: L[10],
                    start_time: L[11],
                    end_date: L[2],
                    end_time: L[3],
                    visibility: L[15],
                    price: L[9],
                    image: L[4],
                    number_of_participants: 1,
                    max_number_of_participants: ++L[7],
                    participants: L[8]
                  }).then(() => {
                    set(ref(database, '/events/' + eventID + '/participants/' + user.uid), {
                      user: user.uid
                    }).then(() => {
                      set(ref(database, user.uid + '/zevents_joined/' + eventID), {
                        event: eventID
                      }).then(() => {
                        alert("event joined successfully")
                        window.location = "index.html"
                      }).catch((error) => {
                        alert(error);
                      })
                    }).catch((error) => {
                      alert(error);
                    })
                  }).catch((error) => {
                    alert(error);
                  })
                }
              });
            } else {
              window.location = "log_in/index.html";
            }

          });
        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  });
  el5.onclick = (function () {
    get(child(ref(database), "events")).then((snapshot) => {
      if (snapshot.exists()) {
        var K = []
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;

          K.push(childKey)
        });
        console.log(K)
        const starCountRef = ref(database, 'events');
        get(child(starCountRef, K[4])).then((snapshot) => {
          const pathReference = sref(storage, "Images/" + K[4] + ".png")
          var event_image = document.getElementById("eventImage")
          getDownloadURL(pathReference).then((url) => {
            event_image.setAttribute("src", url);
          })

          const data = snapshot.val();
          var L = []
          for (let i in data) {
            L.push(data[i])
          }
          console.log(L)
          // var eventTitle = L[12];
          // console.log(L[12])
          // var startDateTime = L[10] + ', ' + L[11]
          // var location = L[5]
          // var description = L[0]
          // var price = L[9]
          var user_uid = L[0]
          // var number_of_participants = L[7]

          document.getElementById("titleEvent").innerHTML = L[12];
          document.getElementById("event-date").innerHTML = L[10] + ', ' + L[11];
          document.getElementById("eventLocation").innerHTML = L[5];
          document.getElementById("EP").innerHTML = L[9] + " DHS";
          get(child(ref(database), user_uid)).then((snapshot) => {
            var M = []
            const dataa = snapshot.val();
            //console.log(dataa)
            for (let i in dataa) {
              M.push(dataa[i])
            }
            //console.log(M)
            const organiser_name = M[2] + ' ' + M[3]
            document.getElementById("organizer-link-org-panel").innerHTML = organiser_name;

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
        });
        document.getElementById("homepage").innerHTML = document.getElementById("eventProfile").innerHTML;
        console.log(document.querySelector("#hamid17").innerHTML)
        document.getElementById("hamid17").addEventListener('click', (e) => {
          console.log("Hey")
          e.preventDefault();
          onAuthStateChanged(auth, user => {
            if (user != null) {
              var eventID = K[4];
              var seventRef = ref(database, 'events/');
              get(child(seventRef, eventID)).then((snapshot) => {
                const data = snapshot.val();
                var L = []
                for (let i in data) {
                  L.push(data[i])
                }

                if (L[7] == L[6]) {
                  alert("the event is full")
                }
                else {
                  set(ref(database, '/events/' + eventID), {
                    creator: L[0],
                    title: L[13],
                    type: L[14],
                    description: L[1],
                    tags: L[12],
                    location: L[5],
                    start_date: L[10],
                    start_time: L[11],
                    end_date: L[2],
                    end_time: L[3],
                    visibility: L[15],
                    price: L[9],
                    image: L[4],
                    number_of_participants: 1,
                    max_number_of_participants: ++L[7],
                    participants: L[8]
                  }).then(() => {
                    set(ref(database, '/events/' + eventID + '/participants/' + user.uid), {
                      user: user.uid
                    }).then(() => {
                      set(ref(database, user.uid + '/zevents_joined/' + eventID), {
                        event: eventID
                      }).then(() => {
                        alert("event joined successfully")
                        window.location = "index.html"
                      }).catch((error) => {
                        alert(error);
                      })
                    }).catch((error) => {
                      alert(error);
                    })
                  }).catch((error) => {
                    alert(error);
                  })
                }
              });
            } else {
              window.location = "log_in/index.html";
            }

          });
        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  });
  el6.onclick = (function () {
    get(child(ref(database), "events")).then((snapshot) => {
      if (snapshot.exists()) {
        var K = []
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;

          K.push(childKey)
        });
        console.log(K)
        const starCountRef = ref(database, 'events');
        get(child(starCountRef, K[5])).then((snapshot) => {
          const pathReference = sref(storage, "Images/" + K[5] + ".png")
          var event_image = document.getElementById("eventImage")
          getDownloadURL(pathReference).then((url) => {
            event_image.setAttribute("src", url);
          })

          const data = snapshot.val();
          var L = []
          for (let i in data) {
            L.push(data[i])
          }
          console.log(L)
          // var eventTitle = L[12];
          // console.log(L[12])
          // var startDateTime = L[10] + ', ' + L[11]
          // var location = L[5]
          // var description = L[0]
          // var price = L[9]
          var user_uid = L[0]
          // var number_of_participants = L[7]

          document.getElementById("titleEvent").innerHTML = L[12];
          document.getElementById("event-date").innerHTML = L[10] + ', ' + L[11];
          document.getElementById("eventLocation").innerHTML = L[5];
          document.getElementById("EP").innerHTML = L[9] + " DHS";
          get(child(ref(database), user_uid)).then((snapshot) => {
            var M = []
            const dataa = snapshot.val();
            //console.log(dataa)
            for (let i in dataa) {
              M.push(dataa[i])
            }
            //console.log(M)
            const organiser_name = M[2] + ' ' + M[3]
            document.getElementById("organizer-link-org-panel").innerHTML = organiser_name;

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
        });
        document.getElementById("homepage").innerHTML = document.getElementById("eventProfile").innerHTML;
        console.log(document.querySelector("#hamid17").innerHTML)
        document.getElementById("hamid17").addEventListener('click', (e) => {
          console.log("Hey")
          e.preventDefault();
          onAuthStateChanged(auth, user => {
            if (user != null) {
              var eventID = K[5];
              var seventRef = ref(database, 'events/');
              get(child(seventRef, eventID)).then((snapshot) => {
                const data = snapshot.val();
                var L = []
                for (let i in data) {
                  L.push(data[i])
                }

                if (L[7] == L[6]) {
                  alert("the event is full")
                }
                else {
                  set(ref(database, '/events/' + eventID), {
                    creator: L[0],
                    title: L[13],
                    type: L[14],
                    description: L[1],
                    tags: L[12],
                    location: L[5],
                    start_date: L[10],
                    start_time: L[11],
                    end_date: L[2],
                    end_time: L[3],
                    visibility: L[15],
                    price: L[9],
                    image: L[4],
                    number_of_participants: 1,
                    max_number_of_participants: ++L[7],
                    participants: L[8]
                  }).then(() => {
                    set(ref(database, '/events/' + eventID + '/participants/' + user.uid), {
                      user: user.uid
                    }).then(() => {
                      set(ref(database, user.uid + '/zevents_joined/' + eventID), {
                        event: eventID
                      }).then(() => {
                        alert("event joined successfully")
                        window.location = "index.html"
                      }).catch((error) => {
                        alert(error);
                      })
                    }).catch((error) => {
                      alert(error);
                    })
                  }).catch((error) => {
                    alert(error);
                  })
                }
              });
            } else {
              window.location = "log_in/index.html";
            }

          });
        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  });
  el7.onclick = (function () {
    get(child(ref(database), "events")).then((snapshot) => {
      if (snapshot.exists()) {
        var K = []
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;

          K.push(childKey)
        });
        console.log(K)
        const starCountRef = ref(database, 'events');
        get(child(starCountRef, K[6])).then((snapshot) => {
          const pathReference = sref(storage, "Images/" + K[6] + ".png")
          var event_image = document.getElementById("eventImage")
          getDownloadURL(pathReference).then((url) => {
            event_image.setAttribute("src", url);
          })

          const data = snapshot.val();
          var L = []
          for (let i in data) {
            L.push(data[i])
          }
          console.log(L)
          // var eventTitle = L[12];
          // console.log(L[12])
          // var startDateTime = L[10] + ', ' + L[11]
          // var location = L[5]
          // var description = L[0]
          // var price = L[9]
          var user_uid = L[0]
          // var number_of_participants = L[7]

          document.getElementById("titleEvent").innerHTML = L[12];
          document.getElementById("event-date").innerHTML = L[10] + ', ' + L[11];
          document.getElementById("eventLocation").innerHTML = L[5];
          document.getElementById("EP").innerHTML = L[9] + " DHS";
          get(child(ref(database), user_uid)).then((snapshot) => {
            var M = []
            const dataa = snapshot.val();
            //console.log(dataa)
            for (let i in dataa) {
              M.push(dataa[i])
            }
            //console.log(M)
            const organiser_name = M[2] + ' ' + M[3]
            document.getElementById("organizer-link-org-panel").innerHTML = organiser_name;

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
        });
        document.getElementById("homepage").innerHTML = document.getElementById("eventProfile").innerHTML;
        console.log(document.querySelector("#hamid17").innerHTML)
        document.getElementById("hamid17").addEventListener('click', (e) => {
          console.log("Hey")
          e.preventDefault();
          onAuthStateChanged(auth, user => {
            if (user != null) {
              var eventID = K[6];
              var seventRef = ref(database, 'events/');
              get(child(seventRef, eventID)).then((snapshot) => {
                const data = snapshot.val();
                var L = []
                for (let i in data) {
                  L.push(data[i])
                }

                if (L[7] == L[6]) {
                  alert("the event is full")
                }
                else {
                  set(ref(database, '/events/' + eventID), {
                    creator: L[0],
                    title: L[13],
                    type: L[14],
                    description: L[1],
                    tags: L[12],
                    location: L[5],
                    start_date: L[10],
                    start_time: L[11],
                    end_date: L[2],
                    end_time: L[3],
                    visibility: L[15],
                    price: L[9],
                    image: L[4],
                    number_of_participants: 1,
                    max_number_of_participants: ++L[7],
                    participants: L[8]
                  }).then(() => {
                    set(ref(database, '/events/' + eventID + '/participants/' + user.uid), {
                      user: user.uid
                    }).then(() => {
                      set(ref(database, user.uid + '/zevents_joined/' + eventID), {
                        event: eventID
                      }).then(() => {
                        alert("event joined successfully")
                        window.location = "index.html"
                      }).catch((error) => {
                        alert(error);
                      })
                    }).catch((error) => {
                      alert(error);
                    })
                  }).catch((error) => {
                    alert(error);
                  })
                }
              });
            } else {
              window.location = "log_in/index.html";
            }

          });
        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  });
  el8.onclick = (function () {
    get(child(ref(database), "events")).then((snapshot) => {
      if (snapshot.exists()) {
        var K = []
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;

          K.push(childKey)
        });
        console.log(K)
        const starCountRef = ref(database, 'events');
        get(child(starCountRef, K[7])).then((snapshot) => {
          const pathReference = sref(storage, "Images/" + K[7] + ".png")
          var event_image = document.getElementById("eventImage")
          getDownloadURL(pathReference).then((url) => {
            event_image.setAttribute("src", url);
          })

          const data = snapshot.val();
          var L = []
          for (let i in data) {
            L.push(data[i])
          }
          console.log(L)
          // var eventTitle = L[12];
          // console.log(L[12])
          // var startDateTime = L[10] + ', ' + L[11]
          // var location = L[5]
          // var description = L[0]
          // var price = L[9]
          var user_uid = L[0]
          // var number_of_participants = L[7]


          document.getElementById("titleEvent").innerHTML = L[12];
          document.getElementById("event-date").innerHTML = L[10] + ', ' + L[11];
          document.getElementById("eventLocation").innerHTML = L[5];
          document.getElementById("EP").innerHTML = L[9] + " DHS";
          get(child(ref(database), user_uid)).then((snapshot) => {
            var M = []
            const dataa = snapshot.val();
            //console.log(dataa)
            for (let i in dataa) {
              M.push(dataa[i])
            }
            //console.log(M)
            const organiser_name = M[2] + ' ' + M[3]
            document.getElementById("organizer-link-org-panel").innerHTML = organiser_name;

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
        });
        document.getElementById("homepage").innerHTML = document.getElementById("eventProfile").innerHTML;
        console.log(document.querySelector("#hamid17").innerHTML)
        document.getElementById("hamid17").addEventListener('click', (e) => {
          console.log("Hey")
          e.preventDefault();
          onAuthStateChanged(auth, user => {
            if (user != null) {
              var eventID = K[7];
              var seventRef = ref(database, 'events/');
              get(child(seventRef, eventID)).then((snapshot) => {
                const data = snapshot.val();
                var L = []
                for (let i in data) {
                  L.push(data[i])
                }

                if (L[7] == L[6]) {
                  alert("the event is full")
                }
                else {
                  set(ref(database, '/events/' + eventID), {
                    creator: L[0],
                    title: L[13],
                    type: L[14],
                    description: L[1],
                    tags: L[12],
                    location: L[5],
                    start_date: L[10],
                    start_time: L[11],
                    end_date: L[2],
                    end_time: L[3],
                    visibility: L[15],
                    price: L[9],
                    image: L[4],
                    number_of_participants: 1,
                    max_number_of_participants: ++L[7],
                    participants: L[8]
                  }).then(() => {
                    set(ref(database, '/events/' + eventID + '/participants/' + user.uid), {
                      user: user.uid
                    }).then(() => {
                      set(ref(database, user.uid + '/zevents_joined/' + eventID), {
                        event: eventID
                      }).then(() => {
                        alert("event joined successfully")
                        window.location = "index.html"
                      }).catch((error) => {
                        alert(error);
                      })
                    }).catch((error) => {
                      alert(error);
                    })
                  }).catch((error) => {
                    alert(error);
                  })
                }
              });
            } else {
              window.location = "log_in/index.html";
            }

          });
        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  });

}

