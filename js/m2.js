	if((monsters[1].aim == 1) && (monsters[1].y < monsters[1].y1))
	{
		monsters[1].moveY(false);
		monsters[1].animate(3);
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
			monsters[1].aim = 2;	
		}
	}
	if((monsters[1].aim == 2) && (monsters[1].x > monsters[1].x2))
	{
		monsters[1].moveX(true);
		monsters[1].animate(0);
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
			monsters[1].aim = 3;
		}
	}
	if((monsters[1].aim == 3) && (monsters[1].y > monsters[1].y3))
	{
		monsters[1].moveY(true);
		monsters[1].animate(2);
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
			monsters[1].aim = 4;
		}
	}
	if((monsters[1].aim == 4) && (monsters[1].x < monsters[1].x4))
	{
		monsters[1].moveX(false);
		monsters[1].animate(1);
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
			monsters[1].aim = 1;
		}
	}