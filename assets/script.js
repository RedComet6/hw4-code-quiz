const startBtn = document.getElementById("start");
const questDiv = document.getElementById("question");
const ansDiv = document.getElementById("answers");
const questions = [
    {
        title: "xxx",
        answers: ["x", "y", "z", "w"],
        correct: "x",
    },
];

// functions
function gameStart() {
    alert("game has begun");
    questDiv.innerHTML = questions[0].title;
    // create element button and append button to the answers div
    ansDiv.innerHTML = questions[0].answers;
}

// function for answer clicking

// function to end game

// function to save high score

//  init
startBtn.addEventListener("click", gameStart);
