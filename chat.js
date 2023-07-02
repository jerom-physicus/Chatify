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
fix()
function fix(){
  const email = localStorage.getItem('username');
  if(email ==null){
    globalThis.email = localStorage.getItem('email')

  }
  else if(email ==''){
    globalThis.email = localStorage.getItem('email')

  }
  else{
    globalThis.email = localStorage.getItem('username')
  }

}





var email1 = localStorage.getItem('email');
//var email = email1.replace('@gmail.com','')
const room_name = localStorage.getItem('room_name');
document.getElementById("room_title").innerHTML = room_name
document.getElementById("room_title2").innerHTML = room_name

if(roomtype =='room'){
  onValue(ref(db,'rooms/'+room_name),function(snapshot){ 
    chat.innerHTML = ""
    let values = Object.values(snapshot.val())
    let keys = Object.keys(snapshot.val())
    let setdata = Object.entries(snapshot.val())
    let values_length = values.length
    let sorted_value = values_length-2
    let funList = [];
    for (let i=0 ; i <sorted_value; i++){
      let itemsarray = setdata[i]
      let room_name =itemsarray[1]
      //let filter = values.length
      var lastIndex = values.lastIndexOf(" ");
      let string =  values[i]
      var lastIndex = string.lastIndexOf(" ");
      var str = string.substring(0, lastIndex);

      const filter = string.split(' ');
      const j =filter.length-1
      let username = filter[j]
      funList.push(username);
      

      
      
      
      
      appendListChatElement(str,username,keys[i])
    }

    users_list.innerHTML = ""

  getusername(funList) 
})
}
else{
  onValue(ref(db,'rooms2/'+room_name),function(snapshot){ 
    chat.innerHTML = ""
    let values = Object.values(snapshot.val())
    let setdata = Object.entries(snapshot.val())
    let keys = Object.keys(snapshot.val())
    let values_length = values.length
    let sorted_value = values_length-3
  
    let funList = [];
    for (let i=0 ; i <sorted_value; i++){
      let itemsarray = setdata[i]
      let room_name =itemsarray[1]
      //let filter = values.length
      var lastIndex = values.lastIndexOf(" ");
      let string =  values[i]
      var lastIndex = string.lastIndexOf(" ");
      var str = string.substring(0, lastIndex);

      const filter = string.split(' ');
      const j =filter.length-1
      let username = filter[j]    
      funList.push(username);
      
      
      
     // str = lastIndex.substring(0, lastIndex);
 
      appendListChatElement2(str,username,keys[i])
      
      
    }
    users_list.innerHTML = ""

  getusername(funList)   
})

}
function getusername(username){

  let users = [...new Set(username)];
  let usersnbr = users.length
  count.innerHTML = usersnbr
  for (let i = 0; i < users.length; i++) {
    globalThis.element = users[i];
    console.log(element)
    getmembers(element)

    
  }

  


}

function getmembers(member){
  let user_li = document.createElement("li")
  user_li.textContent =member
  document.getElementById('users_list').append(user_li)

}

function appendListChatElement(values,username,keys){
    let chat_li = document.createElement("li")
    let chatdiv = document.createElement("div")
    let chatname = document.createElement("p")
    chatname.textContent = username
    chatdiv.append(chatname)

    chat_li.textContent =values
    chat.append(chatdiv)
    chatdiv.append(chat_li)
    chat_li.addEventListener('dblclick',function(){
      remove(ref(db,'rooms/'+`${room_name}/`+keys))
      let error = 'Message deleted'
      alerterror(error)
    })
    
}
function appendListChatElement2(values,username,keys){
  let chat_li = document.createElement("li")
  let chatdiv = document.createElement("div")
  let chatname = document.createElement("p")
  chatname.textContent = username
  chatdiv.append(chatname)

  chat_li.textContent =values
  chat.append(chatdiv)
  chatdiv.append(chat_li)
  chat_li.addEventListener('dblclick',function(){
    remove(ref(db,'rooms2/'+`${room_name}/`+keys))
  })
  
}
if(roomtype =='room'){
  document.getElementById('send-btn').addEventListener('click',function(){
    const message_chat = document.getElementById('chat_int').value
    chat_int.value = ""
    push(ref(db,"rooms/"+room_name),message_chat+' '+email)
   
})

}
else{
  document.getElementById('send-btn').addEventListener('click',function(){
    const message_chat = document.getElementById('chat_int').value
    chat_int.value = ""
    push(ref(db,"rooms2/"+room_name),message_chat+' '+email)
   
})
}

function alerterror(error){
  document.getElementById('alter2').style.transform = 'translateY(100%)';
  alterp2.innerHTML = error
  setTimeout(() => {
    alter2.style.transform = 'translateY(-500%)';
  }, 4000);
}




document.getElementById('group').addEventListener('click',function(){
  document.getElementById('more').style.transform = 'translateY(0%)';
})

document.getElementById('close').addEventListener('click',function(){
  document.getElementById('more').style.transform = 'translateY(100%)';
})















document.getElementById("back-btn").addEventListener('click',function(){
  window.location.href = 'index2.html'
})