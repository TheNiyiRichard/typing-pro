"use strict";

import score from "./score.js";

const words = [
	"dinosaur",
	"love",
	"pineapple",
	"calendar",
	"robot",
	"building",
	"population",
	"weather",
	"bottle",
	"history",
	"dream",
	"character",
	"money",
	"absolute",
	"discipline",
	"machine",
	"accurate",
	"connection",
	"rainbow",
	"bicycle",
	"eclipse",
	"calculator",
	"trouble",
	"watermelon",
	"developer",
	"philosophy",
	"database",
	"periodic",
	"capitalism",
	"abominable",
	"component",
	"future",
	"pasta",
	"microwave",
	"jungle",
	"wallet",
	"canada",
	"coffee",
	"beauty",
	"agency",
	"chocolate",
	"eleven",
	"technology",
	"promise",
	"alphabet",
	"knowledge",
	"magician",
	"professor",
	"triangle",
	"earthquake",
	"baseball",
	"beyond",
	"evolution",
	"banana",
	"perfume",
	"computer",
	"management",
	"discovery",
	"ambition",
	"music",
	"eagle",
	"crown",
	"chess",
	"laptop",
	"bedroom",
	"delivery",
	"enemy",
	"button",
	"superman",
	"library",
	"unboxing",
	"bookstore",
	"language",
	"homework",
	"fantastic",
	"economy",
	"interview",
	"awesome",
	"challenge",
	"science",
	"mystery",
	"famous",
	"league",
	"memory",
	"leather",
	"planet",
	"software",
	"update",
	"yellow",
	"keyboard",
	"window",
	"beans",
	"truck",
	"sheep",
	"band",
	"level",
	"hope",
	"download",
	"blue",
	"actor",
	"desk",
	"watch",
	"giraffe",
	"brazil",
	"mask",
	"audio",
	"school",
	"detective",
	"hero",
	"progress",
	"winter",
	"passion",
	"rebel",
	"amber",
	"jacket",
	"article",
	"paradox",
	"social",
	"resort",
	"escape",
];

let time = 20;
let score = 0;
let isPlaying;
let gameInterval;
let checkStatusInterval;

const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#word-display");
const scoreDisplay = document.querySelector("#score-value");
const timeDisplay = document.querySelector("#time");
const startButton = document.querySelector("#start-button");
const gameMusic = document.querySelector("#background-music");
const scoreBoard = document.querySelector(".v-wrap-container-inner .v-aside");
const listOfScoresContainer = document.querySelector(".v-aside .v-score-list");
const scoreBoardToggler = document.querySelector(".v-main-wrapper .v-show-scoreboard");
const layer = document.querySelector(".v-layer");
const countdownCounter = document.querySelector(".v-counter-countdown");
const modal = document.querySelector(".modal-layer-container");
const modalClose = document.querySelector(".modal-layer-container .closemodal");

modalClose.addEventListener("click", function () {
	if (modal.classList.contains("active")) {
		modal.classList.remove("active");
	}
});

function readyToPlayCounter() {
	let count = 3;
	const readyToPlayCounterInterval = setInterval(() => {
		if (count > 0) {
			count--;
		} else if (count === 0) {
			clearInterval(readyToPlayCounterInterval);
			layer.classList.remove("active");
			startGame();
		}
		countdownCounter.innerHTML = count;
	}, 1000);
}

function showScoreBoard() {
	if (scoreBoard) {
		displayHighScores();
		scoreBoard.classList.add("active");
		setTimeout(() => {
			scoreBoard.classList.remove("active");
		}, 5000);
	}
}

if (scoreBoardToggler) {
	scoreBoardToggler.addEventListener("click", function () {
		if (scoreBoard.classList.contains("active")) {
			scoreBoard.classList.remove("active");
		} else {
			scoreBoard.classList.add("active");
		}
	});
}
function init() {
	startButton.addEventListener("click", () => {
		layer.classList.add("active");
		readyToPlayCounter();
	});
	wordInput.addEventListener("input", startMatch);
	startButton.textContent = "Start";

	showScoreBoard();
}

function startGame() {
	isPlaying = true;
	time = 20;
	score = 0;
	wordInput.value = "";
	wordInput.disabled = false;
	shuffleWords();
	gameMusic.play();
	wordInput.focus();
	clearInterval(gameInterval);
	clearInterval(checkStatusInterval);
	gameInterval = setInterval(countdown, 1000);
	checkStatusInterval = setInterval(checkStatus, 50);
	startButton.style.display = "none";
}

function restartGame() {
	startButton.textContent = "Restart";
	startButton.style.display = "block";
	startButton.removeEventListener("click", startGame);
	startButton.addEventListener("click", readyToPlayCounter);
}

function startMatch() {
	if (matchWords()) {
		isPlaying = true;
		shuffleWords();
		wordInput.value = "";
		score++;
	}
	scoreDisplay.innerHTML = score;
}

// Match currentWord to wordInput
function matchWords() {
	return wordInput.value === currentWord.innerHTML;
}

// Pick & show random word
function shuffleWords() {
	const randomIndex = Math.floor(Math.random() * words.length);
	currentWord.innerHTML = words[randomIndex];
}

// Countdown timer
function countdown() {
	if (time > 0) {
		time--;
	} else if (time === 0) {
		endGame();
	}
	timeDisplay.innerHTML = time;
}

function updateScoreInLocalStorage(newHighScore, accuracy) {
	const newHighScoreObject = {
		timeOfRecordHit: new Date().toLocaleString(),
		highScore: newHighScore,
		accuracy,
	};

	let highScoresInStorage = window.localStorage.getItem("highScores");
	let arrayOfHighScores = [];

	if (highScoresInStorage) {
		arrayOfHighScores = JSON.parse(highScoresInStorage);
	}
	const isNewHighScoreHighest = arrayOfHighScores.every((score) => newHighScore > score.highScore);

	if (isNewHighScoreHighest) {
		if (arrayOfHighScores.length >= 10) {
			const lowestScoreIndex = arrayOfHighScores.findIndex(
				(score) => score.highScore === Math.min(...arrayOfHighScores.map((item) => item.highScore))
			);
			arrayOfHighScores.splice(lowestScoreIndex, 1);
		}
		arrayOfHighScores.push(newHighScoreObject);
		window.localStorage.setItem("highScores", JSON.stringify(arrayOfHighScores));
		showScoreBoard();
	}
}

function displayHighScores() {
	let highScoresInStorage = JSON.parse(window.localStorage.getItem("highScores"));

	if (highScoresInStorage && highScoresInStorage.length) {
		listOfScoresContainer.innerHTML = "";
		highScoresInStorage.forEach((score, scoreIndex) => {
			listOfScoresContainer.innerHTML += `
        <li class="v-each-num">
            <span>#${scoreIndex + 1}</span>
            <span>${score.highScore} word${parseInt(score.highScore) <= 1 ? "" : "s"}</span>
            <span>${score.accuracy}%</span>
          </li>
		`;
		});
	} else {
		listOfScoresContainer.innerHTML = `
      <div class="v-empty-score">
          <span>No high scores yet!</span>
        </div>
    `;
	}
}

// Handle game end
function endGame() {
	isPlaying = false;
	gameMusic.pause();
	gameMusic.currentTime = 0;
	clearInterval(gameInterval);
	clearInterval(checkStatusInterval);
	// alert(`Game Over! Your final score is: ${score}`);

	const gameScore = new Score(score, words.length);
	// Now gameScore can be used to access date, hits, and percentage
	// console.log(`Game Ended on: ${gameScore.date}`);
	// console.log(`Total Hits: ${gameScore.hits}`);
	// console.log(`Accuracy: ${gameScore.percentage.toFixed(2)}%`);
	updateScoreInLocalStorage(score, gameScore.percentage.toFixed(2));
	document.querySelector(".modal .accuracy .v-value").innerHTML = gameScore.percentage.toFixed(2);
	document.querySelector(".modal .score-hit .v-value").innerHTML = gameScore.hits;
	modal.classList.add("active");

	restartGame();
}

// Check game status
function checkStatus() {
	if (!isPlaying && time === 0) {
		wordInput.disabled = true;
		currentWord.innerHTML = "Game Over!";
		scoreDisplay.innerHTML = `Final Score: ${score}`;
	}
}

window.onload = init;
