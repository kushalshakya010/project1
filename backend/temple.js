
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, set, push, get, child, ref, onValue, remove} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, signOut, onAuthStateChanged  ,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

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

// // Your web Database configuration
// const firebaseConfig2 = {
//   apiKey: "AIzaSyBtRwet08kPOPv5qpXgIR6GYmfsArsoSSU",
//   authDomain: "comment-section-848df.firebaseapp.com",
//   databaseURL: "https://comment-section-848df-default-rtdb.firebaseio.com",
//   projectId: "comment-section-848df",
//   storageBucket: "comment-section-848df.appspot.com",
//   messagingSenderId: "310596721853",
//   appId: "1:310596721853:web:2d0e13f171a6bcc8c0ebd4"
//   };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const app2 = initializeApp(firebaseConfig2);
const database = getDatabase(app);
let username = "";
let userId = "";
// const database2 = getDatabase(app2);

const auth = getAuth()
onAuthStateChanged(auth, (user)=>{
    if(user){
        // console.log(user.uid);
        const dbref = ref(database);
        get(ref(database, 'users/'+user.uid)).then((x)=>{
            const profile = x.val();
          
            let currentNode = document.querySelector("#mp_login");
            if(currentNode === null){
                return;
            }
            currentNode.outerHTML = `<a id="mp_profile" >${profile.username}</a>`
            username = profile.username;
            userId = user.uid;
        }).catch((error)=>{
            console.log(error)
        });
        
        
    }

})

const profile = document.getElementsByTagName("nav")[0];
const commentBtn = document.getElementById("commentBtn");
const comment = document.getElementById("comment-sec");
const templeName = document.getElementById("templeName");
let cmtTempleDbName = "";
profile.addEventListener('click', function(event){
    if(event.target.id === "mp_profile"){
        signOut(auth).then(()=>{
            alert("Logged Out Successfully!")

            window.location.href = "../../FrontEnd/index.html";

        }).catch((error)=> {
            console.log(error)
        })
    }
})


let dbTempleName = templeName?.textContent.replace(/\W+/g,"");
commentBtn?.addEventListener('click', function (event){
    // event.preventDefault();
    const date = new Date().toJSON();
    console.log(date);
    if(comment.value != ""){
        push(ref(database, 'comment/'+ dbTempleName + "/" + userId), {
            userId, 
            username,
            commentId: comment.value + "_" + userId,
            comment: comment.value,
            date: date.toString()
        })

        alert("Comment Added !")
    }


});

// ------------------------------------------- comment template----------------------------------------

let temp_list = document.getElementById("temp_list");
//selecting template
let temp=document.getElementById("cmtTemplate");

//function that displays data in the template
const displayData=(fetchedCmt)=>{
    if(temp === null){
        return;
    }
    //looping through data provided
    fetchedCmt.forEach((cmt)=>{
        let test = document.importNode(temp?.content,true);
        test.querySelector("#cmtUserName").textContent=cmt.username;
        test.querySelector("#cmtInfo").textContent=cmt.comment;

        temp_list.appendChild(test);
    
    
    })

}


let path =  "comment/" + dbTempleName ;
const newRef = ref(database, path );
let fetchedComments = []
onValue(newRef, (snapshot) => {
    let data = snapshot.val();
    for(const comments in data){
        for(const comment in data[comments]){
            fetchedComments.push(data[comments][comment]);
        }
    }
})
setTimeout(() => {
    if(fetchedComments.length === 0){
        displayData([{userName:"", comment:"no comments"}])
        return;
    }
    fetchedComments.sort((a,b)=>{
        let keyA = new Date(a.date);
        let keyB = new Date(b.date);
       return keyB - keyA;
    })
    displayData(fetchedComments);
},"2000");

// ------------------------------------------------ planner -------------------------------------------------

const plannerButton = document.getElementById("to-go");
plannerButton?.addEventListener("click", (event)=>{
    event.preventDefault();

    
let path =  "planner/" + userId ;
const newRef = ref(database, path );
console.log(path);
let fetchedPlanners = []
onValue(newRef, (snapshot) => {
    let data = snapshot.val();
    for(const planners in data){
       
            fetchedPlanners.push(data[planners]);
        
    }
    console.log(fetchedPlanners)
})
let foundTemple = {}
setTimeout(()=>{
     foundTemple = fetchedPlanners.filter(x => {
        return x.templeName===dbTempleName
    })[0]
    
    const date = new Date().toJSON();
    if(foundTemple != undefined){
        alert("Temple already in Planner!")
        return
    }
        push(ref(database, 'planner/' + userId), {
            templeName:dbTempleName,
            url: window.location.href,
            date: date.toString()
        })

        alert("Temple Added to Planner!")
    },"2000");
    


})
// --------------------------------------------- planner list ---------------------------------

let plan_list = document.getElementById("plan_list");
//selecting template
let plan = document.getElementById("plannerTemplate");
//function that displays data in the template
const displayPlannerData=(fetchedPlan)=>{
    if(plan === null){
        return;
    }
    //looping through data provided
    fetchedPlan.forEach((planner)=>{

        let test = document.importNode(plan.content,true);
        test.querySelector("#plan_url").href=planner.data.url;
        test.querySelector("#plan_templeName").textContent=planner.data.templeName;
        test.querySelector(".planBtn").id=planner.key;
        test.querySelector(".planBtn").addEventListener("click",(event)=>{
            remove(ref(database, "planner/" + userId + "/" + event.target.id))
            location.reload();
        });

        
        plan_list.appendChild(test);
    
    
    })

}


setTimeout(()=>{
let path2 =  "planner/" + userId ;
const newRef2 = ref(database, path2 );
let fetchedPlanners2 = []
onValue(newRef2, (snapshot) => {
    let data = snapshot.val();
    for(const planners in data){

        const childRef = ref(database, path2 + "/" + planners )    
        const newData = {
            data: data[planners],
            key: childRef.key
        }
            fetchedPlanners2.push(newData);
        
    }

})
setTimeout(()=>{
    if(fetchedPlanners2.length === 0){

        displayPlannerData([{
            data:{templeName:"No Temple !", url:"", date:""},
            key:""
        }]);
        return;
    }
    fetchedPlanners2.sort((a,b)=>{
        let keyA = new Date(a.data.date);
        let keyB = new Date(b.data.date);
       return keyB - keyA;
    })
    displayPlannerData(fetchedPlanners2);

},"2000");

},"2000");

// ----------------------------------------------------------- delete ----------------------------------------

