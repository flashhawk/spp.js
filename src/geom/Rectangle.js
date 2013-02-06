SPP.Rectangle = function(x, y, width, height)
{
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;

};
SPP.Rectangle.prototype =
{
    constructor : SPP.Rectangle,
    top : function()
    {
        return this.y;
    },

    bottom : function()
    {
        return this.y + this.height;
    },
    left : function()
    {
        return this.x;
    },
    right : function()
    {
        return this.x + this.width;
    },
    topLeft : function()
    {
        return new SPP.Point(this.x, this.y);
    },
    bottomRight : function()
    {
        return new SPP.Point(this.right(),this.bottom());
    },
    clone : function()
    {
        return SPP.Rectangle(this.x, this.y, this.width, this.height);
    },
    toString : function()
    {
        return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]";
    }
};

