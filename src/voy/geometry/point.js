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

Voy.Point.prototype.clone = function() {
  return new Voy.Point(this[0], this[1]);
};

Voy.Point.prototype.rotate = function(rotationPoint, angle) {
  this.subtract(rotationPoint);
  var rotation = Voy.Matrix2.rotation(angle);
  this.set(
    Voy.Matrix2.multiply(rotation, this)
  );
  this.add(rotationPoint);
};

Voy.Point.zero = function() {
  var vector = Voy.Vector2.zero();
  return Voy.Point.createFromVector(vector);
};

Voy.Point.subtract = function(point1, point2) {
  return Voy.Vector2.subtract(point1, point2).toPoint();
};

Voy.Point.multiply = function(point1, point2) {
  return Voy.Vector2.multiply(point1, point2).toPoint();
};

Voy.Point.createFromVector = function(vector) {
  var point = new Voy.Point(vector[0], vector[1]);
  return point;
};

Voy.Point.createFromArray = function(array) {
  return new Voy.Point(array[0], array[1]);
};
