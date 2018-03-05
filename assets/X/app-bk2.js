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


function askQuestions(thisArrayOfQuestions, index, player) {


    myClock = setTimeout(function() { askQuestions(thisArrayOfQuestions, index, player);}, 5000);

    displayQuestion(thisArrayOfQuestions[index]);

    $("#quit-btn").on("click", function () {
        clearTimeout(myClock);
        quit();
    })
    $("#playbtn").on("click", function() {
        if (true) {
            ;
        }
        clearTimeout(myClock);
        askQuestions(thisArrayOfQuestions, index+1, player);
    });
}

function quit() {
    console.log("quitting");

    clearTimeout(myClock);
}

// callMe();


    // var questionPending = 0;
    // var rightAnswer = false;
    // var moreQs = nextQExist(thisArrayOfQuestions, index);
    // var timeLeft = questionTime;
    // console.log("moreQs? ", moreQs)

    // displayQuestion(thisArrayOfQuestions[index], player);
    
    
    // var counting = 0;
    // var countingDown = setInterval(function() {
    //     counting++;
    //     timeLeft = questionTime - counting;
    //     if (timeLeft <= 0 && moreQs) {
    //         $("#timer").text(timeLeft)
    //         console.log("timeLeft <= 0");
    //         clearInterval(countingDown);
    //         askQuestions(thisArrayOfQuestions, index+1, player)
    //     } else if (timeLeft > 0) {
    //         $("#timer").text(timeLeft);
    //         console.log(timeLeft);
    //         //end game
    //     }
    // }, 1000);

    // $("#answer-1-btn").on("click", function() {
    //     console.log("clicked 1 btn");
    //     timeLeft = 0;
    // })
    // $("#answer-2-btn").on("click", function() {
    //     console.log("clicked 2 btn")
    // })
    // $("#answer-3-btn").on("click", function() {
    //     console.log("clicked 3 btn")
    // })
    // $("#answer-4-btn").on("click", function() {
    //     console.log("clicked 4 btn")
    // })
// }
        
    




    // evalUserChoice(thisArrayOfQuestions, index, getAnswerClick());
    // actOnUserChoice(thisArrayOfQuestions, index, getAnswerClick())
    
    // console.log("did we get here?")




    // var answerCountDown = setTimeout(function() {
    //     if(moreQs) {
    //         askQuestions(thisArrayOfQuestions, index+1);
    //     } else {
    //         //game over
    //     }

    // }, (questionTime+1000))

// }
function playGame(sampleQuestionArr, aPlayer) {
    var i = 0;

    // need to get a start button set up

    askQuestions(sampleQuestionArr, i, aPlayer)


}
