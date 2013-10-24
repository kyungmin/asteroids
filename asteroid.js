(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function (posX, posY, vel) {
    Asteroids.MovingObject.call(this, posX, posY, vel, Asteroid.RADIUS, Asteroid.COLOR);
  };

  Asteroid.inherits(Asteroids.MovingObject);
  Asteroid.COLOR = '#424370';
  Asteroid.RADIUS = 20;
  Asteroid.SPEED = 4;

  var randomAsteroid = Asteroid.randomAsteroid = function (dimX, dimY) {
    var startX = dimX * Math.random();
    var startY = dimY * Math.random();
    var startVel = randomVec(Asteroid.SPEED);
    var ast = new Asteroid (startX, startY, startVel);
    return ast;
  };

  var randomVec = Asteroids.randomVec = function (speed) {
    var x = Math.random() - 0.5;
    var y = Math.random() - 0.5;

    var preNorm = Asteroids.Util.norm([x, y]);
    var mult = speed / preNorm;

    return [mult * x, mult * y];
	};
})(this);