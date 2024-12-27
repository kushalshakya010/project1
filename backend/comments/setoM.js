// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration of comment section
const firebaseConfig = {
  apiKey: "AIzaSyBtRwet08kPOPv5qpXgIR6GYmfsArsoSSU",
  authDomain: "comment-section-848df.firebaseapp.com",
  databaseURL: "https://comment-section-848df-default-rtdb.firebaseio.com",
  projectId: "comment-section-848df",
  storageBucket: "comment-section-848df.appspot.com",
  messagingSenderId: "310596721853",
  appId: "1:310596721853:web:2d0e13f171a6bcc8c0ebd4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const commentsContainer = document.getElementById("comments-container");
const commentInput = document.getElementById("comment-input");

function renderComment(comment) {
  const commentDiv = document.createElement("div");
  commentDiv.textContent = comment.text;
  commentsContainer.appendChild(commentDiv);
}

function addComment() {
  const text = commentInput.value.trim();
  if (text !== "") {
    const commentsRef = firebase.firestore().collection("comments");
    commentsRef.add({
      text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    commentInput.value = "";
  }
}

// Real-time listener for new comments
firebase.firestore().collection("comments").onSnapshot((snapshot) => {
  commentsContainer.innerHTML = "";
  snapshot.forEach((doc) => {
    const comment = doc.data();
    renderComment(comment);
  });
});

