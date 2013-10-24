(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function (posX, posY) {
    Asteroids.MovingObject.call(this, posX, posY, [0, 0], Ship.RADIUS, Ship.COLOR);
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = '#fff';

  var power = Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  var draw = Ship.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.posX, this.posY - 20);
    ctx.lineTo(this.posX - 10, this.posY - 5);
    ctx.lineTo(this.posX + 10, this.posY - 5);
    ctx.closePath();
    ctx.fill();
  };

  var fire = Ship.prototype.fire = function () {
    var norm = Asteroids.Util.norm(this.vel);
    if (norm == 0) {
      return;
    } else {
      var mult = Asteroids.Bullet.SPEED / norm;
      var bulletVel = [mult * this.vel[0], mult * this.vel[1]];

      return new Asteroids.Bullet(this.posX, this.posY, bulletVel);
    }
	};

})(this);