Voy.RigidBody = function(options) {
  Voy.Component.call(this, 'rigidBody');
  this.static = options && options.static || false;
  this.force = Voy.Vector2.zero();
  this.velocity = Voy.Vector2.zero();
  this.drag = 0.5;
  this.maxSpeed = 0.2;
  this.maxForce = 4;
  this.bounciness = 0.1;
};

Voy.RigidBody.prototype = Object.create(Voy.Component.prototype);

Voy.RigidBody.prototype.getLocalPosition = function() {
  return this.entity.localPosition;
};

Voy.RigidBody.prototype.simulate = function(timeDelta) {
  this.force.truncate(this.maxForce);

  this.velocity.add(
    Voy.Vector2.multiply(this.force, timeDelta)
  );
  this.velocity.multiply(1-this.drag);
  this.velocity.truncate(this.maxSpeed);

  this.getLocalPosition().add(
    Voy.Vector2.multiply(this.velocity, timeDelta)
  );

  this.force = Voy.Vector2.zero();
};
