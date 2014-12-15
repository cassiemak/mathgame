$(document).ready(function(){
  'use strict';
  var timeLeft = 10;
  var currentQuestion; 
  var multipler = 10; 
  var correctAnswer;
  var interval;

// check all the checkbox, returns an array
// $('input.subtract').prop('checked')

  var selected = function(){
    var select = $("form#questionForm").serializeObject().questionTypes;
    return select;
  };

// Math
  var addition = function(num1, num2){
    var randomQuestion = num1 + " + " + num2 + " ="; 
    var randomAnswer = Number(num1) + Number(num2);
    var random = {question: randomQuestion, answer: randomAnswer}; 
    $(".answer").val("");
    // debugger
    return random;
  };

  var subtraction = function(num1, num2){
    var randomQuestion = num1 + " - " + num2 + " ="; 
    var randomAnswer = Number(num1) - Number(num2);
    var random = {question: randomQuestion, answer: randomAnswer}; 
    $(".answer").val("");
    return random;
  };

  var multiplication = function (num1, num2){
    var randomQuestion = num1 + " * " + num2 + " ="; 
    var randomAnswer = Number(num1) * Number(num2);
    var random = {question: randomQuestion, answer: randomAnswer}; 
    $(".answer").val("");
    return random;
  };

  var division = function (num1, num2){
    var randomQuestion = num1 + " / " + num2 + " ="; 
    var randomAnswer = Number(num1) / Number(num2);
    var random = {question: randomQuestion, answer: randomAnswer}; 
    $(".answer").val("");
    return random;
  };

  var square = function (num1){
    var randomQuestion = num1 + " ^2 = "; 
    var randomAnswer = Number(num1) * Number(num1);
    var random = {question: randomQuestion, answer: randomAnswer}; 
    $(".answer").val("");
    return random; 
  };

  var squareRoot = function (num1){
    var num2 = num1 * num1
    var randomQuestion = "sqrt of " + num2; 
    var randomAnswer = num1;
    var random = {question: randomQuestion, answer: randomAnswer}; 
    $(".answer").val("");
    // debugger
    return random;
  };

  //function that generate the questions
  var generateQ = function(){
    // var multipler = 10; enabled slider
    // var j = selected().length;
    // // j++;
    // var i = Math.random()*j;
    // i = Math.floor(i);

    var randomIndex = Math.floor((Math.random() * selected().length));

    var questionType = selected()[randomIndex];

    var random1 = Math.random()*multipler;
    random1 = random1.toFixed(0);
    var random2 = Math.random()*multipler;
    random2 = random2.toFixed(0);

    // debugger

    if(questionType == "add"){
      return addition(random1,random2);
    }
    else if (questionType == "subtract"){
      return subtraction(random1,random2);
    }
    else if (questionType == "multiply"){
      return multiplication(random1,random2);
    }
    else if (questionType == "divide"){
      return division(random1,random2);
    }
    else if (questionType == "powers"){
      return square(random1);
    }
    else if (questionType == "sqRoots"){
      return squareRoot(random1);
    }
  };

// Compare input and correct answer function
  var check = function(input1 , input2){
    if(input1 == input2){
      timeLeft++;
      correctAnswer++; 
      currentQuestion = generateQ();
      $(".question").text(currentQuestion.question);
      console.log(currentQuestion);
    }
  };

  // set a function that countdown every second, 
  var countdown10 = function(){
    interval = setInterval(decrementTimer, 1000);
    };
    function decrementTimer (){
    // console.log(timeLeft);
    if (timeLeft==0){
      $(".timer").html('<span class="glyphicon glyphicon-play-circle centerized"></span>');
      // $(".timer").text(timeLeft);
      
      $(".mathgame").text("GAME OVER! You have answered " + correctAnswer + " correctly!");
      // postScore();
      $("input").attr("disabled", "disabled");
      clearInterval (interval);
    }
    else {
      $(".timer").text(timeLeft);
      timeLeft--;
      console.log(timeLeft);
    }
  }

  // check answers whenever you key up
  $(".answer").keyup(function(){
        // console.log("keyup!")
        console.log(currentQuestion);
        check($(".answer").val(), currentQuestion.answer);
  })

  // click button to activate/ initialize game function (only first question)
  $(".play").click(function(){
      countdown10();
      // console.log("clicked!");
      correctAnswer = 0;
      currentQuestion = generateQ();
      $(".answer").val("");
      // debugger
      $(".question").text(currentQuestion.question);
      // debugger
      console.log(currentQuestion);
    }
  );

  // get score and post to Harry's server
  var postScore = function(){
    $.ajax({
      type: 'POST',
      url: 'https://stark-eyrie-2329.herokuapp.com/leaders/create',
      data: {'name': prompt("What's your name?"),
            'score': correctAnswer},
      success: function(response){
        $('.ranking').text("You're ranked top " + (response.ranking*100).toFixed(2) + "%");
        debugger
      },
      error: function(){}
    })
  }

  // the slide bar that generates the number limit
  $(function(){
      $("#slideBar").slider({
        range: "min",
        value: 10,
        min: 0,
        max: 100, 
        slide: function(event, ui){
          multipler = ui.value;
          console.log(ui.value);
          console.log(multipler);
          $("#sliderAmount").text(ui.value);
        }
      });
  });



// Closing.ready function
});

