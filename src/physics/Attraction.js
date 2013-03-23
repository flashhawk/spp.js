SPP.Attraction=function(attractionPosition,maxValue,r,life)
{
	SPP.Force.call(this,0,0, life);
	this.maxValue=maxValue;
	this.r=r;
	this.attractionPosition=attractionPosition;
	this.targetParticle=null;
	this.attractionPoint=new SPP.Point();
	this.targetPoint=new SPP.Point();
	
};
SPP.Attraction.prototype=SPP.inherit(SPP.Force.prototype);
SPP.Attraction.prototype.constructor=SPP.Attraction;
SPP.Attraction.prototype.update=function()
{
	this.attractionPoint.copyFromVector(this.attractionPosition);
	this.targetPoint.copyFromVector(this.targetParticle.position);
	var d = SPP.Point.distance(this.attractionPoint, this.targetPoint);
	if (d < this.r)
	{
		this.value = this.targetParticle.position.minusNew(this.attractionPosition);
	}
	else 
	{
		this.value = this.attractionPosition.minusNew(this.targetParticle.position);
	};
	this.value.scale(this.maxValue / d);
};