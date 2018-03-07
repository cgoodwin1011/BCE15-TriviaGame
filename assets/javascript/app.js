var badPic = ["assets/images/bad-outcomes/4wx8EcIA.jpg", "images/bad-outcomes/10-3-stooges.jpg", "images/bad-outcomes/dumbanddumber.jpeg"]
var goodPic = ["assets/images/good-outcomes/alan-turing-9512017-1-402.jpg", "assets/images/good-outcomes/Albert_Einstein_Head.jpg", "assets/images/good-outcomes/euler.jpg"]
var noPic = '';

var aQuestion = {
    question: "What is 2 * 5?",
    A: "12",
    B: "9",
    C: "15",
    D: "10",
    correctAnswer: "D",
    explainer: "2 x 5 = 10",
};

var bQuestion = {
    question: "What is 7 - 8?",
    A: "-2",
    B: "1",
    C: "-1",
    D: "0",
    correctAnswer: "C",
    explainer: "7- 8 = -1",
};

var cQuestion = {
    question: "What is 16/8?",
    A: "-2",
    B: "2",
    C: "-1",
    D: "0",
    correctAnswer: "B",
    explainer: "16/8 = 2",
};

var dQuestion = {
    question: "Click button A",
    A: "click here",
    B: "not here",
    C: "nor here",
    D: "not this......<br>....",
    correctAnswer: "A",
    explainer: "It said click button A",
};

var eQuestion = {
    question: "What is 16 % 5?",
    A: "-2",
    B: "1",
    C: "-1",
    D: "0",
    correctAnswer: "B",
    explainer: "The remainder of 5 into 16 is 1",
};

var sampleQuestions = [aQuestion, bQuestion, cQuestion, dQuestion, eQuestion]

function makeQuestion(newQuestion, ans1, ans2, ans3, ans4, correctAns){
    this.question = newQuestion;
    this.A = ans1;
    this.B = ans2;
    this.C = ans3;
    this.D = ans4;
    this.correctAnswer = correctAns;
}

var myGlobalTime;
var questionTime = 5;
var showAnswerTime = 3;


function playGame(sampleQuestionArr, aPlayer) {
    // console.log("playGame");
    var i = -1;
    disableAnsButtons();
    disableQuit();
    $("#timer-display").hide();
    $("#question").hide();
    $("#play-btn").on("click", function() {
        startGame(sampleQuestionArr, i, aPlayer);
    });

}

function disableAnsButtons() {
    $("#answer-1-btn").prop("disabled", true);
    $("#answer-2-btn").prop("disabled", true);
    $("#answer-3-btn").prop("disabled", true);
    $("#answer-4-btn").prop("disabled", true);
}

function enableAnsButtons() {
    $("#answer-1-btn").prop("disabled", false);
    $("#answer-2-btn").prop("disabled", false);
    $("#answer-3-btn").prop("disabled", false);
    $("#answer-4-btn").prop("disabled", false);
}

function disableQuit() {
    $("#quit-btn").prop("disabled", true);
}

function enableQuit() {
    $("#quit-btn").prop("disabled", false);
}

function disablePlayBtn() {
    $("#quit-btn").prop("disabled", true);
}

function enablePlayBtn() {
    $("#quit-btn").prop("disabled", false);
}


function disableAllButtons() {
    disableAnsButtons();
    $("#play-btn").prop("disabled", true);
    $("#quit-btn").prop("disabled", true);
}

function enableAllButtons() {
    enableAnsButtons();
    $("#play-btn").prop("disabled", false);
    $("#quit-btn").prop("disabled", false);
}

function displayQuestion(question_dQ) {
    $("#question").html(question_dQ.question);
    $("#answerA").html(question_dQ.A);
    $("#answerB").html(question_dQ.B);
    $("#answerC").html(question_dQ.C);
    $("#answerD").html(question_dQ.D);
    $("#correctAnswer").html(question_dQ.correctAns);
    $("#question").show();
    // $("#timer-display").show();
}

function nextQExist(questionsArray_nQE, index_nQE) {
    if (index_nQE < questionsArray_nQE.length-1) {
        return true;
    } else {
        return false;
    }
}

function lastQuestion(questions_lQ, index_lQ) {
    if (index_lQ < questions_lQ.length-1) {
        return false;
    } else {
        return true;
    }
}


function isAnswerCorrect(questionArray_iAC, index_iAC, answerChosen) {
    console.log("isAnswerCorrect called")
    if (answerChosen == questionArray_iAC[index_iAC].correctAnswer) {
        // console.log("correct");
        return true;
    } else {
        // console.log("not correct");
        return false;
    }
}


function doneGame(timerToStop) {
    console.log("doneGame called");
    disableAnsButtons();
    disableQuit();
    clearInterval(timerToStop)
    $("#timer-display").hide();
    $("#question").hide();
    // $("#instructions-to-player").show();
    $("#play-lbl").text("Play Again?");
    $("#play-btn").prop("disabled", false);
    $("#the-answer").hide()
    $("#game-over").html("Game Over!<br>Goodbye!");
    $("#game-over").show();
}

function updatePlayer(question_upd, curLetter, wasRight, thePlayer) {
    thePlayer.playerAnswers[thePlayer.playerAnswers.length] = curLetter;
    if (wasRight) {
        // thePlayer.playerScore++;
        thePlayer.playerRight++;
        thePlayer.rightAnswers[thePlayer.playerAnswers.length] = curLetter;
    } else {
        var answerShouldBe = question_upd.correctAnswer;
        // thePlayer.playerScore--;
        thePlayer.playerWrong++;
        thePlayer.rightAnswers[thePlayer.playerAnswers.length] = answerShouldBe;
    }
    displayPlayerStats(thePlayer);
}

function displayPlayerStats(thePlayer) {
    // statsHTML = "You have gotten "+thePlayer.playerRight+" right and "+thePlayer.playerWrong+" wrong";
    statsHTML =''
    $("#rowStats").html(statsHTML);
    // return statsHTML;
}


function startGame(questionArray_pBC, index_pBC, aPlayer) {
    console.log("startGame");
    var btnStatus = $("#play-lbl").html();
    switch(btnStatus) {
        case "Play":
            // console.log("you clicked Play!");
            $("#instructions-to-player").hide();
            $("#timer-display").show();
            enableAnsButtons();
            enableQuit();
            $("#question").show();
            $("#play-lbl").text("Next");
            // $("#play-btn").prop("disabled", true);
            askQuestions(questionArray_pBC, index_pBC+1, aPlayer);
            break;
        case "Play Again?":
            location.reload();
            // $("body").html("<h1>Not Yet Implemented</h1>")
            break;
        default:
            console.log("something's not working in startGame")
    } 
}

function playCheer() {
    // console.log("cheer")
    var choosePic = Math.floor(Math.random()*3);
    thePic=goodPic[choosePic];
    $("#the-image").attr("src", thePic)
}

function playBoo() {
    // console.log("playboo")
    var choosePic = Math.floor(Math.random()*3);
    thePic=badPic[choosePic];
    $("#the-image").attr("src", thePic)

}


function muteCheer() {

}

function muteBoo() {

}

function askQuestions(questionArray_aQ, index_aQ, player) {
    var theCount = questionTime;
    var noAnswer = true;
    // $("#rowStats").html(displayPlayerStats(player));
    displayPlayerStats(player);
    $("#row02").css("visibility", "visible");
    $("#row03").css("visibility", "visible");
    console.log("*********\naskQuestion called\n\tQ No. "+index_aQ+" asked\n*******");
    // if ($("#question").css("display") == "none") {

    function quit() {
        console.log("quit() called");

        var Q = $("#quit-btn").prop("disabled");
        if (!Q) {
            if (confirm("Do you really want to quit?")) {
                disableQuit();
                index_aQ = questionArray_aQ.length;
                // clearInterval(myGlobalTime);
                doneGame(myGlobalTime);
            } else {
                enableQuit();
            }
        }
    }

    function setUpNextQuestion(questionsArray_rAA, index_rAA, player) {
        console.log("setUpNextQuestion called\n\tabout to call stop clock");
        clearInterval(myGlobalTime);
        $("#the-answer").hide();
        $("#timer-disply").show();
        // if (nextQExist(questionsArray_rAA, index_rAA)) {
        if (index_rAA < questionsArray_rAA.length-1) {
            console.log("<>there is a next question");
            $("#the-answer").hide();
            enableAnsButtons();
            askQuestions(questionsArray_rAA, index_rAA+1, player);
        } else {
            doneGame(myGlobalTime);
            index_aQ = questionsArray_rAA.length;
        }
    }


    function evalAnswer(questionsArray_eA, index_eA, letterChosen, somePlayer) {
        console.log("evalAnswer called\tindex is "+index_eA+"\n\t\and array len is "+questionsArray_eA.length);

        $("#timer-display").hide();
        disableAnsButtons();
        var answerShouldBe = questionsArray_eA[index_eA].explainer;
        var answerString = "something wrong in answer string!";

        if (index_eA == questionsArray_eA) {
            answerShouldBe = "ERROR";
        }
        if (isAnswerCorrect(questionsArray_eA, index_eA, letterChosen)) {
            console.log("if: evalAns");
            answerString = "You chose "+letterChosen+". You're right! ";
            updatePlayer(questionsArray_eA[index_eA], letterChosen, true, somePlayer);
            playCheer();
        } else {
            console.log("else: evalAns");
            updatePlayer(questionsArray_eA[index_eA], letterChosen, false, somePlayer);
            if (letterChosen != ' '){
                answerString = "You chose "+letterChosen+". You're Wrong, Dude! ";
            } else {
                answerString = "You didn't answer. That's Wrong, Dude! ";
            }
            playBoo();
        }
        answerString += "<br><span style='color: red'>The right answer is <br>"+answerShouldBe+"<span>";
        $("#timer-dislplay").hide();
        $("#the-answer").html(answerString);
        $("#the-answer").show();
    }

    //set up view
    $("#timer-number").show();
    $("#the-answer").hide();

    //the main loop....
    myGlobalTime = setInterval( function() {
        console.log("the count is "+theCount);
        $("#question").show();
        if (theCount > 0) {
            if ($("#the-answer").css('display') == "none") {
                $("#timer-number").html(theCount+1);
                $("#timer-display").show();
            }
            $("#timer-number").text(theCount);
            theCount--;
        } else if (theCount == 0) {
            // if ($("#the-answer").css('display') == "none") {  //if the answer is NOT visible
            if (noAnswer) {
                console.log("answer NOT visible")
                evalAnswer(questionArray_aQ, index_aQ, ' ', player);
                $("#timer-display").hide();
                $("#the-answer").show();
            } else {
                //nothing
            }
            theCount--;
        } else if (theCount > -(showAnswerTime+1) ) {
            if (theCount >= -showAnswerTime) {
                //don't do anything....
                theCount--;
            }
        } else if (theCount == -(showAnswerTime+1) ) {
            clearInterval(myGlobalTime);
            theCount = questionTime;
            setUpNextQuestion(questionArray_aQ, index_aQ, player); 
            // askQuestions(questionArray_aQ, index_aQ+1, player);
        } else if (theCount < -(showAnswerTime+1) ) {
            console.log("this sucks");
        }
    }, 1000);

    displayQuestion(questionArray_aQ[index_aQ]);

    $("#answer-1-btn").on("click", function() {
        console.log("A1");
        if (noAnswer) {
            evalAnswer(questionArray_aQ, index_aQ, "A", player);
        }
        noAnswer = false;
    });

    $("#answer-2-btn").on("click", function() {
        console.log("A2");
        if (noAnswer) {
            evalAnswer(questionArray_aQ, index_aQ, "B", player);
        }
        noAnswer = false;
    })

    $("#answer-3-btn").on("click", function() {
        console.log("A3");
        if (noAnswer) {
            evalAnswer(questionArray_aQ, index_aQ, "C", player);
        }
        noAnswer = false;
    });

    $("#answer-4-btn").on("click", function() {
        console.log("A4");
        if (noAnswer) {
            evalAnswer(questionArray_aQ, index_aQ, "D", player);
        }
        noAnswer = false;
    });

    $("#quit-btn").on("click", function () {
        console.log("quit button about to call stop clock");
        quit();
    });

    $("#play-btn").on("click", function() {
        nextButtonPressed(questionArray_aQ, index_aQ, player);
    });

    function nextButtonPressed(questionArray_pBC, index_pBC, aPlayer) {
        console.log("playBtnClick");
        var btnStatus = $("#play-lbl").html();
        switch(btnStatus) {
            case "Next":
                console.log("you clicked Next!");
                if (noAnswer) {
                    evalAnswer(questionArray_pBC, index_pBC, " ", aPlayer);
                } else {
                    // var temp = setTimeout( function() {
                    //     setUpNextQuestion(questionArray_pBC, index_pBC, aPlayer);
                    //     clearTimeout(temp);
                    //     enablePlayBtn();
                    //     }, showAnswerTime*1000);
                    // clearInterval(myGlobalTime);
                    // disablePlayBtn();
                }
                break;
            default:
                console.log("something's not working in playBtnClick2")
        }
    }


}

