$(document).ready(initializeApp); // This line is defining a function that will run once the HTML document loads.

var the_number = null;
var name = null;
var score = 1;

function pick_number(){
    var random_number = Math.floor(Math.random()*11);
    console.log('random',random_number);
    return random_number;
}
function initializeApp () {
    the_number = pick_number();
    $("#submit").click(make_guess);
    $("#startAgain").click(reset_game);
    
    
   
//this is where you need to place the function call for your random number generator function.
//You will also place your clickhandler in here
}
function reset_game(){
    //set text in response to nothing
    the_number = pick_number();
    console.log('random',the_number);
    //pick a new random number
    
    //notify the player that a new game is happening
    $("#response_div").text("");
}


function make_guess(){
   
    var the_guess = $("#guess_input").val();
    console.log('value', the_guess, score);
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
    console.log(name, score);
    $.ajax({
        url: 'http://localhost:3001/scores',
        method: 'get',
        dataType: 'json',
        success: function( response ){
            console.log('getscore',response);

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
    




