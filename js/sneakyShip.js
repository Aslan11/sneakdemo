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

var modifier;


//Hero Step variables
/////////////////////////////////////
var oldLx = 0;
var oldRx = 0;
var oldy = 0;
var oldUy = 0;
var newy = 0;
var newx = 0;
var stepper = 0;

var gridx = 0;
var gridy = 0;

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

for(var i = 0, k = 0, z = 0; z < mapDigits.length; z++)
{
	if (mapDigits.charAt(z)==' ')
	{
		++k;
		i = 0;
	} else
	{
		myArray[i][k]=Number(mapDigits.charAt(z));
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

var hedges = new Array();
for(var i = 0; i < 3; ++i)
{
	hedges[i] = new Image();
	hedges[i].src = "images/hedge" + (i + 1) + ".png";
}

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

function Actor()
{
	this.img = new Image();
	this.ready = false;
	this.img.onload = this.setReady(this);
	this.state = 0;
}
Actor.prototype.setReady = function(actor) {
	return function() {
		actor.ready = true;
	}
};
Actor.prototype.draw = function() {
	//if(this.ready)
	 ctx.drawImage(this.img, this.x, this.y);
};
Actor.prototype.moveBasic=function(isX, param)
{
	var amt = this.speed * modifier;
	if(param) this[isX ? "x" : "y"] -= amt;
	else this[isX ? "x" : "y"] += amt;

	this.step(isX ? (param ? 0 : 1 ) : (param ? 2 : 3));
};
Actor.prototype.moveY=function(isUp)
{
	this.moveBasic(false, isUp);
};
Actor.prototype.moveX=function(isLeft)
{
	this.moveBasic(true, isLeft);
};
Actor.prototype.step = function(dir)
{
	var dirs = ["Left", "Right", "Up", "Down"];

	++this.state;
	if(this.state == 4) this.state = 0;
	this.img.src = "images/" + this.base + dirs[dir] + (1 + this.state) + ".png";
};
function Monster()
{
	Actor.prototype.constructor.call(this);
	this.img.src = "images/enemyDown1.png";
	this.base = "enemy";
	this.speed = 50;
	this.aim = 1;
	this.lastStep = new Date();
}
Monster.prototype = new Actor(); // inherit
Monster.prototype.step = function(dir) {
	// delay monster steps for smoother animation
	var now = new Date();
	if(now - this.lastStep < 250) {
		return;
	}
	else {
		this.lastStep = now;
		Actor.prototype.step.call(this, dir);
	}
};
// x2, x4, y3, y1
// left, right, up, down
Monster.prototype.setBounds = function(arr)
{
	this.y1 = arr[0];
	this.x2 = arr[1];
	this.y3 = arr[2];
	this.x4 = arr[3];
};
function Hero(w)
{
	Actor.prototype.constructor.call(this);
	this.base = "hero";
	this.speed = 120;
	this.stand();
}
Hero.prototype = new Actor();
Hero.prototype.stand = function()
{
	this.img.src= "images/hero2.png";
};
var hero = new Hero();


var monsters = new Array();
for(var i = 0; i < 5; ++i)
{
	monsters[i] = new Monster();
}

//Add points for the monsters to pat to:
///////////////////////////////////////

var mBounds = [
	[438, 12, 335, 120],
	[226, 12, 30 , 120],
	[144, 310, 295, 162],
	[440, 155, 288, 310],
	[226, 12, 30, 120]
];

for(var i = monsters.length - 1; i >= 0; --i)
{
	var m = monsters[i];
	m.setBounds(mBounds[i]);
}

monsters[4].aim = 3;


function Arrow()
{
	Actor.prototype.constructor.call(this);
	this.img.src = "images/arrow.png";
	this.speed = 250;
}
Arrow.prototype = new Actor();
Arrow.prototype.step = function() {};

function Archer()
{
	Actor.prototype.constructor.call(this);
	this.img.src = "images/archer1.png";

	this.arrow = new Arrow();
}
Archer.prototype = new Actor();
Archer.prototype.setState = function(s) {
	this.img.src = "images/archer" + (1 + s) + ".png";
};
Archer.prototype.fire = function()
{
	this.setState(3);
	this.arrow.fired = true;
};

var archers = new Array(3);
for(var i = 2; i >= 0; --i)
{
	archers[i] = new Archer();
}
//increase speed of last arrow
archers[2].arrow.speed += 20;

var spotter = 0;

// Game objects
// speed = movement in pixels per second **** adding speed to cope for lag***** 120 up from 100

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
	hero.stand();
}, false);

var mRespawn = function () 
{

	var mLocs = [[115, 384], [115, 60], [160, 214], [305, 290], [12, 208]];

	for(var i = monsters.length - 1; i >=0; --i)
	{
		var m = monsters[i];
		m.aim = 1;
		m.x = mLocs[i][0];
		m.y = mLocs[i][1];
	}
	monsters[4].aim = 3;
	
	var archLocs = [322, 219, 110];
	for(var c = archers.length - 1; c>=0; --c)
	{
		var a = archers[c];
		a.x = a.arrow.x = 352;
		a.y = a.arrow.y = archLocs[c];
		a.arrow.fired = false;
	}
};


//var detected = function()
//{
	
// Reset the game when the player catches a monsters[0]
var reset = function() {
	hero.x = 65;
	hero.y = 458;

	if (gameState < 4)
		mRespawn();
		
	heroSpotted = false;
	haltReady = false;

	++gameState;
};

function arrest() 
{
	heroSpotted = true;
	haltReady = true;
	
	var m = monsters[spotter];
	if((gridx == m.gridX && gridy == m.gridY) ||
	   (gridx + 1 == m.gridX && gridy == m.gridY) ||
	   (gridx == m.gridX && gridy + 1 == m.gridY))
	{
		reset();
	}
}

// Update game objects
var update = function ()
{
	
	gridx = Math.ceil(hero.x/16);
	gridy = Math.ceil(hero.y/16);
	if(gameState == 1)
	{
		for(var i = monsters.length - 1; i>=0; --i)
		{
			var m = monsters[i];
			m.gridX = Math.ceil(m.x / 16);
			m.gridY = Math.ceil(m.y / 16);	
		}
	}
	if(heroSpotted == false)
	{
		if (myArray[gridx][(gridy - 1)] == 0)
		{
			if (38 in keysDown) // Player holding up
				hero.moveY(true);
		}
		if (myArray[gridx][(gridy + 1)] == 0)
		{
			if (40 in keysDown) // Player holding down
				hero.moveY(false);
		}
		if (myArray[(gridx - 1)][gridy] == 0)
		{
			if (37 in keysDown) // Player holding left
				hero.moveX(true);
		}
		if(myArray[(gridx + 1)][gridy] == 0)
		{
			if (39 in keysDown)// Player holding right
				hero.moveX(false);
		}
	}
//level 2 if gameState = 4 collision
	
	if(gameState != 1 && 32 in keysDown) // Player hits space 
	{
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
	if(gameState == 4 && 88 in keysDown)
	{
		gameState = 0;
	}
	if(gameState == 1 && (hero.x > 205 && hero.x < 270))
	{
		if (hero.y < 40)
		{
			gameState = 3;
		}
	}
	
	
	
	//move from spawn to target 1
if (gameState == 1)
{
	if((monsters[0].aim == 1) && (monsters[0].y < monsters[0].y1))
	{	
		monsters[0].moveY(false);
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
			monsters[0].aim = 2;
		}
	}
	if((monsters[0].aim == 2) && (monsters[0].x > monsters[0].x2))
	{
		monsters[0].moveX(true);
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
			monsters[0].aim = 3;
		}
	}
	if((monsters[0].aim == 3) && (monsters[0].y > monsters[0].y3))
	{
		monsters[0].moveY(true);
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
			monsters[0].aim = 4;
		}
	}
	if((monsters[0].aim == 4) && (monsters[0].x < monsters[0].x4))
	{
		monsters[0].moveX(false);
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
			monsters[0].aim = 1;
		}
	}
	
	function runMonster(index)
	{
	var m = monsters[index];
	if((m.aim == 1) && (m.y < m.y1))
	{
		m.moveY(false);
		if(((m.x - 10) < (hero.x)) && ((hero.x) < (m.x + 10)))
		{
			if ((m.y < hero.y) && (hero.y < 245))
			{
				arrest(); 
				spotter = index;
			}
		}
		if((m.y1 - 5) < (m.y))
		{
			m.aim = 2;	
		}
	}
	if((m.aim == 2) && (m.x > m.x2))
	{
		m.moveX(true);
		if(((m.y - 10) < (hero.y)) && ((hero.y) < (m.y + 10)))
		{
			if (hero.x < m.x)
			{
				arrest(); 
				spotter = index;
			}
		}
		if((m.x2 + 5) > (m.x))
		{
			m.aim = 3;
		}
	}
	if((m.aim == 3) && (m.y > m.y3))
	{
		m.moveY(true);
		if(((m.x - 10) < (hero.x)) && ((hero.x) < (m.x + 10)))
		{
			if ((m.y > hero.y) && (hero.y < 200))
			{
				arrest(); 
				spotter = index;
			}
		}
		if((m.y3 + 5) > (m.y))
		{
			m.aim = 4;
		}
	}
	if((m.aim == 4) && (m.x < m.x4))
	{
		m.moveX(false);
		if(((m.y - 10) < (hero.y)) && ((hero.y) < (m.y + 5)))
		{
			if ((hero.x > m.x) && (hero.x < 120))
			{
				arrest(); 
				spotter = index;
			}
		}
		if((m.x4 - 5) < (m.x))
		{
			m.aim = 1;
		}
	}
	}

	//re iterate for enemy1
	////////////////////////////////////
	runMonster(1);
	
	
	//re iterate for enemy2
	////////////////////////////////////
	
	if((monsters[2].aim == 3) && (monsters[2].y < monsters[2].y3))
	{
		monsters[2].moveY(false);
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
			monsters[2].aim = 4;	
		}
	}
	if((monsters[2].aim == 4) && (monsters[2].x > monsters[2].x4))
	{
		monsters[2].moveX(true);
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
			monsters[2].aim = 1;
		}
	}
	if((monsters[2].aim == 1) && (monsters[2].y > monsters[2].y1))
	{
		monsters[2].moveY(true);
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
			monsters[2].aim = 2;
		}
	}
	if((monsters[2].aim == 2) && (monsters[2].x < monsters[2].x2))
	{
		monsters[2].moveX(false);
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
			monsters[2].aim = 3;
		}
	}
	
	
	//re iterate for enemy3
	////////////////////////////////////
	
	if((monsters[3].aim == 2) && (monsters[3].y < monsters[3].y1))
	{
		monsters[3].moveY(false);
		if(((monsters[3].x - 10) < (hero.x)) && ((hero.x) < (monsters[3].x + 10)))
		{
			if((hero.y > monsters[3].y) && (hero.y > 300))
			{
				arrest(); 
				spotter = 3;
			}
		}
		if((monsters[3].y1 - 5) < (monsters[3].y))
		{
			monsters[3].aim = 3;	
		}
	}
	if((monsters[3].aim == 1) && (monsters[3].x > monsters[3].x2))
	{
		monsters[3].moveX(true);
		if(((monsters[3].y - 10) < (hero.y)) && ((hero.y) < (monsters[3].y + 5)))
		{
			if ((hero.x < monsters[3].x) && (hero.x > 135))
			{
				arrest(); 
				spotter = 3;
			}
		}
		if((monsters[3].x2 + 5) > (monsters[3].x))
		{
			monsters[3].aim = 2;
		}
	}
	if((monsters[3].aim == 4) && (monsters[3].y > monsters[3].y3))
	{
		monsters[3].moveY(true);
		if(((monsters[3].x - 10) < (hero.x)) && ((hero.x) < (monsters[3].x + 10)))
		{
			if((hero.y < monsters[3].y) && (hero.y > 70))
			{
				arrest(); 
				spotter = 3;
			}
		}
		if((monsters[3].y3 + 5) > (monsters[3].y))
		{
			monsters[3].aim = 1;
		}
	}
	if((monsters[3].aim == 3) && (monsters[3].x < monsters[3].x4))
	{
		monsters[3].moveX(false);
		if(((monsters[3].y - 10) < (hero.y)) && ((hero.y) < (monsters[3].y + 5)))
		{
			if ((hero.x > monsters[3].x) && (hero.x < 325))
			{
				arrest();
				spotter = 3;
			}
		}
		if((monsters[3].x4 - 5) < (monsters[3].x))
		{
			monsters[3].aim = 4;
		}
	}
	
	
	//reiterate for enemy 4
	runMonster(4);
	
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

	for(var i = 0; i < archers.length; ++i)
	{
		var arrow = archers[i].arrow;
		if(arrow.fired && arrow.x < 480)
		{
			arrow.moveX(false);
		}
	}

	//ready the archers:
	////////////////////////////////////////

	var thresholds = [[375, 340, 320], [300, 255, 230], [211, 174, 139]];

	if (hero.x > 330)
	{
		if(hero.y > 375) archers[0].setState(0);

		for(var i = 0; i < archers.length; ++i)
		{
			var a = archers[i], t = thresholds[i];
			if(hero.y < t[0]) a.setState(0);
			if(hero.y < t[1]) a.setState(1);
			if(hero.y < t[2]) a.fire();
		}
	}
}

	switch(gameState)
	{
		case 2: bgImage.src = "images/gameOver.png"; break;
		case 3:	bgImage.src = "images/success1.png"; break;
		case 0: bgImage.src = "images/start.png"; break;
	}

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
		var images = [hedges[0],  hedges[1], waterImage, hedges[2]];
		for(var q = 0; q < 32; q++)
		{
			for(var w = 0; w < 30; w++)
			{
				var n = myArray[q][w] - 1;
				if(n >= 0) ctx.drawImage(images[n], 16*q, 16*w);
			}
		}

		hero.draw();

		for(var i = monsters.length - 1; i>=0; --i)
			monsters[i].draw();
	
		for(var i = archers.length - 1; i>=0; --i)
		{
			var arch = archers[i];
			arch.draw();
			arch.arrow.draw();
		}

		if(haltReady && spotter >= 0)
		{
			var m = monsters[spotter];
			ctx.drawImage(haltImage, m.x - 70, m.y - 50);
		}
	}
		
/*
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Gamestate: " + gameState, 32, 32);
*/
};


/*****************************************************************************************************
* Changes here
*****************************************************************************************************/
//var tempFPS = [0],
//	iter = 0,
//	load = document.getElementById('load'),
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

	modifier = delta/1000;
	update();
	render();

	then = now;
};
	//fps.innerHTML = (eval(tempFPS.join('+'));



reset();
setInterval(main, 1); 