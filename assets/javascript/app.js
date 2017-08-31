$(document).ready(function() {

var secondsRemaining = 30;
var correctAnswers = 0;
var wrongAnswers = 0;
var unansweredQuestions = 0;

var trivia = [
  {
    question: "",
    answerValue: "",
    answeredCorrectly: false
  },
  {
    question: "",
    answerValue: "",
    answeredCorrectly: false
  },
  {
    question: "",
    answerValue: "",
    answeredCorrectly: false
  },
  {
    question: "",
    answerValue: "",
    answeredCorrectly: false
  },
  {
    question: "",
    answerValue: "",
    answeredCorrectly: false
  },
  {
    question: "",
    answerValue: "",
    answeredCorrectly: false
  },
  {
    question: "",
    answerValue: "",
    answeredCorrectly: false
  },
  {
    question: "",
    answerValue: "",
    answeredCorrectly: false
  },
  {
    question: "",
    answerValue: "",
    answeredCorrectly: false
  },
  {
    question: "",
    answerValue: "",
    answeredCorrectly: false
  }
];  


$("#startButton").click(function() {
  $("#startQuiz").toggle();
  $(".allQuestions").toggle();
  $("#questionTimer").html("0:" + secondsRemaining + " Remaining");
  startQuestionTimer();
})  

function startQuestionTimer() {
  var intervalID = setInterval(timerCountdown, 1000);
  function timerCountdown() {
    secondsRemaining--;
    if(secondsRemaining === 0) {
      clearInterval(intervalID);
      $("#questionTimer").html("0:0" + secondsRemaining + " Remaining");
      $("#timerMessage").html("Time Is Up!");
    }
    
    else if(secondsRemaining < 10) {
      $("#questionTimer").html("0:0" + secondsRemaining + " Remaining");
    }

    else {
      $("#questionTimer").html("0:" + secondsRemaining + " Remaining");
    }
  }
} 



})  