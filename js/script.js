var player; //set to Williamson
		player = document.getElementById('player');
var playerHealthNumber = 100;
var playerHealth;

//status bar elements
var healthMeter = document.getElementById("healthMeter");
healthMeter.style.left = "62px"; //keep at this number. this is the state of max health.
healthMeter.style.top = "68px";

//parsed styles
var playerX; //Left style, parsed in gameloop()
var playerY; //Top style, parsed in gameloop()

var gameWin = document.getElementById("gameWindow");

//TESTING PURPOSES
var output = document.getElementById('output');
output.style.fontSize = "20px";
//END TESTING

var girl = document.getElementById("girl");

//dimensions of game window
var gameWidth = parseInt(window.getComputedStyle(document.querySelector('#gameWindow')).getPropertyValue('width'));
var gameHeight = parseInt(window.getComputedStyle(document.querySelector('#gameWindow')).getPropertyValue('height'));

//WASD
var leftArrowDown = false;
var rightArrowDown = false;
var upArrowDown = false;
var downArrowDown = false;

//This boolean sets up whether an enemy is visible based on health
var attack;

//booleans that will be changed in game
var attack2 = true;

const PLAYER_SPEED = 15; //KEEP IT THIS NUMBER. Code depends this constant, being increments of 15.

//Enemeies
var enemy1 = document.getElementById('enemy1');
		enemy1.health = 100;

var enemyX;
var enemyHealth;

var btnStart = document.getElementById('btnStart'); //start button at beginning of game

//Currently set to M
var map = document.getElementById('map');

var gameTimer;

//Status bar health, weapon etc.
var status = document.getElementById('status');

//Background Map information
var	town = document.getElementById('town');
var townX; //left position of background map. Set in initializeGame()
var townY; //top position of background map. Set in initializeGame()

//Assets
var weaponList = [
	"images/bows1.png",
	"images/sword1.png"
	];

var magicList = ["images/waves7.png",
"images/fire.png",
"images/falling3.png"];

//changes weapons in status bar
var primaryWeapon = document.getElementById("primaryWeapon");
var secondaryWeapon = document.getElementById("secondaryWeapon");
primaryWeapon.src = weaponList[0];
secondaryWeapon.src = magicList[0];

var weaponPosition = 1;
var magicPosition = 1;

// LET THE CODING BEGIN!
/////////////////////////////////WILLIAMSON/////////////////////////////////

//Start game
function startGame(){
	document.getElementById('introScreen').style.visibility = 'hidden';
	initializeGame();
}

//hides start menu and loads game
btnStart.addEventListener('click', startGame);

function initializeGame(){
	//Sets map to correct position
	town.style.left = '0px';
	town.style.top = '0px';

	//Sets player position
	player.style.left = '200px';
	player.style.top = '250px';

	//variables for random position of enemy/obstacle
	var obX = Math.floor(Math.random() * gameWidth/2);
	var obY = Math.floor(Math.random() * gameHeight/2);

	//sets random position of enemy
	// enemy1.style.top = obX + "px";
	// enemy1.style.left = obY + "px";

	//begins gameloop animation
	var gameTimer = setInterval(gameloop, 50);

	//Listens to events when user preses down on keyboard
	document.addEventListener('keydown', function(event){
		//player movement
		switch(event.keyCode) {
			case 65:
				leftArrowDown = true;
				player.className = "flip";
				break;
			case 68:
				rightArrowDown = true;
				player.className = "";
				break;
			case 87:
				upArrowDown = true;
				break;
			case 83:
				downArrowDown = true;
				break;
		}

		if(event.keyCode == 80) changePic();
	  if(event.keyCode == 76) changePic2();

		//shows map
		if(event.keyCode == 77) map.style.display = "block";
	});

	//Listens when user releases the keyboard
	document.addEventListener('keyup', function(event){
		switch(event.keyCode) {
			case 65:
				leftArrowDown = false;
				break;
			case 68:
				rightArrowDown =false;
				break;
			case 87:
				upArrowDown = false;
				break;
			case 83:
				downArrowDown = false;
				break;
		}
		//hides map
		if(event.keyCode == 77) map.style.display = "none";

	});
}

//placement of characters (map position detection)
function girlPlacement() {
	if(town.style.left == "-1280px" && town.style.top == "0px") {
		console.log("good placement");
		attack = true;
		girl.style.visibility = "visible";
		girl.style.left = "300px";
		girl.style.top = "300px";
	}
	else {
		girl.style.visibility = "hidden";
		attack = false;
	}
}

function enemy1Placement() {
	if(town.style.left == "-1280px" && town.style.top == "0px") {
		enemy1.style.visibility = "visible";
		enemy1.style.left = "800px";
		enemy1.style.top = "500px";
	}
	else {
		enemy1.style.visibility = "hidden";
	}
}
//end of character placement

function changePic(){
	primaryWeapon.src = weaponList[weaponPosition];
	weaponPosition++;
	if(weaponPosition > weaponList.length -1) {
		weaponPosition = 0;
	}
	return (
		console.log(weaponPosition),
		console.log(weaponList[weaponPosition])
		);
}

function changePic2(){
	secondaryWeapon.src = magicList[magicPosition];
	magicPosition++;
	if(magicPosition > magicList.length -1) {
		magicPosition = 0;
	}
	return (
		console.log(magicPosition),
		console.log(magicList[weaponPosition])
		);
}

//Begin Game loop
function gameloop() {

	playerX = parseInt(player.style.left);
	playerY = parseInt(player.style.top);

	enemyX = parseInt(enemy1.style.left);
	enemyY = parseInt(enemy1.style.top);

	girlX = parseInt(girl.style.left);
	girlY = parseInt(girl.style.top);

	enemyHealth = document.getElementById("enemyHealth");
	enemyHealth.style.left = (enemyX + 20) + "px";
	enemyHealth.style.top = (enemyY - 50) + "px";
	enemyHealth.style.display = "none";

	playerHealth = document.getElementById("playerHealth")
	playerHealth.style.left = (playerX + 50) + "px";
	playerHealth.style.top = (playerY - 50) + "px";
	playerHealth.style.display = "none";

	//player movement
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

	//because these two are in game loop they will constantly parse the background image's position
	townX = parseInt(town.style.left);
	townY = parseInt(town.style.top);

	//map moving conditionals. Depend on players position.
	if(playerX > 1100) {
		town.style.left = (townX - 1280) + "px";
		player.style.left = "30px";
	}
	else if (playerX < 20) {
		town.style.left = (townX + 1280) + "px";
		player.style.left = "1100px";
	}
	else if(playerY < 40) {
		town.style.top = (townY + 720) +"px";
		player.style.top = "600px";
	}
	else if(playerY > 660) {
		town.style.top = (townY - 720) + "px";
		player.style.top = "100px";
	}
	//end map moving

	//These makeit() functions detect collision between player and objects
	makeIt(playerX, playerY, enemyX, enemyY, player, enemy1, attack2); //collision detection

	makeIt(playerX, playerY, girlX, girlY, player, girl, attack); //collision detection

	enemyHealthBox();
	//All character placements
	girlPlacement(); //character placement
	enemy1Placement();

	//All conversations
	textBox(player, girl, convo1, convo_1); //convo
	//textBox(player, girl);

	return (
			//console.log(gameWin.style.backgroundPosition),
			output.innerHTML = playerY + " = y position" + "<br/>" + playerX + " = x position"
		);
}
//end game loop

//attacking enemy functions
function primaryAttack() {
	if(true) {
		console.log('hit');
	}
}

//collision detection
function makeIt(a, b, c, d, obj1, obj2, booly) {
	if(rightArrowDown && booly){
					//first condition is for the left point and the second condition is for the right point
					if( (a > (c - parseInt(obj1.width) - 5) ) && (a < c + parseInt(obj2.width) - 15 ) ) {
									if( (b > (d - parseInt(obj1.height))) && (b < (d + parseInt(obj2.height))) ) {
										obj1.style.left = c - parseInt(obj1.width) + "px";
									} //third condition
					} //second condition
	} //first condition

	if(upArrowDown && booly){
			if( (b > d - 5) && (b < (d + parseInt(obj2.height) + 5 )) ) {
						if( (a > (c - parseInt(obj1.width)) ) && (a < (c + parseInt(obj2.width))) ){
							obj1.style.top = d + parseInt(obj2.height)  + "px";
						}
			}
	}

	if(leftArrowDown && booly){
			if((obj1.offsetLeft < (obj2.offsetLeft + parseInt(obj2.width) - 5)) && (obj1.offsetLeft > obj2.offsetLeft )){
				//second if statement checks to see if the plaayers top is between the top of the obstacle and the bottom of the obstacle. But in order to make sure the plaayer does walk through the top, the plaayer.height must be subtracted from the obstacle.offsetTop.
					if((b > (d - parseInt(obj1.height))) && (b < (d + parseInt(obj2.height)))){
						obj1.style.left = c + parseInt(obj2.width) + "px"; //left side of enemy
					}
			}
	}

	if(downArrowDown && booly){
		if((b > (d - obj1.height - 5)) && (b < d + obj2.height) ){
				if((a > (c - parseInt(obj1.width) )) && (obj1.offsetLeft < (obj2.offsetLeft + obj2.width))){
					obj1.style.top = obj2.offsetTop - obj1.height + "px";
				}
		}
	}
} //end collision detection

//Begin code for talking to characters
//The text box for talking to NPCs
var dialogueBox = document.getElementById('dialogue');
var talking = document.getElementById('textBox');
var heading = document.getElementById('person');
dialogueBox.style.visibility = 'hidden';

function textBox(a, b, c, d) {
	"use strict";
	if( a.offsetTop > (b.offsetTop - a.width - 10) && a.offsetTop < (b.offsetTop + 100) && a.offsetLeft > (b.offsetLeft - a.width - 10) && a.offsetLeft < (b.offsetLeft + b.width + 10)) {
		if(d == 1) {
			person.innerHTML = convo1.heading;
			dialogueBox.style.visibility = 'visible';
			talking.innerHTML = c[0];
			}
		else if(d == 2) {
			talking.innerHTML = c[1];
			}
		else if (d == 3) {
			talking.innerHTML = c[2];
			}
		else if (d == 4) {
			talking.innerHTML = c[3];
			}
	} // first if. checks if player is near bot.
} // function

//convo1
girl.addEventListener('click', apples);
function apples() {
	if( player.offsetTop > (girl.offsetTop - player.width - 10) && player.offsetTop < (girl.offsetTop + 100) && player.offsetLeft > (girl.offsetLeft - player.width - 10) && player.offsetLeft < (girl.offsetLeft + girl.width + 10)) {
		convo_1++;
		if(convo_1 > 4) {
			convo_1 = 0;
			dialogueBox.style.visibility = 'hidden';
		}
	}
}
//END code for talking to characters

//Displays Enemies health
function enemyHealthBox() {
	"use strict";
	// checks if player is near bot
	if(attack2 && player.offsetTop > (enemy1.offsetTop - player.width - 10) && player.offsetTop < (enemy1.offsetTop + 100) && player.offsetLeft > (enemy1.offsetLeft - player.width - 10) && player.offsetLeft < (enemy1.offsetLeft + enemy1.width + 10)) {
		console.log('you are near the enemy');
		enemyHealth.style.display = "block";
		playerHealth.style.display = "block";
	}
} // function

//player health going down
function playerHurt() {
	if(attack2 && player.offsetTop > (enemy1.offsetTop - player.width - 10) && player.offsetTop < (enemy1.offsetTop + 100) && player.offsetLeft > (enemy1.offsetLeft - player.width - 10) && player.offsetLeft < (enemy1.offsetLeft + enemy1.width + 10)) {
		playerHealthNumber -= 20;
		playerHealth.innerHTML = ""; //This line is key. Keeps health bar from decreasing before game starts. do not remove.
		healthMeter.style.left = (parseInt(healthMeter.style.left) - 20) + "px";
	}
}

var playerHurt = setInterval(playerHurt, 800);

var hit = Math.floor(Math.random() * 90);

enemy1.addEventListener('click', function() {
	if( attack2 && player.offsetTop > (enemy1.offsetTop - player.width - 10) && player.offsetTop < (enemy1.offsetTop + 100) && player.offsetLeft > (enemy1.offsetLeft - player.width - 10) && player.offsetLeft < (enemy1.offsetLeft + enemy1.width + 10)) {
		enemy1.health -= Math.floor(Math.random() * 20);
		enemyHealth.innerHTML = enemy1.health;
		if(enemy1.health == 0 || enemy1.health < 0) {
			enemy1.style.display = "none";
			enemyHealth.style.display = "none";
			enemy1.style.zIndex = -1;
			attack2 = false;
			enemy1.health = 100;
		}
	}
});
