FruitGame.Collide=function()
{
	function sqr(x){
		return x * x;
	}

	function sign(n){
		return n < 0 ? -1 : ( n > 0 ? 1 : 0 );
	}

	function equation12( a, b, c ){
		if(a == 0)return;

		var delta = b * b - 4 * a * c;
		if(delta == 0)
			return [ -1 * b / (2 * a), -1 * b / (2 * a) ];
		else if(delta > 0)
			return [ (-1 * b + Math.sqrt(delta)) / (2 * a),  (-1 * b - Math.sqrt(delta)) / (2 * a) ];
	}

	// 返回线段和椭圆的两个交点，如果不相交，返回 null
	function lineXEllipse( p1, p2, c, r, e ){
		// 线段：p1, p2    圆心：c    半径：r    离心率：e
		if (r <= 0) return;
		e = e === undefined ? 1 : e;
		var t1 = r, t2 = r * e, k;

		a = sqr( t2) * sqr(p1[0] - p2[0]) + sqr(t1) * sqr(p1[1] - p2[1]);

		if (a <= 0) return;
		
		b = 2 * sqr(t2) * (p2[0] - p1[0]) * (p1[0] - c[0]) + 2 * sqr(t1) * (p2[1] - p1[1]) * (p1[1] - c[1]);
		c = sqr(t2) * sqr(p1[0] - c[0]) + sqr(t1) * sqr(p1[1] - c[1]) - sqr(t1) * sqr(t2);
		
		if (!( k = equation12(a, b, c, t1, t2) )) return;
		
		var result = [
			[ p1[0] + k[0] * (p2[0] - p1[0]), p1[1] + k[0] * (p2[1] - p1[1]) ],
			[ p1[0] + k[1] * (p2[0] - p1[0]), p1[1] + k[1] * (p2[1] - p1[1]) ]
		];
		
		if ( !( ( sign( result[0][0] - p1[0] ) * sign( result[0][0] - p2[0] ) <= 0 ) &&
			( sign( result[0][1] - p1[1] ) * sign( result[0][1] - p2[1] ) <= 0 ) ) )
			result[0] = null;

		if ( !( ( sign( result[1][0] - p1[0] ) * sign( result[1][0] - p2[0] ) <= 0 ) &&
			( sign( result[1][1] - p1[1] ) * sign( result[1][1] - p2[1] ) <= 0 ) ) )
			result[1] = null;

		return result;
	}

	// 判断计算线段和椭圆是否相交
	this.lineInEllipse=function( p1, p2, c, r, e ){
		var t = lineXEllipse( p1, p2, c, r, e );
		return t && ( t[0] || t[1] );
	};
};