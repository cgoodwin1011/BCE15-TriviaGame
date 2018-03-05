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
    question: "3, what is 16 % 5?",
    answer1: "-2",
    answer2: "1",
    answer3: "-1",
    answer4: "0",
    correctAnswer: "answer2",
}

var sampleQuestions = [aQuestion, bQuestion, cQuestion, dQuestion]

var samplePlayer = {
    playerScore: 0,
    playerAnswers: [],
}

var questionTime = 5;


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


function askQuestions(thisArrayOfQuestions, index, player) {
    var questionPending = 0;
    var rightAnswer = false;
    var moreQs = nextQExist(thisArrayOfQuestions, index);
    console.log("moreQs? ", moreQs)

    displayQuestion(thisArrayOfQuestions[index], player);
    var timerCountDown = runCountDownTimer();
    
    evalUserChoice(thisArrayOfQuestions, index, getAnswerClick());
    // actOnUserChoice(thisArrayOfQuestions, index, getAnswerClick())
    
    console.log("did we get here?")

    $("#answer-1-btn").on("click", function() {
        console.log("clicked 1 btn")
    })


    var answerCountDown = setTimeout(function() {
        if(moreQs) {
            askQuestions(thisArrayOfQuestions, index+1);
        } else {
            //game over
        }

    }, (questionTime+1000))

}
function playGame(sampleQuestionArr, aPlayer) {
    var i = 0;

    // need to get a start button set up

    askQuestions(sampleQuestionArr, i, aPlayer)


}

//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------



// function runCountDownTimer() {
//     var answerCountDown = setTimeout( function() {
//         if (index < thisArrayOfQuestions.length - 1) {
//             askQuestions(thisArrayOfQuestions, index+1, player);
//         } else {
//             console.log("all done with questions");
//         }
//     }, (questionTime)*1000);
//     return answerCountDown;
// }


// var answerCountDown = setTimeout( function() {
//     if (index < thisArrayOfQuestions.length - 1) {
//         askQuestions(thisArrayOfQuestions, index+1, player);
//     } else {
//         console.log("all done with questions");
//     }
// }, (questionTime)*1000);
// return answerCountDown;



    // $("#answer-1-btn").on("click", function() {
    //     console.log("clicked 1");
    //     handleResponse(thisArrayOfQuestions[index], "answer1", player);

    // //     debugger;
    // //     clearTimeout(answerCountDown);
    // //     debugger;
    // //     clearInterval(timerCountDown);
    // //     debugger;
    // //     if (isAnswerCorrect(thisArrayOfQuestions[index], answer1)) {
    // //         player.playerScore++;
    // //         player.playerAnswers[player.playerAnswers.length] = currentQuestion.correctAnswer;
    // //         $("#theAnswer").css("background-color", "aqua").fadeIn().html("this is a successs message");
    // //         askQuestions(thisArrayOfQuestions, index+1, player)
    // //     };
    // });
    // $("#answer-2-btn").on("click", function() {
    //     // redrafting to match answer1....

    //     console.log("clicked 2");
    //     // handleResponse(thisArrayOfQuestions[index], "answer2", player);
    //     clearTimeout(answerCountDown);
    //     clearInterval(timerCountDown);
    //     askQuestions(thisArrayOfQuestions, index+1, player)
    //     if (isAnswerCorrect(thisArrayOfQuestions[index], answer1)) {
    //         player.playerScore++;
    //         player.playerAnswers[player.playerAnswers.length] = currentQuestion.correctAnswer;
    //         $("#theAnswer").css("background-color", "aqua").fadeIn().html("this is a successs message");
    //         askQuestions(thisArrayOfQuestions, index+1, player)
    //     };
    // });
    // $("#answer-3-btn").on("click", function() {
    //     console.log("clicked 3");
    //     // handleResponse(thisArrayOfQuestions[index], "answer3", player);
    //     clearTimeout(answerCountDown);
    //     clearInterval(timerCountDown);
    //     askQuestions(thisArrayOfQuestions, index, player);
    //     if (isAnswerCorrect(thisArrayOfQuestions[index], answer1)) {

    //         player.playerScore++;
    //         player.playerAnswers[player.playerAnswers.length] = currentQuestion.correctAnswer;
    //         $("#theAnswer").css("background-color", "aqua").fadeIn().html("this is a successs message");
    //         askQuestions(thisArrayOfQuestions, index+1, player)
    //     };
    // });
    // $("#answer-4-btn").on("click", function() {
    //     console.log("clicked 4");
    //     // handleResponse(thisArrayOfQuestions[index], "answer4", player);
    //     clearTimeout(answerCountDown);
    //     clearInterval(timerCountDown);
    //     askQuestions(thisArrayOfQuestions, index, player);
    //     if (isAnswerCorrect(thisArrayOfQuestions[index], answer1)) {
    //         player.playerScore++;
    //         player.playerAnswers[player.playerAnswers.length] = currentQuestion.correctAnswer;
    //         $("#theAnswer").css("background-color", "aqua").fadeIn().html("this is a successs message");
    //         askQuestions(thisArrayOfQuestions, index+1, player)
    //     };
    // });
// handles player response to game; always returns true; if there's no guess, does not return
// function handleResponse(currentQuestion, whichButtonClicked, player) {
    // clear(answerCountDown);
    // clear(timerCountDown);
    // if (isAnswerCorrect(currentQuestion, whichButtonClicked)) {
    //     console.log("handling correct response: "+whichButtonClicked)
    //     player.playerScore++;
    //     player.playerAnswers[player.playerAnswers.length] = currentQuestion.correctAnswer;
    //     $("#theAnswer").css("background-color", "aqua").fadeIn().html("this is a successs message")
    // } else {
    //     player.playerAnswers[player.playerAnswers.length] = currentQuestion.correctAnswer;
    //     console.log("handling incorrect response: "+whichButtonClicked)
    //     $("#theAnswer").css("background-color", "red").fadeIn().html("this is a failure message")
    // }
    // return true;
// }
