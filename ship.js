(function (root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Ship = Asteroids.Ship = function (posX, posY) {

		Asteroids.MovingObject.call(this, posX, posY, [0, 0], RADIUS, COLOR);
		this.facing = 1.5 * Math.PI;
	}

	Ship.inherits(Asteroids.MovingObject);

	var RADIUS = Ship.RADIUS = 10;
	var COLOR = Ship.COLOR = 'green';

	var power = Ship.prototype.power = function (impulse) {
		var vector = unitVecFrom(this.facing);

		impulse = [vector[0] * impulse, vector[1] * impulse];
		this.vel[0] = Math.min(this.vel[0] + impulse[0], 7);
		this.vel[1] = Math.min(this.vel[1] + impulse[1], 7);
	}

	var unitVecFrom = function (radian) {
		radians = [0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI,
									5*Math.PI/4, 3*Math.PI/2, 7*Math.PI/4];

		if (radian < Math.PI/4) {
			return [Math.sqrt(1), -Math.sqrt(1)];
		} else if (radian < Math.PI/2) {
			return [0, 1];
		} else if (radian < 3*Math.PI/4) {
			return [-Math.sqrt(1), -Math.sqrt(1)]
		} else if (radian < Math.PI) {
			return [-1, 0];
		} else if (radian < 5*Math.PI/4) {
			return [-Math.sqrt(1), Math.sqrt(1)]
		} else if (radian < 3*Math.PI/2) {
			return [0, -1];
		} else if (radian < 7*Math.PI/4) {
			return [Math.sqrt(1), Math.sqrt(1)]
		} else {
			return [1, 0];
		};
	}

	var draw = Ship.prototype.draw = function (ctx) {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(this.posX, this.posY - 15);
		ctx.lineTo(this.posX - 7, this.posY - 5);
		ctx.lineTo(this.posX + 7, this.posY - 5);
		ctx.lineTo(this.posX, this.posY - 15);
		ctx.fill();
		ctx.rotate(this.facing - (1.5 * Math.PI))
	}

	var turn = Ship.prototype.turn = function (direction) {
		if (direction == 'left') {
			this.facing -= Math.PI / 4;
		} else {
			this.facing += Math.PI / 4;
		}
	}

	var fire = Ship.prototype.fire = function () {

	}

})(this);