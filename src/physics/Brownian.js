SPP.Brownian=function()
{
	SPP.Force.call(this);
};
SPP.inherit(SPP.Brownian,SPP.Force);
SPP.Brownian.prototype.init=function(maxValue,cycle,life)
{
	SPP.Force.prototype.init.call(this,0,0, life);
	this.maxValue=maxValue;
	this.cycle=cycle;
	this.pastTime=0;
	this.value.reset((Math.random()*2-1)*this.maxValue, (Math.random()*2-1)*this.maxValue);
};
SPP.Brownian.prototype.update=function(target)
{
	this.pastTime+=SPP.frameTime;
	if(this.pastTime>=this.cycle)
	{
		this.value.reset((Math.random()*2-1)*this.maxValue, (Math.random()*2-1)*this.maxValue);
		this.pastTime=0;
	};
    target.acceleration.add(this.value);
};
SPP.Brownian.prototype.dealloc=function()
{
	SPP.Force.prototype.dealloc.apply(this);
	this.maxValue=undefined;
	this.cycle=undefined;
	this.pastTime=undefined;
};
SPP.Brownian.prototype.reset=function()
{
    SPP.Force.prototype.reset.apply(this);
    this.maxValue=undefined;
    this.cycle=undefined;
    this.pastTime=undefined;
};