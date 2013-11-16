var canvas;
var context;
var particleSystem;
var boundary;
var mouse = {};
var gravity;
var texture;
var stats;
var stage;
var spriteSheet;
var spriteSheetData;

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
    stage = new createjs.Stage(canvas);

    particleSystem = new SPP.ParticleSystem();
    gravity = particleSystem.createForce(SPP.Force);
    gravity.init(0, -0.2);
    texture = new Image();
    texture.src = "assets/bird.png";
    $(texture).load(function ()
    {
        initStatsBar();
        resizeCanvas();
        initSpriteSheetData();
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", animate);
        particleSystem.start();

    });
}
function initSpriteSheetData()
{
    spriteSheetData =
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
        "animations": {"flying": [0, 19]}
    };
    spriteSheet = new createjs.SpriteSheet(spriteSheetData);
};


function animate(event)
{
    stage.update();
    particleSystem.render();
    stats.update();
}
animationPool = {
    _birds: [],

    get: function ()
    {
        if (this._birds.length > 0)
        {
            return this._birds.pop();
        }
        return new createjs.BitmapAnimation(spriteSheet);
    },

    recycle: function (obj)
    {
        obj.stop();
        obj.alpha = 1;
        obj.scaleX = obj.scaleY = 1;
        this._birds.push(obj);
    }
};
function buildBird(x, y)
{
    var p = particleSystem.createParticle(SPP.Particle);
    p.init(mouse.x, mouse.y);
    p.damp.reset(0.05, 0.05);
    p.velocity.y = -10;
    p.addForce("g", gravity);
    var brownianForce = particleSystem.createForce(SPP.Brownian);
    brownianForce.init(0.3, 0.8);
    brownianForce.target = p;
    p.addForce("brownianForce", brownianForce);

    var bird = animationPool.get();
    bird.regX = 60;
    bird.regY = 45;
    bird.x = mouse.x;
    bird.y = mouse.y;

    p.extra.bird = bird;
    stage.addChild(bird);
    bird.play();
    p.onUpdate = birdUpdate;

}
function birdUpdate()
{
    this.extra.bird.x = this.position.x;
    this.extra.bird.y = this.position.y;
    this.extra.bird.alpha -= 0.01;
    this.extra.bird.scaleX -= 0.01;
    this.extra.bird.scaleY -= 0.01;
    if (this.extra.bird.alpha <= 0)
    {
        this.life = 0;
        stage.removeChild(this.extra.bird);
        animationPool.recycle(this.extra.bird);
    }
};
function initStatsBar()
{
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    //document.body.appendChild(stats.domElement);
};
//********************mouse event*************
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
    buildBird(mouse.x, mouse.y);
};

function resizeCanvas()
{
    canvas.width = $(window).get(0).innerWidth;
    canvas.height = $(window).get(0).innerHeight;
}




