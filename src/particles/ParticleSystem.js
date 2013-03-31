SPP.ParticleSystem = function() {
	var _particles = [];
	var _particlePool = new SPP.ParticlePool();
	var _lastTime = null;
	var _isRunning=false;

	this.getParticles = function() {
		return _particles;
	};
	this.createParticle = function(particleType) {
		var p = _particlePool.get(particleType);
		p.reset();
		_particles.push(p);
		return p;
	};
	this.render = function() {
		if(!_isRunning)return;
		SPP.frameTime = (Date.now() - _lastTime) * 0.001;
		_lastTime = Date.now();
		var l = _particles.length;
		for(var i=0;i<l;i++)
		{
			_particles[i].render();
		};
		while (l-- > 0)
		{
			if ( _particles[l].life<=0 )
            {
				_particlePool.recycle(_particles[l]);
				_particles.splice( l, 1 );
            }
		};
	};
	this.start=function()
	{
		_lastTime=Date.now();
		_isRunning=true;
	};
	this.stop=function()
	{
		_isRunning=false;
	};
};