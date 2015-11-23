var town; //set to entire map
var player; //set to Williamson
var leftArrowDown = false;
var rightArrowDown = false;
var upArrowDown = false;
var downArrowDown = false;
const PLAYER_SPEED = 10;

function startGame(){
	document.getElementById('introScreen').style.display = 'none';
	initializeGame();
}

function initializeGame(){
	town = document.getElementById('town');
	town.style.left = '0px';
	town.style.top = '0px';

	player = document.getElementById('player');
	player.style.left = '500px';
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
	var townX = parseInt(town.style.left);
	var townY = parseInt(town.style.top);
	if(leftArrowDown){
		town.style.left = townX - PLAYER_SPEED + 'px';
	}
	if(rightArrowDown){
		town.style.left = townX + PLAYER_SPEED + 'px';
	}

	if(upArrowDown){
		town.style.top = townY + PLAYER_SPEED + 'px';
	}

	if(downArrowDown){
		town.style.top = townY - PLAYER_SPEED + 'px';
	}
}
