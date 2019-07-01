$(document).ready(initializeApp); // This line is defining a function that will run once the HTML document loads.

var the_number = null;
function pick_number(){
    var random_number = Math.floor(Math.random()*11);
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
    //pick a new random number
    $("#submit").click(make_guess);
    $("#startAgain").click(reset_game);
    //notify the player that a new game is happening
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
            $("#startAgain").show();
          

        }   
        
    }  
    
    
}



