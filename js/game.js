$(document).ready(function(){
  'use strict';
  var timeLeft = 10;


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

// function that generate the questions
  var generateQ = function(){
    $(".firstNum") = math.random();
    var number1 = $(".firstNum");
    $(".secondNUm") = math.random();
    var number2 = $(".secondNUm");

  }

// set a function that countdown every second, 
  var countdown10 = function(){
    setInterval(decrementTimer, 1000);
  };
  function decrementTimer (){
    // console.log(timeLeft);
    $(".timer").text(timeLeft);
    timeLeft--;
  }

// click button to activate function
  $(".play").click(function(){
    countdown10();
    // console.log("OK!");
  })

  $(function(){
      $("#slideBar").slider();
  });

  // 


// Closing.ready function
});