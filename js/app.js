

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


// Start the game
getRandomWord();

// Pseudocode

// // 1) Define any variables used to track the state of the game:
// // secretWord: The word that the player is trying to guess.
// // displayedWord: the current state of the guessed word as the player identifies letters.  
// 	for letters not yet guessed, use placeholders like_.
// // guessedLetters: An array or list of letters that the player has already guessed.
// // remainingGuesses: A number tracking how many incorrect guesses remain
// // matchResult: win/lose; did the player guess the word or run out of tries?
// // resultMessage: A message displayed to the player indicating if they won or lost.
	
// // 2) Define the required constants:
// // MAX_GUESSES = 6     
// // Possible words list, a set of words the game might randomly pick from.
// // DOM elements: 
// An element to show the current displayedWord (e.g <p> or <div>).
// An element to show remainingGuesses.
// An element to show messages or final results.

// // 3) Handle the player guessing a letter:
// 	// The player might type a letter or click a letter button on the screen.
// 	// When a letter is guessed: it would be removed.
// 	// If it’s a new guess, add the letter to guessedLetters.
// // check if the letter is in secretWord. If yes, update displayedWord to show the letter in    
// 		all correct positions.  If no, decrement remainingGuesses by 1 and update the 
// 		on-screen hangman drawing or counter.

// // 4) Handle generating the secret word:
// 	// at the start of the game: randomly select a word from the list of possible words and 
// 		store if in secretWord.
// 	// initialized displayedWord with _ for each letter of secretWord.
// 	// set remainingGuesses to MAX_GUESSES.
// 	// clear guessedLettters.
// 	// update the screen to show the initial displayedWord, and remainingGuesses.
	

// // 5) Compare the state of the game and check for a winner:
// 	// after each guess, check if displayedWord still contains any _ . If there are no 
// 		Underscores, it means the player guessed all letters.  Set matchResult = 
// 		“You won! The word was [secretWord].”  Disable further guessing input.
// 	// check if remainingGuesses == 0 and the word is not fully guessed.  
// 		set matchResult = “lose”.  Update resultMesssage = “You lost! The word was 
// 		[secretWord]”.  Disable further guessing input.


// 6) Render message to the player 
// 	// Each time a letter is guessed, update the on-screen displayedWord.  The 
// 		remainingGuesses display.  
// // If the game ends (wind or lose), show the resultMessage.
// // Optionally, provide a “New Game” button.  When clicked, reset the game state and 
// 	Start a new round by picking a new secretWord and calling your initialization logic


