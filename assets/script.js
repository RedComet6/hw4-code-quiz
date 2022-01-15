const quizTitle = document.querySelector("#quizTitle");
const startBtn = document.querySelector("#start");
const timerDiv = document.querySelector("#timer");
const questDiv = document.querySelector("#question");
const ansDiv = document.querySelector("#answers");
const highScoreDiv = document.querySelector("#highScores");
const questions = [
    {
        title: "I am a big fan of horror movies, do you happen to know my favorite horror film?",
        answers: ["Event Horizon", "The Thing (1982)", "Tucker & Dale vs Evil", "Parasite Eve"],
        correct: "The Thing (1982)",
    },
    {
        title: "I am also very into metal music, any idea which of these is my favorite metal band?",
        answers: ["Periphery", "Northlane", "Spiritbox", "Meshuggah"],
        correct: "Meshuggah",
    },
    {
        title: "I have a beautiful little cat that I adopted in 2017, do you know her name?",
        answers: ["Samus", "Artemis", "Olive", "Blossom"],
        correct: "Blossom",
    },
    {
        title: "I love tattoos! Ask me about them sometime, I will talk your ear off. After I get my next one over the summer, how many do you think that will make for me?",
        answers: ["3", "6", "9", "12"],
        correct: "6",
    },
    {
        title: "Do you know which item I have a collection of?",
        answers: ["Coffee Mugs", "Coasters", "Plants", "Vinyl LPs"],
        correct: "Coffee Mugs",
    },
];
const questionIndexInit = 0;
const highScoreMaxIndex = 2;
let highScores = JSON.parse(localStorage.getItem("highScoreList"));
let timerCount = 60;
let gameOver = false;
let correctChoices = 0;

// functions
function gameStart() {
    timerStart();
    questionInit(questionIndexInit);
}

function questionInit(questionNum) {
    let removePrev = document.querySelectorAll(".answerOption");

    if (removePrev.length > 0) {
        removePrev.forEach((button) => {
            button.style.display = "none";
        });
    }

    questDiv.innerHTML = questions[questionNum].title;

    questions[questionNum].answers.forEach((answer) => {
        // create element button for each possible answer
        const ansBtn = document.createElement("button");

        ansBtn.textContent = answer;
        ansBtn.setAttribute("value", answer);
        ansBtn.setAttribute("class", "answerOption");
        ansBtn.setAttribute("data-attr", questionNum);
        ansDiv.appendChild(ansBtn);
        ansBtn.onclick = ansClick;
    });
}

// function for answer clicking
function ansClick() {
    let chosen = this.value;
    let questionNum = parseInt(this.getAttribute("data-attr"));

    if (questions[questionNum].correct === chosen) {
        alert("You got it right!");
        correctChoices++;
    } else {
        alert("You got it wrong.");
        // subtract from timer
        timerCount = timerCount - 3;
    }

    if (questionNum + 1 < questions.length) {
        questionNum++;
        questionInit(questionNum);
    } else {
        gameOver === true;
        handleUserScore();
        checkPlayAgain();
    }
}

// function to save high score
function handleUserScore() {
    let userScore = timerCount * correctChoices;
    let userIdent = "";
    let userResult = {};

    if (highScores.length < highScoreMaxIndex + 1 || userScore > highScores[highScoreMaxIndex].score) {
        userIdent = prompt("You got a High Score! Enter Your Initals");
        userResult = {
            score: userScore,
            identity: userIdent,
        };

        highScores.push(userResult);

        console.log(highScores);

        highScores.sort(function (a, b) {
            let scoreA = a.score;
            let scoreB = b.score;

            if (scoreA < scoreB) {
                return 1;
            } else if (scoreA > scoreB) {
                return -1;
            } else {
                return 0;
            }
        });
    }

    if (highScores.length > highScoreMaxIndex + 1) {
        highScores.pop();
    }

    console.log(highScores);
    localStorage.setItem("highScoreList", JSON.stringify(highScores));
}

function checkPlayAgain() {
    let playAgain = confirm("Would you like to play again?");

    if (playAgain === true) {
        location.reload();
    } else {
        startBtn.remove();
        timerDiv.remove();
        questDiv.remove();
        ansDiv.remove();
        quizTitle.textContent = "HIGH SCORES";

        let scoreTable = document.createElement("table");
        highScoreDiv.appendChild(scoreTable);

        highScores.forEach((obj) => {
            let scoreRow = document.createElement("tr");
            let scoreValue = document.createElement("td");
            let scoreIdentity = document.createElement("td");

            scoreValue.textContent = obj.score;
            scoreIdentity.textContent = obj.identity;

            scoreTable.appendChild(scoreRow);
            scoreRow.appendChild(scoreValue);
            scoreRow.appendChild(scoreIdentity);
        });
    }
}

// function for timer
function timerStart() {
    let timer = setInterval(function () {
        if (timerCount <= 1 || gameOver === true) {
            clearInterval(timer);
        }

        timerCount--;
        timerDiv.textContent = timerCount;
    }, 1000);
}

//  page init
startBtn.addEventListener("click", gameStart);
