Voy.RigidBody = function(options) {
  Voy.Component.call(this, 'rigidBody');
  this.static = options && options.static || false;
  this.force = Voy.Vector2.zero();
  this.velocity = Voy.Vector2.zero();
  this.drag = 0.9;
  this.maxSpeed = 0.3;
  this.maxForce = 4;
  this.bounciness = 0.1;
};

Voy.RigidBody.prototype = Object.create(Voy.Component.prototype);

Voy.RigidBody.prototype.getPosition = function() {
  return this.entity.position;
};
