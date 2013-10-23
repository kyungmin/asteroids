(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Asteroid = Asteroids.Asteroid = function (posX, posY, vel) {
		Asteroids.MovingObject.call(this, posX, posY, vel, RADIUS, COLOR);
	}

	var COLOR = Asteroid.COLOR = 'black';
	var RADIUS = Asteroid.RADIUS = 20;

	Asteroid.inherits(Asteroids.MovingObject);

	var randomAsteroid = Asteroid.randomAsteroid = function (dimX, dimY) {
		var startX = dimX * Math.random();
		var startY = dimY * Math.random();
		var startVel = randomVec();
		var ast = new Asteroid (startX, startY, startVel);
		return ast;
	};

	var randomVec = Asteroids.randomVec = function () {
		var randomX = 3 * ((Math.random() * 2) - 1);
		var randomY = 3 * ((Math.random() * 2) - 1);
		return [randomX, randomY];
	}

})(this);