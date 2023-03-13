const container = document.querySelector(".container");
let arr = [];

for(let i=0; i<100; ++i){
    const content = document.createElement("div");
    content.className = "content";
    content.innerHTML = i+1;
    container.appendChild(content);
    arr.push(false);
}

const contents = document.querySelectorAll(".container > .content");

document.addEventListener("DOMContentLoaded", function () {
    playGame();
});

function playGame(){
    for(let i=0; i<contents.length; ++i){
        contents[i].addEventListener('click', (event) => {
            arr[i] = !arr[i];
            if(arr[i]){
                event.target.style.setProperty("background-color", "red", "important");
                return;
            }
            event.target.style.setProperty("background-color", "rgb(179, 116, 255)");
        });
    }
}

// function hover(element, enter, leave){
//     element.addEventListener('mouseenter', enter)
//     element.addEventListener('mouseleave', leave)
// }

// hover(document.querySelector('.content'), e => {
//     // On hover
//     e.target.classList.add("content_hover")
//   }, e => {
//     // On exit hover
//     e.target.classList.remove("content_hover")
// })
// container.addEventListener('click', (event) => {
//     console.log(event.target);
//     // event.target.style.backgroundColor = "rgb(179, 116, 255)";
//     // displayedImage.setAttribute('src', event.target.getAttribute('src'));
//     // displayedImage.setAttribute('alt', event.target.getAttribute('alt'));
// });