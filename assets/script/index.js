'use strict';

import Score from './score.js';

const words = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
    'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
    'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
    'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
    'philosophy', 'database', 'periodic', 'capitalism', 'abominable',
    'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
    'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'promise',
    'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
    'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
    'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess',
    'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library',
    'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy',
    'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous',
    'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window', 'beans', 'truck', 'sheep', 'band', 'level', 'hope',
    'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 'mask',
    'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
    'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort', 'escape'
];

let time = 99;
let score = 0;
let isPlaying;
let gameInterval;
let checkStatusInterval;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#word-display');
const scoreDisplay = document.querySelector('#score-value');
const timeDisplay = document.querySelector('#time');
const startButton = document.querySelector('#start-button');
const gameMusic = document.querySelector('#background-music');

function init() {
    startButton.addEventListener('click', startGame);
    wordInput.addEventListener('input', startMatch);
    startButton.textContent = 'Start';
}

function startGame() {
    isPlaying = true;
    time = 99;
    score = 0;
    wordInput.value = '';
    wordInput.disabled = false;
    shuffleWords();
    gameMusic.play();
    wordInput.focus();
    clearInterval(gameInterval);
    clearInterval(checkStatusInterval);
    gameInterval = setInterval(countdown, 1000);
    checkStatusInterval = setInterval(checkStatus, 50);
    startButton.style.display = 'none';
}


function restartGame() {
    startButton.textContent = 'Restart';
    startButton.style.display = 'block';
    startButton.removeEventListener('click', startGame);
    startButton.addEventListener('click', startGame);
}

function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        shuffleWords();
        wordInput.value = '';
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

// Handle game end
function endGame() {
    isPlaying = false;
    gameMusic.pause();
    gameMusic.currentTime = 0;
    clearInterval(gameInterval);
    clearInterval(checkStatusInterval);
    alert(`Game Over! Your final score is: ${score}`);

    const gameScore = new Score(score, words.length);
    // Now gameScore can be used to access date, hits, and percentage
    console.log(`Game Ended on: ${gameScore.date}`);
    console.log(`Total Hits: ${gameScore.hits}`);
    console.log(`Accuracy: ${gameScore.percentage.toFixed(2)}%`);

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
