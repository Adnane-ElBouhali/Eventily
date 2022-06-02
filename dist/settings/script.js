import { auth } from "../index.js";
const u = auth.currentUser;

email = u.email
document.getElementById("user-email").innerHTML = email;
document.getElementById("user-email1").innerHTML = email;