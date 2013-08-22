Voy.CircleCollider = function(radius) {
  Voy.Collider.call(this);
  this.shape = new Voy.Circle(Voy.Point.zero(), radius);
};

Voy.CircleCollider.prototype = Object.create(Voy.Collider.prototype);

Voy.CircleCollider.prototype.getRadius = function() {
  return this.shape.radius;
};
