SPP.Force = function(x, y, life) {
	SPP.EventDispatcher.call(this);
	this.value = new SPP.Vector2D(x, y);
	this.life = life || Infinity;
};

SPP.Force.prototype = {
	constructor : SPP.Force,
	isActive : function() {
		if ((this.life-=SPP.frameTime) <= 0)
		{
			this.destory();
			this.dispatchEvent(new SPP.Event("dead"));
			return false;
		}
		this.update();
		return true;
	},
	update : function() {}
};
