// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, get, child, ref } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth()
onAuthStateChanged(auth, (user)=>{
    if(user){
        console.log(user.uid);
        const dbref = ref(database);
        get(ref(database, 'users/'+user.uid)).then((x)=>{
            const profile = x.val();
          
            let currentNode = document.querySelector("#mp_login");
            currentNode.outerHTML = `<a id="mp_profile" >${profile.username}</a>`
        }).catch((error)=>{
            console.log(error)
        });
        
        
    }

})


const data = {
    "temples": [{
        "url": "temple_list/shreegha.html",
        "image": "image/shreegha.jpg",
        "name": "Shree Gha Stupa",
        "info": "Shree Gha Stupa: An ancient Kathmandu stupa, symbolizing Nepal's heritage. Iconic eyes watch over the valley, offering serenity amidst bustling Kathmandu.",
        "address": {
            "area": "Sigal",
            "state": "Kathmandu",
        },
        "religion": "Buddhism",
        "architecture": "stupa"

    },
    {
        "url": "temple_list/setomachindranath.html",
        "image": "image/setomachindranath.jpg",
        "name": "Seto Machindranath",
        "info": "Seto Machindranath: A revered Kathmandu deity, representing Nepali culture. This deity's vibrant chariot procession through Kathmandu's narrow streets is a cherished tradition, uniting communities in celebration.",
        "address": {
            "area": "Jana Bahal",
            "state": "Kathmandu",
        },
        "religion": "Buddhism",
        "architecture": "pagoda"

    },
    {
        "url": "temple_list/taleju.html",
        "image": "image/taleju.jfif",
        "name": "Taleju Temple",
        "info": "Taleju Temple: A historic gem in Kathmandu Durbar Square. This Newari Hindu shrine boasts exquisite woodwork and architecture, offering a glimpse into Nepal's rich cultural heritage. It stands as a testament to devotion and craftsmanship.",
        "address": {
            "area": "Kathmandu Durbar Square",
            "state": "Kathmandu",
        },
        "religion": "Newar Hindu"
        ,
        "architecture": "pagoda"
    },
    {
        "url": "temple_list/siddhiganesh.html",
        "image": "image/siddhiganesh.jpg",
        "name": "Siddhi Ganesh Temple",
        "info": "Sohrakhutte Ganesh near Sohrakhutte Chowk in Kathmandu i.e. it is also called Paknajol Ganesh, Siddhi Ganesh. The pearl of Ganesha here is black which is adorned with silver. In front of the statue of Ganesha, there is a statue of a mouse and a mole",
        "address": {
            "area": "Sorakhutte",
            "state": "Kathmandu",
        },
        "religion": "Hindu"
        ,
        "architecture": "pagoda"
    },
    {
        "url": "temple_list/nardevi.html",
        "image": "image/nardevi.jpg",
        "name": "Nardevi Temple",
        "info": "A serene Buddhist site in the heart of Kathmandu, offering spiritual respite amid city life. Explore its intricate architecture and rich history while discovering inner peace.",
        "address": {
            "area": "Nardevi",
            "state": "Kathmandu",
        },
        "religion": "newar Hindu"
        ,
        "architecture": "pagoda"
    },
    {
        "url": "temple_list/akashbhairab.html",
        "image": "image/akashbhairab.jpg",
        "name": "Akash Bhairab",
        "info": "A sacred Hindu temple located in the heart of Kathmandu, Nepal. This temple is dedicated to Lord Bhairab, a fierce manifestation of Lord Shiva. It is known for its vibrant religious rituals and is a significant place of worship for the locals. Explore the spiritual ambiance and cultural heritage of this ancient temple.",
        "address": {
            "area": "Indrachwok",
            "state": "Kathmandu",
        },
        "religion": "Newar Hindu & Buddhism"
        ,
        "architecture": "pagoda"
    },
    {
        "url": "temple_list/kastamandap.html",
        "image": "image/kastamandap.jpg",
        "name": "Kastamandap Temple",
        "info": " An ancient wooden pavilion in Kathmandu, Nepal, made from a single tree, known for its cultural significance and historic legacy, said to have been built from the wood of a single sal tree, with a rich history deeply intertwined with the city's heritage.",
        "address": {
            "area": "Kathmandu Durbar Square",
            "state": "Kathmandu",
        },
        "religion": "Newari Hindu"
        ,
        "architecture": "pagoda"
    },
    {
        "url": "temple_list/kumarighar.html",
        "image": "image/kumarighar.jpg",
        "name": "Kumari Ghar",
        "info": " A historic palace in Kathmandu, Nepal, renowned as the residence of the living goddess Kumari, a young Newar girl chosen for her divine qualities, and an architectural gem showcasing traditional Nepali design and culture.",
        "address": {
            "area": "Kathmandu Durbar Square",
            "state": "Kathmandu",
        },
        "religion": "Newar Hindu & Buddhism ",
        "architecture": "pagoda"
    },
    {
        "url": "temple_list/swayambhu.html",
        "image": "image/swayambhu.jpg",
        "name": "Swayambhunath Stupa",
        "info": "Swayambhunath Stupa is an ancient and sacred Buddhist monument in Kathmandu, Nepal. This UNESCO World Heritage Site is perched atop a hill and is adorned with colorful prayer flags, intricate carvings, and the watchful eyes of the Buddha.",
        "address": {
            "area": "Swayambhu",
            "state": "Kathmandu",
        },
        "religion": "Buddhism ",
        "architecture": "stupa"
    }
    ]
}
//container surrounding template
let temp_list = document?.getElementById("temp_list");

//selecting template
let temp=document?.getElementById("template");

//function that displays data in the template
const displayData=(tempData)=>{
   
    if(temp===null){
        return;
    }

    //looping through data provided
    tempData?.temples.forEach((temples)=>{
        let test = document?.importNode(temp?.content,true);
        test.querySelector("#temp_url").href=temples.url;
        test.querySelector("#temp_image").src=temples.image;
        test.querySelector("#temp_title").textContent=temples.name;
        test.querySelector("#temp_info").textContent=temples.info
        test.querySelector("#temp_area").textContent=`Area: ${temples.address.area}`
        test.querySelector("#temp_state").textContent=`State: ${temples.address.state}`
        test.querySelector("#temp_religion").textContent=`Religion: ${temples.religion}`
        test.querySelector("#temp_architecture").textContent=`Architecture: ${temples.architecture}`


        
        temp_list.appendChild(test);
    
    
    })

}

displayData(data);

const handleChange=()=>{
    let selectBox=document.getElementById("select_box");
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;
    temp_list.innerHTML = '';

    if(selectedValue=="1"){
        displayData(data);

    }
    else if(selectedValue == "2"){
        const newdata = data.temples.filter(x => x.architecture === "pagoda")
        displayData({"temples":newdata});
    }
    else if (selectedValue == "3"){
        const newdata = data.temples.filter(x => x.architecture === "stupa")
        displayData({"temples":newdata});
    }
    
}
const filter = document.getElementsByTagName("select")[0];
filter?.addEventListener('change', function(event){
    if(event.target.id === "select_box"){
       handleChange() 

        
    }
})

//logout
const profile = document.getElementsByTagName("nav")[0];
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



