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
  this[0].localPosition.add(Voy.Vector2.multiply(this.separation, 1.001));

  var normal = Voy.Vector2.normalize(this.separation);

  var velocityDifference = Voy.Vector2.subtract(this[0].rigidBody.velocity, this[1].rigidBody.velocity);

  var velocityAlongNormal = velocityDifference.getDotProduct(normal);

  if(velocityAlongNormal > 0) return false;

  var bounciness = Math.min(this[0].rigidBody.bounciness, this[1].rigidBody.bounciness);

  var impulsePower = -velocityAlongNormal*(1+bounciness)*1.01;
  var impulse = Voy.Vector2.multiply(normal, impulsePower);
  this[0].rigidBody.velocity.add(impulse);
};
