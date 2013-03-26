(function() {

	//jucie
	var juiceUpdate=function()
	{
		this.scale-=0.013;
		if(this.scale<0)
		{
			this.scale=0;
			this.life=0;
		}
	};
	var buildJuice=function(target,juiceCount)
	{
		for(var i=0;i<juiceCount;i++)
		{
			var juice = particleSystem.createParticle(SPP.SpriteImage);
			juice.init(target.position.x,target.position.y,Infinity,target.textureObj.j,middleContext);
			juice.onUpdate=juiceUpdate;
			juice.scale=Math.random()*0.7;
			juice.damp.reset(0, 0);
			juice.velocity.reset(0, -(4 + Math.random() * 4));
			juice.velocity.rotate(360*Math.random());
			juice.addForce("g", gravity);
		}
	};
	//splash
	var splashUpdate=function()
	{
		this.alpha-=0.005;
		if(this.alpha<0)
		{
			this.alpha=0;
			this.life=0;
		};
	};
	var buildSplash =function(target)
	{
		var splash = particleSystem.createParticle(SPP.SpriteImage);
		splash.init(target.position.x,target.position.y,Infinity,target.textureObj.s,bottomContext);
		splash.onUpdate=splashUpdate;
		splash.scale=1+Math.random();
		splash.rotation=Math.PI*2*Math.random();
	};
	var  buildHalfFruit=function(target)
	{
		var speed=3+ Math.random() * 3;
		
		var right = particleSystem.createParticle(FruitGame.Fruit);
		right.init(target.position.x,target.position.y,Infinity,target.textureObj.r,assetsManager.shadow,middleContext);
		right.velocity.reset(0, -speed);
		right.velocity.rotate(20*Math.random());
		right.damp.reset(0, 0);
		right.rotation=target.rotation;
		right.bottomY=gameHeight+target.textureObj.r.height;
		right.addForce("g", gravity);
		
		var left=  particleSystem.createParticle(FruitGame.Fruit);
		left.init(target.position.x,target.position.y,Infinity,target.textureObj.l,assetsManager.shadow,middleContext);
		left.velocity.reset(0, -(speed));
		left.velocity.rotate(-20*Math.random());
		left.damp.reset(0, 0);
		left.rotation=target.rotation;
		left.bottomY=gameHeight+target.textureObj.l.height;
		left.addForce("g", gravity);
	};
	//if miss fruit
	var missUpdate=function()
	{
		this.alpha-=0.01;
		if(this.alpha<0)
		{
			this.alpha=0;
			this.life=0;
		}
	};
	var missFruit=function(target)
	{
		var lose = particleSystem.createParticle(SPP.SpriteImage);
		var x=target.position.x;
		if(x<=0)x=40;
		if(x>gameWidth)x=gameWidth-40;
		lose.init(x,gameHeight-assetsManager.miss.height,Infinity,assetsManager.miss,topContext);
		lose.velocity.reset(0,-1);
		lose.damp.reset(0.01,0.01);
		lose.onUpdate=missUpdate;
	};
	
	//throw fruit
	throwFruit=function()
	{
		var textureObj=assetsManager.getRandomFruit();
		
		var p = fruitSystem.createParticle(FruitGame.Fruit);
		p.velocity.reset(0, -(10 + Math.random() * 3));
		p.velocity.rotate(8 - Math.random() * 16);
		p.damp.reset(0, 0);
		p.addForce("g", gravity);

		p.addEventListener("dead",missHandler);
		p.init(gameWidth*0.5+(1-Math.random()*2)*200, gameHeight+textureObj.w.height,Infinity,textureObj.w,assetsManager.shadow,middleContext);
		p.textureObj=textureObj;
		p.bottomY=gameHeight+textureObj.w.height;
	};
	//cut fruit
	cutFruit=function(target)
	{
		score++;
		target.removeEventListener("dead",missHandler);
		
		buildHalfFruit(target);
		buildJuice(target,(Math.random()*30>>0)+30);
		buildSplash(target);
		
		target.life=0;
		createjs.Sound.play("splatter");
	};
	missHandler=function(e)
	{
		e.target.removeEventListener("dead",missHandler);
		if(gameState==GAME_OVER)return;
		missFruit(e.target);
		gameLife--;
		if(gameLife==0)gameOver();
		if(gameLife<0)gameLife=0;
		ui_gamelifeTexture=assetsManager["gamelife-"+gameLife];
		ui_gameLife.texture=ui_gamelifeTexture;
	};
	
}());