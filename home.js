let button = document.querySelector(".menu-icon"),
    links = document.querySelector(".nav-box");

    button.addEventListener("click",()=>{
        links.classList.toggle("display")
})