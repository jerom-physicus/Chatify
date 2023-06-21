import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref,push,onValue, remove,set, } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyCf2VrpS1xIt26nCQNMPAxq4foZ9qVkwYk",
  authDomain: "chatify-f48eb.firebaseapp.com",
  databaseURL: "https://chatify-f48eb-default-rtdb.firebaseio.com",
  projectId: "chatify-f48eb",
  storageBucket: "chatify-f48eb.appspot.com",
  messagingSenderId: "591165520919",
  appId: "1:591165520919:web:db98bdf3eb412b050bf052",
  measurementId: "G-J0D2NKV2Z7"
};
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
var db = getDatabase(app);
const data = localStorage.getItem('room_data');
const roomtype = localStorage.getItem('room_type');

var email = localStorage.getItem('email');
const room_name = localStorage.getItem('room_name');
document.getElementById("room_title").innerHTML = room_name
user_name.innerHTML = email

if(roomtype =='room'){
  onValue(ref(db,'rooms/'+room_name),function(snapshot){ 
    chat.innerHTML = ""
    let values = Object.values(snapshot.val())
    let setdata = Object.entries(snapshot.val())
    let values_length = values.length
    let sorted_value = values_length-2
    
    for (let i=0 ; i <sorted_value; i++){
      let itemsarray = setdata[i]
      let room_name =itemsarray[1]  
      appendListChatElement(values[i])
    }
})
}
else{
  onValue(ref(db,'rooms2/'+room_name),function(snapshot){ 
    chat.innerHTML = ""
    let values = Object.values(snapshot.val())
    let setdata = Object.entries(snapshot.val())
    let values_length = values.length
    let sorted_value = values_length-3
    
    for (let i=0 ; i <sorted_value; i++){
      let itemsarray = setdata[i]
      let room_name =itemsarray[1]  
      appendListChatElement(values[i])
    }
})

}

function appendListChatElement(values){
    let chat_li = document.createElement("li")
    chat_li.textContent =values
    chat.append(chat_li)
    
}
if(roomtype =='room'){
  document.getElementById('send-btn').addEventListener('click',function(){
    const message_chat = document.getElementById('chat_int').value
    chat_int.value = ""
    push(ref(db,"rooms/"+room_name),message_chat)
   
})

}
else{
  document.getElementById('send-btn').addEventListener('click',function(){
    const message_chat = document.getElementById('chat_int').value
    chat_int.value = ""
    push(ref(db,"rooms2/"+room_name),message_chat)
   
})
}














let button = document.querySelector(".menu4-icon"),
    links = document.querySelector(".nav-box");

    button.addEventListener("click",()=>{
        links.classList.toggle("display")
})