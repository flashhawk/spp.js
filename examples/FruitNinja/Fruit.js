FruitGame.Fruit=function() 
{
	SPP.Particle.call(this);

	this.drawTexture=function(context,texture,x,y)
	{
		context.drawImage(texture, x,y, 
				texture.width,
				texture.height,
				-texture.width*.5,
				-texture.height*.5,
				texture.width,
				texture.height);
	};
};
FruitGame.Fruit.prototype = SPP.inherit(SPP.Particle.prototype);
FruitGame.Fruit.prototype.constructor = FruitGame.Fruit;
FruitGame.Fruit.prototype.update = function()
{
	//SPP.Particle.prototype.update.apply(this);
	this.rotation+=0.1;
	
	this.shadowContext.globalAlpha=1;
	this.shadowContext.translate(this.position.x-20,this.position.y-20);
	//this.shadowContext.rotate(this.rotation);
	this.shadowContext.scale(this.scale,this.scale);
	this.drawTexture(this.shadowContext,this.shadow,0,0);
	this.shadowContext.setTransform(1,0,0,1,0,0);
	
	this.textrueContext.translate(this.position.x,this.position.y);
	this.textrueContext.rotate(this.rotation);
	this.textrueContext.scale(this.scale,this.scale);
	this.drawTexture(this.textrueContext,this.texture,0,0);
	this.textrueContext.setTransform(1,0,0,1,0,0);
	
};
FruitGame.Fruit.prototype.init = function(x,y,life,texture,shadow,textrueContext,shadowContext) 
{
	SPP.Particle.prototype.init.apply(this,[x,y,life]);
	this.textrueContext=textrueContext;
	this.shadowContext=shadowContext;
	this.texture=texture;
	this.shadow=shadow;
	this.rotation=0;
	this.scale=1;
	this.radius=texture.width*0.8;
};