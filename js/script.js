//var town; //set to entire map
var player; //set to Williamson
player = document.getElementById('player');
player.style.width = "117px";

var leftArrowDown = false;
var rightArrowDown = false;
var upArrowDown = false;
var downArrowDown = false;
const PLAYER_SPEED = 15; //KEEP IT THIS NUMBER. Code depends this constant, being increments of 15.

var enemy1 = document.getElementById('enemy1');

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

enemy1.style.width = "100px";
enemy1.style.height = "150px";


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

	enemy1.style.top = "200px";
	enemy1.style.left = "800px";
	enemy1.style.backgroundPosition = "-10px -10px";

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
	if(event.keyCode==68) leftArrowDown = true;
	if(event.keyCode==65) rightArrowDown = true;
	if(event.keyCode==87) upArrowDown = true;
	if(event.keyCode==83) downArrowDown = true;

	//shows map
	if(event.keyCode == 77) map.style.display = "block";
});

//Listens when user releases the keyboard
document.addEventListener('keyup', function(event){
	if(event.keyCode==68) leftArrowDown = false;
	if(event.keyCode==65) rightArrowDown = false;
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

	if(leftArrowDown){
		player.style.left = playerX + PLAYER_SPEED + 'px';
		//changes player direction
		player.className = "";
	}
	if(rightArrowDown){
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

	hitDetect(playerX, enemyX, enemy1, player);


	return (
			//console.log(gameWin.style.backgroundPosition),
			output.innerHTML = playerY + " = y position" + "<br/>" + playerX + " = x position"
		);
}

	//Map moving functions. Each according to the position of background image.
	//Quadrant One
	function moveUp(y) {
		if((y == 40) && (gameWin.style.backgroundPosition == "0px 0px")) {
			console.log("map stays the same");
		}
	  else if((y == 610) && (gameWin.style.backgroundPosition = "0px 0px")) {
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
		// else if((y == 610) && (gameWin.style.backgroundPosition = "0px 0px")) {
		// 	//console.log("move down");
		// 	gameWin.style.backgroundPosition = "0px 600px";
		// 	player.style.top = "150px";
		// 	//return console.log(gameWin.style.backgroundPosition);
		// }
	}



	//attacking enemy functions
	function primaryAttack() {
		if(true) {
			console.log('hit');
		}
	}

	//basic hit detection
										//playerX, enemyX, enemy1, player
	function hitDetect(a, b, c, d) {
		//left side
		if((a + parseInt(d.style.width)) > b) {
			if(){
				//console.log('hello world', a, b);
				d.style.left = (b - 120) + "px";
				console.log("hit enemy");
			}
		}
	}
