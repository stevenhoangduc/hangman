

// Audio elements for sound effects
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");
const winSound = new Audio("sounds/win.mp3");
const loseSound = new Audio("sounds/lose.mp3");
const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const lettersGuess= document.querySelector(".letters-guess");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");


let currentWord, correctLetters = [], wrongGuessCount = 0, isVictory = false
const maxGuesses = 6;

// Function to get a random word from the word lis
const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter">_</li>`).join("");
  
}

// Function to handle game over
const gameOver = () => {
    setTimeout(() => {
       const modalTitle = gameModal.querySelector(".result-title");
       const modalMessage = gameModal.querySelector(".result-message b");
       const resultGif = gameModal.querySelector(".result-gif");
       
        if (isVictory === true) {
            modalTitle.innerText = "You win!";
            resultGif.src = "images/win.gif";
            winSound.play(); // Play win sound
       }else {
            modalTitle.innerText = "You lose!"
            resultGif.src = "images/lost.gif";
            loseSound.play(); // Play lose sound
       }

       modalMessage.innerText = currentWord;
        gameModal.classList.add("show");

    }, 0.3);
}

// Function to intitialize the game for a guess
const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)) {
        // Play correct sound
        correctSound.play();

        // Show correct letter in word display
        [...currentWord].forEach((letter, index) => {
            const letterElement = wordDisplay.querySelectorAll("li")[index];
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                letterElement.innerText = letter;
                letterElement.classList.add("guessed");

            }
        });
    }else {
        // Play wrong sound
        wrongSound.play;

        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }

    // Disable the button
    button.disabled = true;
    lettersGuess.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Check if the game Over 
    if(wrongGuessCount === maxGuesses) return gameOver();
    if(correctLetters.length === currentWord.length) {
        isVictory = true
        gameOver();
    }
   
}



// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}


