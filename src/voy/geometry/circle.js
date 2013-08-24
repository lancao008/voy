Voy.Circle = function(position, radius) {
  Voy.Shape.call(this, position);
  this.radius = radius;
};

Voy.Circle.prototype = Object.create(Voy.Shape.prototype);

Voy.Circle.prototype.project = function(axis) {
  var centerProjection = axis.getDotProduct(this.position);
  var projection = new Voy.Projection(centerProjection-this.radius, centerProjection+this.radius);
  return projection;
};

Voy.Circle.prototype.getDistanceToLineSegment = function(lineSegment) {
  return lineSegment.getDistanceToPoint(this.position)-this.radius;
};
