Voy.Collider = function() {
  Voy.Component.call(this, 'collider');
};

Voy.Collider.prototype = Object.create(Voy.Component.prototype);

Voy.Collider.prototype.initialize = function() {
  this.rigidBody = this.entity.getComponent('rigidBody');
};

Voy.Collider.prototype.getWorldPosition = function() {
  return this.entity.getWorldPosition();
};

Voy.Collider.prototype.getPosition = function() {
  return this.entity.position;
};

Voy.Collider.prototype.getVelocity = function() {
  return this.rigidBody.velocity;
};

Voy.Collider.prototype.getBounciness = function() {
  return this.rigidBody.bounciness;
};

Voy.Collider.prototype.isStatic = function() {
  return this.rigidBody.static;
};
