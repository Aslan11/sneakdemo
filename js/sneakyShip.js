// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// figure out a way to make a working load screen
var gameState = -1;

var ticker = 0;
var tockGrid = 0;

var tockOld = 0;
var tockNew = 0;


//Hero Step function
/////////////////////////////////////
var tiested = 0;
var oldLx = 0;
var oldRx = 0;
var oldy = 0;
var oldUy = 0;
var newy = 0;
var newx = 0;
var stepper = 0;

var gridx = 0;
var gridy = 0;

//Enemy step variables
///////////////////////////////////////
var eStepper = 0;
var eNewX = 0;
var eNewY = 0;
var eGridX = 0;
var eGridy = 0;
//Enemy 2 step variables
//////////////////////////////////////
var e1Stepper = 0;
var e1NewX = 0;
var e1NewY = 0;
var e1GridX = 0;
var e1Gridy = 0;
//Enemy 3 step variables
//////////////////////////////////////
var e2Stepper = 0;
var e2NewX = 0;
var e2NewY = 0;
var e2GridX = 0;
var e2Gridy = 0;
//Enemy 4 step variables
//////////////////////////////////////
var e3Stepper = 0;
var e3NewX = 0;
var e3NewY = 0;
var e3GridX = 0;
var e3Gridy = 0;

//Enemy 5 step variables
//////////////////////////////////////
var e4Stepper = 0;
var e4NewX = 0;
var e4NewY = 0;
var e4GridX = 0;
var e4Gridy = 0;

// add variables for arrest method
var heroSpotted = false;

//Generate map of objects
var myArray = new Array(32);
//make map of objects 2 dimensional
for(var i=0; i<32; i++)
{
	myArray[i] = new Array(30);
}

var mapDigits = "11111111111110000011111111111111 11100001110000000000020000000001 10000000010000000000000000000001 10000000010000000000000000000001 10042240010000000000011111111001 10023320011111111111110000000001 10023320000000000000010000000001 10042240000000000000010042424001 10023320011111111110010024242001 10023320010000000000010024342001 10042240010000000000010042324001 10023320010021111120010024342001 10023320010014434410010042324001 10042240010014232410010024342001 10000000010013333310010042324001 10000000010014232410010024342001 11400004110014434410010042324001 10000000010021111120010024342001 10004400010000000000010042324001 10000000010000000000010024342001 11400004110021111120010042424001 10000000010014434410010024242001 10000000010014232410010000000001 10014410010013333310010000000001 10040040010014232410011111111001 10040040010014434410000000000001 10014410010021111120000000000001 10000000010000000000010000000001 10000000010000000000010000000001 11110011111111111111111111111111";

var k = 0;
var i = 0;

var k1 = 0;
var i1 = 0;
// myArray[32][30] (i)(k)
for(var z = 0; z < mapDigits.length; z++)
{
	if ((mapDigits.charAt(z))==(' '))
	{
		++k;
		i = 0;
		
	}
	else if((mapDigits.charAt(z))!=(' '))
	{
		myArray[i][k]=mapDigits.charAt(z);
		++i;
	}
}


//game running?
var running = false;

// tock
tockReady = false;

var darknessImage = new Image();
darknessImage.src = "images/fall.png";

var pillarImage = new Image();
pillarImage.src = "images/pillar.png";

var clearImage = new Image();
clearImage.src = "images/clear.png";

var hedgeImage = new Image();
hedgeImage.src = "images/hedge.png";

var hedgeImage2 = new Image();
hedgeImage2.src = "images/hedge2.png";

var hedgeImage3 = new Image();
hedgeImage3.src = "images/hedge3.png";

var waterImage = new Image();
waterImage.src = "images/water.png";

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

//speech bubble image
var haltReady = false;
var haltImage = new Image();
haltImage.src = "images/halt.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
}; heroImage.src = "images/hero2.png";

var dirs = ["Left", "Right", "Up", "Down"];
function Monster()
{
	this.img = new Image();
	this.img.src = "images/enemyDown1.png";
	this.ready = false;
	this.img.onload = this.setReady(this);
	this.speed = 50;

	this.state = 0;
}
Monster.prototype.setReady = function(theMonster) {
	return function() {
		theMonster.ready = true;
	}
};
Monster.prototype.draw = function() {
	if(this.ready) ctx.drawImage(this.img, this.x, this.y);
};
Monster.prototype.step = function(dir)
{
	++this.state;
	if(this.state == 4) this.state = 0;
	this.img.src = "images/enemy" + dirs[dir] + (1 + this.state) + ".png";
};

var monsters = new Array();
for(var i = 0; i < 5; ++i)
{
	monsters[i] = new Monster();
}

//Add points for the monster to pat to:
///////////////////////////////////////
var aim = 1;
monsters[0].y1 = 438;
monsters[0].x2 =  12;
monsters[0].y3 = 335;
monsters[0].x4 = 120;

//add points for the monster1 to pat to:
///////////////////////////////////////////
var aim1 = 1;
monsters[1].y1 = 226;
monsters[1].x2 =  12;
monsters[1].y3 = 30;
monsters[1].x4 = 120

//add points for the monster2 to pat to:
///////////////////////////////////////////
var aim2 = 1;
monsters[2].y1 = 144;
monsters[2].x2 =  310;
monsters[2].y3 = 295;
monsters[2].x4 = 162;

//add points for the monster3 to pat to:
///////////////////////////////////////////
var aim3 = 1;
monsters[3].y2 = 440;
monsters[3].x1 =  155;
monsters[3].y4 = 288;
monsters[3].x3 = 310;

//add points for monster 1.1(4) to pat to:
//////////////////////////////////////////
var aim4 = 3;
monsters[4].y1 = 226;
monsters[4].x2 =  12;
monsters[4].y3 = 30;
monsters[4].x4 = 120

// Archer1 image
var archer1Ready = false;
var archer1Image = new Image();
archer1Image.onload = function() {
	archer1Ready = true;
};
archer1Image.src = "images/archer1.png";
// Archer2 image
var archer2Ready = false;
var archer2Image = new Image();
archer2Image.onload = function() {
	archer2Ready = true;
};
archer2Image.src = "images/archer1.png";
// Archer3 image
var archer3Ready = false;
var archer3Image = new Image();
archer3Image.onload = function() {
	archer3Ready = true;
};
archer3Image.src = "images/archer1.png";
// arrow1 image
var arrow1Ready = false;
var arrow1Image = new Image();
arrow1Image.src = "images/arrow.png";

// arrow2 image
var arrow2Ready = false;
var arrow2Image = new Image();
arrow2Image.src = "images/arrow.png";

// arrow3 image
var arrow3Ready = false;
var arrow3Image = new Image();
arrow3Image.src = "images/arrow.png";

var spotter = 0;


// Game objects
var hero = {
	speed: 120 // movement in pixels per second **** adding speed to cope for lag***** 120 up from 100
};

var arrow1 = {
	speed: 250
};

var arrow2 = {
	speed: 250
};

var arrow3 = {
	speed: 270
};

var archer1 = {
};

var archer2 = {
};

var archer3 = {
};

var tock = {
	speed: 300
};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	heroImage.src = "images/hero2.png"; 
}, false);

var mRespawn = function () 
{
	monsters[0].x = 115;
	monsters[0].y = 384;
	
	monsters[1].x = 115;
	monsters[1].y = 60;
	
	monsters[2].x = 160;
	monsters[2].y = 214;
	
	monsters[3].x = 305;
	monsters[3].y = 290;
	
	monsters[4].x = 12;
	monsters[4].y = 208;
	
	archer1.x = 352;
	archer1.y = 322;
	
	archer2.x = 352;
	archer2.y = 219;
	
	archer3.x = 352;
	archer3.y = 110;
	
	arrow1.x = 352;
	arrow1.y = 322;
	
	arrow2.x = 352;
	arrow2.y = 219;
	
	arrow3.x = 352;
	arrow3.y = 110;
};

//var detected = function()
//{
	
// Reset the game when the player catches a monsters[0]
var reset = function() {
	aim = 1;
	aim1 = 1;
	aim2 = 1;
	aim3 = 1;
	aim4 = 3;
	hero.x = 65;
	hero.y = 458;
	arrow1Ready = false;
	arrow2Ready = false;
	arrow3Ready = false;
	if (gameState < 4)
		mRespawn();
		
	heroSpotted = false;
	haltReady = false;
	++gameState;
};

var arrest = function() 
{
	heroSpotted = true;
	haltReady = true;
	
	if (
		((gridx == eGridX)&&(gridy == eGridy)) ||
		((gridx == e1GridX)&&(gridy == e1Gridy)) ||
		((gridx == e2GridX)&&(gridy == e2Gridy)) ||
		((gridx == e3GridX)&&(gridy == e3Gridy)) ||
		((gridx == e4GridX)&&(gridy == e4Gridy)) ||
		((gridx + 1 == eGridX)&&(gridy == eGridy)) ||
		((gridx + 1 == e1GridX)&&(gridy == e1Gridy)) ||
		((gridx + 1 == e2GridX)&&(gridy == e2Gridy)) ||
		((gridx + 1 == e3GridX)&&(gridy == e3Gridy)) ||
		((gridx + 1 == e4GridX)&&(gridy == e4Gridy)) ||
		((gridx == eGridX)&&(gridy + 1  == eGridy)) ||
		((gridx == e1GridX)&&(gridy + 1  == e1Gridy)) ||
		((gridx == e2GridX)&&(gridy + 1  == e2Gridy)) ||
		((gridx == e3GridX)&&(gridy + 1  == e3Gridy)) ||
		((gridx == e4GridX)&&(gridy + 1  == e4Gridy))
		)
	{
		heroImage.src = "images/hero3.png";
		reset();
	}
}


var dirs = ["Left", "Right", "Up", "Down"];
function stepSwitcher(whichImg)
{
	this.img = whichImg;
	this.state = 0;
}
stepSwitcher.prototype.step = function(dir)
{
	++this.state;
	if(this.state == 4) this.state = 0;
	this.img.src = "images/hero" + dirs[dir] + (1 + this.state) + ".png";
};
var hStepper = new stepSwitcher(heroImage);


//re iterate for enemy down
////////////////////////////////
var eAnimateD = function()
{
		eNewY = Math.floor(monsters[0].y);
		eStepper = monsters[0].y1 - monsters[0].y;
		eStepper = Math.floor(eStepper);
	
	if(eNewY != monsters[0].y1)
		{
			if(eStepper % 10 == 0)
				{
					monsters[0].step(3);
				}
	
		}
};

//re iterate for enemy1 down
////////////////////////////////
var e1AnimateD = function()
{
		e1NewY = Math.floor(monsters[1].y);
		e1Stepper = monsters[0].y1 - monsters[1].y;
		e1Stepper = Math.floor(e1Stepper);
	
	if(e1NewY != monsters[1].y1)
		{
			if(e1Stepper % 10 == 0)
				{
					monsters[1].step(3);
				}
	
		}
};

//re iterate for enemy2 down
////////////////////////////////
var e2AnimateD = function()
{
		e2NewY = Math.floor(monsters[2].y);
		e2Stepper = monsters[2].y1 - monsters[2].y;
		e2Stepper = Math.floor(e2Stepper);
	
	if(e2NewY != monsters[2].y1)
		{
			if(e2Stepper % 10 == 0)
				{
					monsters[2].step(3);
				}
	
		}
};

//re iterate for enemy3 down
////////////////////////////////
var e3AnimateD = function()
{
		e3NewY = Math.floor(monsters[3].y);
		e3Stepper = monsters[3].y2 - monsters[3].y;
		e3Stepper = Math.floor(e3Stepper);
	
	if(e3NewY != monsters[3].y2)
		{
			if(e3Stepper % 10 == 0)
				{
					monsters[3].step(3);
				}
	
		}
};
// re iterate for enemy 4
///////////////////////////////////
var e4AnimateD = function()
{
		e4NewY = Math.floor(monsters[4].y);
		e4Stepper = monsters[4].y1 - monsters[4].y;
		e4Stepper = Math.floor(e4Stepper);
	
	if(e4NewY != monsters[4].y1)
		{
			if(e4Stepper % 10 == 0)
				{
					monsters[4].step(3);
				}
	
		}
};


//Reiterate for up
var animateU = function()
{
	if(oldUy != hero.y)
		{
			newy = hero.y;
			newy = Math.round(newy);
			stepper = newy - oldUy;
		}
	
	if(newy != oldUy)
		{
			if(stepper%10 == 0)
				{
					hStepper.step(2);
				}
	
		}
};
// end reiterate up

// re iterate for enemy up
///////////////////////////////////////////
var eAnimateU = function()
{
		eNewY = Math.floor(monsters[0].y);
		eStepper = monsters[0].y - monsters[3].y;
		eStepper = Math.floor(eStepper);
	
	if(eNewY != monsters[3].y)
		{
			if(eStepper % 10 == 0)
				{
					monsters[0].step(2);
				}
	
		}
};

// re iterate for enemy1 up
///////////////////////////////////////////
var e1AnimateU = function()
{
		e1NewY = Math.floor(monsters[1].y);
		e1Stepper = monsters[1].y - monsters[1].y3;
		e1Stepper = Math.floor(e1Stepper);
	
	if(e1NewY != monsters[1].y3)
		{
			if(e1Stepper % 10 == 0)
				{
					monsters[1].step(2);
				}
	
		}
};

// re iterate for enemy2 up
///////////////////////////////////////////
var e2AnimateU = function()
{
		e2NewY = Math.floor(monsters[2].y);
		e2Stepper = monsters[2].y - monsters[2].y3;
		e2Stepper = Math.floor(e2Stepper);
	
	if(e2NewY != monsters[2].y3)
		{
			if(e2Stepper % 10 == 0)
				{
					monsters[2].step(2);
				}
	
		}
};

// re iterate for enemy3 up
///////////////////////////////////////////
var e3AnimateU = function()
{
		e3NewY = Math.floor(monsters[3].y);
		e3Stepper = monsters[3].y - monsters[3].y4;
		e3Stepper = Math.floor(e3Stepper);
	
	if(e3NewY != monsters[3].y4)
		{
			if(e3Stepper % 10 == 0)
				{
					monsters[3].step(2);
				}
	
		}
};

// re iterate for enemy4 up
///////////////////////////////////////////
var e4AnimateU = function()
{
		e4NewY = Math.floor(monsters[4].y);
		e4Stepper = monsters[4].y - monsters[4].y3;
		e4Stepper = Math.floor(e4Stepper);
	
	if(e4NewY != monsters[4].y3)
		{
			if(e4Stepper % 10 == 0)
				{
					monsters[4].step(2);
				}
	
		}
};


// re iterate for left
var animateL = function()
{
	if(oldLx != hero.x)
		{
			newx = hero.x;
			newx = Math.round(newx);
			stepper = oldLx - newx;
		}
	
	if(newx != oldLx)
		{
			if(stepper % 10 == 0)
				{
					hStepper.step(0);
				}
	
		}
};

// re iterate for enemy left
////////////////////////////////////////
var eAnimateL = function()
{
		eNewX = Math.floor(monsters[0].x);
		eStepper = monsters[0].x - monsters[0].x2;
		eStepper = Math.floor(eStepper);
	
	if(eNewX != monsters[0].x2)
		{
			if(eStepper % 10 == 0)
				{
					monsters[0].step(0);
				}
	
		}
};


// re iterate for enemy1 left
////////////////////////////////////////
var e1AnimateL = function()
{
	e1NewX = Math.floor(monsters[1].x);
	e1Stepper = monsters[1].x - monsters[1].x2;
	e1Stepper = Math.floor(e1Stepper);
	
	if(e1NewX != monsters[1].x2)
	{
		if(e1Stepper % 10 == 0)
		{
			monsters[1].step(0);
		}
	}
};

// re iterate for enemy2 left
////////////////////////////////////////
var e2AnimateL = function()
{
	e2NewX = Math.floor(monsters[2].x);
	e2Stepper = monsters[2].x - monsters[2].x2;
	e2Stepper = Math.floor(e2Stepper);
	
	if(e2NewX != monsters[2].x2)
	{
		if(e2Stepper % 10 == 0)
		{
			monsters[2].step(0);
		}
	}
};

// re iterate for enemy3 left
////////////////////////////////////////
var e3AnimateL = function()
{
	e3NewX = Math.floor(monsters[3].x);
	e3Stepper = monsters[3].x - monsters[3].x3;
	e3Stepper = Math.floor(e3Stepper);
	
	if(e3NewX != monsters[3].x3)
	{
		if(e3Stepper % 10 == 0)
		{
			monsters[3].step(0);
		}
	}
};

// re iterate for enemy4 left
////////////////////////////////////////
var e4AnimateL = function()
{
	e4NewX = Math.floor(monsters[4].x);
	e4Stepper = monsters[4].x - monsters[4].x2;
	e4Stepper = Math.floor(e4Stepper);
	
	if(e4NewX != monsters[4].x2)
		{
			if(e4Stepper % 10 == 0)
				{
					monsters[4].step(0);
				}
	
		}
};





// end left

// re iterate right
var animateR = function()
{
	if(oldRx != hero.x)
		{
			newx = hero.x;
			newx = Math.round(newx);
			stepper = oldRx - newx;
		}
	
	if(newx != oldRx)
		{
			if(stepper % 10 == 0)
				{
					hStepper.step(1);
				}
	
		}
};

// re iterate for enemy right
//////////////////////////////////
var eAnimateR = function()
{
		eNewX = Math.floor(monsters[0].x);
		eStepper = monsters[4].x - monsters[0].x;
		eStepper = Math.floor(eStepper);
	
	if(eNewX != monsters[4].x)
		{
			if(eStepper % 10 == 0)
				{
					monsters[0].step(1);
				}
	
		}
};

// re iterate for enem1y right
//////////////////////////////////
var e1AnimateR = function()
{
		e1NewX = Math.floor(monsters[1].x);
		e1Stepper = monsters[1].x4 - monsters[1].x;
		e1Stepper = Math.floor(e1Stepper);
	
	if(e1NewX != monsters[1].x4)
		{
			if(e1Stepper % 10 == 0)
				{
					monsters[1].step(1);
				}
	
		}
};

// re iterate for enemy2 right
//////////////////////////////////
var e2AnimateR = function()
{
		e2NewX = Math.floor(monsters[2].x);
		e2Stepper = monsters[2].x4 - monsters[2].x;
		e2Stepper = Math.floor(e2Stepper);
	
	if(e2NewX != monsters[2].x4)
		{
			if(e2Stepper % 10 == 0)
				{
					monsters[2].step(1);
				}
	
		}
};

// re iterate for enemy3 right
//////////////////////////////////
var e3AnimateR = function()
{
		e3NewX = Math.floor(monsters[3].x);
		e3Stepper = monsters[3].x3 - monsters[3].x;
		e3Stepper = Math.floor(e3Stepper);
	
	if(e3NewX != monsters[3].x3)
		{
			if(e3Stepper % 10 == 0)
				{
					monsters[3].step(1);
				}
	
		}
};

// re iterate for enemy4 right
//////////////////////////////////
var e4AnimateR = function()
{
		e4NewX = Math.floor(monsters[4].x);
		e4Stepper = monsters[4].x4 - monsters[4].x;
		e4Stepper = Math.floor(e4Stepper);
	
	if(e4NewX != monsters[4].x4)
		{
			if(e4Stepper % 10 == 0)
				{
					monsters[4].step(1);
				}
	
		}
};




// end right

// Update game objects
var update = function (modifier)
{
	
	gridx = Math.ceil(hero.x/16);
	gridy = Math.ceil(hero.y/16);
	if(gameState == 1)
	{
	eGridX = Math.ceil(monsters[0].x/16);
	eGridy = Math.ceil(monsters[0].y/16);
	
	e1GridX = Math.ceil(monsters[1].x/16);
	e1Gridy = Math.ceil(monsters[1].y/16);
	
	e2GridX = Math.ceil(monsters[2].x/16);
	e2Gridy = Math.ceil(monsters[2].y/16);
	
	e3GridX = Math.ceil(monsters[3].x/16);
	e3Gridy = Math.ceil(monsters[3].y/16);
	
	e4GridX = Math.ceil(monsters[4].x/16);
	e4Gridy = Math.ceil(monsters[4].y/16);
	}
	if(heroSpotted == false)
	{

	if (myArray[gridx][(gridy - 1)] == 0)
	{	
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
		hStepper.step(2);
		
	}
	}
	if (myArray[gridx][(gridy + 1)] == 0)
	{
	if (40 in keysDown) { // Player holding down
		
		hero.y += hero.speed * modifier;
		hStepper.step(3);
	}
	}
	if (myArray[(gridx - 1)][gridy] == 0)
	{
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
		hStepper.step(0);
	}
	}
	if(myArray[(gridx + 1)][gridy] == 0)
	{
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
		hStepper.step(1);
	}
	}
	
	
}
//level 2 if gameState = 4 collision
	
	if(gameState != 1)
	{
	if (32 in keysDown) 
	 { // Player hits space
	 	if (gameState == 3)
	 	{
	 		hero.x = 248;
	 		hero.y = 458;
	 		tockReady = true;
	 		tock.x = 0;
	 		tock.y = 464;
	 		gameState = 0;
	 	}
		if (gameState == 2)
		{
			gameState = 0;
		}
		//if (gameState == 4)
		//{
		//	gameState = 0;	
		//}
		if (gameState == 0)
		{
			gameState = 1;
			bgImage.src = "images/background.png";
			hero.x = 65;
			hero.y = 458;
		}
	 }
	}
	if(gameState == 4)
	{
		if (88 in keysDown)
		{
			gameState = 0;
		}
	}
	if(gameState == 1)
	{
	if ((hero.x > 205) && (hero.x < 270))
	{
		if (hero.y < 40)
		{
			gameState = 3;
		}
	}
	}
	
	
	
	//move from spawn to target 1
if (gameState == 1)
{
	if((aim == 1) && (monsters[0].y < monsters[0].y1))
	{	
		monsters[0].y += monsters[0].speed * modifier;
		eAnimateD();
		if(((monsters[0].x - 5) < (hero.x)) && ((hero.x) < (monsters[0].x + 5)))
		{
			if (hero.y > monsters[0].y)
			{
				arrest(); 
				spotter = 0;
			}
		}
		if((monsters[0].y1 - 5) < (monsters[0].y))
		{
			aim = 2;	
		}
	}
	
	
	
	if((aim == 2) && (monsters[0].x > monsters[0].x2))
	{
		monsters[0].x -= monsters[0].speed * modifier;
		eAnimateL();
		if(((monsters[0].y - 5) < (hero.y)) && ((hero.y) < (monsters[0].y + 5)))
		{
			if (hero.x < monsters[0].x)
			{
				arrest(); 
				spotter = 0;
			}
		}

		if((monsters[0].x2 + 5) > (monsters[0].x))
		{
			aim = 3;
		}
	}
	
	if((aim == 3) && (monsters[0].y > monsters[0].y3))
	{
		monsters[0].y -= monsters[0].speed * modifier;
		eAnimateU();
		if(((monsters[0].x - 5) < (hero.x)) && ((hero.x) < (monsters[0].x + 5)))
		{
			if ((hero.y < monsters[0].y) && (hero.y > 315))
			{
				arrest();
				spotter = 0;
			}
		}

		if((monsters[0].y3 + 5) > (monsters[0].y))
		{
			aim = 4;
		}
	}
	if((aim == 4) && (monsters[0].x < monsters[0].x4))
	{
		monsters[0].x += monsters[0].speed * modifier;
		eAnimateR();
		if(((monsters[0].y - 16) < (hero.y)) && ((hero.y) < (monsters[0].y + 5)))
		{
			if ((hero.x > monsters[0].x) && (hero.x < 130))
			{
				arrest(); 
				spotter = 0;
			}
		}

		if((monsters[0].x4 - 5) < (monsters[0].x))
		{
			aim = 1;
		}
	}
	
	//re iterate for enemy1
	////////////////////////////////////
	
	if((aim1 == 1) && (monsters[1].y < monsters[1].y1))
	{
		monsters[1].y += monsters[1].speed * modifier;
		e1AnimateD();
		if(((monsters[1].x - 10) < (hero.x)) && ((hero.x) < (monsters[1].x + 10)))
		{
			if ((monsters[1].y < hero.y) && (hero.y < 245))
			{
				arrest(); 
				spotter = 1;
			}
		}
		if((monsters[1].y1 - 5) < (monsters[1].y))
		{
			aim1 = 2;	
		}
	}
	
	
	
	if((aim1 == 2) && (monsters[1].x > monsters[1].x2))
	{
		monsters[1].x -= monsters[1].speed * modifier;
		e1AnimateL();
		if(((monsters[1].y - 10) < (hero.y)) && ((hero.y) < (monsters[1].y + 10)))
		{
			if (hero.x < monsters[1].x)
			{
				arrest(); 
				spotter = 1;
			}
		}
		if((monsters[1].x2 + 5) > (monsters[1].x))
		{
			aim1 = 3;
		}
	}
	
	if((aim1 == 3) && (monsters[1].y > monsters[1].y3))
	{
		monsters[1].y -= monsters[1].speed * modifier;
		e1AnimateU();
		if(((monsters[1].x - 10) < (hero.x)) && ((hero.x) < (monsters[1].x + 10)))
		{
			if ((monsters[1].y > hero.y) && (hero.y < 200))
			{
				arrest();
				spotter = 1;
			} 
		}
		if((monsters[1].y3 + 5) > (monsters[1].y))
		{
			aim1 = 4;
		}
	}
	if((aim1 == 4) && (monsters[1].x < monsters[1].x4))
	{
		monsters[1].x += monsters[1].speed * modifier;
		e1AnimateR();
		if(((monsters[1].y - 10) < (hero.y)) && ((hero.y) < (monsters[1].y + 5)))
		{
			if ((hero.x > monsters[1].x) && (hero.x < 120))
			{
				arrest(); 
				spotter = 1;
			}
		}

		if((monsters[1].x4 - 5) < (monsters[1].x))
		{
			aim1 = 1;
		}
	}
	
	
	//re iterate for enemy2
	////////////////////////////////////
	
	if((aim2 == 3) && (monsters[2].y < monsters[2].y3))
	{
		monsters[2].y += monsters[2].speed * modifier;
		e2AnimateD();
		if(((monsters[2].x - 10) < (hero.x)) && ((hero.x) < (monsters[2].x + 10)))
		{
			if ((hero.y > monsters[2].y))
			{
				arrest(); 
				spotter = 2;
			}
		}
		if((monsters[2].y3 - 5) < (monsters[2].y))
		{
			aim2 = 4;	
		}
	}
	
	
	
	if((aim2 == 4) && (monsters[2].x > monsters[2].x4))
	{
		monsters[2].x -= monsters[2].speed * modifier;
		e2AnimateL();
		if(((monsters[2].y - 10) < (hero.y)) && ((hero.y) < (monsters[2].y + 5)))
		{
			if ((hero.x < monsters[2].x) && (hero.x > 134))
			{
				arrest(); 
				spotter = 2;
			}
		}
		if((monsters[2].x4 + 5) > (monsters[2].x))
		{
			aim2 = 1;
		}
	}
	
	if((aim2 == 1) && (monsters[2].y > monsters[2].y1))
	{
		monsters[2].y -= monsters[2].speed * modifier;
		e2AnimateU();
		if(((monsters[2].x - 10) < (hero.x)) && ((hero.x) < (monsters[2].x + 10)))
		{
			if((hero.y < monsters[2].y) && (hero.y > 118))
			{
				arrest(); 
				spotter = 2;
			}
		}
		if((monsters[2].y1 + 5) > (monsters[2].y))
		{
			aim2 = 2;
		}
	}
	if((aim2 == 2) && (monsters[2].x < monsters[2].x2))
	{
		monsters[2].x += monsters[2].speed * modifier;
		e2AnimateR();
		if(((monsters[2].y - 10) < (hero.y)) && ((hero.y) < (monsters[2].y + 5)))
		{
			if ((hero.x > monsters[2].x) && (hero.x < 325))
			{
				arrest(); 
				spotter = 2;
			}
		}
		if((monsters[2].x2 - 5) < (monsters[2].x))
		{
			aim2 = 3;
		}
	}
	
	
	//re iterate for enemy3
	////////////////////////////////////
	
	if((aim3 == 2) && (monsters[3].y < monsters[3].y2))
	{
		monsters[3].y += monsters[3].speed * modifier;
		e3AnimateD();
		if(((monsters[3].x - 10) < (hero.x)) && ((hero.x) < (monsters[3].x + 10)))
		{
			if((hero.y > monsters[3].y) && (hero.y > 300))
			{
				arrest(); 
				spotter = 3;
			}
		}
		if((monsters[3].y2 - 5) < (monsters[3].y))
		{
			aim3 = 3;	
		}
	}
	
	
	
	if((aim3 == 1) && (monsters[3].x > monsters[3].x1))
	{
		monsters[3].x -= monsters[3].speed * modifier;
		e3AnimateL();
		if(((monsters[3].y - 10) < (hero.y)) && ((hero.y) < (monsters[3].y + 5)))
		{
			if ((hero.x < monsters[3].x) && (hero.x > 135))
			{
				arrest(); 
				spotter = 3;
			}
		}

		if((monsters[3].x1 + 5) > (monsters[3].x))
		{
			aim3 = 2;
		}
	}
	
	if((aim3 == 4) && (monsters[3].y > monsters[3].y4))
	{
		monsters[3].y -= monsters[3].speed * modifier;
		e3AnimateU();
		if(((monsters[3].x - 10) < (hero.x)) && ((hero.x) < (monsters[3].x + 10)))
		{
			if((hero.y < monsters[3].y) && (hero.y > 70))
			{
				arrest(); 
				spotter = 3;
			}
		}
		if((monsters[3].y4 + 5) > (monsters[3].y))
		{
			aim3 = 1;
		}
	}
	if((aim3 == 3) && (monsters[3].x < monsters[3].x3))
	{
		monsters[3].x += monsters[3].speed * modifier;
		e3AnimateR();
		if(((monsters[3].y - 10) < (hero.y)) && ((hero.y) < (monsters[3].y + 5)))
		{
			if ((hero.x > monsters[3].x) && (hero.x < 325))
			{
				arrest(); 
				spotter = 3;
			}
		}
		if((monsters[3].x3 - 5) < (monsters[3].x))
		{
			aim3 = 4;
		}
	}
	
	
	//reiterate for enemy 4
	if((aim4 == 1) && (monsters[4].y < monsters[4].y1))
	{
		monsters[4].y += monsters[4].speed * modifier;
		e4AnimateD();
		if(((monsters[4].x - 10) < (hero.x)) && ((hero.x) < (monsters[4].x + 10)))
		{
			if ((monsters[4].y < hero.y) && (hero.y < 245))
			{
				arrest(); 
				spotter = 4;
			}
		}
		if((monsters[4].y1 - 5) < (monsters[4].y))
		{
			aim4 = 2;	
		}
	}
	
	
	if((aim4 == 2) && (monsters[4].x > monsters[4].x2))
	{
		monsters[4].x -= monsters[4].speed * modifier;
		e4AnimateL();
		if(((monsters[4].y - 10) < (hero.y)) && ((hero.y) < (monsters[4].y + 10)))
		{
			if (hero.x < monsters[4].x)
			{
				arrest(); 
				spotter = 4;
			}
		}
		if((monsters[4].x2 + 5) > (monsters[4].x))
		{
			aim4 = 3;
		}
	}
	
	if((aim4 == 3) && (monsters[4].y > monsters[4].y3))
	{
		monsters[4].y -= monsters[4].speed * modifier;
		e4AnimateU();
		if(((monsters[4].x - 10) < (hero.x)) && ((hero.x) < (monsters[4].x + 10)))
		{
			if ((monsters[4].y > hero.y) && (hero.y < 200))
			{
				arrest(); 
				spotter = 4;
			}
		}
		if((monsters[4].y3 + 5) > (monsters[4].y))
		{
			aim4 = 4;
		}
	}
	if((aim4 == 4) && (monsters[4].x < monsters[4].x4))
	{
		monsters[4].x += monsters[4].speed * modifier;
		e4AnimateR();
		if(((monsters[4].y - 10) < (hero.y)) && ((hero.y) < (monsters[4].y + 5)))
		{
			if ((hero.x > monsters[4].x) && (hero.x < 120))
			{
				arrest(); 
				spotter = 4;
			}
		}

		if((monsters[4].x4 - 5) < (monsters[4].x))
		{
			aim4 = 1;
		}
	}
	
	if(haltReady && spotter == 3)
		{
			if(hero.x < monsters[3].x)
			monsters[3].x -= monsters[3].speed * modifier;
  		 	else if(hero.x > monsters[3].x)
			monsters[3].x += monsters[3].speed * modifier;
 		  	
 		  	if(hero.y < monsters[3].y)
  			monsters[3].y -= monsters[3].speed * modifier;
 		else if (hero.y > monsters[3].y)
 		monsters[3].y += monsters[3].speed * modifier;
 		arrest();

			
		}
	if(haltReady && spotter == 2)
		{
			if(hero.x < monsters[2].x)
 		monsters[2].x -= monsters[2].speed * modifier;
 		else if (hero.x > monsters[2].x)
 		monsters[2].x += monsters[2].speed * modifier;
 		
 		if(hero.y < monsters[2].y)
 		monsters[2].y -= monsters[2].speed * modifier;
 		else if (hero.y > monsters[2].y)
 		monsters[2].y += monsters[2].speed * modifier;
 		arrest();
		}	
	if((arrow1Ready) && (arrow1.x < 480))
	arrow1.x += arrow1.speed * modifier;
	
	if((arrow2Ready) && (arrow2.x < 480))
	arrow2.x += arrow2.speed * modifier;
	
	if((arrow3Ready) && (arrow3.x < 480))
	arrow3.x += arrow3.speed * modifier;
	
	


	//ready the archers:
	////////////////////////////////////////
	if ((hero.x > 330) && (hero.y > 375))
 	archer1Image.src = "images/archer1.png";
 	
	if ((hero.x > 330) && (hero.y < 375))
 	archer1Image.src = "images/archer2.png";
	
	if ((hero.x > 330) && (hero.y < 340))
 	archer1Image.src = "images/archer3.png";
 	
	if ((hero.x > 330) && (hero.y < 320))
 	{
 		archer1Image.src = "images/archer4.png";
 		arrow1Ready = true;
 	}
	if ((hero.x > 330) && (hero.y < 300))
 	archer2Image.src = "images/archer2.png";
	
	if ((hero.x > 330) && (hero.y < 255))
 	archer2Image.src = "images/archer3.png";
 	
	if ((hero.x > 330) && (hero.y < 230))
	{
 	archer2Image.src = "images/archer4.png";
 	arrow2Ready = true;
	}
	if ((hero.x > 330) && (hero.y < 211))
 	archer3Image.src = "images/archer2.png";
	
	if ((hero.x > 330) && (hero.y < 174))
 	archer3Image.src = "images/archer3.png";
 	
	if ((hero.x > 330) && (hero.y < 139))
	{
 	archer3Image.src = "images/archer4.png";
 	arrow3Ready = true;
	}
	
}
 	
	if(gameState == 2)
	bgImage.src = "images/gameOver.png";
	
	if(gameState == 3)
	bgImage.src = "images/success1.png";
	
	if(gameState == 0)
	bgImage.src = "images/start.png";
		
	if(ticker == 0)
	{
	if(tock.x < 512)
	{
		tock.x += tock.speed * modifier;
	}
	}
	if(tock.x > 512)
	{
		ticker = 1;
	}
	if(ticker == 1)
	{
		if(tock.x > 0)
		{
			tock.x -= tock.speed * modifier;
		}
	}
	if (tock.x < 0)
	{
		ticker = 0;
	}
	
 
	tockGrid = Math.ceil((tock.x)/16);
	   
};

// Draw everything
var render = function () 
{
	
	if (bgReady) 
	{
		ctx.drawImage(bgImage, 0, 0);
	}
	if (gameState == 1)
	{
		for(q = 0; q < 32; q++)
		{
			for(w = 0; w < 30; w++)
			{
				switch(myArray[q][w])
				{
					case "1": ctx.drawImage(hedgeImage, 16*q, 16*w); break;
					case "2": ctx.drawImage(hedgeImage2,16*q, 16*w); break;
					case "3": ctx.drawImage(waterImage, 16*q, 16*w); break;
					case "4": ctx.drawImage(hedgeImage3,16*q, 16*w); break;
				}
			}
		}

		if (heroReady) 
		{
			ctx.drawImage(heroImage, hero.x, hero.y);
		}

		for(var i = monsters.length - 1; i>=0; --i)
		{
			monsters[i].draw();
		}
	
		if(archer1Ready)
		{
			ctx.drawImage(archer1Image, archer1.x, archer1.y);
		}
	
		if(archer2Ready)
		{
			ctx.drawImage(archer2Image, archer2.x, archer2.y);
		}
		if(archer3Ready)
		{
			ctx.drawImage(archer3Image, archer3.x, archer3.y);
		}
		if(arrow1Ready)
		{
			ctx.drawImage(arrow1Image, arrow1.x, arrow1.y);
		}
	
		if(arrow2Ready)
		{
			ctx.drawImage(arrow2Image, arrow2.x, arrow2.y);
		}
	
		if(arrow3Ready)
		{
			ctx.drawImage(arrow3Image, arrow3.x, arrow3.y);
		}
		if(haltReady && spotter == 0)
		{
			ctx.drawImage(haltImage, (monsters[0].x - 70), (monsters[0].y - 50))
		}
		
		if(haltReady && spotter == 1)
		{
			ctx.drawImage(haltImage, (monsters[1].x - 70), (monsters[1].y - 50))
		}
		if(haltReady && spotter == 2)
		{
			ctx.drawImage(haltImage, (monsters[2].x - 70), (monsters[2].y - 50))
		}
		if(haltReady && spotter == 3)
		{
			ctx.drawImage(haltImage, (monsters[3].x - 70), (monsters[3].y - 50))
		}
		if(haltReady && spotter == 4)
		{
			ctx.drawImage(haltImage, (monsters[4].x - 70), (monsters[4].y - 50))
		}
	}
		
		
		if(gameState == 1)
		ctx.drawImage(heroImage, hero.x, hero.y);
		
	

	/**
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Gamestate: " + gameState, 32, 32);
	**/	
	
};


/*****************************************************************************************************
* Changes here
*****************************************************************************************************/
//var tempFPS = [0],
//	iter = 0,
//   load = document.getElementById('load'),
//	fps = document.getElementById('fps'),
	then = Date.now(),
	now = 0,
	delta = 0;

/*****************************************************************************************************
* Changes here
*****************************************************************************************************/
// The main game loop
var main = function () {
	//iter++;
	//iter %=10;
	running = true;
	
	now = Date.now();
	delta = now - then;
	//tempFPS[iter] = 1000/delta;

	update(delta/1000);
	render();

	then = now;
};
	//fps.innerHTML = (eval(tempFPS.join('+'));



reset();
setInterval(main, 1); 