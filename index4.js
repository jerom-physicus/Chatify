import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref,push,onValue, remove,set, } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getStorage, ref as Sref ,  uploadBytesResumable,getDownloadURL,deleteObject} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";


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
const storage = getStorage();

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
          let file = document.getElementById('img-input').files[0]
          if (file != null){
            set(ref(db,"rooms/"+room_name), {
              email:email,
              room_name:room_name                 
            });
            
            const refl  = Sref(storage,room_name)
            const metadata = {
                contentType : file.type
              }
            const task = uploadBytesResumable(refl,file)
            document.getElementById('create-interface').style.transform = 'translateY(180%)'
            document.getElementById('create-close-room-btn').style.display = 'none'
            document.getElementById('create-close-room-btn').style.transform =  'rotate(-45deg)'
            document.getElementById('create-room-btn').style.display = 'block'
            let error = "Successfuly created a room"           
            alerterror(error) 

          } 
          else{
            let error = "Room profile must be uploded"
            alerterror(error)
          } 
          
      }
      else{
        let file = document.getElementById('img-input').files[0]
        if (file != null){
          set(ref(db,"rooms2/"+room_name), {
            email:email,
            room_name:room_name,
            room_key:room_key
           
          });
          document.getElementById('create-interface').style.transform = 'translateY(180%)'
          document.getElementById('create-close-room-btn').style.display = 'none'
          document.getElementById('create-close-room-btn').style.transform =  'rotate(-45deg)'
          document.getElementById('create-room-btn').style.display = 'block'
          let error = "Successfuly created a closed room"           
          alerterror(error)

        }
        else{
          let error = "Room profile must be uploded"
          alerterror(error)
        }
          
      }
      }
    }
})
    
 
onValue(data,function(snapshot){ 
   add.innerHTML = ''
    let values = Object.keys(snapshot.val('room_name'))
   
    let setdata = Object.entries(snapshot.val())
    for (let i=0 ; i <values.length; i++){
      let itemsarray = setdata[i]
      let room_key =itemsarray[0]
      globalThis.room_name =itemsarray[1] 
       
      
      
    }  
    appendListElement(values,room_name)
})
 
function appendListElement(room_list,room_name){
    for (let k = 0; k < room_list.length; k++) {
      //add.innerHTML = ''
      getDownloadURL(Sref(storage, room_list[k]))
      .then((url) => {

        globalThis.newEl = document.createElement("div")
        globalThis.newImg = document.createElement("img")
        globalThis.newTxt = document.createElement("p")
        newImg.src = url

        
        newTxt.textContent =room_list[k]
        add.append(newEl)
        newEl.append(newImg)
        newEl.append(newTxt)
        newEl.addEventListener('click',function(){
          //cover.style.display = 'flex'
          let values = room_list[k]
          onValue(ref(db,"rooms/"+values),function(snapshot){
            let dbemail = Object.values(snapshot.val('email'))
            let sorted = dbemail.length
            let emailindex = sorted-2
    
            if(dbemail[emailindex]==email){
              
              let error = `Room "${values}" deleted`
              document.getElementById('join-delete-alert').style.transform = ' translateY(0%)'
              document.getElementById('close_icon2').addEventListener('click',function(){
                    
                document.getElementById('join-delete-alert').style.transform =' translateY(200%)'
            })
                document.getElementById('join-icon2').addEventListener('click',function(){
                    let data = ref(db,"rooms/"+values)
                    let data2 =( db,"rooms/"+values)
                    let room = 'room'
                    localStorage.setItem('room_data', data2);
                    localStorage.setItem('room_name', values);
                    localStorage.setItem('room_type', room);
                    chatHTML()
            
                })
                   document.getElementById('trash-icon2').addEventListener('click',function(){
                    deleteObject(Sref(storage,values)).then(() => {
                      // File deleted successfully
                    }).catch((error) => {
                      console.log(error)
                      // Uh-oh, an error occurred!
                    });
                        remove(ref(db,"rooms/"+values))
                        document.getElementById('join-delete-alert').style.transform = ' translateY(200%)'
    
                        alerterror(error)
                    })
                    
    
            }
            else{
                
                document.getElementById('join-alert').style.transform =' translateY(22%)'
                document.getElementById('close_icon').addEventListener('click',function(){
                    
                    document.getElementById('join-alert').style.transform =' translateY(200%)'
                })
                document.getElementById('join-icon').addEventListener('click',function(){
                    let data = ref(db,"rooms/"+values)
                    let data2 =( db,"rooms/"+values)
                    let room = 'room'
                    localStorage.setItem('room_data', data2);
                    localStorage.setItem('room_name', values);
                    localStorage.setItem('room_type', room);
                    chatHTML()
            
                })
            }
    
    
          })
          
      
      
          
          
          
      
      
          
          
      })
      })
      .catch((error) => {
        console.log(error)
        alerterror(error)
        
      });

      
   
    
    }
    
    
  
      document.getElementById('search-input').addEventListener('input',e=>{
        
      let filter = e.target.value
      add.innerHTML = ''
      for (let i = 0; i < room_list.length; i++) {
        
        let values = room_list[i]
        if (room_list[i].toLowerCase().includes(filter.toLowerCase())) {
          getDownloadURL(Sref(storage, values))
          .then((url) => {
              globalThis.newEl = document.createElement("div")
            globalThis.newImg = document.createElement("img")
            globalThis.newTxt = document.createElement("p")
            newImg.src = url
    
            
            newTxt.textContent =values
            add.append(newEl)
            newEl.append(newImg)
            newEl.append(newTxt)
            newEl.style.display = "flex";
            newEl.addEventListener('click',function(){
              let values = room_list[i]
              onValue(ref(db,"rooms/"+values),function(snapshot){
                let dbemail = Object.values(snapshot.val('email'))
                let sorted = dbemail.length
                let emailindex = sorted-2
        
                if(dbemail[emailindex]==email){
                  
                  let error = `Room "${values}" deleted`
                  document.getElementById('join-delete-alert').style.transform = ' translateY(0%)'
                  document.getElementById('close_icon2').addEventListener('click',function(){
                        
                    document.getElementById('join-delete-alert').style.transform =' translateY(200%)'
                })
                    document.getElementById('join-icon2').addEventListener('click',function(){
                        let data = ref(db,"rooms/"+values)
                        let data2 =( db,"rooms/"+values)
                        let room = 'room'
                        localStorage.setItem('room_data', data2);
                        localStorage.setItem('room_name', values);
                        localStorage.setItem('room_type', room);
                        chatHTML()
                
                    })
                      document.getElementById('trash-icon2').addEventListener('click',function(){
                            remove(ref(db,"rooms/"+values))
                            document.getElementById('join-delete-alert').style.transform = ' translateY(200%)'
        
                            alerterror(error)
                        })
                        
        
                }
                else{
                    
                    document.getElementById('join-alert').style.transform =' translateY(22%)'
                    document.getElementById('close_icon').addEventListener('click',function(){
                        
                        document.getElementById('join-alert').style.transform =' translateY(200%)'
                    })
                    document.getElementById('join-icon').addEventListener('click',function(){
                        let data = ref(db,"rooms/"+values)
                        let data2 =( db,"rooms/"+values)
                        let room = 'room'
                        localStorage.setItem('room_data', data2);
                        localStorage.setItem('room_name', values);
                        localStorage.setItem('room_type', room);
                        chatHTML()
                
                    })
                              }
        
        
              })
              
              
          })
            })
            
    
    
          } else {
            
            globalThis. newEl = document.createElement("li")
            newEl.textContent =room_list[i]
            add.append(newEl)
            newEl.style.display = "none";
          }
            
        
       
        
  
      }
      
     
      })
      
  }


  onValue(data2,function(snapshot){ 
    add2.innerHTML = '' 
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
  
function appendListElement2(room_list){
    for (let k = 0; k < room_list.length; k++) {
      let values = room_list[k]
      getDownloadURL(Sref(storage, values))
  .then((url) => {
    
    globalThis.newEl = document.createElement("div")
    globalThis.newImg = document.createElement("img")
    globalThis.newTxt = document.createElement("p")
    newImg.src = url
    console.log(url)
    
    
    newTxt.textContent =room_list[k]
    add2.append(newEl)
    newEl.append(newImg)
    newEl.append(newTxt)
    functions(values)
  })
  .catch((error) => {
    alerterror(error)
    console.log(error)
    
  });
      
    }
    document.getElementById('search-input').addEventListener('input',e=>{
  
      let filter = e.target.value
      add2.innerHTML = ''
      
      for (let i = 0; i < room_list.length; i++) {
        let values = room_list[i]
        getDownloadURL(Sref(storage, values))
        .then((url) => {
          if (room_list[i].toLowerCase().includes(filter.toLowerCase())) {
          
            globalThis.newEl = document.createElement("div")
            globalThis.newImg = document.createElement("img")
            globalThis.newTxt = document.createElement("p")
            newImg.src = url
            console.log(url)
            
            
            newTxt.textContent =room_list[i]
            add2.append(newEl)
            newEl.append(newImg)
            newEl.append(newTxt)
            newEl.style.display = "flex";
            functions(values)
          
    
          } else {
            globalThis. newEl = document.createElement("li")
            newEl.textContent =room_list[i]
            add2.append(newEl)
            newEl.style.display = "none";
            functions(values)
          }

        })
       
        
          
        
       
        
  
      }
      
  })
       
  function functions(values){
    newEl.addEventListener('click',function(){
        
        onValue(ref(db,"rooms2/"+values),function(snapshot){
            let dbemail = Object.values(snapshot.val('email'))
            let sorted = dbemail.length
            let emailindex = sorted-3 
            console.log(dbemail[emailindex]) 
            if(dbemail[emailindex]==email){
              document.getElementById('join-delete-alert').style.transform = ' translateY(0%)'
              document.getElementById('close_icon2').addEventListener('click',function(){          
              document.getElementById('join-delete-alert').style.transform =' translateY(200%)'})
              document.getElementById('join-icon2').addEventListener('click',function(){
                let data2 =( db,"rooms2/"+values)
        
                localStorage.setItem('room_data', data2);
                  localStorage.setItem('room_name', values);
                  localStorage.setItem('room_type', 'room2');
                  chatHTML()
        
              })
             document.getElementById('trash-icon2').addEventListener('click',function(){
              deleteObject(Sref(storage,values)).then(() => {
                // File deleted successfully
              }).catch((error) => {
                // Uh-oh, an error occurred!
              });
                remove(ref(db,"rooms2/"+values))
                document.getElementById('join-delete-alert').style.transform =' translateY(200%)'
                let error = `Room "${values}" deleted`
                alerterror(error)
             })
              
            }
            else{
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
                   
                   document.getElementById('join-alert').style.transform =' translateY(22%)'
                        document.getElementById('close_icon').addEventListener('click',function(){
                            
                            document.getElementById('join-alert').style.transform =' translateY(200%)'
                        })
                    document.getElementById('join-icon').addEventListener('click',function(){
                      let data2 =( db,"rooms2/"+values)
              
                      localStorage.setItem('room_data', data2);
                        localStorage.setItem('room_name', values);
                        localStorage.setItem('room_type', 'room2');
                        chatHTML()
              
                    })
                   
                
              
              
                   }
                   else if (localkey == ''){
                    document.getElementById('close_icon21').addEventListener('click',function(){
                        document.getElementById('enter-join-delete-alert').style.transform =' translateY(200%)'
                    })
                    document.getElementById('enter-join-delete-alert').style.transform =' translateY(0%)'
                    document.getElementById('join-icon21').addEventListener('click',function(){
                      var key = document.getElementById('key-inputs').value
                      localStorage.setItem(values, key);
              
                      
                      let data = ref(db,"rooms/"+values)
                      let data2 =( db,"rooms2/"+values)
                     
                      
                      if (key == dbkey){
                        localStorage.setItem('room_data', data2);
                        localStorage.setItem('room_name', values);
                        localStorage.setItem('room_type', 'room2');
                        chatHTML()
                      }
                      else{
                        let error = "wrong password try again"           
                        alerterror(error)
                      }
              
                    })
              
                    
              
                 
                    
                   }
                   else if (localkey == null){
                    document.getElementById('close_icon21').addEventListener('click',function(){
                        document.getElementById('enter-join-delete-alert').style.transform =' translateY(200%)'
                    })
                    document.getElementById('enter-join-delete-alert').style.transform =' translateY(0%)'
                    document.getElementById('join-icon21').addEventListener('click',function(){
                      var key = document.getElementById('key-inputs').value
                      localStorage.setItem(values, key);
              
                      
                      let data = ref(db,"rooms/"+values)
                      let data2 =( db,"rooms2/"+values)
                     
                      
                      if (key == dbkey){
                        localStorage.setItem('room_data', data2);
                        localStorage.setItem('room_name', values);
                        localStorage.setItem('room_type', 'room2');
                        chatHTML()
                      }
                      else{
                        let error = "wrong password try again"           
                        alerterror(error)
                      }
              
                    })
                  } 
              
              
                   else{
                    document.getElementById('close_icon21').addEventListener('click',function(){
                        document.getElementById('enter-join-delete-alert').style.transform =' translateY(200%)'
                    })
                    document.getElementById('enter-join-delete-alert').style.transform =' translateY(0%)'

                    document.getElementById('join-icon21').addEventListener('click',function(){
                      var key = document.getElementById('key-inputs').value
                      localStorage.setItem(values, key);
              
                      
                      let data = ref(db,"rooms/"+values)
                      let data2 =( db,"rooms2/"+values)
                     
                      
                      if (key == dbkey){
                        localStorage.setItem('room_data', data2);
                        localStorage.setItem('room_name', values);
                        localStorage.setItem('room_type', 'room2');
                        chatHTML()
                      }
                      else{
                        let error = "wrong password try again"           
                        alerterror(error)
                      }
              
                    })
                   }
                    
                  })
            }
        })


      
  
      
      
      //document.getElementById('join-delete-alert2').style.display = 'block'
  
      
  
    }) 
  }  
}






function alerterror(error){
    document.getElementById('alter').style.transform = 'translateY(-80%)';
    alterp.innerHTML = error
    setTimeout(() => {
      alter.style.transform = 'translateY(500%)';
    }, 4000);
  }

function chatHTML(){
  document.getElementById('main-html').style.display = 'none'
  document.getElementById('chat-html').style.display = 'flex'
  document.getElementById('bottom-nav').style.display = 'none'
}



document.getElementById('open-room-content').addEventListener('swiped-left',function(){
  document.getElementById('bar').style.left = '55%'
  document.getElementById('open-room-img').style.display = 'none'
    document.getElementById('close-room-img').style.display = 'block'
    document.getElementById('close-room-content').style.display = 'block'
    document.getElementById('open-room-content').style.display = 'none'
    document.getElementById('close-room-btn-txt').style.color = 'white'
    document.getElementById('open-room-btn-txt').style.color = '#9d8fc5'

    console.log("swiped")
})
document.getElementById('close-room-content').addEventListener('swiped-right',function(){
  document.getElementById('bar').style.left = '20px'
  document.getElementById('open-room-img').style.display = 'block'
    document.getElementById('close-room-img').style.display = 'none'
    document.getElementById('close-room-content').style.display = 'none'
    document.getElementById('open-room-content').style.display = 'block'
    document.getElementById('open-room-btn-txt').style.color = 'white'
    document.getElementById('close-room-btn-txt').style.color = '#9d8fc5'

    console.log("swiped")
})


document.getElementById('open-room-btn-txt').addEventListener('click',function(){
  document.getElementById('bar').style.left = '20px'
  document.getElementById('open-room-img').style.display = 'block'
    document.getElementById('close-room-img').style.display = 'none'
    document.getElementById('close-room-content').style.display = 'none'
    document.getElementById('open-room-content').style.display = 'block'
    document.getElementById('open-room-btn-txt').style.color = 'white'
    document.getElementById('close-room-btn-txt').style.color = '#9d8fc5'
})
document.getElementById('close-room-btn-txt').addEventListener('click',function(){
  document.getElementById('bar').style.left = '55%'
  document.getElementById('open-room-img').style.display = 'none'
    document.getElementById('close-room-img').style.display = 'block'
    document.getElementById('close-room-content').style.display = 'block'
    document.getElementById('open-room-content').style.display = 'none'
    document.getElementById('close-room-btn-txt').style.color = 'white'
    document.getElementById('open-room-btn-txt').style.color = '#9d8fc5'

})









document.getElementById('create-room-btn').addEventListener('click',function(){
    document.getElementById('create-interface').style.transform = 'translateY(0%)'
    document.getElementById('create-close-room-btn').style.display = 'block'
    document.getElementById('create-room-btn').style.display = 'none'
    document.getElementById('create-close-room-btn').style.transform =  'rotate(-45deg)'
    
   

})

document.getElementById('create-close-room-btn').addEventListener('click',function(){
    document.getElementById('create-interface').style.transform = 'translateY(180%)'
    document.getElementById('create-close-room-btn').style.display = 'none'
    document.getElementById('create-close-room-btn').style.transform =  'rotate(-45deg)'
    document.getElementById('create-room-btn').style.display = 'block'

    

})

document.getElementById('chat-btn').addEventListener('click',function(){
  document.getElementById('main-html').style.display = 'none'
  document.getElementById('chat-html').style.display = 'flex'
  document.getElementById('bottom-nav').style.display = 'none'
})
document.getElementById('home-btn').addEventListener('click',function(){
    window.location.href = 'index.html'
})
document.getElementById("back-btn").addEventListener('click',function(){
  document.getElementById('main-html').style.display = 'flex'
  document.getElementById('chat-html').style.display = 'none'
  document.getElementById('bottom-nav').style.display = 'flex'


})

//------------------------- CHAT INTERFACE CONTENT----------------------------------------


const roomtype = localStorage.getItem('room_type');
const usernamedb = localStorage.getItem('username');

const room_name = localStorage.getItem('room_name');
document.getElementById("room_title").innerHTML = room_name
document.getElementById("room_title2").innerHTML = room_name


getDownloadURL(Sref(storage, room_name))
  .then((url) => {
    let image = document.getElementById('profile-img')
    image.src = url
  })
  .catch((error) => {
    console.log(error)
    // Handle any errors
  });

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
    //console.log(element)
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
    //console.log('hello')
    //alerterror('new message')
    //var audio = new Audio('notify2.wav');
    //audio.play();
   

    if(usernamedb !== username) {
      
      chatdiv.style.background = '#3e1278'
    chatdiv.style.marginLeft = '0'
    chatdiv.style.borderRadius = '0px 10px 10px 10px'
      
    
    }
    else{
      chat_li.addEventListener('click',function(){
        remove(ref(db,'rooms/'+`${room_name}/`+keys))
        let error = 'Message deleted'
        alerterror(error)
      })

    }

    chat_li.textContent =values
    chat.append(chatdiv)
    chatdiv.append(chat_li)
    
    
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
  if(usernamedb !== username) {
      
    chatdiv.style.background = '#3e1278'
    chatdiv.style.marginLeft = '0'
    chatdiv.style.borderRadius = '0px 10px 10px 10px'
   
  
  }
  else{
    chat_li.addEventListener('dblclick',function(){
      remove(ref(db,'rooms2/'+`${room_name}/`+keys))
      let error = 'Message deleted'
      alerterror(error)
    })

  }
  
}
if(roomtype =='room'){
  document.getElementById('send-btn').addEventListener('click',function(){
    audio.play();
    const message_chat = document.getElementById('chat_int').value
    chat_int.value = ""
    push(ref(db,"rooms/"+room_name),message_chat+' '+usernamedb)
   
})

}
else{
  document.getElementById('send-btn').addEventListener('click',function(){
    audio.play();
    const message_chat = document.getElementById('chat_int').value
    chat_int.value = ""
    push(ref(db,"rooms2/"+room_name),message_chat+' '+usernamedb)



    
   
})
}

document.getElementById('group').addEventListener('click',function(){
  document.getElementById('more').style.transform = 'translateY(0%)';
})

document.getElementById('close').addEventListener('click',function(){
  document.getElementById('more').style.transform = 'translateY(100%)';
})