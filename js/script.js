//var town; //set to entire map
var player; //set to Williamson
player = document.getElementById('player');
player.style.border = "1px solid blue";

var gameWidth = parseInt(window.getComputedStyle(document.querySelector('#gameWindow')).getPropertyValue('width'));
var gameHeight = parseInt(window.getComputedStyle(document.querySelector('#gameWindow')).getPropertyValue('height'));

var leftArrowDown = false;
var rightArrowDown = false;
var upArrowDown = false;
var downArrowDown = false;

//This boolean sets up whether an enemy is visible based on health
var attack = true;

const PLAYER_SPEED = 15; //KEEP IT THIS NUMBER. Code depends this constant, being increments of 15.

var enemy1 = document.getElementById('enemy1');
enemy1.health = 100;

var btnStart = document.getElementById('btnStart');
var gameWin = document.getElementById("gameWindow");

var map = document.getElementById('map');
var gameTimer;

//Status bar variables
var status = document.getElementById('status');

//parsed styles
var playerX; //Left style, parsed in gameloop()
var playerY; //Top style, parsed in gameloop()

var enemyX;

// LET THE CODING BEGIN!
////////////////////////////////////////////////////////////////////////////////////////

function initializeGame(){
	// old code, works only when an img tag  of the map exists in html
	// town = document.getElementById('town');
	// town.style.left = '0px';
	// town.style.top = '0px';

	gameWin.style.backgroundImage = "url(images/town.png)";
	gameWin.style.backgroundPosition = "0px 0px";

	player.style.left = '200px';
	player.style.top = '250px';

	var obX = Math.floor(Math.random() * gameWidth/2);
	var obY = Math.floor(Math.random() * gameHeight/2);

	enemy1.style.top = obX + "px";
	enemy1.style.left = obY + "px";

	var gameTimer = setInterval(gameloop, 50);
}

//Start game
function startGame(){
	document.getElementById('introScreen').style.visibility = 'hidden';
	initializeGame();
}
//hides start menu and loads game
btnStart.addEventListener('click', startGame);


//Listens to events when user preses down on keyboard
document.addEventListener('keydown', function(event){
	if(event.keyCode==68) rightArrowDown = true;
	if(event.keyCode==65) leftArrowDown  = true;
	if(event.keyCode==87) upArrowDown = true;
	if(event.keyCode==83) downArrowDown = true;

	//shows map
	if(event.keyCode == 77) map.style.display = "block";
});

//Listens when user releases the keyboard
document.addEventListener('keyup', function(event){
	if(event.keyCode==68) rightArrowDown = false;
	if(event.keyCode==65) leftArrowDown = false;
	if(event.keyCode==87) upArrowDown = false;
	if(event.keyCode==83) downArrowDown = false;

	//hides map
	if(event.keyCode == 77) map.style.display = "none";

});

//fires attack left click
document.addEventListener('click', function() {
	//alert("hello world");
});

function gameloop() {
	//Moves williason
	playerX = parseInt(player.style.left);
	playerY = parseInt(player.style.top);

	enemyX = parseInt(enemy1.style.left);
	enemyY = parseInt(enemy1.style.top);

	if(rightArrowDown){
		player.style.left = playerX + PLAYER_SPEED + 'px';
		//changes player direction
		player.className = "";
	}
	if(leftArrowDown){
		player.style.left = playerX - PLAYER_SPEED + 'px';
		//changes player direction
		player.className = " faceLeft"
	}

	if(upArrowDown){
		player.style.top = playerY - PLAYER_SPEED + 'px';
	}

	if(downArrowDown){
		player.style.top = playerY + PLAYER_SPEED + 'px';

	}


	moveUp(playerY);
	quad2(playerY);

	var output = document.getElementById('output');
	output.style.fontSize = "20px";

	//hitDetect(playerX, enemyX, enemy1, player);

	makeIt(); //collision detection
	textBox();

	return (
			//console.log(gameWin.style.backgroundPosition),
			output.innerHTML = playerY + " = y position" + "<br/>" + playerX + " = x position"
		);
} //end game loop

	//Map moving functions. Each according to the position of background image.
	//Quadrant One
	function moveUp(y) {
		if((y < 40) && (gameWin.style.backgroundPosition == "0px 0px")) {
			console.log("map stays the same");
		}
	  else if((y > 610) && (gameWin.style.backgroundPosition = "0px 0px")) {
			//console.log("move down");
			gameWin.style.backgroundPosition = "0px 600px";
			player.style.top = "150px";
			//return console.log(gameWin.style.backgroundPosition);
		}
	}


	function quad2(y) {
		if((y == 15) && (gameWin.style.backgroundPosition == "0px 600px")) {
			gameWin.style.backgroundPosition = "0px 0px";
			player.style.top = "550px";
		}
		else if((y == 610) && (gameWin.style.backgroundPosition = "0px 0px")) {
			//console.log("move down");
			gameWin.style.backgroundPosition = "0px 600px";
			player.style.top = "150px";
			//return console.log(gameWin.style.backgroundPosition);
		}
	}

	//attacking enemy functions
	function primaryAttack() {
		if(true) {
			console.log('hit');
		}
	}

	//collision detection
	function makeIt() {
		if(rightArrowDown && attack){
						//first condition is for the left point and the second condition is for the right point
						if( (playerX > (enemyX - parseInt(player.width) - 5) ) && (playerX < enemyX + parseInt(enemy1.width) - 15 ) ) {
										if( (playerY > (enemyY - parseInt(player.height))) && (playerY < (enemyY + parseInt(enemy1.height))) ) {
											player.style.left = enemyX - parseInt(player.width) + "px";
										} //third condition
						} //second condition
		} //first condition

		if(upArrowDown && attack){
				if( (playerY > enemyY - 5) && (playerY < (enemyY + parseInt(enemy1.height) + 5 )) ) {
							if( (playerX > (enemyX - parseInt(player.width)) ) && (playerX < (enemyX + parseInt(enemy1.width))) ){
								player.style.top = enemyY + parseInt(enemy1.height)  + "px";
							}
				}
		}

		if(leftArrowDown && attack){
				if((player.offsetLeft < (enemy1.offsetLeft + parseInt(enemy1.width) - 5)) && (player.offsetLeft > enemy1.offsetLeft )){
					//second if statement checks to see if the players top is between the top of the obstacle and the bottom of the obstacle. But in order to make sure the player does walk through the top, the player.height must be subtracted from the obstacle.offsetTop.
						if((playerY > (enemyY - parseInt(player.height))) && (playerY < (enemyY + parseInt(enemy1.height)))){
							player.style.left = enemyX + parseInt(enemy1.width) + "px"; //left side of enemy
						}
				}
		}

		if(downArrowDown && attack){
			if((playerY > (enemyY - player.height - 5)) && (playerY < enemyY + enemy1.height) ){
					if((playerX > (enemyX - parseInt(player.width) )) && (player.offsetLeft < (enemy1.offsetLeft + enemy1.width))){
						player.style.top = enemy1.offsetTop - player.height + "px";
					}
			}
		}
	} //function




	var dialogueBox = document.getElementById('dialogue');
	dialogueBox.style.visibility = 'hidden';
	var talking = document.getElementById('textBox');
	var heading = document.getElementById('person');

	// okay = 0;
	// function textBox() {
	// 	"use strict";
	// 	if( player.offsetTop > (enemy1.offsetTop - player.width - 10) && player.offsetTop < (enemy1.offsetTop + 100) && player.offsetLeft > (enemy1.offsetLeft - player.width - 10) && player.offsetLeft < (enemy1.offsetLeft + enemy1.width + 10)) {
	// 		console.log('you are near the enemy');
	// 		if(okay == 1) {
	// 			person.innerHTML = 'Goblin says:';
	// 			console.log("hi");
	// 			dialogueBox.style.visibility = 'visible';
	// 			talking.innerHTML = 'hi';
	// 			}
	// 		else if(okay == 2) {
	// 			console.log("whats your name?");
	// 			talking.innerHTML = 'whats your name?';
	// 			}
	// 		else if (okay == 3) {
	// 			console.log("bye!");
	// 			talking.innerHTML = 'see you later!';
	// 			okay++;
	// 			}
	// 		else if (okay == 5) {
	// 			dialogueBox.style.visibility = 'hidden';
	// 			okay -= 5;
	// 		}
	// 	} // first if. checks if player is near bot.
	// } // function

	// enemy1.addEventListener('click', function() {
	// 	if( player.offsetTop > (enemy1.offsetTop - player.width - 10) && player.offsetTop < (enemy1.offsetTop + 100) && player.offsetLeft > (enemy1.offsetLeft - player.width - 10) && player.offsetLeft < (enemy1.offsetLeft + enemy1.width + 10)) {
	// 		okay++;
	// 		if(okay > 5) {
	// 			okay = 0;
	// 		}
	// 	}
	// });

	function textBox() {
		"use strict";
		if( player.offsetTop > (enemy1.offsetTop - player.width - 10) && player.offsetTop < (enemy1.offsetTop + 100) && player.offsetLeft > (enemy1.offsetLeft - player.width - 10) && player.offsetLeft < (enemy1.offsetLeft + enemy1.width + 10)) {
			console.log('you are near the enemy');

		} // first if. checks if player is near bot.
	} // function

//var hit = Math.floor(Math.random() * 90);

	enemy1.addEventListener('click', function() {
		if( player.offsetTop > (enemy1.offsetTop - player.width - 10) && player.offsetTop < (enemy1.offsetTop + 100) && player.offsetLeft > (enemy1.offsetLeft - player.width - 10) && player.offsetLeft < (enemy1.offsetLeft + enemy1.width + 10)) {
			enemy1.health -= Math.floor(Math.random() * 90);
			alert(enemy1.health);
			if(enemy1.health == 0 || enemy1.health < 0) {
				enemy1.style.display = "none";
				enemy1.style.zIndex = -1;
				attack = false;
				enemy1.health = 100;
			}
		}
	});
