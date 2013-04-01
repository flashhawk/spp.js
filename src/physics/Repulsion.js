SPP.Repulsion=function(repulsionPosition,maxValue,r,life)
{
	SPP.Force.call(this,0,0, life);
	this.maxValue=maxValue;
	this.r=r;
	this.repulsionPosition=repulsionPosition;
	this.targetParticle=null;
};
SPP.Repulsion.prototype=SPP.inherit(SPP.Force.prototype);
SPP.Repulsion.prototype.constructor=SPP.Repulsion;
SPP.Repulsion.prototype.update=function()
{
	var d =this.repulsionPosition.distanceTo(this.targetParticle.position);
	if(d>this.r)
	{
		this.value.reset(0, 0);
	}else
	{
		this.value.subVectors(this.targetParticle.position,this.repulsionPosition);
		this.value.scale(this.maxValue / d);
	}
};