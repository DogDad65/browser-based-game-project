console.log('js is running');

/*-------------- Constants -------------*/
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;
const WORDS = ["apple", "grape", "melon", "peach", "berry", "mango"];

/*---------- Variables (state) ---------*/
let numGuesses = 0;
let lose = false;
let targetWord = ""; 

/*----- Cached Element References  -----*/
const grid = document.getElementById("grid");
const messageEl = document.getElementById("message");
const guessInput = document.getElementById("guessInput");
const submitGuessButton = document.getElementById("submitGuess");
const playAgainButton = document.getElementById("playAgain");

/*-------------- Functions -------------*/
function init() {
  numGuesses = 0;
  lose = false;
  targetWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  messageEl.textContent = "";
  guessInput.value = "";
  submitGuessButton.disabled = false;
  playAgainButton.style.display = "none";

  
  grid.innerHTML = "";

  for (let i = 0; i < MAX_GUESSES; i++) { // 6 rows
    for (let j = 0; j < WORD_LENGTH; j++) { // 5 columns
      const cell = document.createElement("div");
      cell.textContent = "";
      grid.appendChild(cell);
    }
  }
}

function handleGuess() {
  const currentGuess = guessInput.value.toLowerCase();

  if (currentGuess.length !== WORD_LENGTH) {
    messageEl.textContent = "Please enter a 5-letter word.";
    return;
  }
const startIdx = numGuesses * WORD_LENGTH;

for (let i = 0; i < WORD_LENGTH; i++) {
  const cell = grid.children[startIdx + i];
  const letter = currentGuess[i];
  cell.textContent = letter;

  if (letter === targetWord[i]) {
    cell.style.backgroundColor = "green";
  }else if (targetWord.includes(letter)) {
    cell.style.backgroundColor = "yellow";
  } else {
    cell.style.backgroundColor = 'gray';
  }
}

numGuesses++;

if (currentGuess === targetWord) {
  messageEl.textContent = "You Win!";
  endGame();
} else if (numGuesses >= MAX_GUESSES) {
  lose = true;
  messageEl.textContent = `Game over! The word was ${targetWord}.`;
  endGame();
}

guessInput.value = '';
}

function endGame() {
  submitGuessButton.disabled = true;
  playAgainButton.style.display = "block";
}

/*----------- Event Listeners ----------*/
submitGuessButton.addEventListener("click", handleGuess);
playAgainButton.addEventListener("click", init);

init();