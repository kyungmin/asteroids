(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var COLOR = Asteroid.COLOR = 'white';
	var RADIUS = Asteroid.RADIUS = 20;

	var Asteroid = Asteroids.Asteroid = function (posX, posY, vel) {
		this.inherits(Asteroids.MovingObject);
		this.apply(Asteroids.MovingObject, [posX, posY, vel, COLOR, RADIUS]);
	}

	Asteroid.inherits(MovingObject);

	var randomAsteroid = Asteroid.randomAsteroid = function (dimX, dimY) {
		var startX = dimX * Math.random();
		var startY = dimY * Math.random();
		var startVel = randomVec();
		var ast = new Asteroid (startX, startY, startVel);
		return ast;
	};

	var randomVec = Asteroids.randomVec = function () {
		var randomX = 5 * ((Math.random() * 2) - 1);
		var randomY = 5 * ((Math.random() * 2) - 1);
		return [randomX, randomY];
	}

})(this);