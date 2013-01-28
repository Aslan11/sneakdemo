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