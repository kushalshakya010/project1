
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

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
const auth = getAuth();

document.addEventListener('DOMContentLoaded', () => {
    // Select the "Login" button element
    const loginButton = document.getElementById('loginbtn');

    loginButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const email = document.getElementById('em').value;
        const password = document.getElementById('psw').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                const dt = new Date();
                update(ref(database, 'users/' + user.uid), {
                    last_login: dt,
                });

                alert('User logged in!');
                // window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";

                window.location.href = "../../FrontEnd/index.html";

            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;


                alert(errorMessage);




                // ..
            });
    });
});





