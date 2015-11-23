var town; //set to entire map
var player; //set to Williamson
var leftArrowDown = false;
var rightArrowDown = false;
var upArrowDown = false;
var downArrowDown = false;
const PLAYER_SPEED = 10;

var gameWin = document.getElementById("gameWindow");

function startGame(){
	document.getElementById('introScreen').style.display = 'none';
	initializeGame();
}

function initializeGame(){
	// old code, works when an img tag exists in html
	// town = document.getElementById('town');
	// town.style.left = '0px';
	// town.style.top = '0px';

	player = document.getElementById('player');
	player.style.left = '200px';
	player.style.top = '250px';

	gameTimer = setInterval(gameloop, 50)
}

//Listens to events when user preses down on keyboard
document.addEventListener('keydown', function(event){
	if(event.keyCode==68) leftArrowDown = true;
	if(event.keyCode==65) rightArrowDown = true;
	if(event.keyCode==87) upArrowDown = true;
	if(event.keyCode==83) downArrowDown = true;
});

//Listens when user releases the keyboard
document.addEventListener('keyup', function(event){
	if(event.keyCode==68) leftArrowDown = false;
	if(event.keyCode==65) rightArrowDown = false;
	if(event.keyCode==87) upArrowDown = false;
	if(event.keyCode==83) downArrowDown = false;
});

function gameloop(){
	//Moves williason
	var playerX = parseInt(player.style.left);
	var playerY = parseInt(player.style.top);
	if(leftArrowDown){
		player.style.left = playerX + PLAYER_SPEED + 'px';
	}
	if(rightArrowDown){
		player.style.left = playerX - PLAYER_SPEED + 'px';
	}

	if(upArrowDown){
		player.style.top = playerY - PLAYER_SPEED + 'px';
	}

	if(downArrowDown){
		player.style.top = playerY + PLAYER_SPEED + 'px';
	}

	//Moves Map
	moveMap();
}

//Sets map position
function moveMap() {
	if(player.style.top == "600px") {
		gameWin.style.backgroundPosition = "0px 720px";
		// output.innerHTML = "hello";
	}
 }
