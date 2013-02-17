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
	context.globalCompositeOperation = "lighter";

	particleSystem = new SPP.ParticleSystem();
	texture = new Image();
	texture.src = "images/star.png";
	$(texture).load(function() {
		initStatsBar();
		resizeCanvas();
		animate();

	});
}

function animate()
{
	requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);
	particleSystem.render();
	stats.update();
}

function resizeCanvas()
{
	canvas.width = $(window).get(0).innerWidth;
	canvas.height = $(window).get(0).innerHeight;
	context.globalCompositeOperation = "lighter";
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
		var p = particleSystem.createParticle(MyParticle);
		p.addForce("g", gravity);
		var brownianForce = new SPP.Brownian(0.3, 0.05);
		p.addForce("brownian", brownianForce);
		p.f.reset(0.05, 0.05);
		p.v.y = -10;
		p.init(mouse.x, mouse.y);
	}
};

function mousedown(e) {
	mouseDown = true;
}
function mouseup(e) 
{
	mouseDown = false;
}

// ****************************************************************************************************
function initStatsBar() {
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);
};

// ****************************************************************************************************
function MyParticle() {
	SPP.Particle.call(this);
};
MyParticle.prototype = SPP.inherit(SPP.Particle.prototype);
MyParticle.prototype.constructor = MyParticle;

MyParticle.prototype.update = function() {
	SPP.Particle.prototype.update.apply(this);
	//this.rotation+=0.1;
	this.scale-=.02;
	if(this.scale<0)
	{
		this.scale=0;
		this.life=0;
	}
	
	context.translate(this.position.x,this.position.y);
	context.rotate(this.rotation);
	context.scale(this.scale,this.scale);
	context.drawImage(texture, 0,0, 
			texture.width,
			texture.height,
			-texture.width*.5,
			-texture.height*.5,
			texture.width,
			texture.height);
	context.setTransform(1,0,0,1,0,0);
};
MyParticle.prototype.init = function(x,y,life) {
	SPP.Particle.prototype.init.apply(this,[x,y,life]);
	this.rotation=0;
	this.scale=2;
};
