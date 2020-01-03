$(document).ready(initializeApp); 

var the_number = null;
var name = null;
var score = 1;

function pick_number(){
    var random_number = Math.floor(Math.random()*11);
    return random_number;
}

function initializeApp () {
    the_number = pick_number();
    $("#submit").click(make_guess);
    $("#startAgain").click(reset_game);
    
}

function reset_game(){
    the_number = pick_number();
    $("#response_div").text("");
}

function make_guess(){
   
    var the_guess = $("#guess_input").val();
    if( the_guess === '' || isNaN(the_guess)){
        $("#response_div").text("Oops!! please enter a valid number");
    } else{
        if(the_guess > the_number){
            $("#response_div").text("Oops ! Your guess is Too High!!");
        }
        else if (the_guess < the_number){
            $("#response_div").text("Oops ! Your guess is Too Low!!");
        }
        else {
            $("#response_div").text("You Guessed It Right!!");
            name = prompt("what is your name?");
            addHighScores(name, score);
            getHighScores();   
            
        }  
   
    }      
    score++; 
    $("#startAgain").show();
}

 
 function getHighScores(){   
    
    $.ajax({
        url: 'http://localhost:3001/scores',
        method: 'get',
        dataType: 'json',
        success: function( response ){

            const sortedData = response.sort((a,b) => parseInt(a.score) - parseInt(b.score)) ;
            
            for(var i=0; i<sortedData.length; i++){
                var nameDataLi = $("<li>");
                var nameAppend = sortedData[i].name;
                var scoreAppend = sortedData[i].score;
                $(nameDataLi).append(nameAppend,' ', scoreAppend);
                $("#highScore").append(nameDataLi);
          }     
        
        },
        error: function(response){
          console.log('error1', response);
        }
      })
 }

 function addHighScores(name, score){
    $.ajax({
        url: 'http://localhost:3001/addscore',
        method: 'get',
        data:{
            name, score
        },
        dataType: 'json',
        
        success: function( response ){
          console.log(response);
        },
        error: function(response){
          console.log('error2', response);
        }
      })
 }
    




