SPP.Point=function(x,y)
{
    this.x=x||0;
    this.y=y||0;
};
SPP.Point.prototype=
{
    constructor:SPP.Point,
    clone:function()
    {
        return new SPP.Point(this.x,this.y);
    },
    toString:function()
    {
        return "[Point (x="+this.x+" y="+this.y+")]";
    }
};
SPP.Point.distance=function(p1,p2)
{
	 return Math.sqrt(Math.pow(p1.x-p2.x,2) + Math.pow(p1.y-p2.y,2));
};

