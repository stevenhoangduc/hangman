

const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const lettersGuess= document.querySelector(".letters-guess");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");


let currentWord, correctLetters = [], wrongGuessCount = 0, isVictory = false
const maxGuesses = 6;

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory === "win" ? `You got it:` :`The answer was:`;
        gameModal.querySelector(".img")
        gameModal.classList.add("show");

    }, 300);
}

const initGame = (button, clickedLetter) => {
    // Check to see if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing correct letter in word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        if (wrongGuessCount >= 6 ) {
            
            return gameOver("lose")
        } 
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    lettersGuess.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Calling gameOver functin if any of these conditions meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
   
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();

