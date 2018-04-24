// $("#quit-btn").on("click", function() {
    //     clearTimeout(myClock);
    //     clearInterval(counter);
    //     remainingTime = questionTime;
    //     console.log('final Q button loop')
    //     quit();
    // });

// var count=30;

// function runCountDownTimer(theCount){
//     if (theCount <= 0)
//     {
//         clearInterval(counter);
//         remainingTime = questionTime;
//         $("#timer").text(0);
//         return;
//     }
//     $("#timer").text(theCount);
//     theCount--;
// }

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

// function runCountDownTimer() {
//     var counting = 0;
//     console.log("in countdown timer")
//     while(questionTime - counting >= 0) {
//         console.log("in while loop")
//         var countingDown = setTimeout( function() {
//             if ((questionTime - counting) >= 0) {
//                 $("#timer").text(questionTime - counting);
//                 counting++;
//             } else {
//                 clearInterval(countingDown);
//             }
//             console.log("count down timer running")
//         }, 1000);
//     }
//     return
// }


/*
function getAnswerClick() {
    console.log("get answer")

    $("#answer-1-btn").on("click", function() {
        return "A";
    });

    $("#answer-2-btn").on("click", function() {
    return "B";
    });

    $("#answer-3-btn").on("click", function() {
        return "C";
    });

    $("#answer-4-btn").on("click", function() {
        return "D";
    });
}
*/




/*
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
*/ 

/*
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
*/
