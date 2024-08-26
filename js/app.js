console.log("js is running");

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;
const WORDS = [
  "apple",
  "grape",
  "melon",
  "peach",
  "berry",
  "mango",
  "lemon",
  "tiger",
  "horse",
  "bread",
  "crane",
  "storm",
  "flame",
  "crust",
  "glove",
  "train",
  "plane",
  "craft",
  "sweep",
  "sharp",
  "smart",
  "brave",
  "piano",
  "music",
  "peace",
  "cloud",
  "earth",
  "ghost",
  "laugh",
  "drink",
  "mango",
  "spoon",
  "flame",
  "crane",
  "flute",
  "beach",
  "horse",
  "queen",
  "brown",
  "plate",
  "paint",
  "whale",
  "house",
  "cream",
  "short",
  "vivid",
  "smart",
  "shoes",
  "phone",
  "chart",
  "water",
  "crust",
  "mango",
  "crane",
];
const KEYS = [
  "qwertyuiop".split(""),
  "asdfghjkl".split(""),
  "zxcvbnm".split(""),
];

/*---------- Variables (state) ---------*/
let targetWord = "";
let numGuesses = 0;
let currentGuess = "";

/*----- Cached Element References  -----*/
const grid = document.getElementById("grid");
const messageEl = document.getElementById("message");
const playAgainButton = document.getElementById("playAgain");
const keyboard = document.getElementById("keyboard");

/*-------------- Functions -------------*/
function init() {
  numGuesses = 0;
  currentGuess = "";
  targetWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  messageEl.textContent = "";
  playAgainButton.style.display = "none";

  // Clear and create the grid
  grid.innerHTML = "";
  for (let i = 0; i < MAX_GUESSES; i++) {
    for (let j = 0; j < WORD_LENGTH; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      grid.appendChild(cell);
    }
  }

  // Clear and create the keyboard
  keyboard.innerHTML = "";
  KEYS.forEach((row, rowIndex) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    if (rowIndex === 2) {
      const enterButton = document.createElement("button");
      enterButton.textContent = "Enter";
      enterButton.classList.add("enter");
      enterButton.dataset.key = "enter";
      enterButton.addEventListener("click", handleGuess);
      rowDiv.appendChild(enterButton);
    }

    row.forEach((key) => {
      const keyButton = document.createElement("button");
      keyButton.textContent = key.toUpperCase();
      keyButton.dataset.key = key;
      keyButton.addEventListener("click", () => handleKeyClick(key));
      rowDiv.appendChild(keyButton);
    });

    if (rowIndex === 2) {
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Del";
      deleteButton.classList.add("delete");
      deleteButton.dataset.key = "delete";
      deleteButton.addEventListener("click", handleDelete);
      rowDiv.appendChild(deleteButton);
    }

    keyboard.appendChild(rowDiv);
  });
}

function validateGuess(guess) {
  return WORDS.includes(guess.toLowerCase());
}

function handleKeyClick(letter) {
  if (currentGuess.length < WORD_LENGTH) {
    currentGuess += letter;
    updateGrid();
  }
}

function handleDelete() {
  if (currentGuess.length > 0) {
    currentGuess = currentGuess.slice(0, -1);
    updateGrid();
  }
}

function updateGrid() {
  const startIdx = numGuesses * WORD_LENGTH;

  for (let i = 0; i < WORD_LENGTH; i++) {
    const cell = grid.children[startIdx + i];
    cell.textContent = currentGuess[i] || "";
  }
}

function handleGuess() {
  if (currentGuess.length !== WORD_LENGTH) {
    messageEl.textContent = "Please enter a 5-letter word.";
    console.log("Invalid word length:", currentGuess);
    return;
  }

  const isValidWord = validateGuess(currentGuess);

  if (!validateGuess) {
    messageEl.textContent = "Wrong word. Please try again.";
    markGuessAsIncorrect();
    numGuesses++;
  } else {
    const startIdx = numGuesses * WORD_LENGTH;

    for (let i = 0; i < WORD_LENGTH; i++) {
      const cell = grid.children[startIdx + i];
      const letter = currentGuess[i];
      const keyButton = [...keyboard.querySelectorAll("button")].find(
        (btn) => btn.textContent === letter.toUpperCase()
      );

      if (letter === targetWord[i]) {
        cell.style.backgroundColor = "green"; // Correct letter in correct position
        keyButton.style.backgroundColor = "green";
      } else if (targetWord.includes(letter)) {
        cell.style.backgroundColor = "yellow"; // Correct letter, wrong position
        keyButton.style.backgroundColor = "yellow";
      } else {
        cell.style.backgroundColor = "gray"; // Incorrect letter
        keyButton.style.backgroundColor = "gray";
        keyButton.disabled = true; // Disable incorrect keys
      }
    }

    numGuesses++;

    if (currentGuess === targetWord) {
      messageEl.textContent = "You guessed the correct word!";
      console.log("Player wins!");
      endGame();
    } else if (numGuesses >= MAX_GUESSES) {
      messageEl.textContent = `Game Over! The word was ${targetWord}.`;
      console.log("Player loses. The word was:", targetWord);
      endGame();
    }
  }

  currentGuess = "";
  updateGrid(); // Reset current guess
}

function endGame() {
  console.log("Ending game...");
  const allButtons = keyboard.querySelectorAll("button");
  allButtons.forEach((button) => (button.disabled = true));
  playAgainButton.style.display = "block";
}

/*----------- Event Listeners ----------*/
playAgainButton.addEventListener("click", () => {
  console.log("Play Again button clicked");
  init();
});

init();
