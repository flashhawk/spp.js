SPP.Particle = function() {
	SPP.EventDispatcher.call(this);
	this.position = new SPP.Vector2D();
	this.point = new SPP.Point();
	this.v = new SPP.Vector2D();
	this.a = new SPP.Vector2D();
	this.f = new SPP.Vector2D(0.1, 0.1);
	this.life = 0;
	this.forcesMap = {};
	this.extra = {};
	this.sumForce = new SPP.Vector2D();

	this.boundary = null;
	this.bounceIntensity = 2;
};
SPP.Particle.prototype = {
	constructor : constructor,
	init : function(x, y, life) {
		this.life = life || Infinity;
		this.position.reset(x, y);
		this.point.x = this.position.x;
		this.point.y = this.position.y;
	},
	addForce : function(id, force) {
		this.forcesMap[id] = force;
	},
	removeForce : function(id) {
		delete this.forcesMap[id];
	},
	removeAllForces : function() {

		for ( var i in this.forcesMap)
		{
			delete _forces[i];
		}

	},
	isLive : function() {

		if ((this.life -= SPP.frameTime) <= 0)
			return false;
		return true;
	},
	update : function() {

		if (this.isLive())
		{
			this.sumForce.reset(0, 0);
			for ( var i in this.forcesMap)
			{
				if (!this.forcesMap[i].isLive())
				{
					delete this.forcesMap[i];
				} else
				{
					this.sumForce.plus(this.forcesMap[i].value);
					this.a.reset(this.sumForce.x, this.sumForce.y);
				}
				;
			}
			this.v.plus(this.a);
			this.v.x *= (1 - this.f.x);
			this.v.y *= (1 - this.f.y);
			this.position.plus(this.v);
			this.point.x = this.position.x;
			this.point.y = this.position.y;
			if (this.boundary != null)
			{
				if (this.boundary.type == 1)
					this.bounce();
				else
					this.bounce2();
			}

			return;
		}
		this.dispatchEvent(new SPP.Event("dead"));

	},
	bounce : function() {

		if (this.position.x < this.boundary.left()
				|| this.position.x > this.boundary.right())
		{

			this.position.x = this.position.x < this.boundary.left() ? this.boundary
					.left()
					: this.boundary.right();
			this.v.scaleX(-this.bounceIntensity);
			this.a.scale(0);
		}
		if (this.position.y < this.boundary.top()
				|| this.position.y > this.boundary.bottom())
		{

			this.position.y = this.position.y < this.boundary.top() ? this.boundary
					.top()
					: this.boundary.bottom();
			this.v.scaleY(-this.bounceIntensity);
			this.a.scale(0);
		}

	},
	bounce2 : function() {

		if (this.position.x < this.boundary.left())
		{

			this.position.x = this.boundary.right();

		}
		if (this.position.x > this.boundary.right())
		{

			this.position.x = this.boundary.left();

		}

		if (this.position.y < this.boundary.top())
		{

			this.position.y = this.boundary.bottom();
		}

		if (this.position.y > this.boundary.bottom())
		{
			this.position.y = this.boundary.top();
		}

	},
	destory : function() {

	},
	reset : function() {
		this.forcesMap = {};
		this.extra = {};
		this.removeAllEventListeners();
	}

};
