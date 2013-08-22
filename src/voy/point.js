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
