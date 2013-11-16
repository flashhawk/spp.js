var canvas;
var context;
var particleSystem;
var mouse = {};
var gravity;
var texture;
var stats;
$(document).ready(function ()
{
    init();
    $(window).resize(resizeCanvas);
});

function init()
{
    canvas = $("canvas").get(0);
    canvas.addEventListener('mousemove', mousemove, false);
    context = canvas.getContext("2d");
    context.globalCompositeOperation = "lighter";

    particleSystem = new SPP.ParticleSystem();
    gravity = particleSystem.createForce(SPP.Force);
    gravity.init(0, 0.3);
    texture = new Image();
    texture.src = "images/star.png";
    $(texture).load(function ()
    {
        initStatsBar();
        resizeCanvas();
        animate();
        particleSystem.start();
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

function mousemove(e)
{
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
    for (var i = 0; i < 4; i++)
    {
        var p = particleSystem.createParticle(CustomParticle);
        p.init(mouse.x, mouse.y);
        var brownianForce = particleSystem.createForce(SPP.Brownian);
        brownianForce.init(0.5, Math.random() * 0.5);
        brownianForce.target = p;
        //p.on("dead",deadHandler);
        p.addForce("gravity", gravity);
        p.addForce("brownian", brownianForce);
        p.damp.reset(0.05, 0.05);
        p.velocity.y = -10;

    }
};
function deadHandler(e)
{
    console.log(e.target.position.x, e.target.position.y);
}
function initStatsBar()
{
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
};

//Custom your particle.
function CustomParticle()
{
    SPP.Particle.call(this);
};
SPP.inherit(CustomParticle, SPP.Particle);
CustomParticle.prototype.update = function ()
{
    this.scale -= .015;
    if (this.scale < 0)
    {
        this.scale = 0;
        this.life = 0;
    }
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation);
    context.scale(this.scale, this.scale);
    context.drawImage(texture, 0, 0,
        texture.width,
        texture.height,
        -texture.width * .5,
        -texture.height * .5,
        texture.width,
        texture.height);
    context.setTransform(1, 0, 0, 1, 0, 0);
};
CustomParticle.prototype.init = function (x, y, life)
{
    SPP.Particle.prototype.init.apply(this, [x, y, life]);
    this.rotation = 0;
    this.scale = 2;
};