Voy.RectangleCollider = function() {
  Voy.Collider.call(this);
  this.size = new Voy.Vector2(50, 50);
};

Voy.RectangleCollider.prototype = Object.create(Voy.Collider.prototype);

Voy.RectangleCollider.prototype.getShape = function() {
  var shape = new Voy.Rectangle(this.entity.getWorldPosition(), this.size);
  return shape;
};

Voy.RectangleCollider.prototype.checkCollision = function(collider) {
  return this.getShape().overlaps(collider.getShape());
};
