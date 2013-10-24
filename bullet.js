(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Bullet = Asteroids.Bullet = function (posX, posY, vel) {
    Asteroids.MovingObject.call(this, posX, posY, vel, Bullet.RADIUS, Bullet.COLOR);
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.COLOR = '#FFBD5C';
  Bullet.RADIUS = 4;
  Bullet.SPEED = 15;

  var move = Bullet.prototype.move = function () {
    this.posX += this.vel[0];
    this.posY += this.vel[1];
  };
})(this);