const startBtn = document.getElementById("start");
const questDiv = document.getElementById("question");
const ansDiv = document.getElementById("answers");
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
        title: "Do you feel like you know me better now?",
        answers: ["Yee!", "Nah..."],
        correct: "Yee!",
    },
];

// functions
function gameStart() {
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
        console.log("made it");
    }
    console.log(chosen);
    console.log(questionNum);
    console.log(questions[questionNum].correct);
    if (questionNum + 1 < questions.length) {
        questionInit(questionNum + 1);
    }
}
// function to end game

// function to save high score

// function for timer

//  init
startBtn.addEventListener("click", gameStart);
