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

	gameWin.style.backgroundPosition = "0px 0px";

	var gameTimer = setInterval(gameloop, 50)
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

//Changes map position
function moveMap() {
	if(player.style.top == "600px") {
		var mapChangeTime = setInterval(mapDown, 50);
		//gameWin.style.backgroundPosition = "0px 720px";
		//gameWin.className = "mapMoveDown";
		// output.innerHTML = "hello";
		if (gameWin.style.backgroundPosition = "0px 400px") {
			clearInterval(mapChangeTime);
		}
	}
	else if (player.style.top == "-10px") {
		mapUp();
	}
 }

function mapDown() {
	// var mapX = parseInt(gameWin.style.backgroundPosition);
	var mapSpeed = -1;
	gameWin.style.backgroundPosition = "0px " + (gameWin.style.backgroundPosition + mapSpeed) + "px" ;
	console.log(gameWin.style.backgroundPosition);
}
