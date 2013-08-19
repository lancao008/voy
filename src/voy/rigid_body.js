Voy.RigidBody = function() {
  Voy.Component.call(this, 'rigidBody');
  this.velocity = Voy.Vector2.zero();
};

Voy.RigidBody.prototype = Object.create(Voy.Component.prototype);

Voy.RigidBody.prototype.getPosition = function() {
  return this.entity.position;
};
