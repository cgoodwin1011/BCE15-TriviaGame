var aQuestion = {
    question: "What is 2 * 5?",
    A: "12",
    B: "9",
    C: "15",
    D: "10",
    correctAnswer: "D",
    explainer: "2 x 5 = 10",
}

var bQuestion = {
    question: "What is 7 - 8?",
    A: "-2",
    B: "1",
    C: "-1",
    D: "0",
    correctAnswer: "C",
    explainer: "7- 8 = -1",
}

var cQuestion = {
    question: "What is 16/8?",
    A: "-2",
    B: "2",
    C: "-1",
    D: "0",
    correctAnswer: "B",
    explainer: "16/8 = 2",
}

var dQuestion = {
    question: "Click button A",
    A: "click here",
    B: "not here",
    C: "nor here",
    D: "not this......<br>....",
    correctAnswer: "A",
    explainer: "It said click button A",
}

var eQuestion = {
    question: "What is 16 % 5?",
    A: "-2",
    B: "1",
    C: "-1",
    D: "0",
    correctAnswer: "B",
    explainer: "The remainder of 5 into 16 is 1",
}

var sampleQuestions = [aQuestion, bQuestion, cQuestion, dQuestion, eQuestion]


var questionTime = 10;
var showAnswerTime = 1;
var myClockGlobal;
var myCounterGlobal;

function makeQuestion(newQuestion, ans1, ans2, ans3, ans4, correctAns){
    this.question = newQuestion;
    this.A = ans1;
    this.B = ans2;
    this.C = ans3;
    this.D = ans4;
    this.correctAnswer = correctAns;
}

function isAnswerCorrect(currentQuestionArray, index, whichButtonClicked) {
    if (whichButtonClicked == currentQuestionArray[index].correctAnswer) {
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
    if (confirm("Do you really want to quit?")) {
        doneGame();
    } 
}

function doneGame() {
    dimAnsButtons();
    dimQuit();
    stopClock();
    $("#timer-display").hide();
    $("#instructions-to-player").show();
    $("#play-lbl").text("Play Again?");
    $("#theAnswer").html("<h1>Game Over!</h1>");
    $("#theAnswer").append("<h1>Good Bye!</h1>");
}

function resetAfterAnswer(thisArrayOfQuestions, index, player) {
    stopClock();
    if (nextQExist(thisArrayOfQuestions, index)) {
        var subClock = setTimeout( function() {
            $("#theAnswer").html("Answer Will Display Here");
            undimAnsButtons();
            askQuestions(thisArrayOfQuestions, index+1, player);
            // doneGame();
        }, showAnswerTime*1000);
        console.log("something wrong in resetAfterAnswer");
    } else {
        var subClock = setTimeout(function() {
            doneGame();
        }, showAnswerTime*1000);
    }
}

function showAnswer(thisArrayOfQuestions, index) {
    var answerShouldBe = thisArrayOfQuestions[index].correctAnswer;
    $("#theAnswer").append("<span style='color: red'>The right answer is "+answerShouldBe+"</span>");
}

function updatePlayer(updQuestion, curLetter, wasRight, thePlayer) {
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

function evalAnswer(thisArrayOfQuestions, index, letterChosen, somePlayer) {
    if (isAnswerCorrect(thisArrayOfQuestions, index, letterChosen)) {
        youreRight(thisArrayOfQuestions, index, letterChosen, somePlayer);
    } else {
        youreWrong(thisArrayOfQuestions, index, letterChosen, somePlayer);
    };
    // resetAfterAnswer(thisArrayOfQuestions, index, player);
}

function youreRight(theQuestions, index, letter, inPlayer) {
    console.log("right answer");
    var answerWasThis = theQuestions[index].correctAnswer;
    $("#theAnswer").html("<h2>You chose "+letter+"<br>You're right!</h2>");
    showAnswer(theQuestions, index)
    updatePlayer(theQuestions[index], letter, true, inPlayer);
}

function youreWrong(theQuestions, index, letter, inPlayer) {
    console.log("wrong answer");
    var answerShouldBe = theQuestions[index].correctAnswer;
    $("#theAnswer").html("<h2>You chose "+letter+"</h2><br><h1>You're Wrong, Dude!</h1><br>");
    showAnswer(theQuestions, index)
    updatePlayer(theQuestions[index], letter, false, inPlayer);
}

function outOfTime(inputQuestions, index, inPlayer) {
    console.log("no answer");
    var answerShouldBe = inputQuestions[index].correctAnswer;
    $("#theAnswer").html("You made no choice.<br>The correct answer was "+answerShouldBe+"<br>");
    showAnswer(inputQuestions, index);
    updatePlayer(inputQuestions, ' ', false, inPlayer);
}

function stopClock() {
    clearTimeout(myClockGlobal);
    clearInterval(myCounterGlobal);
}

function askQuestions(thisArrayOfQuestions, index, player) {
    // display timer
    var theCount = questionTime;
    myCounterGlobal = setInterval( function() {
        if (theCount <= 0)
        {
            clearInterval(myClockGlobal);
            // remainingTime = questionTime;
            $("#timer").text(0);
            return;
        }
        $("#timer").text(theCount);
        theCount--;
    }, 1000);

    myClockGlobal = setTimeout(function() {
        outOfTime(thisArrayOfQuestions, index, player);
        if (nextQExist(thisArrayOfQuestions, index)) {
            resetAfterAnswer(thisArrayOfQuestions, index, player);
        } else {
            resetAfterAnswer(thisArrayOfQuestions, index, player);
            doneGame();
        }
    }, questionTime*1000);

    // display the question, a function call!
    displayQuestion(thisArrayOfQuestions[index]);

    $("#quit-btn").on("click", function () {
        stopClock();
        quit();
    });

    $("#play-btn").on("click", function() {
        playBtnClick(thisArrayOfQuestions, index, player);
    });

    $("#answer-1-btn").on("click", function() {
        stopClock();
        dimAnsButtons();
        evalAnswer(thisArrayOfQuestions, index, "A", player);
        resetAfterAnswer(thisArrayOfQuestions, index, player);
    });

    $("#answer-2-btn").on("click", function() {
        stopClock();
        dimAnsButtons();
        evalAnswer(thisArrayOfQuestions, index, "B", player);
        resetAfterAnswer(thisArrayOfQuestions, index, player);
    });

    $("#answer-3-btn").on("click", function() {
        stopClock();
        dimAnsButtons();
        evalAnswer(thisArrayOfQuestions, index, "C", player);
        resetAfterAnswer(thisArrayOfQuestions, index, player);
    });

    $("#answer-4-btn").on("click", function() {
        stopClock();
        dimAnsButtons();
        evalAnswer(thisArrayOfQuestions, index, "D", player);
        resetAfterAnswer(thisArrayOfQuestions, index, player);
    });
}



function playBtnClick(arrayOfQuestions, index, aPlayer) {
    var btnStatus = $("#play-lbl").html();
    switch(btnStatus) {
        case "Play":
            index = 0;
            console.log("you clicked Play!");
            $("#instructions-to-player").hide();
            $("#timer-display").show();
            undimAnsButtons();
            undimQuit();
            $("#question").show();
            $("#play-lbl").text("Next");
            break;
        case "Next":
            console.log("you clicked Next!");
            stopClock();
            evalAnswer(arrayOfQuestions, index, " ", aPlayer);
            if (nextQExist(arrayOfQuestions, index)) {
                resetAfterAnswer(arrayOfQuestions, index, aPlayer);
            } else {
                doneGame();
            }
            break;
        case "Play Again?":
            location.reload();
            // $("body").html("<h1>Not Yet Implemented</h1>")
            break;
        default:
            console.log("something's not working in playBtnClick")
    }
}

function playGame(sampleQuestionArr, aPlayer) {
    var i = 0;

    // start button set up
    dimAnsButtons();
    dimQuit();
    $("#timer-display").hide();
    $("#question").hide();
    $("#play-btn").on("click", function() {
        playBtnClick(sampleQuestionArr, 0, aPlayer);
        askQuestions(sampleQuestionArr, 0, aPlayer);
    });

}

