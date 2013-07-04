(function() {
	collide=new FruitGame.Collide();
	collideTest=function()
	{
		if(gameState==GAME_OVER)return;
		var fruits=fruitSystem.getParticles();
		var fruit;
		
		var bombs=bombSystem.getParticles();
		var bomb;
		
		var blade=bladeSystem.getParticles();
		var l=blade.length;
		
		while (l-- > 1)
		{
			var p1= blade[l];
			var p2=blade[l-1];
			
			for(var i in fruits)
			{
				fruit = fruits[i];
				var isCut =collide.lineInEllipse
				(
			    	[p1.position.x, p1.position.y],
			    	[p2.position.x, p2.position.y], 
			    	[fruit.position.x, fruit.position.y ],
			    	fruit.radius
				);
				if(isCut)
				{
					cutFruit(fruit);
				};
			}
			for(var j in bombs)
			{
				bomb = bombs[j];
				var p1= blade[l];
				var p2=blade[l-1];
				var isCut =collide.lineInEllipse
				(
			    	[p1.position.x, p1.position.y],
			    	[p2.position.x, p2.position.y], 
			    	[bomb.position.x, bomb.position.y ],
			    	bomb.radius
				);
				if(isCut)
				{
					cutBomb(bomb);
				};
			}
		};
	};
}());