var assetsLoader;
var gravity;
var topCanvas,topContext,middleCanvas,middleContext,bottomCanvas,bottomContext,particleSystem,fruitSystem,bladeSystem;
var gameWidth=960;
var gameHeight=640;
var juiceCount=100;
var mouseDown = false;
var mouse = {};

var bladeColor="#ff0000";
var bladeWidth=10;
var bladeAlpha=0.6;

assetsLoader=new FruitGame.AssetsLoader();
assetsLoader.addEventListener("complete",assetsLoadComplete);
assetsLoader.start();

function assetsLoadComplete(e)
{
	console.log("load complete");
	init();
	run();
};
function init()
{
	topCanvas=document.getElementById("top");
	topCanvas.width=gameWidth;
	topCanvas.height=gameHeight;
	topContext=topCanvas.getContext("2d");
	topContext.strokeStyle=getRandomRGB();
	topContext.globalAlpha=bladeAlpha;
	
	middleCanvas=document.getElementById("middle");
	middleCanvas.width=gameWidth;
	middleCanvas.height=gameHeight;
	middleContext=middleCanvas.getContext("2d");
	
	bottomCanvas=document.getElementById("bottom");
	bottomCanvas.width=gameWidth;
	bottomCanvas.height=gameHeight;
	bottomContext=bottomCanvas.getContext("2d");
	
	particleSystem = new SPP.ParticleSystem();
	bladeSystem=new SPP.ParticleSystem();
	fruitSystem=new SPP.ParticleSystem();
	gravity = new SPP.Gravity(0.18);
	
	document.addEventListener('mousemove', mousemove, false);
	document.addEventListener('mousedown', mousedown, false);
	document.addEventListener('mouseup', mouseup, false);
};

function run()
{
	animate();
	setInterval(createFruits,1000);
	createFruits();
}

function createFruits()
{
    var n=Math.random()*4>>0;
    for(var i=0;i<n;i++)
    {
        createFruit();
    };
}

function animate() 
{
	requestAnimationFrame(animate);
	topContext.clearRect(0,0,gameWidth,gameHeight);
	middleContext.clearRect(0,0,gameWidth,gameHeight);
	bottomContext.clearRect(0,0,gameWidth,gameHeight);
	
	fruitSystem.render();
	particleSystem.render();
	bladeSystem.render();
	buildColorBlade(bladeColor,bladeWidth);
	collideTest();
}

function createFruit()
{
	var p = fruitSystem.createParticle(FruitGame.Fruit);
	//p.addEventListener("dead",fruitDead);
	p.v.reset(0, -(11 + Math.random() * 5));
	p.v.rotate(15 - Math.random() * 30);
	p.f.reset(0, 0);
	
	p.addForce("g", gravity);

	var textureObj=assetsLoader.fruits[assetsLoader.fruits.length*Math.random()>>0];
	p.init(gameWidth*0.5, gameHeight+textureObj.full.height,3,textureObj.full,assetsLoader.shadow,middleContext,bottomContext);
	p.textureObj=textureObj;
};

function cutFruit(target)
{
	buildHalfFruit(target);
	buildJuice(target,(Math.random()*100>>0));
	buildSplash(target);
}

function buildHalfFruit(target)
{
	var left=  particleSystem.createParticle(FruitGame.Fruit);
	left.init(target.position.x,target.position.y,2,target.textureObj.leftHalf,assetsLoader.shadow,middleContext,bottomContext);
	left.v.reset(0, -(5 + Math.random() * 5));
	left.v.rotate(-20*Math.random());
	left.f.reset(0, 0);
	left.rotation=target.rotation;
	left.addForce("g", gravity);

	var right = particleSystem.createParticle(FruitGame.Fruit);
	right.init(target.position.x,target.position.y,2,target.textureObj.rightHalf,assetsLoader.shadow,middleContext,bottomContext);
	right.v.reset(0, left.v.y);
	right.v.rotate(20*Math.random());
	right.f.reset(0, 0);
	right.rotation=target.rotation;
	right.addForce("g", gravity);
}

function buildJuice(target,juiceCount)
{
	var juiceUpdate=function()
	{
		this.scale-=0.013;
		if(this.scale<0)
		{
			this.scale=0;
			this.life=0;
		}
	};
	for(var i=0;i<juiceCount;i++)
	{
		var juice = particleSystem.createParticle(SPP.SpriteImage);
		juice.init(target.position.x,target.position.y,999,target.textureObj.juice,middleContext);
		juice.onUpdate=juiceUpdate;
		juice.scale=Math.random()*0.7;
		juice.f.reset(0, 0);
		juice.v.reset(0, -(4 + Math.random() * 4));
		juice.v.rotate(360*Math.random());
		juice.addForce("g", gravity);
	}
};

function buildSplash(target)
{
	var splashUpdate=function()
	{
		this.alpha-=0.005;
		if(this.alpha<0)
		{
			this.alpha=0;
			this.life=0;
		}
	};
	var splash = particleSystem.createParticle(SPP.SpriteImage);
	splash.init(target.position.x,target.position.y,999,target.textureObj.splash,bottomContext);
	splash.onUpdate=splashUpdate;
	splash.scale=1.5+Math.random();
	splash.rotation=Math.PI*2*Math.random();
	
};

function buildColorBlade(color,width)
{
	topContext.strokeStyle=color;
	buildBlade(width);
	
	topContext.strokeStyle="#ffffff";
	buildBlade(width*0.6);
}
function buildBlade(width)
{
	if(!mouseDown)return;
	var i  = bladeSystem.getParticles().length;
	var isFirstPoint=true;
	var lineWidth=width;
	var step=lineWidth/(i-1);
	topContext.beginPath();
	while (i-- > 1)
	{
		if(i==1)topContext.lineWidth=1;
		else topContext.lineWidth=lineWidth;
		//console.log(topContext.lineWidth);
		var p= bladeSystem.getParticles()[i];
		var next=bladeSystem.getParticles()[i-1];
		topContext.moveTo(p.position.x,p.position.y);
        topContext.lineTo(next.position.x,next.position.y);	
        topContext.stroke();
		lineWidth-=step;
		if(lineWidth<=0)lineWidth=1;
	}
};

function collideTest()
{
	if(!mouseDown)return;
	var fruits=fruitSystem.getParticles();;
	var i=fruits.length;
	var fruit;
	var blade=bladeSystem.getParticles();
	var l=blade.length;
	while(i-->0)
	{
		fruit = fruits[i];
		while (l-- > 1)
		{
			var p1= blade[l];
			var p2=blade[l-1];
			var isCut = lineInEllipse
			(
		    	[p1.position.x, p1.position.y],
		    	[p2.position.x, p2.position.y], 
		    	[fruit.position.x, fruit.position.y ],
		    	fruit.radius,
		    	1
			);
			if( isCut )
			{
				fruit.life=0;
				cutFruit(fruit);
				console.log("hit test");
			};
		}
	}
}

function mousemove(e) {

	//if (!mouseDown)
		//return;
	// Get the mouse position relative to the canvas element.
	if (e.layerX || e.layerX == 0)
	{
		// Firefox
		mouse.x = e.layerX;
		mouse.y = e.layerY;
	} else if (e.offsetX || e.offsetX == 0)
	{ // Opera
		mouse.x = e.offsetX;
		mouse.y = e.offsetY;
	}
	
	var p = bladeSystem.createParticle(SPP.Particle);
	p.init(mouse.x, mouse.y,0.2);
};

function mousedown(e) {
	mouseDown = true;
}
function mouseup(e) 
{
	mouseDown = false;
}
function getRandomRGB()
{
	var r=255*Math.random()>>0;
	var g=255*Math.random()>>0;
	var b=255*Math.random()>>0;
	return "rgb("+r+","+r+","+b+")";
};
