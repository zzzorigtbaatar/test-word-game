//Initial global variables
var startButton = document.querySelector(".start-button")
var timeLimit = 60000;
var currentTime = 0;
var timerText = "";
var currentWord1 = "_";
var currentWord2 = "_";
var currentWord3 = "_";
var winScore = 0;
var lossScore = 0;
var stopTimer = false;
var gameOver = false;

//displays the current time on timer
function init() {
    if (localStorage.getItem("wins") === null && localStorage.getItem("losses" === null)) {
        createLocalPlayer();
    }
    displayTimer();
    displayScores();
    displaySecretWord();
    // createLocalPlayer();
    // console.log(player.winScore);
    // console.log(player.lossScore);
    resetTimer();
    // startTimer();
}

//Creates player object with initially set values
// var player = {
//     winScore: 0,
//     lossScore: 0,
// }

//Creates player object if there are none in local storage
function createLocalPlayer() {

    // if (JSON.parse(localStorage.getItem("playerObject")) === null) {
    //     localStorage.setItem("playerObject", JSON.stringify(player));
    // }
    localStorage.setItem("wins", winScore);
    localStorage.setItem("losses", lossScore);
}
//Increments player's total wins in local storage
function playerWon() {
    // var latestWinScore = JSON.parse(localStorage.getItem("playerObject")).winScore.value + 1;
    // localStorage.setItem("playerObject", latestWinScore);
    if (localStorage.getItem("wins") === null && localStorage.getItem("losses" === null)) {
        createLocalPlayer();
    }
    var latestWinScore = JSON.parse(localStorage.getItem("wins"));
    localStorage.setItem("wins", latestWinScore + 1);
    
    gameOver = true;
    document.getElementById("timer").innerHTML = "You won with " + currentTime + " milliseconds remaining!";
    console.log("playerWon was hit");

}

//Increments player's total losses in local storage
function playerLost() {
    // var latestLossScore = JSON.parse(localStorage.getItem("playerObject")).winScore.value + 1;
    // localStorage.setItem("playerObject", latestLossScore);
    if (localStorage.getItem("wins") === null && localStorage.getItem("losses" === null)) {
        createLocalPlayer();
    }
    var latestLossScore = JSON.parse(localStorage.getItem("losses"));
    localStorage.setItem("losses", latestLossScore + 1);
    gameOver = true;
}

//Show timer text before it starts
function displayTimer() {
    document.getElementById("timer").innerHTML = "You only get " + timeLimit + " milliseconds.";
}

//displays the secret word as underscores initially and then reveals letters if correctly pressed
function displaySecretWord() {

    document.getElementById("wordscreen").innerHTML = currentWord1 + " " + currentWord2 + " " + currentWord3;
    console.log("displaySecretWord is finished running");

}

//displays the locally stored scores, if there is any.
function displayScores() {
    // var latestWinScore = JSON.parse(localStorage.getItem("playerObject")).winScore;
    // var latestLossScore = JSON.parse(localStorage.getItem("playerObject")).lossScore;
    var latestWinScore = JSON.parse(localStorage.getItem("wins"));
    var latestLossScore = JSON.parse(localStorage.getItem("losses"));

    if (latestWinScore !== null && latestLossScore !== null) {
        document.getElementById('winsText').innerHTML = latestWinScore;
        document.getElementById('lossesText').innerHTML = latestLossScore;
        console.log("this if got hit");
    } else {
        document.getElementById('winsText').innerHTML = "0";
        document.getElementById('lossesText').innerHTML = "0";
        console.log("this else got hit");
    }
}

//resets timer to 1 minute/60000 milliseconds
function resetTimer() {
    currentTime = timeLimit;
    console.log("current timer has been reset to: " + currentTime);
}

// begins timer until it reaches 0.
function startTimer() {
    resetTimer();

    setInterval(function () {

        if (currentTime === 0 && !stopTimer) {
            console.log("currentTime is at 0");
            document.getElementById("timer").innerHTML = "Time's Up!";
        } else if (currentTime > 0 && !stopTimer) {
            // timerText = "There are " + timerLimit + " milliseconds left!";
            checkStatus()
            console.log("currentTime is at " + currentTime);
            document.getElementById("timer").innerHTML = "There are " + currentTime + " milliseconds left!";
            currentTime -= 1000;
        }

    }, 1000);

}


//checks win status of player
function checkStatus() {
    if (gameOver) {
        init();
    } else {
        if (currentWord1 == "_" || currentWord2 == "_" || currentWord3 == "_") {
            if (currentTime === 0) {
                playerLost();
            }
        } else if (currentWord1 != "_" && currentWord2 != "_" && currentWord3 != "_") {
            playerWon();
            stopTimer = true;
        } else {
            return;
        }
    }
}


init();

//button listener for starting timer
startButton.addEventListener("click", function (event) {
    console.log("click event registered");
    startTimer();
});


//keyboard listener for what letters are being guessed
document.addEventListener('keydown', (event) => {
    if (event.key == "c") {
        checkStatus()
        currentWord1 = "C";
        displaySecretWord();
    } else if (event.key == "a") {
        checkStatus()
        currentWord2 = "A";
        displaySecretWord();
    } else if (event.key == "t") {
        checkStatus()
        currentWord3 = "T";
        displaySecretWord();
    }
}, false);