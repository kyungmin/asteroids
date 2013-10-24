(function (root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Game = Asteroids.Game = function (ctx) {
		this.ctx = ctx;
		this.asteroids = [];
		this.ship = new Asteroids.Ship(0, 0);
		this.loopID = null;
	}

	var DIM_X = Game.DIM_X = 600;
	var DIM_Y = Game.DIM_Y = 600;
	var FPS = Game.FPS = 33;

	var addAsteroids = Game.prototype.addAsteroids = function (num) {
		for (var i = 0; i < num; i++) {
			var randX = Math.random() * DIM_X;
			var randY = Math.random() * DIM_Y;
			this.asteroids.push(Asteroids.Asteroid.randomAsteroid(randX, randY));
		}
	};

	var draw = Game.prototype.draw = function () {
		this.ctx.clearRect(0, 0, DIM_X, DIM_Y);
		for(var i = 0; i < this.asteroids.length; i++) {
			this.asteroids[i].draw(this.ctx);
		}
		this.ship.draw(this.ctx);
	};

	var move = Game.prototype.move = function () {
		for(var i = 0; i < this.asteroids.length; i++) {
			this.asteroids[i].move();
		}
		this.ship.move();
	};

	var step = Game.prototype.step = function () {
		this.move();
		this.draw();
		this.checkCollisions();
	};

	var checkCollisions = Game.prototype.checkCollisions = function () {
		for(var i = 0; i < this.asteroids.length; i++) {
			if (this.ship.isCollidedWith(this.asteroids[i])) {
				this.stop();
			}
		}
	}

	var bindKeyHandlers = Game.prototype.bindKeyHandlers = function () {
		var that = this;
		console.log(this);
		key('up', function() { that.ship.power(2) });
		key('left', function() { that.ship.turn('left') });
		key('right', function () { that.ship.turn('right') });
		key('space', function () { that.ship.fire() });
	}

	var stop = Game.prototype.stop = function () {
		window.clearInterval(this.loopID);
		alert("You lose. Sucker.");
	}

	var start = Game.prototype.start = function () {
		this.bindKeyHandlers();
		this.addAsteroids(5);
		this.ship.posX = 300;
		this.ship.posY = 300;
		this.loopID = window.setInterval(this.step.bind(this), FPS);
		// var that = this;
// 		window.setInterval(function () {
// 			that.step();
// 		}, FPS);
	};

})(this);