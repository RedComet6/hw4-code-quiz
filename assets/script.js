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
];

// functions
function gameStart() {
    questDiv.innerHTML = questions[0].title;

    questions[0].answers.forEach((answer) => {
        // create element button for each possible answer
        const ansBtn = document.createElement("button");

        ansBtn.textContent = answer;
        ansBtn.setAttribute("value", answer);
        ansDiv.appendChild(ansBtn);
        ansBtn.onclick = ansClick;
    });
}

// function for answer clicking
function ansClick() {
    alert("BLAM-O");
    // check for correct
    // timer
    // display next
}
// function to end game

// function to save high score

// function for timer

//  init
startBtn.addEventListener("click", gameStart);
