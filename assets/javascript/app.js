$(document).ready(function() {


var secondsRemaining = 30;
var intervalID;
var answerButtonLock = false;

var numberCorrect = 0;
var numberWrong = 0;
var numberUnanswered = 0;
var currentQuestionIndex = 0;


//Extra questoins may be added without making any additional code changes.
//The correct answer should be placed in the zero index of the "answers" array.
//The program will randomly organized all 4 given answers to choose from.
var trivia = [
	{
		question: "Which band released the hit song 'Disarm' in 1994?",
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
		question: "So I, I turned the radio on, I turned the radio up and this woman was singin' my song...",
		answers: ["The lover's in love and the other's run away", "And you say, I only hear what I want to", "Now I know that I did something wrong", "Yeah, I missed you."]
	},
	{
		question: "Which of the following technologies were NOT introduced to the world in the 1990's?",
		answers: ["Lotus Notes", "Iomega Zip Drive", "Microsoft Windows 3.0", "Adobe Photoshop"]
	},
	{
		question: "In 1996, which republican candidate did Bill Clinton defeat in the presedential election?",
		answers: ["Bob Dole", "Michael Dukakis", "Al Gore", "George H. W. Bush"]
	},
	{
		question: "Which of the following sitcoms aired both their first and last episodes in the 1990's?",
		answers: ["Home Improvement", "Friends", "The Simpsons", "The X-Files"]
	}
];



$("#startButton").click(function()
{
	$("#gameStart, .quizDiv, .allAnswers, .messageSection").toggle();
	loadNextQuestion();
	questionTimer();
});



function loadNextQuestion()
{
	answerButtonLock = false;
	$("#questionHeader").html("Question " + (currentQuestionIndex + 1))
	$("#questionParagraph").html(trivia[currentQuestionIndex].question);
	randomizeAnswers();
}



function randomizeAnswers()
{
	var random = Math.floor(Math.random() * 4);
	var buttonOne = random;
	$("#buttonOne").text(trivia[currentQuestionIndex].answers[buttonOne]);
	while(random === buttonOne)
	{
		random = Math.floor(Math.random() * 4);
	}
	var buttonTwo = random;
	$("#buttonTwo").text(trivia[currentQuestionIndex].answers[buttonTwo]);

	while(random === buttonOne || random === buttonTwo)
	{
		random = Math.floor(Math.random() * 4);
	}
	var buttonThree = random;
	$("#buttonThree").text(trivia[currentQuestionIndex].answers[buttonThree]);

	var buttonFour = (6 - (buttonOne + buttonTwo + buttonThree));
	$("#buttonFour").text(trivia[currentQuestionIndex].answers[buttonFour]);
}



function questionTimer()
{
	secondsRemaining = 30;
	$("#timerDisplay").html("0:" + secondsRemaining);
	intervalID = window.setInterval(timerCountdown, 1000);
	function timerCountdown()
	{
		secondsRemaining--;
		if(secondsRemaining === 0)
		{
			$("#timerDisplay").html("0:00");
      		$("#triviaMessage").html("Time Is Up!");
      		numberUnanswered++;
     		 currentQuestionIndex++;
     		 answerButtonLock = true;
     		 clearInterval(intervalID);
     		 loadNextQuestion();
     		 questionTimer();
     		 return;
		} else if(secondsRemaining < 10)
		{
			$("#timerDisplay").html("0:0" + secondsRemaining);
		} else
		{
			$("#timerDisplay").html("0:" + secondsRemaining);
		}

		if(secondsRemaining === 10)
		{
			var tenSeconds = new Audio("assets/sounds/tenSeconds.mp3");
			tenSeconds.volume = 0.50;
			tenSeconds.play();
		} else if(secondsRemaining === 27)
		{
			$("#triviaMessage").html("  ");
		}
	}
}



$(".btn-primary").click(function()
{
	answerButtonLock = true;
	if($(this).text() === trivia[currentQuestionIndex].answers[0])
	{
		$("#triviaMessage").html("Correct!<br>");
		numberCorrect++;
	} else
	{
		numberWrong++;
		$("#triviaMessage").html("Incorrect!<br><br>Correct Answer:<br><strong>"
			+ trivia[currentQuestionIndex].answers[0] + "</strong>");
	}
	currentQuestionIndex++;

	if(currentQuestionIndex === trivia.length)
	{
		var standby = new Audio("assets/sounds/standby.mp3");
		standby.volume = 0.50;
		standby.play();

		clearInterval(intervalID);
		secondsRemaining = 5;
		intervalID = window.setInterval(lastQuestionCountdown, 1000);
		function lastQuestionCountdown()
		{
			secondsRemaining--;
			if(secondsRemaining === 0)
			{
				$("#triviaMessage").html("  ");
				$(".allAnswers, .quizDiv, .messageSection").toggle();
				displayResults(numberWrong, numberCorrect, numberUnanswered);
			}
		}
	} else
	{
		clearInterval(intervalID);
		loadNextQuestion();
		questionTimer();
	}
});



function displayResults()
{
	var percentageScore = (numberCorrect / trivia.length);
	percentageScore = (percentageScore * 100).toFixed(2);
	
	$("#quizResults").toggle();
	$("#yourScore").append(percentageScore + "&#37;");
	$("#correctlyAnswered").append(numberCorrect);
	$("#incorrectlyAnswered").append(numberWrong);
	$("#unansweredQuestions").append(numberUnanswered);

	if(percentageScore < 50)
	{
		var nextTime = new Audio("assets/sounds/nextTime.mp3");
		nextTime.volume = 0.50;
		nextTime.play();
	} else if(percentageScore >= 70)
	{
		var congratulations = new Audio("assets/sounds/congratulations.mp3");
		congratulations.volume = 0.50;
		congratulations.play();
	}
}



$("#resetButton").click(function()
{
	clearInterval(intervalID);
	numberCorrect = 0;
	numberWrong = 0;
	numberUnanswered = 0;
	currentQuestionIndex = 0;
	secondsRemaining = 30;
	answerButtonLock = false;

	$("#quizResults").toggle();
	$("#gameStart").toggle();

	$("#yourScore").text("Your Score: ");
	$("#correctlyAnswered").text("Questions Answered Correctly: ");
	$("#incorrectlyAnswered").text("Questions Answered Incorrectly: ");
	$("#unansweredQuestions").text("Unanswered Questions: ");
});




})	