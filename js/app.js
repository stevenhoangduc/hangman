

// Audio elements for sound effects
const correctSound = new Audio("sounds/correctsound.mp3");
const wrongSound = new Audio("sounds/wrongsound.mp3");
const winSound = new Audio("sounds/win.mp3");
const loseSound = new Audio("sounds/lose.mp3");

// Dom elements
const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const lettersGuess= document.querySelector(".letters-guess");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");

// Game variables
let currentWord; 
correctLetters = []; 
wrongGuessCount = 0; 
isVictory = false;
const maxGuesses = 6;

// Function to get a random word and hint from the word list
const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; // Store the selected word
    console.log(word); // Log the word for debugging

    // Update the hint text
    document.querySelector(".hint-text b").innerText = hint;

    // Create blank spaces for each letter in the word
    wordDisplay.innerHTML = word
        .split("") // Split the word into letters
        .map(() => `<li class="letter">_</li>`) // Create underscores for each letter
        .join(""); // Combine the underscores into a string
};

// Function to handle the end of teh game
const gameOver = () => {
    setTimeout(() => {
       const modalTitle = gameModal.querySelector(".result-title");
       const modalMessage = gameModal.querySelector(".result-message b");
       const resultGif = gameModal.querySelector(".result-gif");
       
       // Check if the player won or lost
        if (isVictory === true) {
            modalTitle.innerText = "You win!";
            resultGif.src = "images/win.gif";
            winSound.play(); // Play win sound
       }else {
            modalTitle.innerText = "You lose!"
            resultGif.src = "images/lost.gif";
            loseSound.play(); // Play lose sound
       }

       // Show the correct word and the game modal
        modalMessage.innerText = currentWord;
        gameModal.classList.add("show");
    }, 0.3); // Delay 0.3s for a smooth transition
};

// Function to handle a guessed letter
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
        // Play the wrong sound
        wrongSound.play();

        // Increment the wrong guess count and update the hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }

    // Disable the clicked button
    button.disabled = true;

    // Update the wrong guess counter
    lettersGuess.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Check if the game Over 
    if(wrongGuessCount === maxGuesses) return gameOver(); // Player loses
    if(correctLetters.length === currentWord.length) {
        isVictory = true; // Player wins
        gameOver();
    }
   
}



// Creating on-screen keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button"); // Create a button for each letter
    button.innerText = String.fromCharCode(i); // Set the letter as the button text
    keyboardDiv.appendChild(button); // Add the button to the keyboard container

    // Add a click event listener for each button
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

// Start the game by selecting a random word
getRandomWord()