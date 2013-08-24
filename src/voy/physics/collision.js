Voy.Collision = function(entity0, entity1, separation) {
  this[0] = entity0;
  this[1] = entity1;
  this.separation = separation;
};

Voy.Collision.prototype.isPhysical = function() {
  return !!this[0].rigidBody && !!this[1].rigidBody;
};

Voy.Collision.prototype.notify = function() {
  this[0].notify('collided', this);
  this[1].notify('collided', this);
};

Voy.Collision.prototype.resolve = function() {
  // Improvement possibility
  // Currently the effort and time going "into" the other body is essentially neutralized.
  // For a even more perfect simulation one would calculate how much time each moving body
  // lost due to this separation translation. Something like:
  // timeLost = this.separation.getLength()/velocity.getLength()
  // and then when the new velocity is calculated
  // position.add(timeLost*velocity)
  // Until I haven't really needed this, so for simplicity's sake I haven't added it.

  this[0].localPosition.add(Voy.Vector2.multiply(this.separation, 1.001));

  var normal = Voy.Vector2.normalize(this.separation);
  var velocityDifference = Voy.Vector2.subtract(this[0].rigidBody.velocity, this[1].rigidBody.velocity);
  var velocityAlongNormal = velocityDifference.getDotProduct(normal);

  if(velocityAlongNormal > 0) return false;

  var bounciness = Math.min(this[0].rigidBody.bounciness, this[1].rigidBody.bounciness);

  var impulsePower = -velocityAlongNormal*(1+bounciness)*1.01;

  var noStatic = !this[0].rigidBody.static && !this[1].rigidBody.static;
  if(noStatic) impulsePower /= 1/this[0].rigidBody.mass + 1/this[1].rigidBody.mass;
  var impulse = Voy.Vector2.multiply(normal, impulsePower);

  if(noStatic) {
    this[0].rigidBody.velocity.add(
      Voy.Vector2.multiply(impulse, 1/this[0].rigidBody.mass)
    );
    this[1].rigidBody.velocity.subtract(
      Voy.Vector2.multiply(impulse, 1/this[1].rigidBody.mass)
    );
  } else {
    var nonStaticIndex = this[0].rigidBody.static ? 1 : 0;
    this[nonStaticIndex].rigidBody.velocity.add(impulse);
  }
};
