let selectLevel = document.querySelector(".level");
let secondsOfLevel = document.querySelector(".seconds");
let clickButton = document.querySelector(".start");
let theChosenWord = document.querySelector(".the-word");
let theInput = document.querySelector(".input");
let upcomingwords = document.querySelector(".upcoming-words");
let theLeftTime = document.querySelector(".time span");
let theScore = document.querySelector(".got");
let totalWords = document.querySelector(".total");
let finishResult = document.querySelector(".finish");
let yourLevel = document.querySelector("#lvl");
let words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};
if (window.localStorage.getItem("TheScore")) {
  theScore.innerHTML = window.localStorage.getItem("TheScore");
}
let defualtOfLvls = "Normal";
let defualtOfLvlSeconds = lvls[defualtOfLvls];
selectLevel.innerHTML = defualtOfLvls;
secondsOfLevel.innerHTML = defualtOfLvlSeconds;

// When the player select level of game
yourLevel.onchange = function () {
  console.log(yourLevel.value);
  defualtOfLvls = yourLevel.value;
  defualtOfLvlSeconds = lvls[defualtOfLvls];
  selectLevel.innerHTML = defualtOfLvls;
  secondsOfLevel.innerHTML = defualtOfLvlSeconds;
};

totalWords.innerHTML = words.length;

theInput.onpaste = function () {
  return false;
};
let clicked = true;

clickButton.onclick = function () {
  clickButton.remove();
  theInput.focus();
  generate();
};

function generate() {
  let random = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(random);
  words.splice(wordIndex, 1);
  theChosenWord.innerHTML = random;
  upcomingwords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.textContent = words[i];
    upcomingwords.appendChild(newDiv);
  }

  startPlay();
}

function startPlay() {
  let nowScore = theScore.innerHTML;
  let dateNow = new Date();
  let DateOfDay = dateNow.getDate();
  if (clicked) {
    theLeftTime.innerHTML = defualtOfLvlSeconds + 3;
    clicked = false;
  } else {
    theLeftTime.innerHTML = defualtOfLvlSeconds;
  }
  let start = setInterval(() => {
    theLeftTime.innerHTML--;
    if (theLeftTime.innerHTML === "0") {
      clearInterval(start);
      if (
        theChosenWord.innerHTML.toLowerCase() === theInput.value.toLowerCase()
      ) {
        theInput.value = "";
        theScore.innerHTML++;

        localStorage.setItem("TheScore", nowScore);
        localStorage.setItem("TheDate", DateOfDay);
        if (words.length > 0) {
          generate();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratz");
          span.appendChild(spanText);
          finishResult.appendChild(span);
          upcomingwords.remove();
          localStorage.setItem("TheScore", nowScore);
          localStorage.setItem("TheDate", DateOfDay);
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishResult.appendChild(span);
        console.log(nowScore);
        if (nowScore > 0) {
          nowScore = nowScore - 1;
        }
        console.log(nowScore);
        // location.reload();
        localStorage.setItem("TheScore", nowScore);
        localStorage.setItem("TheDate", DateOfDay);
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    }
  }, 1000);
}
