document.addEventListener("DOMContentLoaded", function () {
    const door1 = document.getElementById("door1");
    const door2 = document.getElementById("door2");
    const timerDiv = document.getElementById("timer");
    const resultDiv = document.getElementById("result");
    const bgAudio = new Audio("static/sounds/background.mp3");
    const deathAudio = new Audio("static/sounds/death.mp3");
    const surviveAudio = new Audio("static/sounds/survive.mp3");
    const timeoutAudio = new Audio("static/sounds/timeout.mp3");

    let countdown;
    let isGameActive = true;
    let timeLeft = 10;
    let round = 1;
    let deadDoor = Math.random() < 0.5 ? 1 : 2;
    let totalRounds = 4;

    // Play background music
    bgAudio.loop = true;
    bgAudio.play();

    // Update Timer
    function updateTimer() {
        timerDiv.innerHTML = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            if (isGameActive) {
                isGameActive = false;
                timeoutAudio.play();
                resultDiv.innerHTML = "You Died!";
                retryGame();
            }
        } else {
            timeLeft--;
        }
    }

    // Start Countdown Timer
    function startTimer() {
        clearInterval(countdown);
        timeLeft = 10; // Reset timer for each round
        countdown = setInterval(updateTimer, 1000);
    }

    // Start next round
    function nextRound() {
        if (round <= totalRounds) {
            timeLeft = 10;
            deadDoor = Math.random() < 0.5 ? 1 : 2; // Randomize the dead door
            resultDiv.innerHTML = `Round ${round}: Choose a door!`;
            isGameActive = true;
            round++;
            startTimer();
        } else {
            resultDiv.innerHTML = "Congratulations! You survived all rounds!";
            timerDiv.innerHTML = "";
        }
    }

    // Retry game
    function retryGame() {
        let retryButton = document.createElement("button");
        retryButton.innerText = "Retry Game";
        retryButton.onclick = function () {
            resetGame();
        };
        resultDiv.appendChild(retryButton);
    }

    // Reset game
    function resetGame() {
        round = 1;
        timeLeft = 10;
        resultDiv.innerHTML = `Round ${round}: Choose a door!`;
        timerDiv.innerHTML = `Time left: 10s`;
        isGameActive = true;
        startTimer();
    }

    // Door selection logic
    function chooseDoor(door) {
        if (isGameActive) {
            isGameActive = false;
            clearInterval(countdown);

            if (door === deadDoor) {
                deathAudio.play();
                resultDiv.innerHTML = "You chose the deadly door! You are dead!";
                retryGame();
            } else {
                surviveAudio.play();
                resultDiv.innerHTML = `You survived this round!`;
                setTimeout(nextRound, 2000);
            }
        }
    }

    // Add event listeners to doors
    door1.addEventListener("click", function () {
        chooseDoor(1);
    });

    door2.addEventListener("click", function () {
        chooseDoor(2);
    });

    // Start the game
    startTimer();
});
