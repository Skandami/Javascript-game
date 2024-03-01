const leon = document.getElementById("leon");
const skull = document.getElementById("skull");
const skin = document.getElementById("skin");
const star = document.getElementById("star");
const timerDisplay = document.getElementById("timer");
const bestScore = document.getElementById("score");

let seconds = 0;
let timerInterval;
let isAlive;

document.addEventListener("keydown", function (event) {
  jump();
});

function jump() {
  if (leon.classList != "jump") {
    leon.classList.add("jump");
  }

  setTimeout(function () {
    leon.classList.remove("jump");
  }, 1000);
}

function startGame() {
  seconds = 0;
  timerDisplay.textContent = "00:00"; // Reset timer display
  startTimer(); // Start the timer
  isAlive = setInterval(function () {
    let leonTop = parseInt(
      window.getComputedStyle(leon).getPropertyValue("top")
    );
    let skullLeft = parseInt(
      window.getComputedStyle(skull).getPropertyValue("left")
    );
    let skinLeft = parseInt(
      window.getComputedStyle(skin).getPropertyValue("left")
    );
    let starLeft = parseInt(
      window.getComputedStyle(star).getPropertyValue("left")
    );
    if (skullLeft < 50 && skullLeft > 0 && leonTop >= 250) {
      clearInterval(isAlive);
      clearInterval(timerInterval);
      saveScore(seconds);
      startGame(); // Start a new game after the alert
    }
    // if (skinLeft < 50 && skinLeft > 0 && leonTop >= 250) {
    //   clearInterval(isAlive);
    //   clearInterval(timerInterval);
    //   saveScore(seconds);
    //   startGame(); // Start a new game after the alert
    // }
    // if (starLeft < 50 && skinLeft > 0 && leonTop >= 250) {
    //   clearInterval(isAlive);
    //   clearInterval(timerInterval);
    //   saveScore(seconds);
    //   startGame(); // Start a new game after the alert
    // }
  }, 10);
}

// Game timer
function startTimer() {
  timerInterval = setInterval(function () {
    seconds++;
    timerDisplay.textContent = formatTime(seconds);
  }, 1000);
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// Start the game when the window loads
window.addEventListener("load", startGame);

// Function to save the highest score
function saveScore(score) {
  const highestScore = localStorage.getItem("highestScore");
  const bestScore = document.getElementById("score");
  if (highestScore === null || score > parseInt(highestScore)) {
    localStorage.setItem("highestScore", score);
    bestScore.textContent = `The highest score is ${score}.`;
    alert(`Congratulations! You've set a new high score of ${score} seconds!`);
  } else {
    alert(
      `Your score: ${score} seconds. Highest score: ${highestScore} seconds.`
    );
  }
}
//comedysound
function makeSound() {
  const audio = new Audio();
  audio.preload = "auto";
  audio.src = "./img/sound-brawl.mp3";
  audio.addEventListener("ended", function () {
    audio.currentTime = 0; // Reset the audio to the beginning
    audio.play();
  });

  audio.play();
}

window.addEventListener("load", makeSound);
