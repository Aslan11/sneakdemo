	if((monsters[2].aim == 3) && (monsters[2].y < monsters[2].y3))
	{
		monsters[2].moveY(false);
		monsters[2].animate(3);
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
		monsters[2].animate(0);
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
		monsters[2].animate(2);
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
		monsters[2].animate(1);
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