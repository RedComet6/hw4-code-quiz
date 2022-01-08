const startBtn = document.querySelector("#start");
const timerDiv = document.querySelector("#timer");
const questDiv = document.querySelector("#question");
const ansDiv = document.querySelector("#answers");
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
let timerCount = 20;
let gameOver = false;
let correctChoices = 0;

// functions
function gameStart() {
    timerStart();
    questionInit(0);
}

function questionInit(questionNum) {
    // let correct = questions[questionNum].correct;
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
    }
    console.log(chosen);
    console.log(questionNum);
    if (questionNum + 1 < questions.length) {
        questionInit(questionNum + 1);
    } else {
        gameOver = true;
        endGame();
    }
}
// function to end game
function endGame() {
    alert("End of game!");
    console.log(timerCount);
    console.log(correctChoices);
}

// function to save high score

// function for timer
function timerStart() {
    timer = setInterval(function () {
        timerCount--;
        timerDiv.textContent = timerCount;
        // if (timerCount > 0) {
        //     if (gameOver === true && timerCount > 0) {
        //         clearInterval(timer);
        //     }
        // }

        if (timerCount === 0 || gameOver === true) {
            clearInterval(timer);
        }
    }, 1000);
}
//  page init
startBtn.addEventListener("click", gameStart);
