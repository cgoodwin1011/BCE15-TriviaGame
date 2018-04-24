var aQuestion = {
    question: "0, what is 2 * 5?",
    answer1: "12",
    answer2: "9",
    answer3: "15",
    answer4: "10",
    correctAnswer: "answer4",
}

var bQuestion = {
    question: "1, what is 7 - 8?",
    answer1: "-2",
    answer2: "1",
    answer3: "-1",
    answer4: "0",
    correctAnswer: "answer3",
}

var cQuestion = {
    question: "2, what is 16/8?",
    answer1: "-2",
    answer2: "2",
    answer3: "-1",
    answer4: "0",
    correctAnswer: "answer2",
}


var dQuestion = {
    question: "3, click button A",
    answer1: "click here",
    answer2: "not here",
    answer3: "nor here",
    answer4: "not this......<br>.......\n........",
    correctAnswer: "answer1",
}


var eQuestion = {
    question: "3, what is 16 % 5?",
    answer1: "-2",
    answer2: "1",
    answer3: "-1",
    answer4: "0",
    correctAnswer: "answer2",
}

var sampleQuestions = [aQuestion, bQuestion, cQuestion, dQuestion, eQuestion]

var samplePlayer = {
    playerScore: 0,
    playerAnswers: [],
}

var questionTime = 5;
var showAnswerTime = 3000;

var myClock;

function Question(newQuestion, ans1, ans2, ans3, ans4, correctAns){
    this.question = newQuestion;
    this.answer1 = ans1;
    this.answer2 = ans2;
    this.answer3 = ans3;
    this.correctAnswer = correctAns;
    this.answer4 = ans4;
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
    $("#answer1").html(thisQuestion.answer1);
    $("#answer2").html(thisQuestion.answer2);
    $("#answer3").html(thisQuestion.answer3);
    $("#answer4").html(thisQuestion.answer4);
    $("#correctAnswer").html(thisQuestion.correctAns);
}

function runCountDownTimer() {
    var counting = 0;
    var countingDown = setInterval( function() {
        if ((questionTime - counting) >= 0) {
            $("#timer").text(questionTime - counting);
            counting++;
        } else {
            clearInterval(countingDown);
        }

    }, 1000)
    return countingDown
}

function getAnswerClick() {
    console.log("get answer")

    $("#answer-1-btn").on("click", function() {
        return "answer1";
    });

    $("#answer-2-btn").on("click", function() {
    return "answer2";
    });

    $("#answer-3-btn").on("click", function() {
        return "answer3";
    });

    $("#answer-4-btn").on("click", function() {
        return "answer4";
    });
}

function nextQExist(arrayOfQuestions, index) {
    if (index < arrayOfQuestions.length-1) {
        return true;
    } else {
        return false;
    }
}

function evalUserChoice(anArrayOfQuestions, index, userChoice) {
    rightAnswer = false;
    console.log("act called")
    switch(userChoice) {
        case "quit-btn":
            console.log("clicked quit")
            clearInterval(timerCountDown);
            clearTimeout(answerCountDown);
        case "play":
            console.log("clicked play")
            //reset game
        default:
            if(isAnswerCorrect(anArrayOfQuestions[index], userChoice)) {
                rightAnswer = true;
            } else {
                rightAnswer = false;
            }
    }
}

function actOnUserChoice(anArrayOfQuestions, index, userChoice) {

    if (rightAnswer) {
        console.log("clicked right answer")
        //clear times
        // adjust score
        // start answer view timer
            // call next question is there is one.
            // else show game score
        // show answer
        // show success message
        //
    } else { // wrong answer
        console.log("clicked wrong answer")
        //clear times
        // adjust score
        // start answer view timer
            // call next question is there is one.
            // else show game score
        // show answer
        // show failure message
        //
    }
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    console.log("sleeping now")

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
    console.log("waking up")
}

function outOfTime(inputQuestion) {
    answerWas = inputQuestion.correctAnswer;
    $("#theAnswer").html("You made no choice.<br>The correct answer was "+answerWas+"<br>");
    $("#theAnswer").append(inputQuestion[answerWas]);

}

function showCorrectAnswer(inputQuestion, questionId) {
        answerWas = inputQuestion.correctAnswer;
        $("#theAnswer").html("You chose "+questionId+".<br>You're right!<br>The correct answer was "+ answerWas+"<br>");
        $("#theAnswer").append(inputQuestion[answerWas]);
}



function askQuestions(thisArrayOfQuestions, index, player) {
    noAnswer = true;

    function resetAfterAnswer(curQ, numQ) {
        var subClock = setTimeout( function() {
            $("#theAnswer").html("Answer Will Display Here");
            if (curQ < numQ) {
                askQuestions(thisArrayOfQuestions, index+1, player);
            } else {
                //doneGame
            }
            $("#theAnswer").html("Answer Will Display Here");
        }, showAnswerTime);
    }



    myClock = setTimeout(function() {
        if (index < thisArrayOfQuestions.length-1) {
            outOfTime(thisArrayOfQuestions[index]);
            resetAfterAnswer(index, thisArrayOfQuestions.length)
        } else {
            outOfTime(thisArrayOfQuestions[index]);
        }
    }, 5000);

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
            askQuestions(thisArrayOfQuestions, index+1, player);
        } else {
            //done quiz
        }
    });


    $("#answer-1-btn").on("click", function() {
        clearTimeout(myClock);
        if (isAnswerCorrect(thisArrayOfQuestions[index], "answer1")) {
            answerWas = thisArrayOfQuestions[index].correctAnswer;
            $("#theAnswer").html("You chose A.<br>You're right!<br>The correct answer was "+ answerWas+"<br>");
        } else {
            answerWas = thisArrayOfQuestions[index].correctAnswer;
            $("#theAnswer").append(thisArrayOfQuestions[index][answerWas]);
            $("#theAnswer").html("You chose A.<br/>Wrong Answer, Dude!<br/>The correct answer was "+answerWas+"<br>");
        };
        resetAfterAnswer(index, thisArrayOfQuestions.length)
    })

    $("#answer-2-btn").on("click", function() {
        console.log("clicked B");
        clearTimeout(myClock);
        if (isAnswerCorrect(thisArrayOfQuestions[index], "answer2")) {
            answerWas = thisArrayOfQuestions[index].correctAnswer;
            $("#theAnswer").html("You chose B.<br>You're right!<br>The correct answer was "+ answerWas+"<br>");
            var subClock = setTimeout( function() {
                $("#theAnswer").html("Answer Will Display Here");
                if (index < thisArrayOfQuestions.length-1) {
                    askQuestions(thisArrayOfQuestions, index+1, player);
                } else {
                    //doneGame
                }
                $("#theAnswer").html("Answer Will Display Here");
            }, showAnswerTime);
        } else {
            answerWas = thisArrayOfQuestions[index].correctAnswer;
            $("#theAnswer").append(thisArrayOfQuestions[index][answerWas]);
            $("#theAnswer").html("You chose B.<br/>Wrong Answer, Dude!<br/>The correct answer was "+answerWas+"<br>");
            var subClock = setTimeout( function() {
                $("#theAnswer").html("Answer Will Display Here");
                if (index < thisArrayOfQuestions.length-1) {
                    askQuestions(thisArrayOfQuestions, index+1, player);
                } else {
                    //doneGame
                }
                $("#theAnswer").html("Answer Will Display Here");
            }, showAnswerTime)
        };
    })

    $("#answer-3-btn").on("click", function() {
        console.log("clicked C");
        clearTimeout(myClock);
        if (isAnswerCorrect(thisArrayOfQuestions[index], "answer3")) {
            answerWas = thisArrayOfQuestions[index].correctAnswer;
            $("#theAnswer").html("You chose C.<br>You're right!<br>The correct answer was "+ answerWas+"<br>");
            var subClock = setTimeout( function() {
                $("#theAnswer").html("Answer Will Display Here");
                if (index < thisArrayOfQuestions.length-1) {
                    askQuestions(thisArrayOfQuestions, index+1, player);
                } else {
                    //doneGame
                }
                $("#theAnswer").html("Answer Will Display Here");
            }, showAnswerTime);
        } else {
            answerWas = thisArrayOfQuestions[index].correctAnswer;
            $("#theAnswer").append(thisArrayOfQuestions[index][answerWas]);
            $("#theAnswer").html("You chose C.<br/>Wrong Answer, Dude!<br/>The correct answer was "+answerWas+"<br>");
            var subClock = setTimeout( function() {
                $("#theAnswer").html("Answer Will Display Here");
                if (index < thisArrayOfQuestions.length-1) {
                    askQuestions(thisArrayOfQuestions, index+1, player);
                } else {
                    //doneGame
                }
                $("#theAnswer").html("Answer Will Display Here");
            }, showAnswerTime)
        };
    })

    $("#answer-4-btn").on("click", function() {
        console.log("clicked D");
        clearTimeout(myClock);
        if (isAnswerCorrect(thisArrayOfQuestions[index], "answer4")) {
            answerWas = thisArrayOfQuestions[index].correctAnswer;
            $("#theAnswer").html("You chose D.<br>You're right!<br>The correct answer was "+ answerWas+"<br>");
            var subClock = setTimeout( function() {
                $("#theAnswer").html("Answer Will Display Here");
                if (index < thisArrayOfQuestions.length-1) {
                    askQuestions(thisArrayOfQuestions, index+1, player);
                } else {
                    //doneGame
                }
                $("#theAnswer").html("Answer Will Display Here");
            }, showAnswerTime);
        } else {
            answerWas = thisArrayOfQuestions[index].correctAnswer;
            $("#theAnswer").append(thisArrayOfQuestions[index][answerWas]);
            $("#theAnswer").html("You chose D.<br/>Wrong Answer, Dude!<br/>The correct answer was "+answerWas+"<br>");
            var subClock = setTimeout( function() {
                $("#theAnswer").html("Answer Will Display Here");
                if (index < thisArrayOfQuestions.length-1) {
                    askQuestions(thisArrayOfQuestions, index+1, player);
                } else {
                    //doneGame
                }
                $("#theAnswer").html("Answer Will Display Here");
            }, showAnswerTime)
        };
    })
}

function quit() {
    console.log("quitting");
    clearTimeout(myClock);
    //display score... play again
}


function doneGame() {
    clearTimeout(myClock);
    $("#theAnswer").html("Game Over!")
}


function playGame(sampleQuestionArr, aPlayer) {
    var i = 0;

    // need to get a start button set up

    askQuestions(sampleQuestionArr, i, aPlayer)


}
