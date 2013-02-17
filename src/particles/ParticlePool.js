SPP.ParticlePool = function()
{

	var _particles = [];

	this.get = function(particleType)
	{

		var p;
		for ( var i in _particles)
		{
			if (_particles[i].constructor == particleType)
			{
				p = _particles[i];
				_particles.splice(i, 1);
				return p;
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
		//return _particles.slice();
		return _particles;
	};
};
