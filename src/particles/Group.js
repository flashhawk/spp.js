SPP.Group = function(parent)
{
	var _parent=parent;
	var _forcesMap = {};
	
	this.createParticle = function(particleType)
	{
		var p=_parent.createParticle(particleType);
		p.group=this;
		return p;
	};
	this.getForceMap=function()
	{
		return _forcesMap;
	};
	this.addForce = function(id, force)
	{
		_forcesMap[id] = force;
	};
	this.removeForce = function(id)
	{
		delete _forcesMap[id];
	};
	this.removeAllForces = function()
	{
		for ( var i in _forcesMap)
		{
			delete _forcesMap[i];
		};
	};
	this.dealloc=function()
	{
		this.removeAllForces();
		_parent=null;
		_forcesMap=null;
	};
};