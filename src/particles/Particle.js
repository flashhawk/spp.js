SPP.Particle = function()
{
	this.parent=null;
	this.position = new SPP.Vector2D(0,0);
	this.velocity = new SPP.Vector2D(0,0);
	this.damp = new SPP.Vector2D(0.1, 0.1);
	this.life = Infinity;
	this._forcesMap = {};
	this.extra = {};
	this.resultant = new SPP.Vector2D();

	this.boundary = null;
	this.boundaryType = SPP.Particle.OFFSCREEN;
	this.bounceIntensity = 2;

	this.onUpdate = null;
};
SPP.Particle.OFFSCREEN = "offscreen";
SPP.Particle.BOUNCE = "bounce";
SPP.Particle.prototype = {
	constructor : SPP.Particle,
	init : function(x, y, life)
	{
		if (life <= 0)
		{
			this.dispatchEvent(new SPP.Event("dead"));
			return;
		}
		this.life = life || Infinity;
		this.position.reset(x, y);
	},
	getForce:function(id)
	{
		return this._forcesMap[id];
	},
	addForce : function(id, force)
	{
		this._forcesMap[id] = force;
	},
	removeForce : function(id)
	{
		delete this._forcesMap[id];
	},
	removeAllForces : function()
	{
		for ( var i in this._forcesMap)
		{
			delete this._forcesMap[i];
		}
	},
	render : function()
	{
		this.update();
		if (this.onUpdate)
			this.onUpdate.apply(this);
		// this.resultant.reset(0, 0);
		if(this.parent!=null)
		{
			var parentFroceMap=this.parent.getForceMap();
			for ( var i in parentFroceMap)
			{
				if (!parentFroceMap[i].isActive(this))
				{
					delete parentFroceMap[i];
				}
			}
		}
		for ( var i in this._forcesMap)
		{
			if (!this._forcesMap[i].isActive(this))
			{
				delete this._forcesMap[i];
			};
		}
		this.velocity.add(this.resultant);
		this.resultant.reset(0, 0);
		this.velocity.x *= (1 - this.damp.x);
		this.velocity.y *= (1 - this.damp.y);
		this.position.add(this.velocity);
		if (this.boundary != null)
		{
			this[this.boundaryType]();
		}

		this.life -= SPP.frameTime;
		if (this.life > 0)
			return;
		this.dispatchEvent(new SPP.Event("dead"));

	},
	update : function()
	{

	},
	bounce : function()
	{

		if (this.position.x < this.boundary.left()
				|| this.position.x > this.boundary.right())
		{
			this.position.x = this.position.x < this.boundary.left() ? this.boundary
					.left()
					: this.boundary.right();
			this.velocity.scaleX(-this.bounceIntensity);

		}
		if (this.position.y < this.boundary.top()
				|| this.position.y > this.boundary.bottom())
		{
			this.position.y = this.position.y < this.boundary.top() ? this.boundary
					.top()
					: this.boundary.bottom();
			this.velocity.scaleY(-this.bounceIntensity);
		}
		this.resultant.scale(0);

	},
	offscreen : function()
	{

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
	dealloc : function()
	{
		this.parent=null;
		this.position = null;
		this.velocity = null;
		this.damp = null;
		this.life = null;
		this._forcesMap = null;
		this.extra =null;
		this.resultant = null;
		this.boundary = null;
		this.boundaryType = null;
		this.bounceIntensity = null;
		this.onUpdate = null;
	},
	reset : function()
	{
		this.position.reset(0, 0);
		this.velocity.reset(0, 0);
		this.damp.reset(0.1, 0.1);
		this.life = 0;
		this.removeAllForces();
		for ( var prop in this.extra)
		{
			delete this.extra[prop];
		}
		;
		this.resultant.reset(0, 0);

		this.boundary = null;
		this.boundaryType = SPP.Particle.OFFSCREEN;
		this.bounceIntensity = 2;

		this.onUpdate = null;
		this.parent=null;
	}
};
SPP.extend(SPP.Particle.prototype,SPP.EventDispatcher.prototype);
