SPP.Force = function(x, y, life) {
	SPP.EventDispatcher.call(this);
	this.value = new SPP.Vector2D(x, y);
	this.life = life || Infinity;
};

SPP.Force.prototype = {
	constructor : SPP.Force,
	isLive : function() {
		if ((this.life-=SPP.frameTime) <= 0)
		{
			this.destory();
			dispatchEvent(new SPP.Event("dead"));
			return false;
		}
		this.update();
		return true;

	},
	update : function() {

	},
	destory : function() {

	}

};
