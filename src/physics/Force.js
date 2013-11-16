SPP.Force = function()
{
	this.value=SPP.VectorPool.get();
	this.life=Infinity;
    this.target=null;
};
SPP.Force.prototype = {
	constructor : SPP.Force,
	init:function(x,y,life)
	{
		this.value.reset(x, y);
		this.life = life || Infinity;
	},
    render : function(target)
	{
        this.update(target);
		if ((this.life -= SPP.frameTime) < 0)
		{
			this.dispatchEvent(new SPP.Event("dead"));
            this.reset();
			return false;
		}
		return true;
	},
	update : function(target)
	{
        target.acceleration.add(this.value);
	},
	dealloc : function()
	{
		this.value =null;
		this.life = undefined;
        this.target=null;
	},
    reset: function ()
    {
        SPP.VectorPool.recycle(this.value);
        this.life = Infinity;
        this.target=null;
    }
};
SPP.extend(SPP.Force.prototype,SPP.EventDispatcher.prototype);
