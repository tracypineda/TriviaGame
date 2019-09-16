//GLOBAL VARIABLES

//===========================================

var trivia = {

  initialScreen: "",

  correctCounter: 0,

  inCorrectCounter: 0,

  unAnsweredCounter: 0,

  clickSound: new Audio("assets/sounds/button-click.mp3"),

  gameHTML: "",

  questionsArray: [

                  "What is the order of the sports in an Ironman Triathlon",

                  "The Ironman Triathlon World Championship first appeared on TV in 1980 as part of which television network?", 

                  "The Ironman Triathlon World Championship originated on the island of Oahu.  Which Island did the race move to in 1981?", 

                  "Who is considered the Voice of Ironman?", "What are the distances of each sport:  Swim, Bike, Run?"

                  ],

  answerArray: [

               ["Run, Bike, Swim", "Bike, Run, Swim","Run, Bike, Run","Swim, Bike, Run"], 

               ["NBC", "CBS", "ABC", "ESPN"], 

               ["Maui", "Lanai", "Virgin Islands", "Kailua-Kona"], 

               ["Paul Newby-Fraser", "Mike Riley", "Dave Scott", "Mirinda Carfrae"], 

               ["2.4 Mile Swim, 112 Mile Bike, 26.2 Mile Run", "750M Swim, 12 Mile Bike, 5K Run", "1.2 Mile Swim, 56 Mile Bike, 13.1 Mile Run", "1500M Swim, 24 Mile Bike, 10K Run"],

               ],

  correctAnswers: [

                  "D. Swim, Bike, Run", 

                  "C. ABC", 

                  "D. Kailua-Kona", 

                  "B. Mike Riley", 

                  "A. 2.4 Mile Swim, 112 Mile Bike, 26.2 Mile Run"

                  ],

  imageArray: [

              "<img class='center-block img-right' src='assets/images/swim_bike_run.jpg'>",

              "<img class='center-block img-right' src='assets/images/abc_wide_world_of_sports.jpg'>", 

              "<img class='center-block img-right' src='assets/images/kona_ironman_wc.jpg'>", 

              "<img class='center-block img-right' src='assets/images/mike_riley.jpg'>", 

              "<img class='center-block img-right' src='assets/images/ironman_distances.jpg'>"

              ],

  clock: "",

  questionCounter: 0,

  timeCounter: 20,

};





//FUNCTIONS

//===========================================

function startScreen(){

  //Create the start button

  trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>Swim, Bike, Run! Trivia Go!</a></p>";

  //Add Start button to main-area

  $(".main-area").html(trivia.initialScreen);

};



function timer(){

  trivia.clock = setInterval(twentySeconds, 1000);

  function twentySeconds(){

    if(trivia.timeCounter === 0){

      timeOutLoss();

      clearInterval(trivia.clock);

    }

    if(trivia.timeCounter > 0) {

      trivia.timeCounter --;

    }

    $(".timer").html(trivia.timeCounter);

  }

};



function wait(){

  if(trivia.questionCounter < 4) {

    trivia.questionCounter ++;

    generateHTML();

    trivia.timeCounter = 20;

    timer();

  }

  else {

    finalScreen();

  }

};



function win(){

  trivia.correctCounter ++;

  trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];

  $(".main-area").html(trivia.gameHTML);

  setTimeout(wait, 4000);

};



function loss(){

  trivia.inCorrectCounter ++;

  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Sorry, incorrect! The correct answer is: "+ trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];

	$(".main-area").html(trivia.gameHTML);

	setTimeout(wait, 4000);

};



function timeOutLoss(){

  trivia.unAnsweredCounter ++;

  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];

	$(".main-area").html(trivia.gameHTML);

	setTimeout(wait, 4000);

};



function finalScreen(){

  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p>Unanswered: " + trivia.unAnsweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset Triathlon Trivia Questions!</a></p>";

  $(".main-area").html(trivia.gameHTML);

};



function resetGame(){

  trivia.questionCounter = 0;

  trivia.correctCounter = 0;

  trivia.inCorrectCounter = 0;

  trivia.unAnsweredCounter = 0;

  trivia.timeCounter = 20;

  generateHTML();

  timer();

};



function generateHTML(){

  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. "+trivia.answerArray[trivia.questionCounter][1]+"</button><br><button class='answer'>C. "+trivia.answerArray[trivia.questionCounter][2]+"</button><br><button class='answer'>D. "+trivia.answerArray[trivia.questionCounter][3]+"</button>";

  $(".main-area").html(trivia.gameHTML);

}





//MAIN PROCESS

//===========================================

startScreen();



//start-button click

$("body").on("click", ".start-button", function(event){

	event.preventDefault();

	trivia.clickSound.play();

	generateHTML();



	timer();

}); // Closes start-button click



$("body").on("click", ".answer", function(event){

	trivia.clickSound.play();

  //If correct answer

  selectedAnswer = $(this).text();

	if(selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {



		clearInterval(trivia.clock);

		win();

	}

  //If incorrect answer

	else {



		clearInterval(trivia.clock);

		loss();

	}

}); // Close .answer click



//reset-button click

$("body").on("click", ".reset-button", function(event){

	trivia.clickSound.play();

	resetGame();

}); // Closes reset-button click

