Voy.RectangleCollider = function(size) {
  Voy.Collider.call(this);
  this.shape = new Voy.Rectangle(Voy.Point.zero(), size);
};

Voy.RectangleCollider.prototype = Object.create(Voy.Collider.prototype);

Voy.RectangleCollider.prototype.getSize = function() {
  return this.shape.size;
};
