SPP.Vector2D = function(x, y)
{
    this.x = x || 0;
    this.y = y || 0;
};
SPP.Vector2D.prototype =
{
    constructor : SPP.Vector2D,
    toString : function()
    {
        return "[Vector2D (x=" + this.x + " y=" + this.y + ")]";
    },
    clone:function()
    {
      return new SPP.Vector2D(this.x,this.y);  
    },
    reset : function(x, y)
    {
    	this.x = x || 0;
        this.y = y || 0;
    },
    /**
     *
     * @param	v  向量
     * @return  适时候和V向量相等
     */
    equals : function(v)
    {
        return (this.x == v.x && this.y == v.y);
    },
    /**
     * 向量相加,原向量改变;
     * @param	v 向量
     */
    plus : function(v)
    {
        this.x += v.x;
        this.y += v.y;
    },
    /**
     * 向量向量相加，返回新向量，原向量不变
     * @param	v 向量
     * @return   反回新向量
     */
    plusNew : function(v)
    {
        return new SPP.Vector2D(this.x + v.x, this.y + v.y);
    },
    /**
     * 向量相减,原向量改变;
     * @param	v 向量
     */
    minus : function(v)
    {
        this.x -= v.x;
        this.y -= v.x;
    },
    /**
     * 向量向量相减，返回新向量，原向量不变
     * @param	v  向量
     * @return   返回新向量
     */
    minusNew : function(v)
    {
        return new SPP.Vector2D(this.x - v.x, this.y - v.y);
    },
    /**
     * 向量求反
     */
    negate : function()
    {
        this.x *= -1;
        this.y *= -1;
    },
    negateX : function()
    {
        this.x *= -1;
    },
    negateY : function()
    {
        this.y *= -1;
    },
    /**
     * 返回一个反向量,愿向量不变
     * @return  一个反向量
     */
    negateNew : function()
    {
        return new SPP.Vector2D(-this.x, -this.y);
    },
    /**
     * 向量的放缩
     * @param	ratio  放缩率
     */
    scale : function(ratio)
    {
        this.x *= ratio;
        this.y *= ratio;
    },
    scaleX : function(ratio)
    {
        this.x *= ratio;
    },
    scaleY : function(ratio)
    {
        this.y *= ratio;
    },
    scaleNew : function(ratio)
    {
        return new SPP.Vector2D(this.x * ratio, this.y * ratio);
    },
    /**
     * @return  向量的长度
     */
    getLength : function()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    /**
     * 设置向量的长度
     * @param	l  长度
     */
    setLength : function(l)
    {
        var ratio = l / this.getLength();
        this.scale(ratio);
    },
    /**
     * 向量的角度
     * @return  向量的角度
     */
    getAngle : function()
    {
        return SPP.MathUtils.atan2D(this.y, this.x);
    },
    /**
     * 设置向量的角度
     * @param	angle  角度
     */
    setAngle : function(angle)
    {
        var l = this.getLength();
        this.x = l * SPP.MathUtils.cosD(angle);
        this.y = l * SPP.MathUtils.sinD(angle);
    },
    /**
     * 向量的旋转
     * @param	angle 旋转的角度度为单位,逆时针为正.
     */
    rotate : function(angle)
    {
        var sina = SPP.MathUtils.sinD(angle);
        var cosa = SPP.MathUtils.cosD(angle);
        var tempx = this.x;
        var tempy = this.y;
        this.x = tempx * cosa - tempy * sina;
        this.y = tempx * sina + tempy * cosa;
    },
    rotateNew : function(angle)
    {
        var v = this.clone();
        v.rotate(angle);
        return v;
    },
    /**
     * 向量的点积
     * @param	v 向量
     * @return   和向量v的点积
     */
    dot : function(v)
    {
        return this.x * v.x + this.y * v.y;
    },
    /**
     * 返回在向量v上的投影向量
     * @param	v 向量
     * @return  返回在向量v上的投影向量
     */
    projection : function(v)
    {
        var btweenAngle = this.angleBetween(v);
        var k = (this.getLength() * SPP.MathUtils.cosD(btweenAngle)) / v.getLength();
        return v.scaleNew(k);
    },
    /**
     * 返回一个标准化向量
     * @return
     */
    normalized : function()
    {
        return new SPP.Vector2D(this.x / this.getLength(), this.y / this.getLength());
    },
    /**
     *
     * @return 向量的法线，就是垂线
     */
    getNormal : function()
    {
        return new SPP.Vector2D(-this.y, this.x);
    },
    /**
     * 垂直判断
     * @param	v
     */
    isPerpTo : function(v)
    {
        return (this.dot(v) == 0);
    },
    /**
     *
     * @param	v
     * @return  返回和向量v的夹角，度为单位
     */
    angleBetween : function(v)
    {
        var dp = this.dot(v);
        var cosAngle = dp / (this.getLength() * v.getLength());
        return SPP.MathUtils.acosD(cosAngle);
    }
};