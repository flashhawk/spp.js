var canvas;
var context;
var particleSystem;
var boundary;
var mouse = {};
var gravity = new SPP.Gravity(-0.2);
var texture;
var stats;
var mouseDown = false;

var stage;
var spriteSheet;
var spriteSheetData;

$(document).ready(function() {
	init();
	$(window).resize(resizeCanvas);
});

function init() {
	canvas = $("canvas").get(0);
	canvas.addEventListener('mousemove', mousemove, false);
	canvas.addEventListener('mousedown', mousedown, false);
	canvas.addEventListener('mouseup', mouseup, false);
	context = canvas.getContext("2d");
	stage = new createjs.Stage(canvas);

	particleSystem = new SPP.ParticleSystem();
	texture = new Image();
	texture.src = "assets/bird.png";
	$(texture).load(function() {
		initStatsBar();
		resizeCanvas();
		initSpriteSheetData();
		createjs.Ticker.setFPS(60);
	    createjs.Ticker.addEventListener("tick", animate);

	});
}
function initSpriteSheetData()
{
	spriteSheetData=
	{
	    "images": [texture],
	    "frames": [
					[2, 830, 120, 90], 
					[124, 738, 120, 90], 
					[2, 738, 120, 90], 
					[124, 646, 120, 90], 
					[2, 646, 120, 90], 
					[124, 554, 120, 90], 
					[2, 554, 120, 90], 
					[124, 462, 120, 90], 
					[2, 462, 120, 90], 
					[124, 370, 120, 90], 
					[2, 370, 120, 90], 
					[124, 278, 120, 90], 
					[2, 278, 120, 90], 
					[124, 186, 120, 90], 
					[2, 186, 120, 90], 
					[124, 94, 120, 90], 
					[2, 94, 120, 90], 
					[124, 2, 120, 90], 
					[2, 2, 120, 90], 
					[2, 830, 120, 90]
	               ],
	    "animations": {"flying":[0,19]}
	};
	spriteSheet = new createjs.SpriteSheet(spriteSheetData);
};

function animate(event)
{
	stage.update();
	particleSystem.render();
	stats.update();
}
function resizeCanvas()
{
	canvas.width = $(window).get(0).innerWidth;
	canvas.height = $(window).get(0).innerHeight;
}
//********************mouse event*************
function mousemove(e) {

	if (!mouseDown)
		return;
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
	buildBird(mouse.x,mouse.y);
};
function buildBird(x,y)
{
	var p = particleSystem.createParticle(SPP.Particle);
	p.addForce("g", gravity);
	var brownianForce = new SPP.Brownian(0.3, 0.8);
	p.addForce("brownian", brownianForce);
	p.damp.reset(0.05, 0.05);
	p.velocity.y = -10;
	p.init(mouse.x, mouse.y);
	
	var bird=new createjs.BitmapAnimation(spriteSheet);
	bird.regX=60;
	bird.regY=45;
	bird.x=mouse.x;
	bird.y=mouse.y;
	
	p.extra.bird=bird;
	stage.addChild(bird);
	bird.play();
	p.onUpdate=birdUpdate;
}
function birdUpdate()
{
	this.extra.bird.x=this.position.x;
	this.extra.bird.y=this.position.y;
	this.extra.bird.alpha-=0.005;
	if(this.extra.bird.alpha<=0)
	{
		this.life=0;
		this.extra.bird.alpha=1;
		stage.removeChild(this.extra.bird);
		this.extra.bird=null;
	}
};

function mousedown(e) {
	mouseDown = true;
}
function mouseup(e) 
{
	mouseDown = false;
}

function initStatsBar() {
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	//document.body.appendChild(stats.domElement);
};




