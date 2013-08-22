Voy.Point = function(component0, component1) {
  Voy.Vector2.call(this, component0, component1);
};

Voy.Point.prototype = Object.create(Voy.Vector2.prototype);

Voy.Point.prototype.getDistanceToPoint = function(point) {
  var difference = Voy.Vector2.subtract(this, point);
  return difference.getLength();
};

Voy.Point.prototype.getSquaredDistanceToPoint = function(point) {
  var difference = Voy.Vector2.subtract(this, point);
  return difference.getLengthSquared();
};

Voy.Point.zero = function() {
  var vector = Voy.Vector2.zero();
  return Voy.Point.createFromVector(vector);
};

Voy.Point.createFromVector = function(vector) {
  var point = new Voy.Point(vector[0], vector[1]);
  return point;
};
