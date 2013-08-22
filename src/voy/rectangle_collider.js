Voy.RectangleCollider = function() {
  Voy.Collider.call(this);
  this.shape = new Voy.Rectangle(Voy.Point.zero(), new Voy.Vector2(50, 50));
};

Voy.RectangleCollider.prototype = Object.create(Voy.Collider.prototype);

Voy.RectangleCollider.prototype.getSize = function() {
  return this.shape.size;
};
