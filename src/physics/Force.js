SPP.Force = function()
{
	this.value=new SPP.Vector2D();
	this.life=Infinity;
};
SPP.Force.prototype = {
	constructor : SPP.Force,
	init:function(x,y,life)
	{
		this.value.reset(x, y);
		this.life = life || Infinity;
	},
	isActive : function(target)
	{
		if ((this.life -= SPP.frameTime) <= 0)
		{
			this.dispatchEvent(new SPP.Event("dead"));
			return false;
		}
		this.update(target);
		return true;
	},
	update : function(target)
	{
		target.resultant.add(this.value);
	},
	dealloc : function()
	{
		this.value =null;
		this.life = undefined;
	}
};
SPP.extend(SPP.Force.prototype,SPP.EventDispatcher.prototype);
