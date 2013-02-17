SPP.ParticleSystem = function() {
	var _particles = [];
	var _particlePool = new SPP.ParticlePool();
	var _lastTime = 0;
	var _this = this;

	this.getParticles = function() {
		return _particles;
	};
	this.createParticle = function(particleType) {
		var p = _particlePool.get(particleType);
		p.addEventListener("dead", removeDeadParticle);
		_particles.push(p);
		return p;
	};
	var removeDeadParticle = function(event) {
		var p = event.target;
		_this.removeParticle(p);
	};
	this.removeParticle = function(p) {
		var index = _particles.indexOf(p);

		if (index == -1)
			return;
		_particles.splice(index, 1);
		p.removeEventListener("dead", removeDeadParticle);
		p.reset();
		_particlePool.recycle(p);
		
	};
	this.removeAllParticles = function() {
		var i = _particles.length;
		while (i-- > 0)
		{
			this.removeParticle(_particles[i]);
		}
		_particles = [];
	};

	this.render = function() {
		SPP.frameTime = (Date.now() - _lastTime) * 0.001;
		_lastTime = Date.now();
		/*
		var l = _particles.length;
		while (l-- > 0)
		{
			_particles[l].update();
		}*/
		
		for ( var i in _particles)
		{
			_particles[i].update();
		}
	};
	this.resume = function() {
		_lastTime += (Date.now() - _lastTime);
	};

	this.getParticlePool = function() {
		return _particlePool;
	};
};