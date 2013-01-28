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