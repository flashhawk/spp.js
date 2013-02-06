SPP.Attraction=function(attractionPoint,maxValue,r,life)
{
	SPP.Force.call(this,attractionPoint.x,attractionPoint.y, life);
	this.maxValue=maxValue;
	this.r=r;
	this.attractionPoint=attractionPoint;
	this.attractionVector=new SPP.Vector2D();
	this.target=null;
	//this.targetPoint=new SPP.Point();
};
SPP.Attraction.prototype=SPP.inherit(SPP.Force.prototype);
SPP.Attraction.prototype.constructor=SPP.Attraction;
SPP.Attraction.prototype.update=function()
{
	//this.targetPoint.x = this.target.position.x;
	//this.targetPoint.y = this.target.position.y;
	
	this.attractionVector.reset(this.attractionPoint.x, this.attractionPoint.y);
	var d = SPP.Point.distance(this.attractionPoint, this.target.point);
	if (d < this.r)
	{
		this.value = this.target.position.minusNew(this.attractionVector);
		this.value.scale(this.maxValue / d);
	}
	else 
	{
		this.value = this.attractionVector.minusNew(this.target.position);
		this.value.scale(this.maxValue / d);
	}
};