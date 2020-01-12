     /************************************************************************
	 *  Final project 
	 *	Tetris Game
     *  Author @Napapis Dekker CSD 122 
     * 
     ***********************************************************************/



/*
* initBoard function to draw the boards
* Main board 
* preview board
*/

function initBoard() { 
	//main board
		for (var y = LINES_MAX_Y, ymax = 0; y > ymax; y --) { 
				for (var x = 1, xmax = LINES_MAX_X + 1; x < xmax; x ++) { 
					$('#board').append('<div class="square" id="s-' + y + '-' + x + '"></div>');
			    }
			}
	// preview board			
		for (var y = 4, ymax = 0; y > ymax; y --) { 
			    for (var x = 1, xmax = 5; x < xmax; x ++) { 
					$('#board-next').append('<div class="square" id="next-s-' + y + '-' + x + '"></div>');
				}
		    }

				refreshPlayer();
}
/*
* resetAll function to reset game and  start new game
*/
function resetAll() { 
		$('#board').find('.square').remove();
		$('#board-next').find('.square').remove();
			
		PLAYER_LEVEL = 0;
		PLAYER_LINES = 0;
		PLAYER_LINES_LEVEL = 0;
		PLAYER_SCORE = 0;
		PLAYER_SCORE_BONUS = 0;
		PLAYER_SPEED = PLAYER_SPEED_DEFAULT;
				
		PIECE_NEXT = -1;
				
		GAME_OVER = false;
		GAME_PAUSE = false;
		GAME_SPECIAL_AUTHORIZED = false;
			
		initBoard();
				
}

/*
* gameover function - game will stop and game over sound will play.
* All grids in board will tuen gray.
* "GAME OVER" message will appear.
*/	
function gameover() { 
		stopAllSound();
		playGameoverSound();
			
		GAME_SPECIAL_AUTHORIZED = false;
		PIECE_CONTROL = "NULL";
				
		PIECE_DISABLED_Y = 1;
	    PIECE_DISABLED_X = 1;
		PIECE_DISABLED_TIMER = setInterval('disablePiece()', PIECE_DISABLED_DELAY);
}
/*
* pause function - to pause game when press enter buytton
* Board game will temperary disapper
* Display "PAUSE" message 
*/		
function pause() { 
		if (GAME_PAUSE) { 
			$("#control div.pause").removeClass("play");
			$('#board, #board-next').find(".square").removeClass("invisible");
			clearMessage();
			GAME_PAUSE = false;
			playThemeSound();
			PIECE_DOWN_TIMER = setInterval('pieceDown()', PLAYER_SPEED);
			if (LINES !== "") { 
			LINES_BLINK_TIMER = setInterval('blinkLines()', LINES_BLINK_DELAY);
		    }
		}
		else { 
			$("#control div.pause").addClass("play");
			message("pause");
			GAME_PAUSE = true;
			pauseThemeSound();
			clearInterval(PIECE_DOWN_TIMER);
			if (LINES !== "") { 
				clearInterval(LINES_BLINK_TIMER);
			}
			$('#board, #board-next').find(".square").addClass("invisible");
		}
}
/*
* startOneGame function- to start game
* calling clearMessage function amnd lunchOnePiece funtion 
*/
			
function startOneGame() { 
		GAME_SPECIAL_AUTHORIZED = true;
		clearMessage();
		launchOnePiece();
}
/*
* blinkHelp function-to make "How to play" message blink
*
*/
			
function blinkHelp() { 
		if( $('.help-button').attr("class").indexOf("yo") > -1 ) { 
			$('.help-button').removeClass("yo");
		}
		else { 
			$('.help-button').addClass("yo");
		}
}
/*
* blinkStart function- to show blinking message to let user know to star the game.
*/		
function blinkStart() { 
		if ( $('#home .start').attr("class").indexOf("invisible") > -1 ) { 
			$('#home .start').removeClass("invisible");
		}
		else { 
			$('#home .start').addClass("invisible");
		}
}
/*
* binkNames function - to make the line where user name input , and score blinks. 
*
*/			
function blinkName() { 
		if ( $('#home #score' + ENTER_NAME).attr("class") && $('#home #score' + ENTER_NAME).attr("class").indexOf("invisible") > -1 ) { 
			$('#home #position' + ENTER_NAME + ', #home #score' + ENTER_NAME).removeClass("invisible");
				if ( $("#control").css("display") === "none" ) { 
					$('#home #name' + ENTER_NAME).removeClass("invisible");
				}
		} 
		else { 
			$('#home #position' + ENTER_NAME + ', #home #score' + ENTER_NAME).addClass("invisible");
				if ( $("#control").css("display") === "none" ) { 
					$('#home #name' + ENTER_NAME).addClass("invisible");
				}
		}
}
/*
* home function- to display homepage and get ready to start game.
*
*/
			
function home() { 
		$("#panel").hide();
		$("#home").show();
				
		if (ENTER_NAME > -1) { 
			$('#home .start').addClass("invisible");
			ENTER_NAME_TIMER = setInterval('blinkName()', ENTER_NAME_DELAY);
		} 
		else { 
			GAME_START_TIMER = setInterval('blinkStart()', GAME_START_DELAY);
			playThemeSound();
	     }
}

/*
* game funtion- to show game board and starts game.
*
*/			
function game() { 
		playMoveSound();
			
		$("#home").hide();
		$("#panel").show();
				
		clearInterval(GAME_START_TIMER);
		GAME_START_TIMER = -1;
		resetAll();
		startOneGame();
}

/*
* Function to starts the program on mobile device.
* Message promp user to tounch screen to start the game.
* Sound , and Help function work when click or tab on messages icons.
*/			
$(document).ready(function() { 
        $.mobile.loading().hide();
				
		loadAllSound();
				
		if ($("#control").css("display") !== "none") { 
			$("#home .start").html(" - Touch screen to start - ");
		}
// Click on sound icons to switch between Mute and Unmute.				
        $(".sound").click(function(e) { 
		e.stopPropagation();
					
		var sound = $(this).attr("data-sound");
		if ( sound === "on" ) { 
		    $(".sound").attr("data-sound", "off");
		    $(".sound").find("img").attr("src", "Resources/Tetris/img/sound-off.png");
			muteAllSound();
			}
		else { 
			$(".sound").attr("data-sound", "on");
		    $(".sound").find("img").attr("src", "Resources/Tetris/img/sound-on.png");
		    unmuteAllSound();
			}
		});
/*
* How to play message blinking.	
* when click on the messaage , the box of direction of this game will appear. Click on message again on anywhere on the screen to make direction box disappear.
*/			
		HELP_TIMER = setInterval('blinkHelp()', HELP_DELAY);
				
				home();
	   $(".help-button, #help").click(function(e) { 
					e.stopPropagation();
					if ( $('#help').css("display") === "none") { 
						$('#help').fadeIn("slow");
						$(".help-button").hide();
						if ( $("#panel").css("display") !== "none" && !GAME_OVER && GAME_SPECIAL_AUTHORIZED && !GAME_PAUSE) { 
							pause();
						}
					} else { 
						$('#help').fadeOut("slow");
						$(".help-button").show();
					}
				});
				
                // key function	- to control tetris block but key .

				$("body").keyup(function(e) { 
					if ( $("#panel").css("display") !== "none") { 
						if (e.keyCode === 40) { 
							PLAYER_SCORE_BONUS = 0;
						}
					}
				});
				
				$("#home, #panel #board").tap(function(e) { 
					e.preventDefault();
					simulateKeydown(83);
				});
				// to move the blocks to the left when user touch screen and swipe to the left.
				$("#panel #board").swipeleft(function(e) { 
					e.preventDefault();
					simulateKeydown(37);
				});
				// to move the blocks to the right when user touch screen and swipe to the right.
				$("#panel #board").swiperight(function(e) { 
					e.preventDefault();
					simulateKeydown(39);
				});
				
				$("#board-next").tap(function(e) { 
					e.preventDefault();
					simulateKeydown(46);
				});
				// to move blocks to the right when press right key.
				$("#control div.move-right").tap(function(e) { 
					e.preventDefault();
					simulateKeydown(39);
				});
				// to move blocks to the left when press left key.
				$("#control div.move-left").tap(function(e) { 
					e.preventDefault();
					simulateKeydown(37);
				});
				// to move blocks down when press page down key.
				$("#control div.move-down").tap(function(e) { 
					e.preventDefault();
					simulateKeydown(40);
				});
				// to rotate tetris blocks moves in clockwise direction when tap screen.
				$("#control div.rotate").tap(function(e) { 
					e.preventDefault();
					simulateKeydown(83);
				});
				// to pause by tab at the pause icons when the minimize the window , or when using the game on mobile.
				$("#control div.pause").tap(function(e) { 
					e.preventDefault();
					simulateKeydown(27);
				});
				// to make preview block box disappear when click on the box, and click again to make it appear.
				$("#control div.view-next").tap(function(e) { 
					e.preventDefault();
					simulateKeydown(46);
				});
/*
* SimulateKeydown Function
* to simulate the game by press keys.
*/	
function simulateKeydown(code) { 
	var e = jQuery.Event("keydown");
		e.keyCode = code;
		jQuery('body').trigger(e);
}
				$("body").keydown(function(e) { 
					e.preventDefault();
					e.stopPropagation();
					if ( $("#help").css("display") !== "none" ) { 
						$('#help').fadeOut("slow");
						$(".help-button").show();
					} else { 				
						if ( $("#panel").css("display") === "none" ) { 
							if ( ENTER_NAME_TIMER > -1 ) { 
								playMoveSound();
								if ( $("#control").css("display") === "none" ) { 
									if (e.keyCode === 8 && ENTER_NAME_POSITION > 0) { 
										ENTER_NAME_POSITION --;
										var n = $('#home #name' + ENTER_NAME).html();
										n = n.replaceAt(ENTER_NAME_POSITION, ENTER_NAME_DEFAULT_CHAR);
										$('#home #name' + ENTER_NAME).html(n);
									} else if (e.keyCode >= 65 && e.keyCode <= 90 && ENTER_NAME_POSITION < ENTER_NAME_MAX_CHAR) { 
										var n = $('#home #name' + ENTER_NAME).html();
										n = n.replaceAt(ENTER_NAME_POSITION, String.fromCharCode(e.keyCode));
										$('#home #name' + ENTER_NAME).html(n);
										ENTER_NAME_POSITION ++;
									} else if (e.keyCode === 13) { 
										var n = $('#home #name' + ENTER_NAME).html();
										$('#home #name' + ENTER_NAME).html(n.split(ENTER_NAME_DEFAULT_CHAR).join(''));
										eval('SCORE_' + ENTER_NAME + '_NAME = n.split("' + ENTER_NAME_DEFAULT_CHAR + '").join("");');
										clearInterval(ENTER_NAME_TIMER);
										$('#home #position' + ENTER_NAME + ', #home #score' + ENTER_NAME + ', #home #name' + ENTER_NAME).removeClass("invisible");
										ENTER_NAME = -1;
										ENTER_NAME_TIMER = -1;
										ENTER_NAME_POSITION = 0;
										home();
									}
								} else { 
									if (e.keyCode === 13) { 
										eval('SCORE_' + ENTER_NAME + '_NAME = $("#name-input").val()');
										$('#home #name' + ENTER_NAME).html($("#name-input").val());
										clearInterval(ENTER_NAME_TIMER);
										$('#home #position' + ENTER_NAME + ', #home #score' + ENTER_NAME + ', #home #name' + ENTER_NAME).removeClass("invisible");
										$('#home #name' + ENTER_NAME).find('input').remove();
										ENTER_NAME = -1;
										ENTER_NAME_TIMER = -1;
										ENTER_NAME_POSITION = 0;
										home();
									}
								}
							} else { 
								game();
							}
						} else { 
							if (GAME_OVER) { 
								home();
							} else { 
								if ((e.keyCode === 27 || e.keyCode === 19 || e.keyCode === 13 || e.keyCode === 80) && GAME_SPECIAL_AUTHORIZED) { 
									pause();
								}
							
								if ( PIECE_CONTROL !== "NULL" && !GAME_PAUSE ) { 
								
									if (e.keyCode === 46 || e.keyCode === 8) { 
										nextMasked();
									}
								
									var c = getPieceControlId();
									var y = getPieceControlPositionY();
									var x = getPieceControlPositionX();
									var p = getPieceControlType();
									var m = getPieceControlRotate();
											
									if (e.keyCode === 40) { 
										if ($("#control").css("display") === "none") { 
											PLAYER_SCORE_BONUS ++;
										}
										y --;
										playMoveSound();
										pieceDown();
									} else { 			

										var moveSound = false;
										var rotateSound = false;
										if (e.keyCode === 39) { 
											x ++; moveSound = true;
										} else if (e.keyCode === 37) { 
											x --; moveSound = true;
										} else if (e.keyCode === 83 || e.keyCode === 38 || e.keyCode === 17 || e.keyCode === 32) { 
											m ++; if (m > 4) m = 1; rotateSound = true;
										} else if (e.keyCode === 81 || e.keyCode === 65) { 
											m --; if (m < 1) m = 4; rotateSound = true;
										}

										if (canMove(p, x, y, m, PIECE_CONTROL)) { 
											
											if (moveSound) { 
												playMoveSound();
											} else if (rotateSound) { 
												playRotateSound();
											}
										
											$('#board').find(".square[piece-id='" + PIECE_CONTROL + "']").removeClass("piece" + p).removeAttr("piece-id").removeAttr("piece-catch").removeAttr("piece-move");
											drawPiece(p, x, y, m, PIECE_CONTROL);
											$('#board').find(".square[piece-id='" + PIECE_CONTROL + "'][piece-catch='yes']").attr("piece-move", m);
										}
									}
								}
							}
						}
					}
				});
			});