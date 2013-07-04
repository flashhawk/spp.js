var canvas;
var context;
var particleSystem;
var boundary;
var mouse;
var texture;
var stats;
var attractionForce;

$(document).ready(function() {
	init();
	$(window).resize(resizeCanvas);
});

function init() {
	canvas = $("canvas").get(0);
	canvas.addEventListener('mousemove', mousemove, false);
	context = canvas.getContext("2d");
	particleSystem = new SPP.ParticleSystem();
	mouse=new SPP.Vector2D();
	attractionForce=new SPP.Attraction();
	attractionForce.init(mouse, 1, 150);
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
	context.fillStyle = 'rgba(0,0,0,0.5)';
	context.fillRect(0, 0, canvas.width, canvas.height);
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
	for ( var i = 0; i < 500; i++)
	{
		var p = particleSystem.createParticle(SPP.SpriteImage);
		p.boundary=boundary;
		p.onUpdate=arrowUpdate;
		p.init(canvas.width*Math.random(), canvas.height*Math.random(),Infinity,texture,context);
		
        p.addForce("attractionForce",attractionForce);
        var brownianForce = new SPP.Brownian();
        brownianForce.init(1, Math.random());
        p.addForce("brownianForce",brownianForce);
	}
};

function arrowUpdate() 
{
	this.rotation=SPP.MathUtils.toRadian(this.velocity.getAngle());
};

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