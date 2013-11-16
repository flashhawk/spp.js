SPP.VectorPool = {
	__vectors : [],

	get : function()
	{
		if (this.__vectors.length > 0)
		{
			return this.__vectors.pop();
		}
		return this._addToPool();
	},

	recycle : function(v)
	{
        v.reset(0,0);
		this.__vectors.push(v);
	},
	_addToPool : function()
	{
		for ( var i = 0, size = 50; i < size; i++)
		{
			this.__vectors.push(new SPP.Vector2D());
		};
		return new SPP.Vector2D();
	}
};
