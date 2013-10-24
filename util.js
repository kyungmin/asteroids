(function (root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Util = Asteroids.Util = {};
  Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };
  Util.norm = function (vec) {
    return Util.dist([0, 0], vec);
  };
})(this);

Function.prototype.inherits = function(superClass) {
  function Surrogate() {};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
}