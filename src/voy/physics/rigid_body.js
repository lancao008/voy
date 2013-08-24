Voy.RigidBody = function(options) {
  Voy.Component.call(this, 'rigidBody');
  options = options || {};
  this.static = options.static || false;
  this.force = Voy.Vector2.zero();
  this.velocity = Voy.Vector2.zero();
  this.drag = typeof(options.drag) === 'undefined' ? 0.05 : options.drag;
  this.maxSpeed = typeof(options.maxSpeed) === 'undefined' ? 0.05 : options.maxSpeed;
  this.maxForce = typeof(options.maxForce) === 'undefined' ? 0.05 : options.maxForce;
  this.bounciness = typeof(options.bounciness) === 'undefined' ? 0.9 : options.bounciness;
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
