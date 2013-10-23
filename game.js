(function (root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Game = Asteroids.Game = function (ctx) {
		this.ctx = ctx;
		this.asteroids = [];
	}

	var DIM_X = Game.DIM_X = 600;
	var DIM_Y = Game.DIM_Y = 600;
	var FPS = Game.FPS = 33; //(1000 / 30);

	var addAsteroids = Game.prototype.addAsteroids = function (num) {
		for (var i = 0; i < num; i++) {
			var randX = Math.random() * DIM_X;
			var randY = Math.random() * DIM_Y;
			this.asteroids.push(Asteroids.Asteroid.randomAsteroid(randX, randY));
		}
	};

	var draw = Game.prototype.draw = function () {
		console.log(this);
		this.ctx.clearRect(0, 0, DIM_X, DIM_Y);
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
		this.move();
		this.draw();
	};

	var start = Game.prototype.start = function () {
		this.addAsteroids(5);
		window.setInterval(this.step.bind(this), FPS);
		// var that = this;
// 		window.setInterval(function () {
// 			that.step();
// 		}, FPS);
	};

})(this);