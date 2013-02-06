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
		with (this)
		{
			if (isLive())
			{
				sumForce.reset(0, 0);
				for ( var i in forcesMap)
				{
					if (!forcesMap[i].isLive())
					{
						delete forcesMap[i];
					} else
					{
						sumForce.plus(forcesMap[i].value);
						a.reset(sumForce.x, sumForce.y);
					}
					;
				}
				v.plus(a);
				v.x *= (1 - f.x);
				v.y *= (1 - f.y);
				position.plus(v);
				point.x = position.x;
				point.y = position.y;
				if (this.boundary != null)
				{
					if(boundary.type==1)this.bounce();
					else this.bounce2();
				}
					
				return;
			}
			dispatchEvent(new SPP.Event("dead"));

		}
	},
	bounce : function() {
		with (this)
		{

			if (position.x < boundary.left() || position.x > boundary.right())
			{

				position.x = position.x < boundary.left() ? boundary.left()
						: boundary.right();
				v.scaleX(-bounceIntensity);
				a.scale(0);
			}
			if (position.y < boundary.top() || position.y > boundary.bottom())
			{

				position.y = position.y < boundary.top() ? boundary.top()
						: boundary.bottom();
				v.scaleY(-bounceIntensity);
				a.scale(0);
			}
		}
	},
	bounce2 : function() {
		with (this)
		{

			if (position.x < boundary.left())
			{

				position.x = boundary.right();

			}
			;
			if (position.x > boundary.right())
			{

				position.x = boundary.left();

			}
			;
			if (position.y < boundary.top())
			{

				position.y = boundary.bottom();
			}
			;
			if (position.y > boundary.bottom())
			{
				position.y = boundary.top();
			}
			;
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
