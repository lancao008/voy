Voy.CircleCollider = function(radius) {
  Voy.Collider.call(this);
  this.radius = radius;
};

Voy.CircleCollider.prototype = Object.create(Voy.Collider.prototype);

Voy.CircleCollider.prototype.project = function(axis) {
  var centerProjection = axis.getDotProduct(this.getPosition());
  var projection = new Voy.Projection(centerProjection-this.radius, centerProjection+this.radius);
  return projection;
};

Voy.CircleCollider.prototype.getDistanceToLineSegment = function(lineSegment) {
  return lineSegment.getDistanceToPoint(this.getPosition())-this.radius;
};
