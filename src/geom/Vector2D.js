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
    copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		return this;
	},
    reset : function(x, y)
    {
    	this.x = x || 0;
        this.y = y || 0;
        return this;
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
    add : function(v)
    {
        this.x += v.x;
        this.y += v.y;
        return this;
    },
    /**
     * 向量向量相加，返回新向量，原向量不变
     * @param	v 向量
     * @return   反回新向量
     */
    addNew : function(v)
    {
        return new SPP.Vector2D(this.x + v.x, this.y + v.y);
    },
    addVectors:function(a,b)
    {
    	this.x = a.x + b.x;
		this.y = a.y + b.y;
		return this;
    },
    /**
     * 向量相减,原向量改变;
     * @param	v 向量
     */
    sub : function(v)
    {
        this.x -= v.x;
        this.y -= v.x;
        return this;
    },
    /**
     * 向量向量相减，返回新向量，原向量不变
     * @param	v  向量
     * @return   返回新向量
     */
    subNew : function(v)
    {
        return new SPP.Vector2D(this.x - v.x, this.y - v.y);
    },
    subVectors:function(a,b)
    {
    	this.x = a.x - b.x;
		this.y = a.y - b.y;
		return this;
    },
    /**
     * 向量求反
     */
    negate : function()
    {
        this.x *= -1;
        this.y *= -1;
        return this;
    },
    negateX : function()
    {
        this.x *= -1;
        return this;
    },
    negateY : function()
    {
        this.y *= -1;
        return this;
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
        return this;
    },
    scaleX : function(ratio)
    {
        this.x *= ratio;
        return this;
    },
    scaleY : function(ratio)
    {
        this.y *= ratio;
        return this;
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
        return this;
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
        return this;
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
        return this;
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
     * 返回一个标准化向量,原向量不变
     * @return
     */
    normalizeNew : function()
    {
       // return new SPP.Vector2D(this.x / this.getLength(), this.y / this.getLength());
        return this.clone().normalize();
    },
    /**
     * 标准化向量
     * @return
     */
    normalize:function()
    {
    	if(this.getLength()!=0)
    	this.scale(1/this.getLength());
    	else this.scale(0);
    	return this;
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
    },
    /**
    *当向量作为点使用的时候返回两个点之间的距离
    * @param	v
    * @return  返回和向量v的夹角，度为单位
    */
    distanceTo:function(v)
    {
    	 return Math.sqrt(Math.pow(this.x-v.x,2) + Math.pow(this.y-v.y,2));
    }
};
