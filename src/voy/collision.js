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

  // we shut probably do something more clever about the velocity
  this[0].rigidBody.velocity = Voy.Vector2.zero();
  /*
  var centerDifference = Voy.Vector2.subtract(this[0].getWorldPosition(), this[1].getWorldPosition());
  var axis = Math.abs(centerDifference[0]) > Math.abs(centerDifference[1]) ? 0 : 1;
  var force = this[0].collider.size[axis]/2 + this[0].collider.size[axis]/2 - Math.abs(centerDifference[axis]);
  if(!this[0].rigidBody.static && !this[1].rigidBody.static) force *= 0.5;
  var separation = Math.abs(centerDifference[axis])/centerDifference[axis];
  var translation = Voy.Vector2.zero();
  translation[axis] = force*separation;

  var bounciness = Math.min(this[0].rigidBody.bounciness, this[1].rigidBody.bounciness);

  if(!this[0].rigidBody.static) {
    this[0].position.add(translation);
    this[0].rigidBody.velocity[axis] = separation*bounciness;
  }

  if(!this[1].rigidBody.static) {
    this[1].position.subtract(translation);
    this[1].rigidBody.velocity[axis] = separation*-1*bounciness;
  }
  */
};
