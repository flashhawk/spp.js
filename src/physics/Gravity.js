SPP.Gravity=function(value)
{
	SPP.Force.call(this,0,value,Infinity);
};
SPP.Gravity.prototype=SPP.inherit(SPP.Force.prototype);
SPP.Gravity.prototype.constructor=SPP.Gravity;