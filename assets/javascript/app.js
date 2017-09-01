$(document).ready(function() {

var secondsRemaining = 30;
var intervalID;
var intervalIDShort;
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
	},
	{
		question: "Who was selected first overall in the 1997 NBA draft?",
		answers: ["Tim Duncan", "Elton Brand", "Allen Iverson", "Shaquille O'Neal"]
	},
	{
		question: "Which of these following bands did NOT hit the height of their popularity in the 1990's?",
		answers: ["Arctic Monkeys", "Crash Test Dummies", "Sponge", "Veruca Salt"]
	},
	{
		question: "What song did Microsoft pay millions for to use in the promotion of their new Windows 95 operating system?",
		answers: ["'Start Me Up' by The Rolling Stones", "'Don't Let's Start' by They Might Be Giants", "'We Didn't Start The Fire' by Billy Joel", "'Get The Party Started' by Pink"]
	},
	{
		question: "What lyrics come next?  So I, I turned the radio on, I turned the radio up and this woman was singin' my song..",
		answers: ["The lover's in love and the other's run away", "And you say, I only hear what I want to", "Now I know that I did something wrong", "Yeah, I missed you."]
	}
]



$("#startButton").click(function() {
	$("#startQuiz").toggle();
	$(".allQuestions").toggle();
	$(".allAnswers").toggle();
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
	secondsRemaining = 30;
	$("#timerDisplay").html("0:" + secondsRemaining);
	intervalID = window.setInterval(timerCountdown, 1000);
	function timerCountdown() {
		secondsRemaining--;
		if(secondsRemaining === 0) {
			$("#timerDisplay").html("0:0" + secondsRemaining);
      		$("#triviaMessage").html("Time Is Up!");
      		numberUnanswered++;
      		currentQuestionIndex++;
      		answerButtonLock = true;
      		clearInterval(intervalID);
      		loadNextQuestion();
      		questionTimer();
      		return;
		} else if(secondsRemaining < 10) {
			$("#timerDisplay").html("0:0" + secondsRemaining);
		} else {
			$("#timerDisplay").html("0:" + secondsRemaining);
		}

		if(secondsRemaining === 10) {
			var tenSeconds = new Audio("assets/sounds/tenSeconds.mp3");
			tenSeconds.volume = 0.50;
			tenSeconds.play();
		} else if(secondsRemaining === 28) {
			$("#triviaMessage").html("  ");
		}
	}
}


$(".btn-primary").click(function() {
	answerButtonLock = true;
	if($(this).text() === trivia[currentQuestionIndex].answers[0]) {
		$("#triviaMessage").html("That is correct!");
		numberCorrect++;
		currentQuestionIndex++;
		clearInterval(intervalID);
		loadNextQuestion();
		questionTimer();
	} else {
		numberWrong++;
		$("#triviaMessage").html("Incorrect!");
		answerButtonLock = true;
		currentQuestionIndex++;
		clearInterval(intervalID);
		loadNextQuestion();
		questionTimer();
	}

}) 








})	