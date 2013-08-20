Voy.RigidBody = function() {
  Voy.Component.call(this, 'rigidBody');
  this.force = Voy.Vector2.zero();
  this.velocity = Voy.Vector2.zero();
  this.drag = 0.1;
  this.maxSpeed = 0.3;
  this.maxForce = 4;
  this.bounciness = 0.1;
};

Voy.RigidBody.prototype = Object.create(Voy.Component.prototype);

Voy.RigidBody.prototype.getPosition = function() {
  return this.entity.position;
};
