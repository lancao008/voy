Voy.Collision = function(entity0, entity1) {
  this[0] = entity0;
  this[1] = entity1;
};

Voy.Collision.prototype.resolve = function() {
  var centerDifference = Voy.Vector2.subtract(this[0].getWorldPosition(), this[1].getWorldPosition());
  var axis = Math.abs(centerDifference[0]) > Math.abs(centerDifference[1]) ? 0 : 1;
  var force = this[0].collider.size[axis]/2 + this[0].collider.size[axis]/2 - Math.abs(centerDifference[axis]);
  if(!this[0].rigidBody.static && !this[1].rigidBody.static) force *= 0.5;
  var direction = Math.abs(centerDifference[axis])/centerDifference[axis];
  var translation = Voy.Vector2.zero();
  translation[axis] = force*direction;

  var bounciness = Math.min(this[0].rigidBody.bounciness, this[1].rigidBody.bounciness);

  if(!this[0].rigidBody.static) {
    this[0].position.add(translation);
    this[0].rigidBody.velocity[axis] = direction*bounciness;
  }

  if(!this[1].rigidBody.static) {
    this[1].position.subtract(translation);
    this[1].rigidBody.velocity[axis] = direction*-1*bounciness;
  }
};
