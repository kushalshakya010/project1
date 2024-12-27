 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
 import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyDeMHNTVAECLdgzY5hyY22ye7QOuUlrW-0",
   authDomain: "authentication-c67bc.firebaseapp.com",
   databaseURL: "https://authentication-c67bc-default-rtdb.firebaseio.com",
   projectId: "authentication-c67bc",
   storageBucket: "authentication-c67bc.appspot.com",
   messagingSenderId: "169244390258",
   appId: "1:169244390258:web:3e80194a033847b1b6e3eb"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const database = getDatabase(app);
 const auth = getAuth()
 var signUp = document.getElementById('signUpbtn');

 document.addEventListener('DOMContentLoaded', () => {
 // Select the "Sign Up" button element
 var signUpButton = document.getElementById('signUpbtn');

 signUpButton.addEventListener('click', (e) => {
     e.preventDefault(); // Prevent the default form submission behavior

     var email = document.getElementById('em').value;
     var password = document.getElementById('psw').value;
     var username = document.getElementById('uname').value;

     createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
             // Signed in 
             const user = userCredential.user;

             set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email 
            });
             // ... user.uid
             alert('User created!');
             // ...
         })
         .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;

             alert(errorMessage);
             // ..
         });
 });
});
