SPP.SimpleBrownian=function()
{
	SPP.Force.call(this);
};
SPP.inherit(SPP.SimpleBrownian,SPP.Force);
SPP.SimpleBrownian.prototype.init=function(maxValue,life)
{
	SPP.Force.prototype.init.call(this,0,0, life);
	this.maxValue=maxValue;
};
SPP.SimpleBrownian.prototype.update=function(target)
{
	this.value.reset((Math.random()*2-1)*this.maxValue, (Math.random()*2-1)*this.maxValue);
    target.acceleration.add(this.value);
};
SPP.SimpleBrownian.prototype.dealloc=function()
{
	SPP.Force.prototype.dealloc.apply(this);
	this.maxValue=undefined;
	this.cycle=undefined;
};
SPP.SimpleBrownian.prototype.reset=function()
{
    SPP.Force.prototype.reset.apply(this);
    this.maxValue=undefined;
    this.cycle=undefined;
};
