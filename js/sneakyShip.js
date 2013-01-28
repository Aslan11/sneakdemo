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
var stepDown = 0;
var eStepD = 0;
var stepUp = 0;
var eStepU = 0;
var stepL = 0;
var eStepL = 0;
var stepR = 0;
var eStepR= 0;
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
var eFacing = 0;
var eGridX = 0;
var eGridy = 0;
//Enemy 2 step variables
//////////////////////////////////////
var e1Stepper = 0;
var e1NewX = 0;
var e1NewY = 0;
var e1StepL = 0;
var e1StepR = 0;
var e1StepU = 0;
var e1StepD = 0;
var e1Facing = 0;
var e1GridX = 0;
var e1Gridy = 0;
//Enemy 3 step variables
//////////////////////////////////////
var e2Stepper = 0;
var e2NewX = 0;
var e2NewY = 0;
var e2StepL = 0;
var e2StepR = 0;
var e2StepU = 0;
var e2StepD = 0;
var e2Facing = 0;
var e2GridX = 0;
var e2Gridy = 0;
//Enemy 4 step variables
//////////////////////////////////////
var e3Stepper = 0;
var e3NewX = 0;
var e3NewY = 0;
var e3StepL = 0;
var e3StepR = 0;
var e3StepU = 0;
var e3StepD = 0;
var e3Facing = 0;
var e3GridX = 0;
var e3Gridy = 0;

//Enemy 5 step variables
//////////////////////////////////////
var e4Stepper = 0;
var e4NewX = 0;
var e4NewY = 0;
var e4StepL = 0;
var e4StepR = 0;
var e4StepU = 0;
var e4StepD = 0;
var e4GridX = 0;
var e4Gridy = 0;

// add variables for arrest method
var heroSpotted = false;

//Add points for the monster to pat to:
///////////////////////////////////////
var aim = 1;
var targ1y = 438;
var targ2x =  12;
var targ3y = 335;
var targ4x = 120;

//add points for the monster1 to pat to:
///////////////////////////////////////////
var aim1 = 1;
var targ11y = 226;
var targ12x =  12;
var targ13y = 30;
var targ14x = 120

//add points for the monster2 to pat to:
///////////////////////////////////////////
var aim2 = 1;
var targ21y = 144;
var targ22x =  310;
var targ23y = 295;
var targ24x = 162;

//add points for the monster3 to pat to:
///////////////////////////////////////////
var aim3 = 1;
var targ32y = 440;
var targ31x =  155;
var targ34y = 288;
var targ33x = 310;

//add points for monster 1.1(4) to pat to:
//////////////////////////////////////////
var aim4 = 3;
var targ41y = 226;
var targ42x =  12;
var targ43y = 30;
var targ44x = 120
 
var level2 = new Array(32);
for(i=0; i<32; i++)
{
	level2[i] = new Array(30);
}

//Generate map of objects
var myArray = new Array(32);
//make map of objects 2 dimensional
for(i=0; i<32; i++)
{
	myArray[i] = new Array(30);
}

var mapDigits = "11111111111110000011111111111111 11100001110000000000020000000001 10000000010000000000000000000001 10000000010000000000000000000001 10042240010000000000011111111001 10023320011111111111110000000001 10023320000000000000010000000001 10042240000000000000010042424001 10023320011111111110010024242001 10023320010000000000010024342001 10042240010000000000010042324001 10023320010021111120010024342001 10023320010014434410010042324001 10042240010014232410010024342001 10000000010013333310010042324001 10000000010014232410010024342001 11400004110014434410010042324001 10000000010021111120010024342001 10004400010000000000010042324001 10000000010000000000010024342001 11400004110021111120010042424001 10000000010014434410010024242001 10000000010014232410010000000001 10014410010013333310010000000001 10040040010014232410011111111001 10040040010014434410000000000001 10014410010021111120000000000001 10000000010000000000010000000001 10000000010000000000010000000001 11110011111111111111111111111111";

var k = 0;
var i = 0;

var k1 = 0;
var i1 = 0;
// myArray[32][30] (i)(k)
for(z = 0; z < mapDigits.length; z++)
{
	if ((mapDigits.charAt(z))==(' '))
	{
		k = k + 1;
		i = 0;
		
	}
	else if((mapDigits.charAt(z))!=(' '))
	{
		myArray[i][k]=mapDigits.charAt(z);
		i = i + 1;
	}
}


//game running?
var running = false;

//facing 
var faced = 0;
var facing = 0;


// tock


tockReady = false;

var tockImage = new Image();
tockImage.src = "images/rPortal.png";

var leftDoor = new Image();
leftDoor.src = "images/doorLeft.png";

var rightDoor = new Image();
rightDoor.src = "images/doorRight.png";

var deckImage = new Image();
deckImage.src = "images/deck.png";

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

var purpsImage = new Image();
purpsImage.src = "images/pestilence.png";

var LcornerImage = new Image();
LcornerImage.src = "images/upLcorner.png";

var RcornerImage = new Image();
RcornerImage.src = "images/upRcorner.png";

var backWallImage = new Image();
backWallImage.src = "images/backWall.png";

var leftWallImage = new Image();
leftWallImage.src = "images/leftWall.png";

var rightWallImage = new Image();
rightWallImage.src = "images/rightWall.png";

var tileImage = new Image();
tileImage.src = "images/tile.png";

var carpetImage = new Image();
carpetImage.src = "images/carpetFill.png";

var darkImage = new Image();
darkImage.src = "images/darkTile.png";

var keyTile =  new Image()
keyTile.src = "images/yPortal1.png";

var keyTile2 = new Image();
keyTile2.src = "images/yPortal1.png";

var reflector = new Image();
reflector.src = "images/reflecta1.png"

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

// Enemy image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/enemyDown1.png";

// Enemy1 image
var monster1Ready = false;
var monster1Image = new Image();
monster1Image.onload = function () {
	monster1Ready = true;
};
monster1Image.src = "images/enemyDown1.png";

// Enemy2 image
var monster2Ready = false;
var monster2Image = new Image();
monster2Image.onload = function () {
	monster2Ready = true;
};
monster2Image.src = "images/enemyUp1.png";

// Enemy3 image
var monster3Ready = false;
var monster3Image = new Image();
monster3Image.onload = function () {
	monster3Ready = true;
};
monster3Image.src = "images/enemyLeft1.png";

// Enemy4 image
var monster4Ready = false;
var monster4Image = new Image();
monster4Image.onload = function () {
	monster4Ready = true;
};
monster3Image.src = "images/enemyUp1.png";

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



function GameObj(img)
{
	this.imgFile = imgFile;
}
GameObj.prototype.drawInGame = function()
{
	ctx.drawImage(this.imgFile, this.x, this.y);
};
function Enemy()
{
	this.img = "";
};
Enemy.prototype = {
	step : function(direction, state)
	{

	}
};

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
//movement in pixels per second
var monster = {
	speed: 50
};

var monster1 = {
	speed: 50
};

var monster2 = {
	speed: 50
};

var monster3 = {
	speed: 50
};

var monster4 = {
	speed: 50
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
	monster.x = 115;
	monster.y = 384;
	
	monster1.x = 115;
	monster1.y = 60;
	
	monster2.x = 160;
	monster2.y = 214;
	
	monster3.x = 305;
	monster3.y = 290;
	
	monster4.x = 12;
	monster4.y = 208;
	
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
	
// Reset the game when the player catches a monster
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
	gameState = gameState + 1;
	
};

var arrest = function() 
{
 	heroSpotted = true;
 	haltReady = true;
 	
 	if ((gridx == eGridX)&&(gridy == eGridy))
		{
			heroImage.src = "images/hero3.png";
			reset();
	    }
	if ((gridx == e1GridX)&&(gridy == e1Gridy))
		{
			heroImage.src = "images/hero3.png";
			reset();
	    }
	if ((gridx == e2GridX)&&(gridy == e2Gridy))
		{
			heroImage.src = "images/hero3.png";
			reset();
	    }
	if ((gridx == e3GridX)&&(gridy == e3Gridy))
		{
			heroImage.src = "images/hero3.png";
			reset();
	    }
	if ((gridx == e4GridX)&&(gridy == e4Gridy))
		{
			heroImage.src = "images/hero3.png";
			reset();
	    }
	if ((gridx + 1 == eGridX)&&(gridy == eGridy))
		{
			heroImage.src = "images/hero3.png";
			reset();
	    }
	if ((gridx + 1 == e1GridX)&&(gridy == e1Gridy))
		{
			heroImage.src = "images/hero3.png";
			reset();
	    }
	if ((gridx + 1 == e2GridX)&&(gridy == e2Gridy))
		{
			heroImage.src = "images/hero3.png";
			reset();
	    }
	if ((gridx + 1 == e3GridX)&&(gridy == e3Gridy))
		{
			heroImage.src = "images/hero3.png";
			reset();
	    }
	if ((gridx + 1 == e4GridX)&&(gridy == e4Gridy))
		{
			heroImage.src = "images/hero3.png";
			reset();
	    }
	    
	 if ((gridx == eGridX)&&(gridy + 1  == eGridy))
		{
			heroImage.src = "images/hero3.png";
			reset();
	    }
	if ((gridx == e1GridX)&&(gridy + 1  == e1Gridy))
		{
			heroImage.src = "images/hero3.png";
			reset();
	    }
	if ((gridx == e2GridX)&&(gridy + 1  == e2Gridy))
		{
			heroImage.src = "images/hero3.png";
			reset();
	    }
	if ((gridx == e3GridX)&&(gridy + 1  == e3Gridy))
		{
			heroImage.src = "images/hero3.png";
			reset();
	    }
	if ((gridx == e4GridX)&&(gridy + 1  == e4Gridy))
		{
			heroImage.src = "images/hero3.png";
			reset();
	    }
	
}

var stepDowner = function()
{
	if(stepDown == 0)
	{
		heroImage.src = "images/heroDown1.png";
		setTimeout(function(){stepDown = 1;}, 50);
	}
	else if(stepDown == 1)
	{
		heroImage.src = "images/heroDown2.png";
		setTimeout(function(){stepDown = 2;}, 50);
	}
	else if(stepDown == 2)
	{
		heroImage.src = "images/heroDown3.png";
		setTimeout(function(){stepDown = 3;}, 50);
	}
	else if(stepDown == 3)
	{
		heroImage.src = "images/heroDown4.png";
		setTimeout(function(){stepDown = 0;}, 50);
	}

};
//re iterate for up
var stepUpper = function()
{
	if(stepUp == 0)
	{
		heroImage.src = "images/heroUp1.png";
		setTimeout(function(){stepUp = 1;}, 50);
	}
	else if(stepUp == 1)
	{
		heroImage.src = "images/heroUp2.png";
		setTimeout(function(){stepUp = 2;}, 50);
	}
	else if(stepUp == 2)
	{
		heroImage.src = "images/heroUp3.png";
		setTimeout(function(){stepUp = 3;}, 50);
	}
	else if(stepUp == 3)
	{
		heroImage.src = "images/heroUp4.png";
		setTimeout(function(){stepUp = 0;}, 50);
	}
};

//end reiterate up


// re iterate for left
var stepLeft = function()
{
	if(stepL == 0)
	{
		heroImage.src = "images/heroL1.png";
		setTimeout(function(){stepL = 1;}, 50);
	}
	else if(stepL == 1)
	{
		heroImage.src = "images/heroL2.png";
		setTimeout(function(){stepL = 2;}, 50);
	}
	else if(stepL == 2)
	{
		heroImage.src = "images/heroL3.png";
		setTimeout(function(){stepL = 3;}, 50);
	}
	else if(stepL == 3)
	{
		heroImage.src = "images/heroL4.png";
		setTimeout(function(){stepL = 0;}, 50);
	}
};

// end left


// re iterate right!
var stepRight = function()
{
	if(stepR == 0)
	{
		heroImage.src = "images/heroLR1.png";
		setTimeout(function(){stepR = 1;}, 50);
	}
	else if(stepR == 1)
	{
		heroImage.src = "images/heroLR2.png";
		setTimeout(function(){stepR = 2;}, 50);
	}
	else if(stepR == 2)
	{
		heroImage.src = "images/heroLR3.png";
		setTimeout(function(){stepR = 3;}, 50);
	}
	else if(stepR == 3)
	{
		heroImage.src = "images/heroLR4.png";
		setTimeout(function(){stepR = 0;}, 50);
	}
	};
// end right


// re iterate all for enemy animation
///////////////////////////////////////////////////////
var eBasicLeft = function(whichImg, stepAmt)
{
	whichImg.src = "images/enemyLeft"+(stepAmt + 1)+".png";
};

var eBasicRight = function(whichImg, stepAmt)
{
	whichImg.src = "images/enemyRight"+(stepAmt + 1)+".png";
};

var eBasicUp = function(whichImg, stepAmt)
{
	whichImg.src = "images/enemyUp"+(stepAmt + 1)+".png";
};

var eBasicDown = function(whichImg, stepAmt)
{
	whichImg.src = "images/enemyDown"+(stepAmt + 1)+".png";
};



var eStepLeft = function(eStepL)
{
	eBasicLeft(monsterImage, eStepL);
};
var eStepRight = function(eStepR)
{
	eBasicRight(monsterImage, eStepR);
};
var eStepUp = function(eStepU)
{
	eBasicUp(monsterImage, eStepU);
};
var eStepDown = function(eStepD)
{
	eBasicDown(monsterImage, eStepD);
};

//Re iterate for all enemy1
/////////////////////////////////////
var e1StepLeft = function(eStepL)
{
	eBasicLeft(monster1Image, eStepL);
};
var e1StepRight = function(eStepR)
{
	eBasicRight(monster1Image, eStepR);
};
var e1StepUp = function(eStepU)
{
	eBasicUp(monster1Image, eStepU);
};
var e1StepDown = function(eStepD)
{
	eBasicDown(monster1Image, eStepD);
};

//Re iterate for all enemy2
/////////////////////////////////////
var e2StepLeft = function(eStepL)
{
	eBasicLeft(monster2Image, eStepL);
};
var e2StepRight = function(eStepR)
{
	eBasicRight(monster2Image, eStepR);
};
var e2StepUp = function(eStepU)
{
	eBasicUp(monster2Image, eStepU);
};
var e2StepDown = function(eStepD)
{
	eBasicDown(monster2Image, eStepD);
};

//Re iterate for all enemy3
/////////////////////////////////////
var e3StepLeft = function(eStepL)
{
	eBasicLeft(monster3Image, eStepL);
};
var e3StepRight = function(eStepR)
{
	eBasicRight(monster3Image, eStepR);
};
var e3StepUp = function(eStepU)
{
	eBasicUp(monster3Image, eStepU);
};
var e3StepDown = function(eStepD)
{
	eBasicDown(monster3Image, eStepD);
};

//Re iterate for all enemy4
/////////////////////////////////////
var e4StepLeft = function(eStepL)
{
	eBasicLeft(monster4Image, eStepL);
};
var e4StepRight = function(eStepR)
{
	eBasicRight(monster4Image, eStepR);
};
var e4StepUp = function(eStepU)
{
	eBasicUp(monster4Image, eStepU);
};
var e4StepDown = function(eStepD)
{
	eBasicDown(monster4Image, eStepD);
};

//re iterate for enemy down
////////////////////////////////
var eAnimateD = function()
{
		eNewY = Math.floor(monster.y);
		eStepper = targ1y - monster.y;
		eStepper = Math.floor(eStepper);
	
	if(eNewY != targ1y)
		{
			if(eStepper%(10) == 0)
				{
					if(eStepD == 0)
						{
							eStepDown(0);
							eStepD = 1;
						}
					else if(eStepD == 1)
						{
							eStepDown(1);
							eStepD = 2;
						}
					else if(eStepD == 2)
						{
							eStepDown(2);
							eStepD = 3;
						}
					else if(eStepD == 3)
						{
							eStepDown(3);
							eStepD = 0;
						}
				}
	
		}
};

//re iterate for enemy1 down
////////////////////////////////
var e1AnimateD = function()
{
		e1NewY = Math.floor(monster1.y);
		e1Stepper = targ1y - monster1.y;
		e1Stepper = Math.floor(e1Stepper);
	
	if(e1NewY != targ11y)
		{
			if(e1Stepper%(10) == 0)
				{
					if(e1StepD == 0)
						{
							e1StepDown(0);
							e1StepD = 1;
						}
					else if(e1StepD == 1)
						{
							e1StepDown(1);
							e1StepD = 2;
						}
					else if(e1StepD == 2)
						{
							e1StepDown(2);
							e1StepD = 3;
						}
					else if(e1StepD == 3)
						{
							e1StepDown(3);
							e1StepD = 0;
						}
				}
	
		}
};

//re iterate for enemy2 down
////////////////////////////////
var e2AnimateD = function()
{
		e2NewY = Math.floor(monster2.y);
		e2Stepper = targ21y - monster2.y;
		e2Stepper = Math.floor(e2Stepper);
	
	if(e2NewY != targ21y)
		{
			if(e2Stepper%(10) == 0)
				{
					if(e2StepD == 0)
						{
							e2StepDown(0);
							e2StepD = 1;
						}
					else if(e2StepD == 1)
						{
							e2StepDown(1);
							e2StepD = 2;
						}
					else if(e2StepD == 2)
						{
							e2StepDown(2);
							e2StepD = 3;
						}
					else if(e2StepD == 3)
						{
							e2StepDown(3);
							e2StepD = 0;
						}
				}
	
		}
};

//re iterate for enemy3 down
////////////////////////////////
var e3AnimateD = function()
{
		e3NewY = Math.floor(monster3.y);
		e3Stepper = targ32y - monster3.y;
		e3Stepper = Math.floor(e3Stepper);
	
	if(e3NewY != targ32y)
		{
			if(e3Stepper%(10) == 0)
				{
					if(e3StepD == 0)
						{
							e3StepDown(0);
							e3StepD = 1;
						}
					else if(e3StepD == 1)
						{
							e3StepDown(1);
							e3StepD = 2;
						}
					else if(e3StepD == 2)
						{
							e3StepDown(2);
							e3StepD = 3;
						}
					else if(e3StepD == 3)
						{
							e3StepDown(3);
							e3StepD = 0;
						}
				}
	
		}
};
// re iterate for enemy 4
///////////////////////////////////
var e4AnimateD = function()
{
		e4NewY = Math.floor(monster4.y);
		e4Stepper = targ41y - monster4.y;
		e4Stepper = Math.floor(e4Stepper);
	
	if(e4NewY != targ41y)
		{
			if(e4Stepper%(10) == 0)
				{
					if(e4StepD == 0)
						{
							e4StepDown(0);
							e4StepD = 1;
						}
					else if(e4StepD == 1)
						{
							e4StepDown(1);
							e4StepD = 2;
						}
					else if(e4StepD == 2)
						{
							e4StepDown(2);
							e4StepD = 3;
						}
					else if(e4StepD == 3)
						{
							e4StepDown(3);
							e4StepD = 0;
						}
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
					if(stepUp == 0)
						{
							stepUpper(0);
							stepUp = 1;
						}
					else if(stepUp == 1)
						{
							stepUpper(1);
							stepUp = 2;
						}
					else if(stepUp == 2)
						{
							stepUpper(2);
							stepUp = 3;
						}
					else if(stepUp == 3)
						{
							stepUpper(3);
							stepUp = 0;
						}
				}
	
		}
};
// end reiterate up

// re iterate for enemy up
///////////////////////////////////////////
var eAnimateU = function()
{
		eNewY = Math.floor(monster.y);
		eStepper = monster.y - targ3y;
		eStepper = Math.floor(eStepper);
	
	if(eNewY != targ3y)
		{
			if(eStepper%(10) == 0)
				{
					if(eStepU == 0)
						{
							eStepUp(0);
							eStepU = 1;
						}
					else if(eStepU == 1)
						{
							eStepUp(1);
							eStepU = 2;
						}
					else if(eStepU == 2)
						{
							eStepUp(2);
							eStepU = 3;
						}
					else if(eStepU == 3)
						{
							eStepUp(3);
							eStepU = 0;
						}
				}
	
		}
};

// re iterate for enemy1 up
///////////////////////////////////////////
var e1AnimateU = function()
{
		e1NewY = Math.floor(monster1.y);
		e1Stepper = monster1.y - targ13y;
		e1Stepper = Math.floor(e1Stepper);
	
	if(e1NewY != targ13y)
		{
			if(e1Stepper%(10) == 0)
				{
					if(e1StepU == 0)
						{
							e1StepUp(0);
							e1StepU = 1;
						}
					else if(e1StepU == 1)
						{
							e1StepUp(1);
							e1StepU = 2;
						}
					else if(e1StepU == 2)
						{
							e1StepUp(2);
							e1StepU = 3;
						}
					else if(e1StepU == 3)
						{
							e1StepUp(3);
							e1StepU = 0;
						}
				}
	
		}
};

// re iterate for enemy2 up
///////////////////////////////////////////
var e2AnimateU = function()
{
		e2NewY = Math.floor(monster2.y);
		e2Stepper = monster2.y - targ23y;
		e2Stepper = Math.floor(e2Stepper);
	
	if(e2NewY != targ23y)
		{
			if(e2Stepper%(10) == 0)
				{
					if(e2StepU == 0)
						{
							e2StepUp(0);
							e2StepU = 1;
						}
					else if(e2StepU == 1)
						{
							e2StepUp(1);
							e2StepU = 2;
						}
					else if(e2StepU == 2)
						{
							e2StepUp(2);
							e2StepU = 3;
						}
					else if(e2StepU == 3)
						{
							e2StepUp(3);
							e2StepU = 0;
						}
				}
	
		}
};

// re iterate for enemy3 up
///////////////////////////////////////////
var e3AnimateU = function()
{
		e3NewY = Math.floor(monster3.y);
		e3Stepper = monster3.y - targ34y;
		e3Stepper = Math.floor(e3Stepper);
	
	if(e3NewY != targ34y)
		{
			if(e3Stepper%(10) == 0)
				{
					if(e3StepU == 0)
						{
							e3StepUp(0);
							e3StepU = 1;
						}
					else if(e3StepU == 1)
						{
							e3StepUp(1);
							e3StepU = 2;
						}
					else if(e3StepU == 2)
						{
							e3StepUp(2);
							e3StepU = 3;
						}
					else if(e3StepU == 3)
						{
							e3StepUp(3);
							e3StepU = 0;
						}
				}
	
		}
};

// re iterate for enemy4 up
///////////////////////////////////////////
var e4AnimateU = function()
{
		e4NewY = Math.floor(monster4.y);
		e4Stepper = monster4.y - targ43y;
		e4Stepper = Math.floor(e4Stepper);
	
	if(e4NewY != targ43y)
		{
			if(e4Stepper%(10) == 0)
				{
					if(e4StepU == 0)
						{
							e4StepUp(0);
							e4StepU = 1;
						}
					else if(e4StepU == 1)
						{
							e4StepUp(1);
							e4StepU = 2;
						}
					else if(e4StepU == 2)
						{
							e4StepUp(2);
							e4StepU = 3;
						}
					else if(e4StepU == 3)
						{
							e4StepUp(3);
							e4StepU = 0;
						}
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
			if(stepper%(10) == 0)
				{
					if(stepL == 0)
						{
							stepLeft(0);
							stepL = 1;
						}
					else if(stepL == 1)
						{
							stepLeft(1);
							stepL = 2;
						}
					else if(stepL == 2)
						{
							stepLeft(2);
							stepL = 3;
						}
					else if(stepL == 3)
						{
							stepLeft(3);
							stepL = 0;
						}
				}
	
		}
};

// re iterate for enemy left
////////////////////////////////////////
var eAnimateL = function()
{
		eNewX = Math.floor(monster.x);
		eStepper = monster.x - targ2x;
		eStepper = Math.floor(eStepper);
	
	if(eNewX != targ2x)
		{
			if(eStepper%(10) == 0)
				{
					if(eStepL == 0)
						{
							eStepLeft(0);
							eStepL = 1;
						}
					else if(eStepL == 1)
						{
							eStepLeft(1);
							eStepL = 2;
						}
					else if(eStepL == 2)
						{
							eStepLeft(2);
							eStepL = 3;
						}
					else if(eStepL == 3)
						{
							eStepLeft(3);
							eStepL = 0;
						}
				}
	
		}
};


// re iterate for enemy1 left
////////////////////////////////////////
var e1AnimateL = function()
{
	e1NewX = Math.floor(monster1.x);
	e1Stepper = monster1.x - targ12x;
	e1Stepper = Math.floor(e1Stepper);
	
	if(e1NewX != targ12x)
	{
		if(e1Stepper%(10) == 0)
		{
			if(e1StepL == 0)
			{
				e1StepLeft(0);
				e1StepL = 1;
			}
			else if(e1StepL == 1)
			{
				e1StepLeft(1);
				e1StepL = 2;
			}
			else if(e1StepL == 2)
			{
				e1StepLeft(2);
				e1StepL = 3;
			}
			else if(e1StepL == 3)
			{
				e1StepLeft(3);
				e1StepL = 0;
			}
		}
	}
};

// re iterate for enemy2 left
////////////////////////////////////////
var e2AnimateL = function()
{
	e2NewX = Math.floor(monster2.x);
	e2Stepper = monster2.x - targ22x;
	e2Stepper = Math.floor(e2Stepper);
	
	if(e2NewX != targ22x)
	{
		if(e2Stepper%(10) == 0)
		{
			if(e2StepL == 0)
			{
				e2StepLeft(0);
				e2StepL = 1;
			}
			else if(e2StepL == 1)
			{
				e2StepLeft(1);
				e2StepL = 2;
			}
			else if(e2StepL == 2)
			{
				e2StepLeft(2);
				e2StepL = 3;
			}
			else if(e2StepL == 3)
			{
				e2StepLeft(3);
				e2StepL = 0;
			}
		}
	}
};

// re iterate for enemy3 left
////////////////////////////////////////
var e3AnimateL = function()
{
	e3NewX = Math.floor(monster3.x);
	e3Stepper = monster3.x - targ33x;
	e3Stepper = Math.floor(e3Stepper);
	
	if(e3NewX != targ33x)
	{
		if(e3Stepper%(10) == 0)
		{
			if(e3StepL == 0)
			{
				e3StepLeft(0);
				e3StepL = 1;
			}
			else if(e3StepL == 1)
			{
				e3StepLeft(1);
				e3StepL = 2;
			}
			else if(e3StepL == 2)
			{
				e3StepLeft(2);
				e3StepL = 3;
			}
			else if(e3StepL == 3)
			{
				e3StepLeft(3);
				e3StepL = 0;
			}
		}
	}
};

// re iterate for enemy4 left
////////////////////////////////////////
var e4AnimateL = function()
{
	e4NewX = Math.floor(monster4.x);
	e4Stepper = monster4.x - targ42x;
	e4Stepper = Math.floor(e4Stepper);
	
	if(e4NewX != targ42x)
		{
			if(e4Stepper%(10) == 0)
				{
					if(e4StepL == 0)
						{
							e4StepLeft(0);
							e4StepL = 1;
						}
					else if(e4StepL == 1)
						{
							e4StepLeft(1);
							e4StepL = 2;
						}
					else if(e4StepL == 2)
						{
							e4StepLeft(2);
							e4StepL = 3;
						}
					else if(e4StepL == 3)
						{
							e4StepLeft(3);
							e4StepL = 0;
						}
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
			if(stepper%(10) == 0)
				{
					if(stepR == 0)
						{
							stepRight(0);
							stepR = 1;
						}
					else if(stepR == 1)
						{
							stepRight(1);
							stepR = 2;
						}
					else if(stepR == 2)
						{
							stepRight(2);
							stepR = 3;
						}
					else if(stepR == 3)
						{
							stepRight(3);
							stepR = 0;
						}
				}
	
		}
};

// re iterate for enemy right
//////////////////////////////////
var eAnimateR = function()
{
		eNewX = Math.floor(monster.x);
		eStepper = targ4x - monster.x;
		eStepper = Math.floor(eStepper);
	
	if(eNewX != targ4x)
		{
			if(eStepper%(10) == 0)
				{
					if(eStepR == 0)
						{
							eStepRight(0);
							eStepR = 1;
						}
					else if(eStepR == 1)
						{
							eStepRight(1);
							eStepR = 2;
						}
					else if(eStepR == 2)
						{
							eStepRight(2);
							eStepR = 3;
						}
					else if(eStepR == 3)
						{
							eStepRight(3);
							eStepR = 0;
						}
				}
	
		}
};

// re iterate for enem1y right
//////////////////////////////////
var e1AnimateR = function()
{
		e1NewX = Math.floor(monster1.x);
		e1Stepper = targ14x - monster1.x;
		e1Stepper = Math.floor(e1Stepper);
	
	if(e1NewX != targ14x)
		{
			if(e1Stepper%(10) == 0)
				{
					if(e1StepR == 0)
						{
							e1StepRight(0);
							e1StepR = 1;
						}
					else if(e1StepR == 1)
						{
							e1StepRight(1);
							e1StepR = 2;
						}
					else if(e1StepR == 2)
						{
							e1StepRight(2);
							e1StepR = 3;
						}
					else if(e1StepR == 3)
						{
							e1StepRight(3);
							e1StepR = 0;
						}
				}
	
		}
};

// re iterate for enemy2 right
//////////////////////////////////
var e2AnimateR = function()
{
		e2NewX = Math.floor(monster2.x);
		e2Stepper = targ24x - monster2.x;
		e2Stepper = Math.floor(e2Stepper);
	
	if(e2NewX != targ24x)
		{
			if(e2Stepper%(10) == 0)
				{
					if(e2StepR == 0)
						{
							e2StepRight(0);
							e2StepR = 1;
						}
					else if(e2StepR == 1)
						{
							e2StepRight(1);
							e2StepR = 2;
						}
					else if(e2StepR == 2)
						{
							e2StepRight(2);
							e2StepR = 3;
						}
					else if(e2StepR == 3)
						{
							e2StepRight(3);
							e2StepR = 0;
						}
				}
	
		}
};

// re iterate for enemy3 right
//////////////////////////////////
var e3AnimateR = function()
{
		e3NewX = Math.floor(monster3.x);
		e3Stepper = targ33x - monster3.x;
		e3Stepper = Math.floor(e3Stepper);
	
	if(e3NewX != targ33x)
		{
			if(e3Stepper%(10) == 0)
				{
					if(e3StepR == 0)
						{
							e3StepRight(0);
							e3StepR = 1;
						}
					else if(e3StepR == 1)
						{
							e3StepRight(1);
							e3StepR = 2;
						}
					else if(e3StepR == 2)
						{
							e3StepRight(2);
							e3StepR = 3;
						}
					else if(e3StepR == 3)
						{
							e3StepRight(3);
							e3StepR = 0;
						}
				}
	
		}
};

// re iterate for enemy4 right
//////////////////////////////////
var e4AnimateR = function()
{
		e4NewX = Math.floor(monster4.x);
		e4Stepper = targ44x - monster4.x;
		e4Stepper = Math.floor(e4Stepper);
	
	if(e4NewX != targ44x)
		{
			if(e4Stepper%(10) == 0)
				{
					if(e4StepR == 0)
						{
							e4StepRight(0);
							e4StepR = 1;
						}
					else if(e4StepR == 1)
						{
							e4StepRight(1);
							e4StepR = 2;
						}
					else if(e4StepR == 2)
						{
							e4StepRight(2);
							e4StepR = 3;
						}
					else if(e4StepR == 3)
						{
							e4StepRight(3);
							e4StepR = 0;
						}
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
	eGridX = Math.ceil(monster.x/16);
	eGridy = Math.ceil(monster.y/16);
	
	e1GridX = Math.ceil(monster1.x/16);
	e1Gridy = Math.ceil(monster1.y/16);
	
	e2GridX = Math.ceil(monster2.x/16);
	e2Gridy = Math.ceil(monster2.y/16);
	
	e3GridX = Math.ceil(monster3.x/16);
	e3Gridy = Math.ceil(monster3.y/16);
	
	e4GridX = Math.ceil(monster4.x/16);
	e4Gridy = Math.ceil(monster4.y/16);
	}
	if(heroSpotted == false)
	{

	if (myArray[gridx][(gridy - 1)] == 0)
	{	
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
		stepUpper();
		
	}
	}
	if (myArray[gridx][(gridy + 1)] == 0)
	{
	if (40 in keysDown) { // Player holding down
		
		hero.y += hero.speed * modifier;
		stepDowner();
	}
	}
	if (myArray[(gridx - 1)][gridy] == 0)
	{
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
		stepLeft();
	}
	}
	if(myArray[(gridx + 1)][gridy] == 0)
	{
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
		stepRight();
		
	}
	}
	
	
}
//level 2 if gamestate = 4 collision
	
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
	if((aim == 1) && (monster.y < targ1y))
	{	
		monster.y += monster.speed * modifier;
		eAnimateD();
		if(((monster.x - 5) < (hero.x)) && ((hero.x) < (monster.x + 5)))
		{
			if (hero.y > monster.y)
			{
				arrest(); 
				spotter = 0;
			}
		}
		if((targ1y - 5) < (monster.y))
		{
			aim = 2;	
		}
	}
	
	
	
	if((aim == 2) && (monster.x > targ2x))
	{
		monster.x -= monster.speed * modifier;
		eAnimateL();
		if(((monster.y - 5) < (hero.y)) && ((hero.y) < (monster.y + 5)))
		{
			if (hero.x < monster.x)
			{
				arrest(); 
				spotter = 0;
			}
		}

		if((targ2x + 5) > (monster.x))
		{
			aim = 3;
		}
	}
	
	if((aim == 3) && (monster.y > targ3y))
	{
		monster.y -= monster.speed * modifier;
		eAnimateU();
		if(((monster.x - 5) < (hero.x)) && ((hero.x) < (monster.x + 5)))
		{
			if ((hero.y < monster.y) && (hero.y > 315))
			{
				arrest();
				spotter = 0;
			}
		}

		if((targ3y + 5) > (monster.y))
		{
			aim = 4;
		}
	}
	if((aim == 4) && (monster.x < targ4x))
	{
		monster.x += monster.speed * modifier;
		eAnimateR();
		if(((monster.y - 16) < (hero.y)) && ((hero.y) < (monster.y + 5)))
		{
			if ((hero.x > monster.x) && (hero.x < 130))
			{
				arrest(); 
				spotter = 0;
			}
		}

		if((targ4x - 5) < (monster.x))
		{
			aim = 1;
		}
	}
	
	//re iterate for enemy1
	////////////////////////////////////
	
	if((aim1 == 1) && (monster1.y < targ11y))
	{
		monster1.y += monster1.speed * modifier;
		e1AnimateD();
		if(((monster1.x - 10) < (hero.x)) && ((hero.x) < (monster1.x + 10)))
		{
			if ((monster1.y < hero.y) && (hero.y < 245))
			{
				arrest(); 
				spotter = 1;
			}
		}
		if((targ11y - 5) < (monster1.y))
		{
			aim1 = 2;	
		}
	}
	
	
	
	if((aim1 == 2) && (monster1.x > targ12x))
	{
		monster1.x -= monster1.speed * modifier;
		e1AnimateL();
		if(((monster1.y - 10) < (hero.y)) && ((hero.y) < (monster1.y + 10)))
		{
			if (hero.x < monster1.x)
			{
				arrest(); 
				spotter = 1;
			}
		}
		if((targ12x + 5) > (monster1.x))
		{
			aim1 = 3;
		}
	}
	
	if((aim1 == 3) && (monster1.y > targ13y))
	{
		monster1.y -= monster1.speed * modifier;
		e1AnimateU();
		if(((monster1.x - 10) < (hero.x)) && ((hero.x) < (monster1.x + 10)))
		{
			if ((monster1.y > hero.y) && (hero.y < 200))
			{
				arrest();
				spotter = 1;
			} 
		}
		if((targ13y + 5) > (monster1.y))
		{
			aim1 = 4;
		}
	}
	if((aim1 == 4) && (monster1.x < targ14x))
	{
		monster1.x += monster1.speed * modifier;
		e1AnimateR();
		if(((monster1.y - 10) < (hero.y)) && ((hero.y) < (monster1.y + 5)))
		{
			if ((hero.x > monster1.x) && (hero.x < 120))
			{
				arrest(); 
				spotter = 1;
			}
		}

		if((targ14x - 5) < (monster1.x))
		{
			aim1 = 1;
		}
	}
	
	
	//re iterate for enemy2
	////////////////////////////////////
	
	if((aim2 == 3) && (monster2.y < targ23y))
	{
		monster2.y += monster2.speed * modifier;
		e2AnimateD();
		if(((monster2.x - 10) < (hero.x)) && ((hero.x) < (monster2.x + 10)))
		{
			if ((hero.y > monster2.y))
			{
				arrest(); 
				spotter = 2;
			}
		}
		if((targ23y - 5) < (monster2.y))
		{
			aim2 = 4;	
		}
	}
	
	
	
	if((aim2 == 4) && (monster2.x > targ24x))
	{
		monster2.x -= monster2.speed * modifier;
		e2AnimateL();
		if(((monster2.y - 10) < (hero.y)) && ((hero.y) < (monster2.y + 5)))
		{
			if ((hero.x < monster2.x) && (hero.x > 134))
			{
				arrest(); 
				spotter = 2;
			}
		}
		if((targ24x + 5) > (monster2.x))
		{
			aim2 = 1;
		}
	}
	
	if((aim2 == 1) && (monster2.y > targ21y))
	{
		monster2.y -= monster2.speed * modifier;
		e2AnimateU();
		if(((monster2.x - 10) < (hero.x)) && ((hero.x) < (monster2.x + 10)))
		{
			if((hero.y < monster2.y) && (hero.y > 118))
			{
				arrest(); 
				spotter = 2;
			}
		}
		if((targ21y + 5) > (monster2.y))
		{
			aim2 = 2;
		}
	}
	if((aim2 == 2) && (monster2.x < targ22x))
	{
		monster2.x += monster2.speed * modifier;
		e2AnimateR();
		if(((monster2.y - 10) < (hero.y)) && ((hero.y) < (monster2.y + 5)))
		{
			if ((hero.x > monster2.x) && (hero.x < 325))
			{
				arrest(); 
				spotter = 2;
			}
		}
		if((targ22x - 5) < (monster2.x))
		{
			aim2 = 3;
		}
	}
	
	
	//re iterate for enemy3
	////////////////////////////////////
	
	if((aim3 == 2) && (monster3.y < targ32y))
	{
		monster3.y += monster3.speed * modifier;
		e3AnimateD();
		if(((monster3.x - 10) < (hero.x)) && ((hero.x) < (monster3.x + 10)))
		{
			if((hero.y > monster3.y) && (hero.y > 300))
			{
				arrest(); 
				spotter = 3;
			}
		}
		if((targ32y - 5) < (monster3.y))
		{
			aim3 = 3;	
		}
	}
	
	
	
	if((aim3 == 1) && (monster3.x > targ31x))
	{
		monster3.x -= monster3.speed * modifier;
		e3AnimateL();
		if(((monster3.y - 10) < (hero.y)) && ((hero.y) < (monster3.y + 5)))
		{
			if ((hero.x < monster3.x) && (hero.x > 135))
			{
				arrest(); 
				spotter = 3;
			}
		}

		if((targ31x + 5) > (monster3.x))
		{
			aim3 = 2;
		}
	}
	
	if((aim3 == 4) && (monster3.y > targ34y))
	{
		monster3.y -= monster3.speed * modifier;
		e3AnimateU();
		if(((monster3.x - 10) < (hero.x)) && ((hero.x) < (monster3.x + 10)))
		{
			if((hero.y < monster3.y) && (hero.y > 70))
			{
				arrest(); 
				spotter = 3;
			}
		}
		if((targ34y + 5) > (monster3.y))
		{
			aim3 = 1;
		}
	}
	if((aim3 == 3) && (monster3.x < targ33x))
	{
		monster3.x += monster3.speed * modifier;
		e3AnimateR();
		if(((monster3.y - 10) < (hero.y)) && ((hero.y) < (monster3.y + 5)))
		{
			if ((hero.x > monster3.x) && (hero.x < 325))
			{
				arrest(); 
				spotter = 3;
			}
		}
		if((targ33x - 5) < (monster3.x))
		{
			aim3 = 4;
		}
	}
	
	
	//reiterate for enemy 4
	if((aim4 == 1) && (monster4.y < targ41y))
	{
		monster4.y += monster4.speed * modifier;
		e4AnimateD();
		if(((monster4.x - 10) < (hero.x)) && ((hero.x) < (monster4.x + 10)))
		{
			if ((monster4.y < hero.y) && (hero.y < 245))
			{
				arrest(); 
				spotter = 4;
			}
		}
		if((targ41y - 5) < (monster4.y))
		{
			aim4 = 2;	
		}
	}
	
	
	if((aim4 == 2) && (monster4.x > targ42x))
	{
		monster4.x -= monster4.speed * modifier;
		e4AnimateL();
		if(((monster4.y - 10) < (hero.y)) && ((hero.y) < (monster4.y + 10)))
		{
			if (hero.x < monster4.x)
			{
				arrest(); 
				spotter = 4;
			}
		}
		if((targ42x + 5) > (monster4.x))
		{
			aim4 = 3;
		}
	}
	
	if((aim4 == 3) && (monster4.y > targ43y))
	{
		monster4.y -= monster4.speed * modifier;
		e4AnimateU();
		if(((monster4.x - 10) < (hero.x)) && ((hero.x) < (monster4.x + 10)))
		{
			if ((monster4.y > hero.y) && (hero.y < 200))
			{
				arrest(); 
				spotter = 4;
			}
		}
		if((targ43y + 5) > (monster4.y))
		{
			aim4 = 4;
		}
	}
	if((aim4 == 4) && (monster4.x < targ44x))
	{
		monster4.x += monster4.speed * modifier;
		e4AnimateR();
		if(((monster4.y - 10) < (hero.y)) && ((hero.y) < (monster4.y + 5)))
		{
			if ((hero.x > monster4.x) && (hero.x < 120))
			{
				arrest(); 
				spotter = 4;
			}
		}

		if((targ44x - 5) < (monster4.x))
		{
			aim4 = 1;
		}
	}
	
	if(haltReady && spotter == 3)
		{
			if(hero.x < monster3.x)
   			monster3.x -= monster3.speed * modifier;
  		 	else if(hero.x > monster3.x)
   			monster3.x += monster3.speed * modifier;
 		  	
 		  	if(hero.y < monster3.y)
  			monster3.y -= monster3.speed * modifier;
    		else if (hero.y > monster3.y)
    		monster3.y += monster3.speed * modifier;
    		arrest();

			
		}
	if(haltReady && spotter == 2)
		{
			if(hero.x < monster2.x)
    		monster2.x -= monster2.speed * modifier;
    		else if (hero.x > monster2.x)
    		monster2.x += monster2.speed * modifier;
    		
    		if(hero.y < monster2.y)
    		monster2.y -= monster2.speed * modifier;
    		else if (hero.y > monster2.y)
    		monster2.y += monster2.speed * modifier;
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

		if (monsterReady) 
		{
			ctx.drawImage(monsterImage, monster.x, monster.y);
		}
		if (monster1Ready)
		{
			ctx.drawImage(monster1Image, monster1.x, monster1.y);
		}
		if (monster2Ready) 
		{
			ctx.drawImage(monster2Image, monster2.x, monster2.y);
		}
		if (monster3Ready) 
		{
			ctx.drawImage(monster3Image, monster3.x, monster3.y);
		}
		if (monster4Ready) 
		{
	    	ctx.drawImage(monster4Image, monster4.x, monster4.y);
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
			ctx.drawImage(haltImage, (monster.x - 70), (monster.y - 50))
		}
		
		if(haltReady && spotter == 1)
		{
			ctx.drawImage(haltImage, (monster1.x - 70), (monster1.y - 50))
		}
		if(haltReady && spotter == 2)
		{
			ctx.drawImage(haltImage, (monster2.x - 70), (monster2.y - 50))
		}
		if(haltReady && spotter == 3)
		{
			ctx.drawImage(haltImage, (monster3.x - 70), (monster3.y - 50))
		}
		if(haltReady && spotter == 4)
		{
			ctx.drawImage(haltImage, (monster4.x - 70), (monster4.y - 50))
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
//    fps = document.getElementById('fps'),
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