var SPP = SPP || {
	REVISION : 'Beta',
	AUTHOR : "flashhawk",
	BLOG : "flashquake.cn",
	github:"https://github.com/flashhawk"
};
//通过原型继承创建一个新对象
SPP.inherit = function(p) {
	if (p == null)
		throw TypeError();
	if (Object.create)
		return Object.create(p);
	var t = typeof (p);
	if (t !== "object" && t !== "function")
		throw TypeError();
	function f() {
	}
	;
	f.prototype = p;
	return new f();

};
SPP.extend=function(obj, source )
{
	
};

SPP.frameTime=0;

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {

	var lastTime = 0;
	var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

	for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x)
	{

		window.requestAnimationFrame = window[vendors[x]
				+ 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]
				+ 'CancelAnimationFrame']
				|| window[vendors[x] + 'CancelRequestAnimationFrame'];

	}

	if (window.requestAnimationFrame === undefined)
	{

		window.requestAnimationFrame = function(callback, element) {

			var currTime = Date.now(), timeToCall = Math.max(0,
					16 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;

		};

	}

	window.cancelAnimationFrame = window.cancelAnimationFrame || function(id) {
		window.clearTimeout(id);
	};
	

}());


