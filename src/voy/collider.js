Voy.Collider = function() {
  Voy.Component.call(this, 'collider');
};

Voy.Collider.prototype = Object.create(Voy.Component.prototype);

Voy.Collider.prototype.initialize = function() {
  this.shape.position = this.getPosition();
};

Voy.Collider.prototype.getPosition = function() {
  return this.entity.getPosition();
};

Voy.Collider.prototype.getShape = function() {
  this.shape.position = this.getPosition();
  return this.shape;
};
