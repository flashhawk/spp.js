SPP.ParticleSystem = function()
{
	var _particles = [];
	var _particlePool = new SPP.Pool();
	var _forces = [];
	var _forcePool=new SPP.Pool();
	var _emitters = [];
	var _lastTime = null;
	var _isRunning = false;
	this.getParticles = function()
	{
		return _particles;
	};
	this.createParticle = function(particleType)
	{
		var p = _particlePool.get(particleType);
		p.reset();
		_particles.push(p);
		return p;
	};
	this.createForce=function(ForceType)
	{
		var f=_forcePool.get(ForceType);
		_forces.push(f);
		return f;
	};
	this.createEmitter = function()
	{
		var emitter = new SPP.Emitter(this);
		_emitters.push(emitter);
		return emitter;
	};
	this.destroyEmitter = function(emitter)
	{
		var index = _emitters.indexOf(emitter);
		if (index == -1)return;
		var l = _particles.length;
		while (l-- > 0)
		{
			if (_particles[l].parent===emitter)
			{
				_particlePool.recycle(_particles[l]);
				_particles.splice(l, 1);
			}
		}
		_emitters.splice(index, 1);
		 emitter.dealloc();
	};
	this.destroyAllEmitters = function()
	{
		var l = _particles.length;
		while (l-- > 0)
		{
			if (_particles[l].parent!=null)
			{
				_particlePool.recycle(_particles[l]);
				_particles.splice(l, 1);
			}
		};
		for(var i=0,l=_emitters.length;i<l;i++)
		{
			_emitters[i].dealloc();
		}
		_emitters.length=0;
	};
	this.render = function()
	{
		if (!_isRunning)
			return;
		SPP.frameTime = (Date.now() - _lastTime) * 0.001;
		_lastTime = Date.now();
		var l = _particles.length;
		for ( var i = 0; i < l; i++)
		{
			_particles[i].render();
		}
		while (l-- > 0)
		{
			if (_particles[l].life <= 0)
			{
				_particlePool.recycle(_particles[l]);
				_particles.splice(l, 1);
			}
		}
		l=_forces.length;
		{
			while (l-- > 0)
			{
				if (_forces[l].life <= 0)
				{
					_forcePool.recycle(_forces[l]);
					_forces.splice(l, 1);
				}
			}
		}
	};

	this.start = function()
	{
		_lastTime = Date.now();
		_isRunning = true;
	};
	this.stop = function()
	{
		_isRunning = false;
	};
	this.destroy = function()
	{
		this.stop();
		_lastTime = null;
		_isRunning = null;
		
		for(var i=0,l=_particles.length;i<l;i++)
		{
			_particles[i].dealloc();
		};
		for(var i=0,l=_emitters.length;i<l;i++)
		{
			_emitters[i].dealloc();
		};
		for(var i=0,l=_forces.length;i<l;i++)
		{
			_forces[i].dealloc();
		};
		_emitters.length = 0;
		_emitters = null;
		
		_particles.length = 0;
		_particles = null;
		
		_particlePool.dealloc();
		_particlePool = null;
	};
};