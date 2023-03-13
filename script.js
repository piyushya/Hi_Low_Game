const container = document.querySelector(".container");
const info_win = document.querySelector(".info_win");
const info_text = document.querySelector(".info_text");
const close = document.querySelector(".close");
const nav_buttons = document.querySelectorAll("nav > ul > li");
const overlay = document.querySelector(".overlay")

let games_played = 0;
let games_won = 0;
let games_lost = 0;
let arr = [];
const max_guess = 5;

let info_arr = [
    `The Objective of this simple game is to guess the number randomly\
    generated at the start of each game, Each guess will highlight the range of numbers\
    that are expected to have the answer in the next guess, You get ${max_guess} guesses`, // next line
    `games played : ${games_played}<br> games won : ${games_won}<br> games\
     lost : ${games_lost}<br> Prev Number : None<br> Number of guesses : ${0}`
];
const maxNum = 100;

for(let i=0; i<nav_buttons.length; ++i){
    nav_buttons[i].addEventListener("click", (event) => {
        info_text.innerHTML = info_arr[i];
        info_win.style.display = "flex";
        overlay.style.display = "flex";
    });
}

for(let i=0; i<maxNum; ++i){
    const content = document.createElement("div");
    content.className = "content";
    content.innerHTML = i+1;
    container.appendChild(content);
    arr.push(false);
}

const contents = document.querySelectorAll(".container > .content");

document.addEventListener("DOMContentLoaded", function () {
    info_text.innerHTML = info_arr[0];
    overlay.style.display = "flex";
    info_win.style.display = "flex";
    playGame();
});

close.addEventListener("click", function(){
    overlay.style.display = "none";
});

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function resetGrid(){
    for(let i=0; i<maxNum; ++i){
        arr[i] = 0;
        contents[i].style.setProperty("background-color", "rgb(179, 116, 255)");
    }
}

function illuminate(guess, flag){
    for(let j = (flag ? guess : 0); j<(flag ? maxNum : guess); ++j){
        if(!arr[j])
            contents[j].style.setProperty("background-color", "rgb(23, 196, 104)");
    }
    setTimeout(() => {
        for(let j = (flag ? guess : 0); j<(flag ? maxNum : guess); ++j){
            contents[j].style.setProperty("background-color", "rgb(179, 116, 255)");
            if(arr[j] == 1)
                contents[j].style.setProperty("background-color", "rgb(255, 0, 0)");
        }
    }, "300");
}

function playGame(){
    let guess_count = 0;
    games_played += 1;
    let is_won = 0;
    let guessNumber = randomIntFromInterval(1, maxNum);
    console.log(guessNumber);
    for(let i=0; i<contents.length; ++i){
        contents[i].addEventListener('click', (event) => {
            guess_count += 1;
            arr[i] = 1;
            event.target.style.setProperty("background-color", "red", "important");
            if(i + 1 === guessNumber){
                // console.log("guessed");
                is_won = 1;
                games_won += 1;
                games_played = games_lost + games_won;
                info_arr[1] = `games played : ${games_played}<br> games won : ${games_won}<br> games\
                lost : ${games_lost}<br> Prev Number : ${guessNumber}<br> Number of guesses : ${guess_count}`;
                info_text.innerHTML = info_arr[1];
                overlay.style.display = "flex";
                resetGrid();
                is_won = 0;
                guess_count = 0;
                guessNumber = randomIntFromInterval(1, maxNum);
            }
            if(guess_count == max_guess && is_won == 0){
                games_lost += 1;
                games_played = games_lost + games_won;
                info_arr[1] = `games played : ${games_played}<br> games won : ${games_won}<br> games\
                lost : ${games_lost}<br> Prev Number : ${guessNumber}<br> Number of guesses : ${guess_count}`;
                info_text.innerHTML = info_arr[1];
                overlay.style.display = "flex";
                resetGrid();
                is_won = 0;
                guess_count = 0;
                guessNumber = randomIntFromInterval(1, maxNum);
            }
            else if(i + 1 > guessNumber){
                // console.log("too high");
                illuminate(i, 0);
            }
            else{
                // console.log("too low");
                illuminate(i, 1);
            }
            // console.log(guessNumber);
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