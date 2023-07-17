import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref,push,onValue, remove,set, } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";


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
const provider = new GoogleAuthProvider();

var email = localStorage.getItem('email');
user_name.innerHTML = email
const dbroom_name = localStorage.getItem('room_name');
const data = ref(db,"rooms/")
const data2 = ref(db,"rooms2/")




document.getElementById('create-room-int').addEventListener('click',function(){
    let room_name = document.getElementById('room-name-int').value
    let room_key = document.getElementById('room-key-int').value
    onValue(data2,function(snapshot){  
      globalThis.values2 = Object.keys(snapshot.val('room_name'))})
    onValue(data,function(snapshot){  
      globalThis.values = Object.keys(snapshot.val('room_name'))
          
    })
    let totalroom = values.concat(values2)
    let room_name2 = room_name.replace(' ','')
    if (room_name2 == ''){
      
      let error = "room name can't be 'null'"
      alerterror(error)

    }
    else{
      if(totalroom.includes(room_name)) {
        let error = "room name already exist"           
        alerterror(error)

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
    
 
  
onValue(data,function(snapshot){ 
   
    add.innerHTML = "" 
    let values = Object.keys(snapshot.val('room_name'))
   
    let setdata = Object.entries(snapshot.val())
    for (let i=0 ; i <values.length; i++){
      let itemsarray = setdata[i]
      let room_key =itemsarray[0]
      globalThis.room_name =itemsarray[1] 
       
      
      
    }  
    appendListElement(values,room_name)
})
 

onValue(data2,function(snapshot){ 
  add2.innerHTML = ""  
    let values = Object.keys(snapshot.val('room_name'))
    console.log(values)
    let setdata = Object.entries(snapshot.val())
    for (let i=0 ; i <values.length; i++){
      let itemsarray = setdata[i]
      globalThis.room_key =itemsarray[0]
      let room_name =itemsarray[1]  
      
      
    } 
    appendListElement2(values)
 
    
    
}) 

function appendListElement(room_list,room_name){
  
  for (let k = 0; k < room_list.length; k++) {
    globalThis. newEl = document.createElement("li")
  newEl.textContent =room_list[k]
  add.append(newEl)
 
  newEl.addEventListener('click',function(){
    
    let values = room_list[k]
    console.log(values)


    document.getElementById('join-delete-alert').style.display = 'block'
    document.getElementById('join-icon').addEventListener('click',function(){
      let data = ref(db,"rooms/"+values)
      let data2 =( db,"rooms/"+values)
      let room = 'room'
      localStorage.setItem('room_data', data2);
      localStorage.setItem('room_name', values);
      localStorage.setItem('room_type', room);
      window.location.href ='chat.html'

    })
    document.getElementById('trash-icon').addEventListener('click',function(){
      
      onValue(ref(db,"rooms/"+values),function(snapshot){
        let dbemail = Object.values(snapshot.val('email'))
        let sorted = dbemail.length
        let emailindex = sorted-2

        if(dbemail[emailindex]==email){
          remove(ref(db,"rooms/"+values))
          let error = `Room "${values}" deleted`
          document.getElementById('join-delete-alert').style.display = 'none'
          alerterror(error)

        }
        else{
          let error = "you are not allowed to delete this room"
          alerterror(error)
        }


      })
     
      
    })
    


    
    
})
  }
  
  

    document.getElementById('search-input').addEventListener('input',e=>{
      
    let filter = e.target.value
    add.innerHTML = ''
    for (let i = 0; i < room_list.length; i++) {
      let values = room_list[i]
      if (room_list[i].toLowerCase().includes(filter.toLowerCase())) {
        
        globalThis. newEl = document.createElement("li")
        newEl.textContent =room_list[i]
        add.append(newEl)
        newEl.style.display = "block";
        newEl.addEventListener('click',function(){
      
    
          document.getElementById('join-delete-alert').style.display = 'block'
          document.getElementById('join-icon').addEventListener('click',function(){
            let data = ref(db,"rooms/"+values)
            let data2 =( db,"rooms/"+values)
            let room = 'room'
            localStorage.setItem('room_data', data2);
            localStorage.setItem('room_name', values);
            localStorage.setItem('room_type', room);
            window.location.href ='chat.html'
    
          })
          document.getElementById('trash-icon').addEventListener('click',function(){
            
            onValue(ref(db,"rooms/"+values),function(snapshot){
              let dbemail = Object.values(snapshot.val('email'))
              let sorted = dbemail.length
              let emailindex = sorted-2
    
              if(dbemail[emailindex]==email){
                remove(ref(db,"rooms/"+values))
                let error = `Room "${values}" deleted`
                document.getElementById('join-delete-alert').style.display = 'none'
                alerterror(error)
    
              }
              else{
                let error = "you are not allowed to delete this room"
                alerterror(error)
              }
    
    
            })
           
            
          })
          
    
    
          
          
    })


      } else {
        globalThis. newEl = document.createElement("li")
        newEl.textContent =room_list[i]
        add.append(newEl)
        newEl.style.display = "block";
        newEl.style.display = "none";
      }
        
      
     
      

    }
    
   
    })
    

}


function appendListElement2(room_list){
  for (let k = 0; k < room_list.length; k++) {
    let values = room_list[k]
    console.log(room_list)
    globalThis. newEl = document.createElement("li")
    newEl.textContent =room_list[k]
    add2.append(newEl)
    functions(values)
  }
  document.getElementById('search-input').addEventListener('input',e=>{

    let filter = e.target.value
    add2.innerHTML = ''
    
    for (let i = 0; i < room_list.length; i++) {
      let values = room_list[i]
     
      if (room_list[i].toLowerCase().includes(filter.toLowerCase())) {
        
        globalThis. newEl = document.createElement("li")
        newEl.textContent =room_list[i]
        add2.append(newEl)
        newEl.style.display = "";
        functions(values)
      

      } else {
        globalThis. newEl = document.createElement("li")
        newEl.textContent =room_list[i]
        add2.append(newEl)
        newEl.style.display = "none";
        functions(values)
      }
        
      
     
      

    }
    
})
     
function functions(values){
  newEl.addEventListener('click',function(){
    console.log(values)

      
      
      
    document.getElementById('trash-icon2').addEventListener('click',function(){
      onValue(ref(db,"rooms2/"+values),function(snapshot){
        let dbemail = Object.values(snapshot.val('email'))
        let sorted = dbemail.length
        let emailindex = sorted-3 
        console.log(dbemail[emailindex]) 
        if(dbemail[emailindex]==email){
          remove(ref(db,"rooms2/"+values))
          let error = `Room "${values}" deleted`
          document.getElementById('join-delete-alert2').style.display = 'none'
          alerterror(error)
        }
        else{
          let error = "you are not allowed to delete this room"
          alerterror(error)
        }
      })
    })

    
    onValue(ref(db,"rooms2/"+values),function(snapshot){  
      let dbemail = Object.values(snapshot.val('room_key'))
      //console.log(values)
     // let dbemail = Object.values(snapshot.val('email'))
     
     
      let sorted = dbemail.length
      let emailindex = sorted-2
      let dbkey = dbemail[emailindex] 
      let localkey = localStorage.getItem(values)
      //console.log(localkey)
      //console.log(dbkey)
     
     if(localkey == dbkey){
      //document.getElementById('trash-icon2').style.top = '65px'
      //document.getElementById('join-icon2').style.top = '65px'
      //console.log(localkey)
      document.getElementById('key-inputs').style.display = 'none'
      document.getElementById('join-icon2').addEventListener('click',function(){
        let data2 =( db,"rooms2/"+values)

        localStorage.setItem('room_data', data2);
          localStorage.setItem('room_name', values);
          localStorage.setItem('room_type', 'room2');
          window.location.href ='chat.html'

      })
     
  


     }
     else if (localkey == ''){
      document.getElementById('key-inputs').style.display = 'block'
      document.getElementById('join-icon2').addEventListener('click',function(){
        var key = document.getElementById('key-inputs').value
        localStorage.setItem(values, key);

        
        let data = ref(db,"rooms/"+values)
        let data2 =( db,"rooms2/"+values)
       
        
        if (key == dbkey){
          localStorage.setItem('room_data', data2);
          localStorage.setItem('room_name', values);
          localStorage.setItem('room_type', 'room2');
          window.location.href ='chat.html'
        }
        else{
          let error = "wrong password try again"           
          alerterror(error)
        }

      })

      

   
      
     }
     else if (localkey == null){
      document.getElementById('key-inputs').style.display = 'block'
      document.getElementById('join-icon2').addEventListener('click',function(){
        var key = document.getElementById('key-inputs').value
        localStorage.setItem(values, key);

        
        let data = ref(db,"rooms/"+values)
        let data2 =( db,"rooms2/"+values)
       
        
        if (key == dbkey){
          localStorage.setItem('room_data', data2);
          localStorage.setItem('room_name', values);
          localStorage.setItem('room_type', 'room2');
          window.location.href ='chat.html'
        }
        else{
          let error = "wrong password try again"           
          alerterror(error)
        }

      })
    } 


     else{
      document.getElementById('join-icon2').addEventListener('click',function(){
        var key = document.getElementById('key-inputs').value
        localStorage.setItem(values, key);

        
        let data = ref(db,"rooms/"+values)
        let data2 =( db,"rooms2/"+values)
       
        
        if (key == dbkey){
          localStorage.setItem('room_data', data2);
          localStorage.setItem('room_name', values);
          localStorage.setItem('room_type', 'room2');
          window.location.href ='chat.html'
        }
        else{
          let error = "wrong password try again"           
          alerterror(error)
        }

      })
     }
      
    })
    document.getElementById('join-delete-alert2').style.display = 'block'

    

  }) 
}  
}
function appendListChatElement(values){
    let chat_li = document.createElement("li")
    chat_li.textContent =values
    chat.append(chat_li)
    room_title.innerHTML = values
}
function removeItemsBykey(keys,username){
  remove(ref(database,username+`/${keys}`))
}
//document.getElementById('create').addEventListener('click',function(){
 // const name = document.getElementById('room-name').value
 // const key = document.getElementById('room-key').value
 // set(ref(db, 'rooms/' + name), {
  //  name: name,
 //   key: key
   
 // });
//})



function alerterror(error){
  document.getElementById('alter').style.transform = 'translateY(0%)';
  alterp.innerHTML = error
  setTimeout(() => {
    alter.style.transform = 'translateY(500%)';
  }, 4000);
}

















document.getElementById('close_icon').addEventListener('click',function(){
  document.getElementById('join-delete-alert').style.display = 'none'

})

document.getElementById('close_icon2').addEventListener('click',function(){
  document.getElementById('join-delete-alert2').style.display = 'none'

})



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


const value = localStorage.getItem('email');
document.getElementById('user_name').innerHTML = value

document.getElementById('create-room-btn').addEventListener('click',function(){
    document.getElementById('open-close-display').style.display ="none"
    document.getElementById('room-btns').style.display ="none"
    document.getElementById('create-interface').style.display ="block"
    document.getElementById('add-img').style.display ="none"
})
document.getElementById('home-btn').addEventListener('click',function(){
  window.location.href = 'index.html'

})
document.getElementById('room-btn').addEventListener('click',function(){
  document.getElementById('open-close-display').style.display ="block"
  document.getElementById('room-btns').style.display ="block"
  document.getElementById('create-interface').style.display ="none"
  document.getElementById('add-img').style.display ="block"
  document.getElementById('rooms-page').style.display ="block"





})


document.getElementById('create-room-int').addEventListener('click',function(){
    document.getElementById('open-close-display').style.display ="block"
    document.getElementById('room-btns').style.display ="block"
    document.getElementById('create-interface').style.display ="none"
    document.getElementById('create-room-btn').style.display ="block"
    document.getElementById('add-img').style.display ="block"
    //location.reload();




})
