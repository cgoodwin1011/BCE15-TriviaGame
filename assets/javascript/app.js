var aQuestion = {
    question: "0, what is 2 * 5?",
    A: "12",
    B: "9",
    C: "15",
    D: "10",
    correctAnswer: "D",
}

var bQuestion = {
    question: "1, what is 7 - 8?",
    A: "-2",
    B: "1",
    C: "-1",
    D: "0",
    correctAnswer: "C",
}

var cQuestion = {
    question: "2, what is 16/8?",
    A: "-2",
    B: "2",
    C: "-1",
    D: "0",
    correctAnswer: "B",
}


var dQuestion = {
    question: "3, click button A",
    A: "click here",
    B: "not here",
    C: "nor here",
    D: "not this......<br>....",
    correctAnswer: "A",
}


var eQuestion = {
    question: "4, what is 16 % 5?",
    A: "-2",
    B: "1",
    C: "-1",
    D: "0",
    correctAnswer: "B",
}

var sampleQuestions = [aQuestion, bQuestion, cQuestion, dQuestion, eQuestion]

var samplePlayer = {
    playerScore: 0,
    playerAnswers: [],
}

var questionTime = 5;
var showAnswerTime = 3;
var myClock;

function Question(newQuestion, ans1, ans2, ans3, ans4, correctAns){
    this.question = newQuestion;
    this.A = ans1;
    this.B = ans2;
    this.C = ans3;
    this.D = ans4;
    this.correctAnswer = correctAns;

}

function isAnswerCorrect(currentQuestion, whichButtonClicked) {
    if (whichButtonClicked == currentQuestion.correctAnswer) {
        return true;
    } else {
        return false;
    }
}


function displayQuestion(thisQuestion) {
    $("#question").html(thisQuestion.question);
    $("#answerA").html(thisQuestion.A);
    $("#answerB").html(thisQuestion.B);
    $("#answerC").html(thisQuestion.C);
    $("#answerD").html(thisQuestion.D);
    $("#correctAnswer").html(thisQuestion.correctAns);
}

function nextQExist(arrayOfQuestions, index) {
    if (index < arrayOfQuestions.length-1) {
        return true;
    } else {
        return false;
    }
}

function showCorrectAnswer(inputQuestion, questionId) {
        answerWas = inputQuestion.correctAnswer;
        $("#theAnswer").html("You chose "+questionId+".<br>You're right!<br>The correct answer was "+ answerWas+"<br>");
        $("#theAnswer").append(inputQuestion[answerWas]);
}


function dimAnsButtons() {
    $("#answer-1-btn").prop("disabled", true);
    $("#answer-2-btn").prop("disabled", true);
    $("#answer-3-btn").prop("disabled", true);
    $("#answer-4-btn").prop("disabled", true);
}

function undimAnsButtons() {
    $("#answer-1-btn").prop("disabled", false);
    $("#answer-2-btn").prop("disabled", false);
    $("#answer-3-btn").prop("disabled", false);
    $("#answer-4-btn").prop("disabled", false);
}

function quit() {
    console.log("quitting");
    clearTimeout(myClock);
    $("#theAnswer").html("<h2>Good Bye!</h2>")
    //display score... play again
}


function doneGame() {
    clearTimeout(myClock);
    $("#theAnswer").html("<h1>Game Over!</h1>");
}

function resetAfterAnswer(thisArrayOfQuestions, index, player) {
    if (index == thisArrayOfQuestions.length-1) {
        doneGame();
    } else {
        var subClock = setTimeout( function() {
            $("#theAnswer").html("Answer Will Display Here");
            undimAnsButtons();
            clearTimeout(myClock);
            if (index < thisArrayOfQuestions.length-1) {
                askQuestions(thisArrayOfQuestions, index+1, player);
            }
        }, showAnswerTime*1000);
    }
}

function youreRight(theQuestion, letter) {
    var answerWasThis = theQuestion.correctAnswer;
    $("#theAnswer").html("You chose "+letter+"<br>You're right!");
}

function youreWrong(theQuestion, letter) {
    var answerShouldBe = theQuestion.correctAnswer;
    $("#theAnswer").html("You chose "+letter+"<br>You're Wrong, Dude!<br>");
    $("#theAnswer").append("<span style='color: red'>The right answer is "+answerShouldBe+"</span>");
}

function outOfTime(inputQuestion) {
    var answerShouldBe = inputQuestion.correctAnswer;
    answerWas = inputQuestion.correctAnswer;
    $("#theAnswer").html("You made no choice.<br>The correct answer was "+answerWas+"<br>");
    $("#theAnswer").append("<span style='color: red'>The right answer is "+answerShouldBe+"</span>");
}

// function runCountDownTimer() {
//     var counting = 0;
//     var countingDown = setTimeout( function() {
//         if ((questionTime - counting) >= 0) {
//             $("#timer").text(questionTime - counting);
//             counting++;
//         } else {
//             clearInterval(countingDown);
//         }
//     }, questionTime*1000);
//     return
// }

function runCountDownTimer() {
    var counting = 0;
    console.log("in countdown timer")
    while(questionTime - counting >= 0) {
        console.log("in while loop")
        var countingDown = setTimeout( function() {
            if ((questionTime - counting) >= 0) {
                $("#timer").text(questionTime - counting);
                counting++;
            } else {
                clearInterval(countingDown);
            }
            console.log("count down timer running")
        }, 1000);
    }
    return
}

function askQuestions(thisArrayOfQuestions, index, player) {
    noAnswer = true;
    
    runCountDownTimer();
    myClock = setTimeout(function() {
        if (index < thisArrayOfQuestions.length-1) {
            outOfTime(thisArrayOfQuestions[index]);
            resetAfterAnswer(thisArrayOfQuestions, index, player);
        } else {
            outOfTime(thisArrayOfQuestions[index]);
            doneGame();
            // resetAfterAnswer(thisArrayOfQuestions, index, player);
        }
    }, 2000);

    // display the question, a function call!
    displayQuestion(thisArrayOfQuestions[index]);

    $("#quit-btn").on("click", function () {
        clearTimeout(myClock);
        quit();
    })

    $("#play-btn").on("click", function() {
        console.log("clicked play");
        clearTimeout(myClock);
        if (index < thisArrayOfQuestions.length-1) {
            outOfTime(thisArrayOfQuestions[index]);
            resetAfterAnswer(thisArrayOfQuestions, index, player);
        } else {
            outOfTime(thisArrayOfQuestions[index]);
            doneGame();
        }
    });

    $("#answer-1-btn").on("click", function() {
        clearTimeout(myClock);
        dimAnsButtons();
        if (isAnswerCorrect(thisArrayOfQuestions[index], "A")) {
            youreRight(thisArrayOfQuestions[index], "A");
        } else {
            youreWrong(thisArrayOfQuestions[index], "A")
        };
        resetAfterAnswer(thisArrayOfQuestions, index, player);
    })

    $("#answer-2-btn").on("click", function() {
        console.log("clicked B");
        clearTimeout(myClock);
        dimAnsButtons();
            if (isAnswerCorrect(thisArrayOfQuestions[index], "B")) {
                youreRight(thisArrayOfQuestions[index], "B");
            } else {
                youreWrong(thisArrayOfQuestions[index], "B")
        };
        resetAfterAnswer(thisArrayOfQuestions, index, player);
    })

    $("#answer-3-btn").on("click", function() {
            console.log("clicked C");
        clearTimeout(myClock);
        dimAnsButtons();
        if (isAnswerCorrect(thisArrayOfQuestions[index], "C")) {
            youreRight(thisArrayOfQuestions[index], "C");
        } else {
            youreWrong(thisArrayOfQuestions[index], "C")
        };
        resetAfterAnswer(thisArrayOfQuestions, index, player);
    })

    $("#answer-4-btn").on("click", function() {
        console.log("clicked D");
        clearTimeout(myClock);
        dimAnsButtons();
        if (isAnswerCorrect(thisArrayOfQuestions[index], "D")) {
            youreRight(thisArrayOfQuestions[index], "D");
        } else {
            youreWrong(thisArrayOfQuestions[index], "D")
        };
        resetAfterAnswer(thisArrayOfQuestions, index, player);
    })
}

function playGame(sampleQuestionArr, aPlayer) {
    var i = 0;

    // start button set up
    dimAnsButtons();
    $("#play-btn").on("click", function() {
        undimAnsButtons();
        $("#play-lbl").text("Next");
        askQuestions(sampleQuestionArr, i, aPlayer);
    });
    $("#quit-btn").on("click", function() {

    });

}