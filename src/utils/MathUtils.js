SPP.MathUtils = function()
{
};
SPP.MathUtils.toDegree = function(radian)
{
	return (radian / Math.PI) * 180.0;
};
SPP.MathUtils.toRadian = function(degree)
{
	return (degree / 180) * Math.PI;
};
/**
 *
 * @param	angle 度数
 * @return  返回angle度数的正弦；
 */

SPP.MathUtils.sinD = function(angle)
{
	return Math.sin(SPP.MathUtils.toRadian(angle));
};
/**
 *
 * @param	ratio 正弦值
 * @return   反回正弦值为ratio的角的度数,以度为单位；
 */
SPP.MathUtils.asinD = function(ratio)
{
	return SPP.MathUtils.toDegree(Math.asin(ratio));
};
/**
 * @param	angle 度数
 * @return  返回angle度数的余弦；
 */
SPP.MathUtils.cosD = function(angle)
{
	return Math.cos(SPP.MathUtils.toRadian(angle));
};
/**
 * @param	ratio 余弦值
 * @return   反回余弦值为ratio的角的度数,以度为单位；
 */
SPP.MathUtils.acosD = function(ratio)
{
	return SPP.MathUtils.toDegree(Math.acos(ratio));
};
/**
 * @param	angle 度数
 * @return  返回angle度数的正切；
 */
SPP.MathUtils.tanD = function(angle)
{
	return Math.tan(SPP.MathUtils.toRadian(angle));
};
/**
 * @param	ratio 正切值
 * @return   反回正切值为ratio的角的度数,以度为单位；
 */
SPP.MathUtils.atanD = function(ratio)
{
	return SPP.MathUtils.toDegree(Math.atan(ratio));
};
/**
 *
 * @param	y 该点的 y 坐标。
 * @param	x 该点的 x 坐标。
 * @return   y/x 的角度,以度为单位;
 */
SPP.MathUtils.atan2D = function(y, x)
{
	return SPP.MathUtils.toDegree(Math.atan2(y, x));
};

SPP.MathUtils.random=function(n)
{
	return n*Math.random()>>0;
};