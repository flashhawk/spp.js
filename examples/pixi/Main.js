var view,stage,stageWidth,stageHeight,renderer,assetLoader;
var particleSystem,windForce,leafEmitter;

$(document).ready(function()
{
    $(window).resize(resizeCanvas);
    resizeCanvas();
    loadAssets();
});
function loadAssets()
{
    assetLoader=new PIXI.AssetLoader(["assets/assets.json"]);
    assetLoader.onComplete=assetsLoaded;
    assetLoader.load();
}
function assetsLoaded()
{
    init();
}
function init()
{
    view = $("canvas").get(0);
    view.width=stageWidth;
    view.height=stageHeight;
    stage = new PIXI.Stage(0xffffff, true);
    renderer = new PIXI.autoDetectRenderer(stageWidth,stageHeight, view);

    particleSystem=new SPP.ParticleSystem();
    windForce=particleSystem.createForce(SPP.Force);
    windForce.init(0.06, 0);

    leafEmitter=new LeafEmitter(stage);
    particleSystem.start();
    animate();
}
function animate()
{
    requestAnimFrame(animate);
    renderer.render(stage);
    particleSystem.render();
    leafEmitter.update();
};
function resizeCanvas()
{
    stageWidth=$(window).get(0).innerWidth;
    stageHeight=$(window).get(0).innerHeight;
    if(!renderer)return;
    renderer.resize(stageWidth,stageHeight)
}
/***********
 *SpritePool
 */
function SpritePool ()
{
    if (SpritePool._isBirth)
        throw new Error("This class is a singleton!");
    else
    {
        SpritePool._instance = this;
        SpritePool._isBirth = true;
    };
    var _pool = [];
    this.get = function (frameId)
    {
        for (var i in _pool)
        {
            if (_pool[i].texture === PIXI.TextureCache[frameId])
            return _pool.splice(i, 1)[0];
        }
        return PIXI.Sprite.fromFrame(frameId);
    };
    this.recycle = function (sprite)
    {
        _pool.push(sprite);
    }
};
SpritePool._isBirth = false;
SpritePool.getInstance = function ()
{
    return SpritePool._instance != null ? SpritePool._instance : new SpritePool();
};

/***********
 *Sprite partilce Leaf
 */
function Leaf ()
{
    SPP.Particle.call(this);
};
SPP.inherit(Leaf, SPP.Particle);
Leaf.prototype.update = function ()
{
    if(this.sprite==null)return;
    this.sprite.position.x = this.position.x;
    this.sprite.position.y = this.position.y;
    this.sprite.rotation+=this.rotationStep;
    this.sprite.scale.x+=this.scaleStep;
    this.sprite.scale.y+=this.scaleStep;
    if (this.position.y > (stageHeight + 100)||this.position.x > (stageWidth + 100))
    {
        this.life = 0;
        this.sprite.parent.removeChild(this.sprite);
        SpritePool.getInstance().recycle(this.sprite);
        this.sprite = null;
    }
};
Leaf.prototype.init = function (x, y, life, sprite)
{
    SPP.Particle.prototype.init.apply(this, [x, y, life]);
    this.sprite=sprite;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.scale.x=this.sprite.scale.y=0.5+Math.random()*0.5;

    this.rotationStep=(1-Math.random()*2)*0.05;
    if(this.rotationStep>0)this.rotationStep+=0.03;
    else
        this.rotationStep-=0.05;
    this.scaleStep=-(Math.random()*0.003);
};

/***********
 *Leaf emitter
 */
function LeafEmitter(container)
{
    var _container = container;
    var _lastTime = Date.now();

    function emit()
    {
        var sprite = SpritePool.getInstance().get("leaf_" + SPP.MathUtils.random(4) + ".png");
        sprite.position.y = -999;
        var particle = particleSystem.createParticle(Leaf);
        particle.init(-80, -80, Infinity, sprite);
        particle.velocity.reset(0, 1+Math.random() * 2);
        particle.damp.reset(0, 0);
        particle.addForce("windForce", windForce);
        var brownian = particleSystem.createForce(SPP.Brownian);
        brownian.init(0.15, Math.random()+0.5);
        brownian.target=particle;
        particle.addForce("brownianForce", brownian);
        _container.addChild(sprite);
    }
    
    this.update = function ()
    {
        for(var i=0;i<10;i++)
        {
            emit();
        }
    }
};



