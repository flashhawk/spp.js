SPP.ParticlePool = function()
{
	var _particles = [];
	this.get = function(particleType)
	{
		for ( var i in _particles)
		{
			if (_particles[i].constructor == particleType)
			{
				return _particles.splice(i, 1)[0];
			}
		}
		return new particleType();

	};
	this.recycle = function(p)
	{
		_particles.push(p);
	};
	this.getParticles = function()
	{
		return _particles;
	};
};
