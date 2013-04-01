var canvas;
var context;
var particleSystem;
var boundary;
var mouse = {};
var texture;
var stats;
var mouseDown = false;
var attractionPoint;


$(document).ready(function() {
	init();
	$(window).resize(resizeCanvas);
});

function init() {
	canvas = $("canvas").get(0);
	canvas.addEventListener('mousemove', mousemove, false);
	context = canvas.getContext("2d");

	particleSystem = new SPP.ParticleSystem();
	attractionPoint=new SPP.Vector2D();
	boundary=new SPP.Rectangle(0,0,canvas.width,canvas.height);
	
	texture = new Image();
	texture.src = "images/arrow.png";
	$(texture).load(function() {
		initStatsBar();
		resizeCanvas();
		animate();
		particleSystem.start();
		initParticles();
	});
}

function animate()
{
	animationID=requestAnimationFrame(animate);
	//context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = 'rgba(0,0,0,0.5)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	attractionPoint.reset(mouse.x, mouse.y);
	particleSystem.render();
	stats.update();
}

function resizeCanvas()
{
	canvas.width = $(window).get(0).innerWidth;
	canvas.height = $(window).get(0).innerHeight;
	boundary.width=canvas.width;
	boundary.height=canvas.height;
}

function initParticles()
{
	for ( var i = 0; i < 1000; i++)
	{
		var p = particleSystem.createParticle(SPP.SpriteImage);
		
		p.boundary=boundary;
		var brownianForce = new SPP.Brownian(0.5, Math.random()+1);
		p.addForce("brownian", brownianForce);
		
		var attractionForce=new SPP.Attraction(attractionPoint,1,100);
		attractionForce.targetParticle=p;
		p.addForce("attractionForce", attractionForce);
		
		p.onUpdate=arrowUpdate;
		p.init(canvas.width*0.5, canvas.height*0.5,Infinity,texture,context);
	}
};

function arrowUpdate() {
	this.rotation=SPP.MathUtils.toRadian(this.velocity.getAngle());
	
};
// *************************************mouse
// event***************************************************************
function mousemove(e) {

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
	};
};
// ****************************************************************************************************
function initStatsBar() {
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);
};

