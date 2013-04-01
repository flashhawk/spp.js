var canvas;
var context;
var particleSystem;
var boundary;
var mouse = {};
var gravity = new SPP.Gravity(0.2);
var texture;
var stats;
var mouseDown = false;

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

	particleSystem = new SPP.ParticleSystem();
	texture = new Image();
	texture.src = "images/s.png";
	$(texture).load(function() {
		initStatsBar();
		resizeCanvas();
		animate();
		particleSystem.start();
		demo();
	});
};

function demo()
{
	var p;
	
	p= particleSystem.createParticle(SPP.SpriteImage);
	p.init(200, 300, 0, texture, context);
	p.regX=p.regY=0;
	p.alpha =1;
	
	console.log(p.toString());
	
	p= particleSystem.createParticle(SPP.SpriteImage);
	p.init(200, 300, Infinity, texture, context);
	p.regX=p.regY=0;
	p.alpha =1;
	p.onUpdate = function()
	{
		this.rotation += 0.1;
	};
	
	p= particleSystem.createParticle(SPP.SpriteImage);
	p.init(400, 300, Infinity, texture, context);
	p.regX=0.3;
	p.regY=0.3;
	p.alpha =1;
	
	p= particleSystem.createParticle(SPP.SpriteImage);
	p.init(400, 300, Infinity, texture, context);
	p.regX=0.3;
	p.regY=0.3;
	p.alpha =1;
	p.onUpdate = function()
	{
		this.rotation += 0.1;
	};
	
	var alphaStep=0.01;
	p= particleSystem.createParticle(SPP.SpriteImage);
	p.init(600, 300, Infinity, texture, context);
	p.alpha =1;
	p.rotation = Math.PI / 0.3;
	p.onUpdate = function()
	{
		this.rotation += 0.1;
		this.alpha+=alphaStep;
		if(this.alpha>1)
		{
			this.alpha=1;
			alphaStep*=-1;
		}
		if(this.alpha<0)
		{
			this.alpha=0;
			alphaStep*=-1;
		}
		
	};
	//console.log("particleSystem.getParticles().length="+particleSystem.getParticles().length);
	//console.log("particleSystem.getParticlePool().getParticles().length="+particleSystem.getParticlePool().getParticles().length);
}
function SpriteImageUpdate() {
	this.rotation += 0.1;
	this.scale -= 0.01;
	if (this.scale <= 0)
	{
		this.scale = 0;
		this.life = 0;
	}
};
function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);
	particleSystem.render();
	stats.update();
	//console.log("particleSystem.getParticles().length="+particleSystem.getParticles().length);
	//console.log("particleSystem.getParticlePool().getParticles().length="+particleSystem.getParticlePool().getParticles().length);
	
}

function resizeCanvas() {
	canvas.width = $(window).get(0).innerWidth;
	canvas.height = $(window).get(0).innerHeight;
	// context.globalCompositeOperation = "lighter";
}
// *************************************mouse
// event***************************************************************
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
	for ( var i = 0; i < 3; i++)
	{
		var p = particleSystem.createParticle(SPP.SpriteImage);
		p.init(mouse.x, mouse.y, Infinity, texture, context);
		p.alpha=0.9;
		p.onUpdate = SpriteImageUpdate;
		p.addForce("g", gravity);
		var brownianForce = new SPP.Brownian(0.3, 0.05);
		p.addForce("brownian", brownianForce);
		p.damp.reset(0.05, 0.05);
		p.velocity.y = -10;
	}
};

function mousedown(e) {
	mouseDown = true;
}
function mouseup(e) {
	mouseDown = false;
}

// ****************************************************************************************************
function initStatsBar() {
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);
};

