(function (root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Game = Asteroids.Game = function (ctx) {
		this.ctx = ctx;
		this.asteroids = [];
		addAsteroids(5);
	}

	var DIM_X = Game.DIM_X = 600;
	var DIM_Y = Game.DIM_Y = 600;
	var FPS = Game.FPS = (1000 / 30);

	var addAsteroids = Game.prototype.addAsteroids = function (num) {
		for (var i = 0; i < num; i++) {
			this.asteroids.push(Asteroids.Asteroid.randomAsteroid());
		}
	};

	var draw = Game.prototype.draw = function () {
		ctx.clearRect(0, 0, DIM_X, DIM_Y);
		for(var i = 0; i < this.asteroids.length; i++) {
			this.asteroids[i].draw(this.ctx);
		}
	};

	var move = Game.prototype.move = function () {
		for(var i = 0; i < this.asteroids.length; i++) {
			this.asteroids[i].move();
		}
	};

	var step = Game.prototype.step = function () {
		move();
		draw();
	};

	var start = Game.prototype.start = function () {
		window.setInterval(step(), FPS);
	};

})(this);