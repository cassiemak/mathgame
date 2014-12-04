$(document).ready(function(){
  'use strict';
  var timeLeft = 10;
  var currentQuestion; 
  var multipler = 10; 
  var correctAnswer;
  var interval;


  //function that generate the questions
  var generateQ = function(){
    // var multipler = 10; enabled slider
    var random1 = Math.random()*multipler;
    random1 = random1.toFixed(0);
    var random2 = Math.random()*multipler;
    random2 = random2.toFixed(0);
    var randomQuestion = random1 + " + " + random2 + " ="; 
    var randomAnswer = Number(random1) + Number(random2);
    var random = {question: randomQuestion, answer: randomAnswer}; 
    $(".answer").val("");
    return random;
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
      $(".timer").text(timeLeft);
      $(".mathgame").text("GAME OVER! You have answewred " + correctAnswer + " correctly!");
      postScore();
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
      // console.log("clciked!");
      correctAnswer = 0;
      currentQuestion = generateQ();
      $(".answer").val("");
      $(".question").text(currentQuestion.question);
      console.log(currentQuestion);
    }
  );

  // get score and post to Harry's server
  var postScore = function(){
    $.ajax({
      type: 'POST',
      url: 'https://stark-eyrie-2329.herokuapp.com/leaders/create',
      data: {'name': prompt ("What's your name?"),
            'score': correctAnswer},
      success: function(html){
        $('.ranking').text("You're ranked top " + (html.ranking*100).toFixed(2) + "%");
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


// Math
  var addition = function(num1, num2){
    var sum = num1 + num2;
    return sum;
  };

  var subtraction = function(num1, num2){
    var minus = num1 - num2;
    return minus;
  };

  var multiplication = function (num1, num2){
    var multiple = num1 * num2;
    return multiple;
  };

  var division = function (num1, num2){
    var divide = num1 / num2;
  };


// Closing.ready function
});

