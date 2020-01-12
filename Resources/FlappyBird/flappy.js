/*
	CSD_122_Group_Project
	Created by Pablo Bautista on 5/20/2018.
	Copyright © 2018 Pablo Bautista. All rights reserved.
*/

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d"); 
var FPS = 40;                  
var jump_amount = -10;              
var max_fall_speed= +10;             
var acceleration = 1;          
var pipe_speed = -2;                
var game_mode = 'prestart';          
var time_game_last_running;        
var bottom_bar_offset = 0;         
var pipes = [];
var bottom_bar = new Image();
bottom_bar.src = "Resources/FlappyBird/cavsb.png" ;
var bird = new MySprite("Resources/FlappyBird/lebron.png");
bird.x = myCanvas.width / 3;
bird.y = myCanvas.height / 2;

addEventListener("touchstart", input);     
addEventListener("mousedown", input);     
addEventListener("keydown", input);

/*
* 
* Function defines the game mode
* 
*/
function input(MyEvent) {
   switch (game_mode) {
      case 'prestart': 
      {
	    game_mode = 'running';
	    break;
	  } 
      case 'running':
      {
	    bird.velocity_y = jump_amount;
	    break;
	  } 
      case 'over': if (new Date() - time_game_last_running > 1000) 
      {
	    reset_game();
	    game_mode = 'running';
	    break;
	   } 
   } 
   MyEvent.preventDefault();
}

/*
* 
* Function defines text at the beginning of the game
* 
*/ 
function startText () {
   ctx.font= "25px Arial";
   ctx.fillStyle= "black";
   ctx.textAlign="center";
   ctx.fillText("Press, touch or click to start", myCanvas.width / 2, myCanvas.height / 4);  
}

setInterval(gameStart, 1000/FPS);          

/*
* 
* Function creates an object that is the character in the game
* 
*/ 
function MySprite (img_url) {
    this.x = 0;
    this.y = 0; 
    this.visible= true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.MyImg = new Image();
    this.MyImg.src = img_url || '';
    this.angle = 0;                                 
    this.flipV = false;             
    this.flipH = false;                              
}

/*
* 
* Function creates an object that is the character in the game
* 
*/
MySprite.prototype.frames = function() {
    ctx.save();
    ctx.translate(this.x + this.MyImg.width/2, this.y + this.MyImg.height/2);
    ctx.rotate(this.angle * Math.PI / 180);                       
    if (this.flipV) ctx.scale(1,-1);                              
    if (this.flipH) ctx.scale(-1,1);
   if (this.visible) ctx.drawImage(this.MyImg, -this.MyImg.width/2, -this.MyImg.height/2);
    this.x = this.x + this.velocity_x;
    this.y = this.y + this.velocity_y;                            
    ctx.restore();                                               
}

/*
* 
* Function defines how fast the "bird" falls as the game is running.
* 
*/     
function fall() {
    if (bird.velocity_y < max_fall_speed) 
    {
	    bird.velocity_y = bird.velocity_y + acceleration;
	}  
    if (bird.y > myCanvas.height - bird.MyImg.height)
    {
	    bird.velocity_y = 0;
	    game_mode = 'over';
	}
}

/*
* 
* Function defines the tilt of the "bird" as it moves.
* 
*/
function tilt() {
    if (bird.velocity_y < 0)  
    {
	    bird.angle= -15;
	}
    else if (bird.angle < 70) 
    {
	    bird.angle = bird.angle + 4;
	}
}

/*
* 
* Function animates the bottom to make it look as if it were moving
* 
*/
function bottomAnimation() {
    if (bottom_bar_offset < -23) bottom_bar_offset = 0;
    ctx.drawImage(bottom_bar, bottom_bar_offset, myCanvas.height - bottom_bar.height);
}

var pipe_piece = new Image();
pipe_piece.onload = addAllPipes;                       
pipe_piece.src = "Resources/FlappyBird/curry.png";

/*
* 
* Function shows the obstacles on the canvas
* 
*/
function showPipes() {                          
    for (var i=0; i < pipes.length; i++) 
    {
	    pipes[i].frames(); 
	}
}

/*
* 
* Function creates the obstacles 
* 
*/
function add_pipe(x_pos, top_of_gap, gap_width) {             
    var top_pipe = new MySprite();
    top_pipe.MyImg = pipe_piece;                              
    top_pipe.x = x_pos;                                       
    top_pipe.y = top_of_gap - pipe_piece.height;              
    top_pipe.velocity_x = pipe_speed;            
    pipes.push(top_pipe);         
    var bottom_pipe = new MySprite();
    bottom_pipe.MyImg = pipe_piece;
    bottom_pipe.flipV = true;                                
    bottom_pipe.x = x_pos;
    bottom_pipe.y = top_of_gap + gap_width;
    bottom_pipe.velocity_x = pipe_speed;
    pipes.push(bottom_pipe );
}

/*
* 
* Function adds all the obstacles in the game
* 
*/
function addAllPipes() {
    add_pipe(500,  100, 140);
    add_pipe(800,   50, 140);
    add_pipe(1000, 250, 140);
    add_pipe(1200, 150, 120);
    add_pipe(1600, 100, 120);
    add_pipe(1800, 150, 120);
    add_pipe(2000, 200, 120);
    add_pipe(2200, 250, 120);
    add_pipe(2400,  30, 100);
    add_pipe(2700, 300, 100);
    add_pipe(3000, 100,  80);
    add_pipe(3300, 250,  80);
    add_pipe(3600,  50,  60);
    var finish_line = new MySprite("Resources/FlappyBird/end.png");
    finish_line.x = 3900;
    finish_line.velocity_x = pipe_speed;
    pipes.push(finish_line);
}

/*
* 
* Function returns true if the sprite/bird touches an obstacle
* 
*/
function imagesTouching(img1, img2) {
    if (!img1.visible  || !img2.visible) return false;         
    if (img1.x >= img2.x + img2.MyImg.width || img1.x + img1.MyImg.width <= img2.x) return false;  
    if (img1.y >= img2.y + img2.MyImg.height || img1.y + img1.MyImg.height <= img2.y) return false;
    return true;                                                                                            
}

/*
* 
* Function defines game over when the two images touch
* 
*/
function endGame() {
   for (var i=0; i < pipes.length; i++) 
     if (imagesTouching(bird, pipes[i])) game_mode = "over";   
}

/*
* 
* Function shows "Game Over" Text
* 
*/
function gameOverText () {
   var score = 0;                                             
   for (var i=0; i < pipes.length; i++) 
        if (pipes[i].x < bird.x) score = score + 0.5;
                   
   ctx.font= "30px Arial";
   ctx.fillStyle= "black";
   ctx.textAlign="center";
   ctx.fillText("Game Over", myCanvas.width / 2, 100);  
   ctx.fillText("Score: " + score, myCanvas.width / 2, 150);  
   ctx.font= "20px Arial";
   ctx.fillText("Click, touch, or press to play again", myCanvas.width / 2, 300);  
}

/*
* 
* Function to start the game all over
* 
*/
function reset_game() {
      bird.y = myCanvas.height / 2;
      bird.angle= 0;
      pipes=[];
      addAllPipes();
}


/*
* 
* Function initializes the game and all its components
* 
*/ 
function gameStart () {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);   
    bird.frames(); 
    bottomAnimation();
    switch (game_mode) {
        case 'prestart':
        {
	    	startText();
	    	break;
	    } 
        case 'running': 
        {
	        time_game_last_running = new Date();
	        bottom_bar_offset = bottom_bar_offset + pipe_speed;
	        showPipes();
	        tilt();
	        fall();
	        endGame();
	        break;
	    }
        case 'over':
        {
	        fall();
	        gameOverText();
	        break;
	    } 
	} 
}