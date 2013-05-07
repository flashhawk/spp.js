SPP.Particle = function() {
	SPP.EventDispatcher.call(this);
	this.position = new SPP.Vector2D();
	this.velocity = new SPP.Vector2D();
	this.damp = new SPP.Vector2D(0.1, 0.1);
	this.life = Infinity;
	this.forcesMap = {};
	this.extra = {};
	this.resultant = new SPP.Vector2D();

	this.boundary = null;
	this.boundaryType=SPP.Particle.OFFSCREEN;
	this.bounceIntensity = 2;
	
	this.onUpdate=null;
};
SPP.Particle.OFFSCREEN="offscreen";
SPP.Particle.BOUNCE="bounce";
SPP.Particle.prototype = {
	constructor : SPP.Particle,
	init : function(x, y, life) {
		if (life <= 0)
		{
			this.dispatchEvent(new SPP.Event("dead"));
			return;
		}
		this.life = life || Infinity;
		this.position.reset(x, y);
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
	render : function() {
		this.update();
		if(this.onUpdate)this.onUpdate.apply(this);
		this.resultant.reset(0, 0);
		for ( var i in this.forcesMap)
		{
			if (!this.forcesMap[i].isActive())
			{
				delete this.forcesMap[i];
			} else
			{
				this.resultant.add(this.forcesMap[i].value);
			};
		}
		this.velocity.add(this.resultant);
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
	update : function() {

	},
	bounce : function() {

		if (this.position.x < this.boundary.left()|| this.position.x > this.boundary.right())
		{
			this.position.x = this.position.x < this.boundary.left() ? this.boundary.left(): this.boundary.right();
			this.velocity.scaleX(-this.bounceIntensity);
			
		}
		if (this.position.y < this.boundary.top()|| this.position.y > this.boundary.bottom())
		{
			this.position.y = this.position.y < this.boundary.top() ? this.boundary.top(): this.boundary.bottom();
			this.velocity.scaleY(-this.bounceIntensity);
		}
		this.resultant.scale(0);

	},
	offscreen : function() {

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
		this.position.reset(0, 0);
		this.velocity.reset(0, 0);
		this.damp.reset(0.1, 0.1);
		this.life = 0;
		this.removeAllForces();
		for ( var prop in this.extra)
		{
			delete this.extra[prop];
		}
		this.resultant.reset(0, 0);

		this.boundary = null;
		this.boundaryType=SPP.Particle.OFFSCREEN;
		this.bounceIntensity = 2;
		
		this.onUpdate=null;
	},
	toString:function()
	{
		return "particle:\n[\n"+
		"	life:"+this.life+",\n"+
		"	position:"+this.position.toString()+",\n"+
		"	velocity:"+this.velocity.toString()+",\n"+
		"	resultant:"+this.resultant.toString()+",\n"+
		"	boundaryType:"+this.boundaryType.toString()+",\n"+
		"	boundary:"+(this.boundary!=null?this.resultant.toString():"null")+",\n"+
		"	bounceIntensity:"+this.bounceIntensity+",\n"+
		"	damp:"+this.damp.toString()+",\n"+
		"	extra:"+this.extra.toString()+",\n"+
		"	onUpdate:"+(this.onUpdate!=null?this.onUpdate.toString():"null")+"\n"+
		"]\n";
	}

};
