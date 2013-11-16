SPP.Pool= function()
{
	var _objArray = [];
	this.get = function(objType)
	{
		for ( var i in _objArray)
		{
			if (_objArray[i].constructor === objType)
			return _objArray.splice(i, 1)[0];
		}
		return new objType();
	};
	this.recycle = function(p)
	{
		_objArray.push(p);
	};
	this.getObjects = function()
	{
		return _objArray;
	};
	this.dealloc=function()
	{
		for(var i=0,l=_objArray.length;i<l;i++)
		{
			_objArray[i].dealloc();
		};
		_objArray.length=0;
		_objArray=null;
	};
};
SPP.forcePool=new SPP.Pool();
SPP.particlePool=new SPP.Pool();
