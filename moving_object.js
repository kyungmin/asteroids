(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function (posX, posY, vel, radius, color) {
    this.posX = posX;
    this.posY = posY;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };

  MovingObject.prototype.move = function() {
    this.posX = bound((this.posX + this.vel[0]), Asteroids.Game.DIM_X);
    this.posY = bound((this.posY + this.vel[1]), Asteroids.Game.DIM_Y);
  };

  var bound = Asteroids.bound = function (number, max) {
    if (number < 0) {
      return (number + max);
    } else if (number > max) {
      return (number - max);
    } else {
      return number;
    }
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.posX,
      this.posY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    return (this.distanceFrom(otherObject) < (this.radius + otherObject.radius));
  };

  MovingObject.prototype.distanceFrom = function (otherObject) {
    var dX = otherObject.posX - this.posX;
    var dY = otherObject.posY - this.posY;
    return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
  };
})(this);