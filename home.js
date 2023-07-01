import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const provider = new GoogleAuthProvider();

let email = localStorage.getItem('email')

if(email == null){
    document.getElementById('continue-btn').style.display ='none'

}


document.getElementById('sign').addEventListener('click',function(){   
    localStorage.clear() 
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        //localStorage.clear();
       
        localStorage.setItem('email',user.email );
        let username= user.displayName
        let accountname1 = username.replace(' ','')
        let accountname = accountname1.replace(' ','')
        localStorage.setItem('username',accountname );
        alert("Successfuly login'd as"+` ${user.email}`)
        window.location.href ='index2.html'
        
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
})




let button = document.querySelector(".menu-icon"),
    links = document.querySelector(".nav-box");

    button.addEventListener("click",()=>{
        document.getElementById('nav-box').style.transform = 'translateX(0%)'
        
        document.getElementById('menu-btn').style.display ='none'
        document.getElementById('close-btn').style.display ='block'

        document.getElementById('close-btn').addEventListener('click',function(){
            document.getElementById('menu-btn').style.display ='block'
            document.getElementById('close-btn').style.display ='none'
            document.getElementById('nav-box').style.transform = 'translateX(-100%)'
        })
        //links.classList.toggle("display")
})
document.getElementById('continue-btn').addEventListener('click',function(){
    window.location.href = 'index2.html'
})