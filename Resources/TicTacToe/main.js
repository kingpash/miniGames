/*
* CSD122 - JavaScript & JQuery
* Final Project - Group Phase 2
* @author: Geraldine Davila   
* Group 2
*/

var isClicked = false; //Flag for the user to press the "Play" button that avoid an error in the first choose "Undefined" Value

function startGame(){ //Inicialize the game and restart it.
    
    window.isClicked = true; 
	window.location.hash = "jump_to_this_location"; // Span to go back to the header of the homepage tic tac toe. 
    for(var i=1;i<=9;i++)  //Clear all the square with a value
    {
        clearBox(i); // Clear just one box
    }
	
    document.turn = "X"; // Track the players turn
    document.winner = null;  
    setMessage(document.turn + " get's to start"); 
    
    return window.isClicked; // Return true to track the button in HTML
}

function setMessage(msg) // Message the user with the updates of the game 
{
    document.getElementById("message").innerText = msg; // Change the element ID message for different msg given during the game.
}

function nextMove(box) // Check the movement of the player
{
    if (window.isClicked === true) // Check if the player press the "Play" button
    {
        if (document.winner !== null) // Check for a winner an display a message with the winner symbol that already won.
        {
            setMessage(document.turn + " already won. Press Play to start");
        }
        else if(box.innerText === '') // Check is the box is empty/ switch the turn, also check if the movement was the last one for display is a TIE
        {
            box.innerText = document.turn;
            TurnPlayer();
			checkTIE();
        }
        else
        {
            setMessage("Choose an empty spot"); //If the user already choose an spot.. display a message to choose an empty spot
        }
    } 
    else
    {
        alert("Press Play to start!"); // Alert the user press "start" before starting choose the boxes 
		location.reload();
    } 
}

function TurnPlayer() // Switch the turn of the players
{
    if(WinnerCheck(document.turn)) //Check is there is a winner argument the current player.
    {
     setMessage(document.turn + ", you won!"); // Update the message
     document.winner = document.turn;// Display a message already won, if the player trt to choose another spot.
	 //$(".square").html("");	
    }
    
    else if(document.turn === "X") // If the current value of the document.turn was "X" change the turn for "O" displaying the message 
    {
        document.turn = "O";
        setMessage(document.turn + " 's turn.");
    }
    else if (document.turn === "O") // If the current value of the document.turn was "O" change for "X" and display the message
    {
        document.turn = "X";
        setMessage(document.turn + " 's turn.");
    }
    
}

function checkTIE()
{
	var checkbox = document.getElementsByClassName("square"); // var checkbox to analize if all the boxes are full
	var a = checkbox[0].innerHTML; 
	var helper = 0; // Inicialize the counter
	for (var i=0; i < 9; i++) //Loop that count if all the spaces are full
	{
		if(checkbox[i].innerHTML !== "")
		{
			helper = helper + 1;
		}
	}
	
	if (helper == 9)
	{
		setMessage("It's a TIE!"); // If the boxes are full display the message
	}	 
}

function WinnerCheck(move) //Analize if the movement was a win or not
{
    var result = false;
    if (WinnerCheckHelper(1,2,3,move)|| WinnerCheckHelper(4,5,6,move)|| WinnerCheckHelper(7,8,9,move)|| WinnerCheckHelper(1,4,7,move)|| WinnerCheckHelper(2,5,8,move)|| WinnerCheckHelper(3,6,9,move)|| WinnerCheckHelper(1,5,9,move)|| WinnerCheckHelper(3,5,7,move))
    {
        result = true;
    }
    
    return result;
}

function WinnerCheckHelper(a,b,c,move) 
{
    var result = false;
    if((getBox(a) == move) && (getBox(b) == move) && (getBox(c) == move)) // If the move is equal to any of the winner combinations, return true for the function checkwinner
    {
        result = true;
    }
    
    return result;
}

function getBox(number) // Get the inner text from each box
{
    return document.getElementById("s" + number).innerText;
}

function clearBox(number) // clear each box
{
    document.getElementById("s" +number).innerText = "";
}

// Display the message toggling the color between pink and black 
$(document).ready(function()
{
	if(WinnerCheck(document.turn))
    {
		setInterval(function(){
        $(".square").toggleClass("colorPink");
	},200);
    }
	else 
	{
		setInterval(function(){
        $("#message").toggleClass("colorBlack");
	},200);
	}
});