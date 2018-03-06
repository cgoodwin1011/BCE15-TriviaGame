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
    playerRight: 0,
    playerWrong: 0,
    playerAnswers: [],
    rightAnswers: [],
}

var questionTime = 10;
var showAnswerTime = 1;
var myClock;

function makeQuestion(newQuestion, ans1, ans2, ans3, ans4, correctAns){
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

// function showCorrectAnswer(inputQuestion, questionId) {
//         answerWas = inputQuestion.correctAnswer;
//         $("#theAnswer").html("You chose "+questionId+".<br>You're right!<br>The correct answer was "+ answerWas+"<br>");
//         $("#theAnswer").append(inputQuestion[answerWas]);
// }

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

function dimQuit() {
    $("#quit-btn").prop("disabled", true);
}

function undimQuit() {
    $("#quit-btn").prop("disabled", false);
}


function dimAllButtons() {
    dimAnsButtons();
    $("#play-btn").prop("disabled", true);
    $("#quit-btn").prop("disabled", true);
}

function undimAllButtons() {
    undimAnsButtons();
    $("#play-btn").prop("disabled", false);
    $("#quit-btn").prop("disabled", false);
}

function quit() {
    for (i=0; i<10000; i++) {};
    if (confirm("Do you really want to quit?")) {
        doneGame();
    } 
    //display score...  resume game
}

function doneGame() {
    dimAnsButtons();
    dimQuit();
    clearTimeout(myClock);
    clearInterval(counter);
    $("#theAnswer").html("<h1>Game Over!</h1>");
    $("#theAnswer").append("<h1>Good Bye!</h1>")
}

function resetAfterAnswer(thisArrayOfQuestions, index, player) {
    if (index == thisArrayOfQuestions.length-1) {
        // timed display of answer  during game end
        var subClock = setTimeout(function() {
            doneGame();
        }, showAnswerTime*1000);
        doneGame();
    } else {
        var subClock = setTimeout( function() {
            if (index < thisArrayOfQuestions.length-1) {
                $("#theAnswer").html("Answer Will Display Here");
                undimAnsButtons();
                clearTimeout(myClock);
                clearInterval(counter);
                remainingTime = questionTime;
                askQuestions(thisArrayOfQuestions, index+1, player);
            } else {

            }
        }, showAnswerTime*1000);
    }
}

function updatePlayer(updQuestion, curLetter, wasRight, thePlayer = 'samplePlayer') {
    thePlayer.playerAnswers[thePlayer.playerAnswers.length] = curLetter;
    if (wasRight) {
        thePlayer.playerScore++;
        thePlayer.playerRight++;
        thePlayer.rightAnswers[thePlayer.playerAnswers.length] = curLetter;
    } else {
        var answerShouldBe = updQuestion.correctAnswer;
        thePlayer.playerScore--;
        thePlayer.playerWrong++;
        thePlayer.rightAnswers[thePlayer.playerAnswers.length] = answerShouldBe;
    }
}

function displayPlayerStats(thePlayer) {

}

function youreRight(theQuestion, letter) {
    var answerWasThis = theQuestion.correctAnswer;
    $("#theAnswer").html("<h2>You chose "+letter+"<br>You're right!</h2>");
    updatePlayer(theQuestion, letter, true, samplePlayer);
}

function youreWrong(theQuestion, letter) {
    var answerShouldBe = theQuestion.correctAnswer;
    $("#theAnswer").html("<h2>You chose "+letter+"</h2><br><h1>You're Wrong, Dude!</h1><br>");
    $("#theAnswer").append("<h1><span style='color: red'>The right answer is "+answerShouldBe+"</span></h1>");
    updatePlayer(theQuestion, letter, false, samplePlayer);
}

function outOfTime(inputQuestion) {
    var answerShouldBe = inputQuestion.correctAnswer;
    answerWas = inputQuestion.correctAnswer;
    $("#theAnswer").html("You made no choice.<br>The correct answer was "+answerWas+"<br>");
    $("#theAnswer").append("<span style='color: red'>The right answer is "+answerShouldBe+"</span>");
    updatePlayer(inputQuestion, ' ', false, samplePlayer);
}

var remainingTime = questionTime;
var counter

function askQuestions(thisArrayOfQuestions, index, player) {
    // display timer
    var theCount = questionTime;
    counter = setInterval( function() {
        if (theCount <= 0)
        {
            clearInterval(counter);
            remainingTime = questionTime;
            $("#timer").text(0);
            return;
        }
        $("#timer").text(theCount);
        theCount--;
    }, 1000);
    
    // question timer
    myClock = setTimeout(function() {
        outOfTime(thisArrayOfQuestions[index]);
        if (index < thisArrayOfQuestions.length-1) {
            resetAfterAnswer(thisArrayOfQuestions, index, player);
        } else {
            resetAfterAnswer(thisArrayOfQuestions, index, player);
            doneGame();
        }
    }, questionTime*1000);

    // display the question, a function call!
    displayQuestion(thisArrayOfQuestions[index]);

    $("#quit-btn").on("click", function () {
        clearTimeout(myClock);
        clearInterval(counter);
        remainingTime = questionTime;
        quit();
    })

    $("#play-btn").on("click", function() {
        clearTimeout(myClock);
        clearInterval(counter);
        if (index < thisArrayOfQuestions.length-1) {
            // outOfTime(thisArrayOfQuestions[index]);
            resetAfterAnswer(thisArrayOfQuestions, index, player);
        } else {
            // outOfTime(thisArrayOfQuestions[index]);
            doneGame();
        }
    });

    $("#answer-1-btn").on("click", function() {
        clearTimeout(myClock);
        clearInterval(counter);
        remainingTime = questionTime;
        dimAnsButtons();
        if (isAnswerCorrect(thisArrayOfQuestions[index], "A")) {
            youreRight(thisArrayOfQuestions[index], "A");
        } else {
            youreWrong(thisArrayOfQuestions[index], "A")
        };
        resetAfterAnswer(thisArrayOfQuestions, index, player);
    })

    $("#answer-2-btn").on("click", function() {
        clearTimeout(myClock);
        clearInterval(counter);
        remainingTime = questionTime;
        dimAnsButtons();
            if (isAnswerCorrect(thisArrayOfQuestions[index], "B")) {
                youreRight(thisArrayOfQuestions[index], "B");
            } else {
                youreWrong(thisArrayOfQuestions[index], "B")
        };
        resetAfterAnswer(thisArrayOfQuestions, index, player);
    })

    $("#answer-3-btn").on("click", function() {
        clearTimeout(myClock);
        clearInterval(counter);
        remainingTime = questionTime;
        dimAnsButtons();
        if (isAnswerCorrect(thisArrayOfQuestions[index], "C")) {
            youreRight(thisArrayOfQuestions[index], "C");
        } else {
            youreWrong(thisArrayOfQuestions[index], "C")
        };
        resetAfterAnswer(thisArrayOfQuestions, index, player);
    })

    $("#answer-4-btn").on("click", function() {
        clearTimeout(myClock);
        clearInterval(counter);
        remainingTime = questionTime;
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
    dimQuit();
    $("#timer-display").hide();
    $("#question").hide();
    $("#play-btn").on("click", function() {
        $("#instructions-to-player").hide();
        $("#timer-display").show();
        undimAnsButtons();
        undimQuit();
        $("#question").show();
        $("#play-lbl").text("Next");
        // remainingTime = questionTime;
        askQuestions(sampleQuestionArr, i, aPlayer);
    });

}

