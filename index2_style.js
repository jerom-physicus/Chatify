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
