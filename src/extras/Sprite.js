SPP.Sprite=function() 
{
	SPP.Particle.call(this);
	this.context=null;
	this.texture=null;
	this.onUpdate=null;
	this.scale=1;
	this.rotation=0;
	this.alpha=1;	
	this.registrationX=0.5;
	this.registrationY=0.5;
	
};
SPP.Sprite.prototype = SPP.inherit(SPP.Particle.prototype);
SPP.Sprite.prototype.constructor = SPP.Sprite;
SPP.Sprite.prototype.update = function()
{
	if(	this.context==null||this.texture==null)return;
	this.context.globalAlpha=this.alpha;
	this.context.translate(this.position.x,this.position.y);
	this.context.rotate(this.rotation);
	this.context.scale(this.scale,this.scale);
	this.context.drawImage(this.texture, 0,0, 
			this.texture.width,
			this.texture.height,
			-this.texture.width*this.registrationX,
			-this.texture.height*this.registrationY,
			this.texture.width,
			this.texture.height);
	this.context.setTransform(1,0,0,1,0,0);
	this.context.globalAlpha=1;
	
	if(this.onUpdate)this.onUpdate.apply(this);
	
	SPP.Particle.prototype.update.apply(this);
};
SPP.Sprite.prototype.init = function(x,y,life,texture,context) 
{
	SPP.Particle.prototype.init.apply(this,[x,y,life]);
	this.context=context;
	this.texture=texture;
};
//x ,y,topleft percent
SPP.Sprite.prototype.setRegistration=function(x,y)
{
	this.registrationX=x;
	this.registrationY=y;
};
SPP.Sprite.prototype.reset = function() 
{
	SPP.Particle.prototype.reset.apply(this);
	this.context=null;
	this.texture=null;
	this.onUpdate=null;
	this.scale=1;
	this.rotation=0;
	this.alpha=1;	
	this.registrationX=0.5;
	this.registrationY=0.5;
};


