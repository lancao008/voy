Voy.CircleCollider = function(radius) {
  Voy.Collider.call(this);
  this.radius = radius;
};

Voy.CircleCollider.prototype = Object.create(Voy.Collider.prototype);

Voy.CircleCollider.prototype.getShape = function() {
  var shape = new Voy.Circle(this.entity.getWorldPosition(), this.radius);
  return shape;
};

Voy.CircleCollider.prototype.checkCollision = function(collider) {
  return this.getShape().overlaps(collider.getShape());
};
