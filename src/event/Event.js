SPP.Event=function(type)
{
	this.type=type;
	this.target=null;
};
SPP.Event.prototype=
{
	constructor:SPP.Event,
    clone:function()
    {
        return new SPP.Event(this.type,this.target);
    }
};