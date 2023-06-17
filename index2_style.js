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

var email = localStorage.getItem('email');
const data = ref(db,"rooms/")
const data2 = ref(db,"rooms2/")
user_name.innerHTML = email

document.getElementById('create-room-int').addEventListener('click',function(){
    var room_name = document.getElementById('room-name-int').value
    var room_key = document.getElementById('room-key-int').value
    onValue(data,function(snapshot){  
        let values = Object.keys(snapshot.val('room_name'))
        for (let i=0 ; i <values.length; i++){
          let rooms = values[i]
          console.log(rooms)
          if(room_name.includes(rooms)){
            alert("room name already used")
          }
          else{
            if (room_key == ''){  
                set(ref(db,"rooms/"+room_name), {
                    email:email,
                    room_name:room_name                 
                  });
        
            }
            else{
                set(ref(db,"rooms2/"+room_name), {
                    email:email,
                    room_name:room_name,
                    room_key:room_key
                   
                  });
            }
          }

        }  
    })
})
    
    
  
onValue(data,function(snapshot){  
    let values = Object.keys(snapshot.val('room_name'))
    let setdata = Object.entries(snapshot.val())
    for (let i=0 ; i <values.length; i++){
      let itemsarray = setdata[i]
      let room_key =itemsarray[0]
      let room_name =itemsarray[1]  
      appendListElement(values[i],room_name)
    }  
})

onValue(data2,function(snapshot){  
    let values = Object.values(snapshot.val())
    let setdata = Object.entries(snapshot.val())
    for (let i=0 ; i <values.length; i++){
      let itemsarray = setdata[i]
      let room_key =itemsarray[0]
      let room_name =itemsarray[1]  
      appendListElement2(room_key,)
    }  
}) 

function appendListElement(values,room_name){
    let newEl = document.createElement("li")
    newEl.textContent =values
    add.append(newEl)
    newEl.addEventListener('click',function(){
        let data = ref(db,"rooms/"+values)
        let data2 =( db,"rooms/"+values)
        localStorage.setItem('room_data', data2);
        localStorage.setItem('room_name', values);
        window.location.href ='chat.html'


      
        onValue(data,function(snapshot){  
            let values = Object.values(snapshot.val())
            let setdata = Object.entries(snapshot.val())
            
            for (let i=0 ; i <values.length; i++){
              let itemsarray = setdata[i]
              let room_name =itemsarray[1]  
              appendListChatElement(values[i])
            }  
        })
    })
}


function appendListElement2(values){
    let newEl = document.createElement("li")

    newEl.textContent =values
    add2.append(newEl)
}
function appendListChatElement(values){
    let chat_li = document.createElement("li")
    chat_li.textContent =values
    chat.append(chat_li)
    room_title.innerHTML = values
}
//document.getElementById('create').addEventListener('click',function(){
 // const name = document.getElementById('room-name').value
 // const key = document.getElementById('room-key').value
 // set(ref(db, 'rooms/' + name), {
  //  name: name,
 //   key: key
   
 // });
//})


























document.getElementById('close-room-btn2').addEventListener('click',function(){
    document.getElementById('close-room-btn2').style.display = 'none'
    document.getElementById('open-room-btn').style.display = 'none'
    document.getElementById('close-room-btn').style.display = 'block'
    document.getElementById('open-room-btn2').style.display = 'block'
    document.getElementById('close-room-content').style.display = 'block'
    document.getElementById('open-room-content').style.display = 'none'


    
})
document.getElementById('open-room-btn2').addEventListener('click',function(){
    document.getElementById('open-room-btn2').style.display = 'none'
    document.getElementById('close-room-btn').style.display = 'none'
    document.getElementById('close-room-btn2').style.display = 'block'
    document.getElementById('open-room-btn').style.display = 'block'
    document.getElementById('close-room-content').style.display = 'none'
    document.getElementById('open-room-content').style.display = 'block'
    
})

let button = document.querySelector(".menu-icon"),
    links = document.querySelector(".nav-box");

    button.addEventListener("click",()=>{
        links.classList.toggle("display")
})
const value = localStorage.getItem('email');
document.getElementById('user_name').innerHTML = value

document.getElementById('create-room-btn').addEventListener('click',function(){
    document.getElementById('open-close-display').style.display ="none"
    document.getElementById('room-btns').style.display ="none"
    document.getElementById('create-interface').style.display ="block"
    document.getElementById('create-room-btn').style.display ="none"
    document.getElementById('add-img').style.display ="none"




})
document.getElementById('create-room-int').addEventListener('click',function(){
    document.getElementById('open-close-display').style.display ="block"
    document.getElementById('room-btns').style.display ="block"
    document.getElementById('create-interface').style.display ="none"
    document.getElementById('create-room-btn').style.display ="block"
    document.getElementById('add-img').style.display ="block"
    //location.reload();




})
