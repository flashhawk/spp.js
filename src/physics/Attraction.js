SPP.Attraction=function(attractionPosition,maxValue,r,life)
{
	SPP.Force.call(this,0,0, life);
	this.maxValue=maxValue;
	this.r=r;
	this.attractionPosition=attractionPosition;
	this.targetParticle=null;
};
SPP.Attraction.prototype=SPP.inherit(SPP.Force.prototype);
SPP.Attraction.prototype.constructor=SPP.Attraction;
SPP.Attraction.prototype.update=function()
{
	var d =this.attractionPosition.distanceTo(this.targetParticle.position);
	if (d < this.r)
	{
		this.value.subVectors(this.targetParticle.position,this.attractionPosition);
	}
	else 
	{
		this.value.subVectors(this.attractionPosition,this.targetParticle.position);
	};
	this.value.scale(this.maxValue / d);
};