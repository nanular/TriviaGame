$(document).ready(function() {

var secondsRemaining = 30;
var intervalID;
var answerButtonLock = false;

var numberCorrect = 0;
var numberWrong = 0;
var numberUnanswered = 0;
var currentQuestionIndex = 0;

var trivia = [
	{
		question: "Which of the following bands released the hit song 'Disarm' in 1994?",
		answers: ["The Smashing Pumpkins", "Soundgarden", "The Meat Puppets", "Pearl Jam"]
	},
	{
		question: "What year was Edward Scissorhands released?",
		answers: ["1990", "1996", "1992", "1991"]
	},
	{
		question: "Final Fantasy II was released for the Super Nintendo in North America in 1991. What title was the game released under in Japan?",
		answers: ["Final Fantasy IV", "Final Fantasy II: The New Final Chapter", "Fighting Fantasy", "Final Fantasy: Dawn Of The Spirits"]
	}
]




$("#startButton").click(function() {
	$("#startQuiz").toggle();
	$(".allQuestions").toggle();
	$(".allAnswers").toggle();
	$("#timerDisplay").html("0:" + secondsRemaining);
	loadNextQuestion();
	questionTimer();
})




function loadNextQuestion() {
	answerButtonLock = false;
	$("#questionHeader").html("Question " + (currentQuestionIndex + 1))
	$("#questionParagraph").html(trivia[currentQuestionIndex].question);
	randomizeAnswers();
}



function randomizeAnswers() {
	var random = Math.floor(Math.random() * 4);
	var buttonOne = random;
	$("#buttonOne").text(trivia[currentQuestionIndex].answers[buttonOne]);

	while(random === buttonOne) {
		random = Math.floor(Math.random() * 4);
	}
	var buttonTwo = random;
	$("#buttonTwo").text(trivia[currentQuestionIndex].answers[buttonTwo]);

	while(random === buttonOne || random === buttonTwo) {
		random = Math.floor(Math.random() * 4);
	}
	var buttonThree = random;
	$("#buttonThree").text(trivia[currentQuestionIndex].answers[buttonThree]);

	var buttonFour = (6 - (buttonOne + buttonTwo + buttonThree));
	$("#buttonFour").text(trivia[currentQuestionIndex].answers[buttonFour]);
}



function questionTimer() {
	intervalID = setInterval(timerCountdown, 1000);
	function timerCountdown() {
		secondsRemaining--;
		if(secondsRemaining === 0) {
			clearInterval(intervalID);
			$("#timerDisplay").html("0:0" + secondsRemaining);
      	$("#triviaMessage").html("Time Is Up!");
      	numberUnanswered++;
      	answerButtonLock = true;
		} else if(secondsRemaining < 10) {
			$("#timerDisplay").html("0:0" + secondsRemaining);
		} else {
			$("#timerDisplay").html("0:" + secondsRemaining);
		}
	}
}


$(".btn").click(function() {
	if($(this).text() === trivia[currentQuestionIndex].answers[0] && !answerButtonLock) {
		answerButtonLock = true;
		$("#triviaMessage").html("Congratulations!<br>That is correct!");
		numberCorrect++;
		currentQuestionIndex++;
		secondsRemaining = 30;
		clearInterval(intervalID);
		loadNextQuestion();
	}

}) 








})	