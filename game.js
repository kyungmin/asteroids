(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function (ctx, bg) {
    this.ctx = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship(300, 300);
    this.loopID = null;
    this.bg = bg;
    this.state = null;
  };

  Game.DIM_X = 600;
  Game.DIM_Y = 600;
  Game.FPS = 33;
  Game.NUM_ASTEROIDS = 10;

  var addAsteroids = Game.prototype.addAsteroids = function (num) {
    for (var i = 0; i < num; i++) {
      var randX = Math.random() * Game.DIM_X;
      var randY = Math.random() * Game.DIM_Y;
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(randX, randY));
    }
  };

  var draw = Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.drawImage(this.bg, 0, 0);

    for(var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.ctx);
    }

    for(var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(this.ctx);
    }
    this.ship.draw(this.ctx);
  };

  var move = Game.prototype.move = function () {
    for(var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move();
    }
    for(var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move();

      if (outOfBounds(this.bullets[i])) {
        this.bullets.splice(i, 1);
      }
    }
    this.ship.move();
  };

  var outOfBounds = Game.prototype.outOfBounds = function (obj) {
     var posX = obj.posX;
     var posY = obj.posY;

    return ((posX < 0) || (posY < 0) || (posX > Game.DIM_X) || (posY > Game.DIM_Y));
  }

  var step = Game.prototype.step = function () {
    this.move();
    this.draw();
    this.checkCollisions();
  };

  var fire = Game.prototype.fire = function () {
    var bullet = this.ship.fire();
    if(bullet) {
      this.bullets.push(bullet);
    }
  };

  var checkCollisions = Game.prototype.checkCollisions = function () {
    if (this.asteroids.length === 0) {
      this.state = 'win';
      this.stop();
    }
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.ship.isCollidedWith(this.asteroids[i])) {
        this.state = 'lose';
        this.stop();
      }
      for (var j = 0; j < this.bullets.length; j++) {
        if (this.bullets[j].isCollidedWith(this.asteroids[i])) {
          this.asteroids.splice(i, 1);
          this.bullets.splice(j, 1);
        }
      }
    }
  };

  var bindKeyHandlers = Game.prototype.bindKeyHandlers = function () {
    var that = this;

    key('up', function() { that.ship.power([0, -1]) });
    key('left', function() { that.ship.power([-1, 0]) });
    key('right', function () { that.ship.power([1, 0]) });
    key('down', function () { that.ship.power([0, 1]) });
    key('space', function () { that.fire() });
  };

  var stop = Game.prototype.stop = function () {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fillStyle ="#7B7DB5";
    this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.font = "30px Courier New"
    this.ctx.fillStyle = "#fff";
    this.ctx.moveTo(0, 0);
    if (this.state == 'win'){
      this.ctx.fillText("You're awesome!", 300, 300);
    } else {
      this.ctx.fillText("Game Over", 300, 300);
    }
    
    window.clearInterval(this.loopID);
  };

  var start = Game.prototype.start = function () {
    this.bindKeyHandlers();
    this.addAsteroids(Game.NUM_ASTEROIDS);
    this.loopID = window.setInterval(this.step.bind(this), Game.FPS);
  };
})(this);