(function() {
	bladeColor = "#00ff00";
	bladeWidth = 10;
	var buildBlade = function(width) {
		if (gameState == GAME_OVER)
			return;
		var i = bladeSystem.getParticles().length;
		var lineWidth = 1;
		var step = width / (i - 1);
		while (i-- > 1)
		{
			topContext.beginPath();
			if (i == 1)
				topContext.lineWidth = width;
			else
				topContext.lineWidth = lineWidth;
			var p = bladeSystem.getParticles()[i];
			var next = bladeSystem.getParticles()[i - 1];
			topContext.moveTo(p.position.x, p.position.y);
			topContext.lineTo(next.position.x, next.position.y);
			topContext.stroke();
			lineWidth += step;
			if (lineWidth >=width)
				lineWidth = width;
		}
	};
	buildColorBlade = function(color, width) {
		topContext.strokeStyle = color;
		buildBlade(width);

		topContext.strokeStyle = "#ffffff";
		buildBlade(width * 0.6);
	};
	buildBladeParticle = function(x, y) {
		var p = bladeSystem.createParticle(SPP.Particle);
		p.init(x, y, 0.2);
	};
}());