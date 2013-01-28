	if((monsters[0].aim == 1) && (monsters[0].y < monsters[0].y1))
	{	
		monsters[0].moveY(false);
		monsters[0].animate(3);
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
		monsters[0].animate(0);
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
		monsters[0].animate(2);
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
		monsters[0].animate(1);
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