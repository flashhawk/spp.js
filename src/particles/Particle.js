SPP.Particle = function ()
{
    this.group = null;
    this.life = Infinity;
    this._forcesMap = {};
    this.extra = {};
    this.onUpdate = null;
    this.zone=null;
};
SPP.Particle.prototype = {
    constructor: SPP.Particle,
    init: function (x, y, life)
    {
        if (life <= 0)life = -Infinity;
        this.position = SPP.VectorPool.get();
        this.velocity = SPP.VectorPool.get();
        this.acceleration = SPP.VectorPool.get();
        this.damp = SPP.VectorPool.get();
        this.damp.reset(0.1, 0.1);
        this.life = life || Infinity;
        if (x instanceof Array) {
            x = x[0] + ( Math.random() * x[1] );
        }
        if (y instanceof Array) {
            y = y[0] + ( Math.random() * y[1] );
        }
        this.position.reset(x, y);
    },
    getForce: function (id)
    {
        return this._forcesMap[id];
    },
    addForce: function (id, force)
    {
        this._forcesMap[id] = force;
    },
    removeForce: function (id)
    {
        if (this._forcesMap[id].target === this)
        {
            this._forcesMap[id].life = 0;
        }
        delete this._forcesMap[id];
    },
    removeAllForces: function ()
    {
        for (var i in this._forcesMap)
        {
            this.removeForce(i);
        }
    },
    render: function ()
    {
        this.update();
        if (this.onUpdate)this.onUpdate.apply(this);
        if (this.group != null)
        {
            var forceMap = this.group.getForceMap();
            for (var i in forceMap)
            {
                if (!forceMap[i].render(this))
                {
                    delete forceMap[i];
                }
            }
        }
        for (var i in this._forcesMap)
        {
            if (!this._forcesMap[i].render(this))
            {
                this.removeForce(i);
            }
        }
        this.velocity.add(this.acceleration);
        this.acceleration.reset(0, 0);
        this.velocity.x *= (1 - this.damp.x);
        this.velocity.y *= (1 - this.damp.y);
        this.position.add(this.velocity);
        if(this.zone)this.zone.render(this);
        this.life -= SPP.frameTime;
        if (this.life >= 0)
            return;
        this.dispatchEvent(new SPP.Event("dead"));
        this.reset();

    },
    update: function ()
    {

    },
    dealloc: function ()
    {
        SPP.VectorPool.recycle(this.position);
        SPP.VectorPool.recycle(this.velocity);
        SPP.VectorPool.recycle(this.acceleration);
        SPP.VectorPool.recycle(this.damp);
        this.position = null;
        this.velocity = null;
        this.acceleration = null;
        this.damp = null;
        this.life = null;
        this._forcesMap = null;
        this.extra = null;
        this.onUpdate = null;
        this.zone=null;
        this.group = null;
    },
    reset: function ()
    {
        SPP.VectorPool.recycle(this.position);
        SPP.VectorPool.recycle(this.velocity);
        SPP.VectorPool.recycle(this.acceleration);
        SPP.VectorPool.recycle(this.damp);
        this.position = null;
        this.velocity = null;
        this.acceleration = null;
        this.damp = null;
        this.life = 0;
        this.removeAllForces();
        this.removeAllEventListeners();
        for (var prop in this.extra)
        {
            delete this.extra[prop];
        }
        this.onUpdate = null;
        this.zone=null;
        this.group = null;
    }
};
SPP.extend(SPP.Particle.prototype, SPP.EventDispatcher.prototype);
