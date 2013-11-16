SPP.ParticleSystem = function ()
{
    var _particles = [];
    var _forces = [];
    var _groups = [];
    var _lastTime = null;
    var _isRunning = false;
    this.getParticles = function ()
    {
        return _particles;
    };
    this.getForces = function ()
    {
        return _forces;
    };
    this.createParticle = function (particleType)
    {
        var p = SPP.particlePool.get(particleType);
        _particles.push(p);
        return p;
    };
    this.createForce = function (ForceType)
    {
        var f = SPP.forcePool.get(ForceType);
        _forces.push(f);
        return f;
    };
    this.createGroup = function ()
    {
        var group = new SPP.Group(this);
        _groups.push(group);
        return group;
    };
    this.destroyGroup = function (group)
    {
        var index = _groups.indexOf(group);
        if (index == -1)return;
        var l = _particles.length;
        while (l-- > 0)
        {
            if (_particles[l].parent === group)
            {
                SPP.particlePool.recycle(_particles[l]);
                _particles.splice(l, 1);
            }
        }
        _groups.splice(index, 1);
        group.dealloc();
    };
    this.destroyAllGroup = function ()
    {
        var l = _particles.length;
        while (l-- > 0)
        {
            if (_particles[l].parent != null)
            {
                SPP.particlePool.recycle(_particles[l]);
                _particles.splice(l, 1);
            }
        }
        for (var i = 0, l = _groups.length; i < l; i++)
        {
            _groups[i].dealloc();
        }
        _groups.length = 0;
    };
    this.render = function ()
    {
        if (!_isRunning)
            return;
        SPP.frameTime = (Date.now() - _lastTime) * 0.001;
        _lastTime = Date.now();
        var l = _particles.length;
        for (var i = 0; i < l; i++)
        {
            _particles[i].render();
        }
        while (l-- > 0)
        {
            if (_particles[l].life <= 0)
            {
                SPP.particlePool.recycle(_particles[l]);
                _particles.splice(l, 1);
            }
        }
        l = _forces.length;
        {
            while (l-- > 0)
            {
                if (_forces[l].life <= 0)
                {
                    SPP.forcePool.recycle(_forces[l]);
                    _forces.splice(l, 1);
                }
            }
        }
    };

    this.start = function ()
    {
        _lastTime = Date.now();
        _isRunning = true;
    };
    this.stop = function ()
    {
        _isRunning = false;
    };
    this.destroy = function ()
    {
        this.stop();
        _lastTime = null;
        _isRunning = null;
        for (var i = 0, l = _particles.length; i < l; i++)
        {
            _particles[i].dealloc();
        }
        for (var i = 0, l = _groups.length; i < l; i++)
        {
            _groups[i].dealloc();
        }
        for (var i = 0, l = _forces.length; i < l; i++)
        {
            _forces[i].dealloc();
        }
        _groups.length = 0;
        _groups = null;

        _particles.length = 0;
        _particles = null;
    };
};