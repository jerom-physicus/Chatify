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

var email = localStorage.getItem('email');
const room_name = localStorage.getItem('room_name');
document.getElementById("room_title").innerHTML = room_name
user_name.innerHTML = email

onValue(ref(db,"rooms/"+room_name),function(snapshot){  
    let values = Object.values(snapshot.val())
    let setdata = Object.entries(snapshot.val())
    
    for (let i=0 ; i <values.length; i++){
      let itemsarray = setdata[i]
      let room_name =itemsarray[1]  
      appendListChatElement(values[i])
    }
})

function appendListChatElement(values){
    let chat_li = document.createElement("li")
    chat_li.textContent =values
    chat.append(chat_li)
    
}
document.getElementById('send-btn').addEventListener('click',function(){
    const message_chat = document.getElementById('chat-int').value
    push(ref(db,"rooms/"+room_name),message_chat)
    location.reload();
})