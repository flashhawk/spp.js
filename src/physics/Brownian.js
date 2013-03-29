SPP.Brownian=function(maxValue,cycle,life)
{
	SPP.Force.call(this,0,0, life);
	this.maxValue=maxValue;
	this.cycle=cycle;
	this.pastTime=0;
	this.value.reset((Math.random()*2-1)*this.maxValue, (Math.random()*2-1)*this.maxValue);
};
SPP.Brownian.prototype=SPP.inherit(SPP.Force.prototype);
SPP.Brownian.prototype.constructor=SPP.Brownian;

SPP.Brownian.prototype.update=function()
{
	this.pastTime+=SPP.frameTime;
	if(this.pastTime>=this.cycle)
	{
		this.value.reset((Math.random()*2-1)*this.maxValue, (Math.random()*2-1)*this.maxValue);
		this.pastTime=0;
	};
};
