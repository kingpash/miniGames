    /************************************************************************
	 *  Final project 
	 *	Tetris Game
     *  Author @Napapis Dekker CSD 122 
     * 
     ***********************************************************************/

//variables needed for tetris functions

var HELP_DELAY = 1500;
var HELP_TIMER = -1;

var SCORE_1 = 0;
var SCORE_2 = 0;
var SCORE_3 = 0;
var SCORE_4 = 0;
var SCORE_5 = 0;

var SCORE_NAME_DEFAULT = "-------";

var SCORE_1_NAME = SCORE_NAME_DEFAULT;
var SCORE_2_NAME = SCORE_NAME_DEFAULT;
var SCORE_3_NAME = SCORE_NAME_DEFAULT;


var SCORE_4_NAME = SCORE_NAME_DEFAULT;
var SCORE_5_NAME = SCORE_NAME_DEFAULT;

var ENTER_NAME_DEFAULT_CHAR = "-";
var ENTER_NAME_MAX_CHAR = 7;
var ENTER_NAME = -1;
var ENTER_NAME_POSITION = 0;
var ENTER_NAME_DELAY = 300;
var ENTER_NAME_TIMER = -1;

var GAME_OVER = false;
var GAME_PAUSE = false;
var GAME_SPECIAL_AUTHORIZED = false;
var GAME_START_DELAY = 650;
var GAME_START_TIMER = -1;

var LINES = "";
var LINES_BLINK_COUNTER = 0;
var LINES_BLINK_TIMER = -1;
var LINES_BLINK_DELAY = 200;
var LINES_BLINK_MAX = 5;
var LINES_MAX_X = 10;
var LINES_MAX_Y = 18;

var PIECE_NEXT = -1;
var PIECE_NEXT_MASKED = false;
var PIECE_CONTROL = "NULL";
var PIECE_DOWN_TIMER = -1;
var PIECE_DISABLED_TIMER = -1;
var PIECE_DISABLED_DELAY = 10;
var PIECE_DISABLED_X = -1;
var PIECE_DISABLED_Y = -1;
var PIECE_START_X = (LINES_MAX_X / 2) + 1;
var PIECE_START_Y = (LINES_MAX_Y - 2);

var PLAYER_LEVEL = 0;
var PLAYER_LINES = 0;
var PLAYER_LINES_LEVEL = 0;
var PLAYER_SCORE = 0;
var PLAYER_SCORE_MAXIMUM = 999999;
var PLAYER_SCORE_BONUS = 0;
var PLAYER_SPEED_DEFAULT = 1000;
var PLAYER_SPEED = PLAYER_SPEED_DEFAULT;
var PLAYER_SPEED_DELAY = 97;