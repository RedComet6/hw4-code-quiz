// assigns the html elements to const
const quizTitle = document.querySelector("#quizTitle");
const startBtn = document.querySelector("#start");
const timerDiv = document.querySelector("#timer");
const questDiv = document.querySelector("#question");
const ansDiv = document.querySelector("#answers");
const highScoreDiv = document.querySelector("#highScores");
// array of questions for users to answer
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
// inital value to kick off quiz at first question always
const questionIndexInit = 0;
// the maximum number of users who can be stored on the high score list
const highScoreMaxIndex = 2;
// pulls the high scores out of the local storage, parsed for use as an array of objects
let highScores = JSON.parse(localStorage.getItem("highScoreList"));
// inital scoring values
let timerCount = 60;
let gameOver = false;
let correctChoices = 0;

// functions
// button activates this function to begin the quiz
function gameStart() {
    timerStart();
    questionInit(questionIndexInit);
}

// function to rearrange the page elements according to which question is active
function questionInit(questionNum) {
    // removes the buttons from previous question to make way for new question's buttons
    let removePrev = document.querySelectorAll(".answerOption");
    if (removePrev.length > 0) {
        removePrev.forEach((button) => {
            button.style.display = "none";
        });
    }

    // sets the current question's text for user to read
    questDiv.innerHTML = questions[questionNum].title;
    // creates answers
    questions[questionNum].answers.forEach((answer) => {
        // creats button for each possible answer
        const ansBtn = document.createElement("button");
        // displays text for each answer in button, applies attributes, appends to answer <div>, adds click event listener
        ansBtn.textContent = answer;
        ansBtn.setAttribute("value", answer);
        ansBtn.setAttribute("class", "answerOption btn btn-secondary p-3 m-3");
        ansBtn.setAttribute("data-attr", questionNum);
        ansDiv.appendChild(ansBtn);
        ansBtn.onclick = ansClick;
    });
}

// function to handle user clicking an answer button
function ansClick() {
    // assign variables to button's information
    let chosen = this.value;
    let questionNum = parseInt(this.getAttribute("data-attr"));

    // checks if the correct answer was chosen
    if (questions[questionNum].correct === chosen) {
        alert("You got it right!");
        // increment variable used in scoring
        correctChoices++;
    } else {
        alert("You got it wrong.");
        // subtract from timer
        timerCount = timerCount - 3;
    }

    // checks where the user is in the quiz, if questions are remaining, moves to next question
    if (questionNum + 1 < questions.length) {
        questionNum++;
        questionInit(questionNum);
    } else {
        // if no questions remain, game is over and related endgame functions called
        gameOver === true;
        handleUserScore();
        checkPlayAgain();
    }
}

// function to handle high scores
function handleUserScore() {
    // scoring logic to determine how well user has done
    let userScore = timerCount * correctChoices;
    // initialize user identity and result object
    let userIdent = "";
    let userResult = {};

    // checks high score viability; adds high score if the high score board is not full OR if user score is higher than the lowest score on the board
    if (highScores.length < highScoreMaxIndex + 1 || userScore > highScores[highScoreMaxIndex].score) {
        userIdent = prompt("You got a High Score! Enter Your Initals");
        // object to pass into storage
        userResult = {
            score: userScore,
            identity: userIdent,
        };
        // adds new high score into high score array
        highScores.push(userResult);
        // sorts the high score array from highest score in index 0 to lowest score in index final
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

    // if the newly added high score makes the array longer than the max length, remove the lowest score on the board after being sorted
    if (highScores.length > highScoreMaxIndex + 1) {
        highScores.pop();
    }

    // sends the high scores to local storage
    localStorage.setItem("highScoreList", JSON.stringify(highScores));
}

// function to handle user choosing to play again or not
function checkPlayAgain() {
    // ask user what they wish to do
    let playAgain = confirm("Would you like to play again?");

    // if user wants to play again, reload the page to initial setup
    if (playAgain === true) {
        location.reload();
    } else {
        // if user does not want to play again, clear all question related elements and display high score board
        startBtn.remove();
        timerDiv.remove();
        questDiv.remove();
        ansDiv.remove();
        quizTitle.textContent = "HIGH SCORES";

        // creates a table element, assigns to variable, assigns attributes, appends to high score <div>
        let scoreTable = document.createElement("table");
        scoreTable.setAttribute("class", "border col-3 table");
        highScoreDiv.appendChild(scoreTable);

        // for each high score, add a row to the board that has an element for the score and an element for the identity
        highScores.forEach((obj) => {
            let scoreRow = document.createElement("tr");
            let scoreValue = document.createElement("td");
            let scoreIdentity = document.createElement("td");

            // sets content of table cells and applies attributes
            scoreValue.textContent = obj.score;
            scoreIdentity.textContent = obj.identity;
            scoreValue.setAttribute("class", "text-center");
            scoreIdentity.setAttribute("class", "text-center");

            // appends to the table in the high score <div>
            scoreTable.appendChild(scoreRow);
            scoreRow.appendChild(scoreValue);
            scoreRow.appendChild(scoreIdentity);
        });
    }
}

// function for keeping time
function timerStart() {
    let timer = setInterval(function () {
        if (timerCount <= 1 || gameOver === true) {
            clearInterval(timer);
        }

        timerCount--;
        timerDiv.textContent = `Time Remaining: ${timerCount}`;
    }, 1000);
}

//  page initial setup
startBtn.addEventListener("click", gameStart);
