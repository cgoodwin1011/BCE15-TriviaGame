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

// handles player response to game; always returns true; if there's no guess, does not return
function handleResponse(currentQuestion, whichButtonClicked, player) {
            
    if (isAnswerCorrect(currentQuestion, whichButtonClicked)) {
        console.log("handling correct response: "+whichButtonClicked)
        player.playerScore++;
        player.playerAnswers[player.playerAnswers.length] = currentQuestion.correctAnswer;
        alert("this is your success message")
        // clearInterval(questionPending);
    } else {
        player.playerAnswers[player.playerAnswers.length] = currentQuestion.correctAnswer;
        console.log("handling incorrect response: "+whichButtonClicked)        
        // clearInterval(questionPending);
        alert("this is your failure message")
    }
    return true;
}


function askQuestion(thisQuestion) {
    $("#question").html(thisQuestion.question);
    $("#answer1").html(thisQuestion.answer1);
    $("#answer2").html(thisQuestion.answer2);
    $("#answer3").html(thisQuestion.answer3);
    $("#answer4").html(thisQuestion.answer4);
    $("#correctAnswer").html(thisQuestion.correctAns);
}

function askManyQuestions(thisArrayOfQuestions, index, player) {
    var questionPending = 0;
    var counting = 0;

    askQuestion(thisArrayOfQuestions[index], player);
    questionPending = setInterval( function() {
        if (index < thisArrayOfQuestions.length-1) {
            counting = 0;
            index++;
            askQuestion(thisArrayOfQuestions[index]);
        } else {
            clearInterval(questionPending);
            console.log("all done with questions");
        }
    }, (questionTime+1)*1000);
    var timerCountDown = setInterval( function() {
        if (index <= thisArrayOfQuestions.length-1 && (questionTime-counting) >= 0) {
            $("#timer").text(questionTime-counting);
            counting++;
        }
        
    }, 1000)
    
    $("#answer-1-btn").on("click", function() {
        console.log("clicked 1");
        handleResponse(thisArrayOfQuestions[index], "answer1", player);
        clearInterval(questionPending);
        askManyQuestions(thisArrayOfQuestions, index, player);
    });
    $("#answer-2-btn").on("click", function() {
        console.log("clicked 2");
        handleResponse(thisArrayOfQuestions[index], "answer2", player);
        clearInterval(questionPending);
        askManyQuestions(thisArrayOfQuestions, index, player);
    });
    $("#answer-3-btn").on("click", function() {
        console.log("clicked 3");
        handleResponse(thisArrayOfQuestions[index], "answer3", player);
        clearInterval(questionPending);
        askManyQuestions(thisArrayOfQuestions, index, player);
    });
    $("#answer-4-btn").on("click", function() {
        console.log("clicked 4");
        handleResponse(thisArrayOfQuestions[index], "answer4", player);
        clearInterval(questionPending);
        askManyQuestions(thisArrayOfQuestions, index, player);
    });


}

function playGame(sampleQuestionArr, aPlayer) {
    var i = 0;

    // need to get a start button set up

    askManyQuestions(sampleQuestionArr, i, aPlayer)


}

//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------



