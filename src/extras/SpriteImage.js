SPP.SpriteImage=function() 
{
	SPP.Particle.call(this);
	this.context=null;
	this.texture=null;
	this.scale=1;
	this.rotation=0;
	this.alpha=1;	
	this.regX=0.5;
	this.regY=0.5;
};
SPP.inherit(SPP.SpriteImage, SPP.Particle);
SPP.SpriteImage.prototype.update = function()
{
	if(this.context==null||this.texture==null)return;
	this.context.save();
    this.context.setTransform(1,0,0,1,0,0);
	this.context.globalAlpha=this.alpha;
	this.context.translate(this.position.x,this.position.y);
	this.context.rotate(this.rotation);
	this.context.scale(this.scale,this.scale);
	this.context.drawImage(this.texture, 0,0, 
			this.texture.width,
			this.texture.height,
			-this.texture.width*this.regX,
			-this.texture.height*this.regY,
			this.texture.width,
			this.texture.height);
	this.context.restore();
};
SPP.SpriteImage.prototype.init = function(x,y,life,texture,context) 
{
	SPP.Particle.prototype.init.apply(this,[x,y,life]);
	this.context=context;
	this.texture=texture;
};
SPP.SpriteImage.prototype.reset = function() 
{
	SPP.Particle.prototype.reset.apply(this);
	this.context=null;
	this.texture=null;
	this.scale=1;
	this.rotation=0;
	this.alpha=1;	
	this.regX=0.5;
	this.regY=0.5;
};
SPP.SpriteImage.prototype.width=function()
{
	return this.texture.width*this.scale;
};
SPP.SpriteImage.prototype.height=function()
{
	return this.texture.height*this.scale;
};