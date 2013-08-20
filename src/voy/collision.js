Voy.Collision = function(collider0, collider1) {
  this[0] = collider0;
  this[1] = collider1;
};

Voy.Collision.prototype.resolve = function() {
  var centerDifference = Voy.Vector2.subtract(this[0].getWorldPosition(), this[1].getWorldPosition());
  var axis = Math.abs(centerDifference[0]) > Math.abs(centerDifference[1]) ? 0 : 1;
  var force = this[0].size[axis]/2 + this[0].size[axis]/2 - Math.abs(centerDifference[axis]);
  if(!this[0].isStatic() && !this[1].isStatic()) force *= 0.5;
  var direction = Math.abs(centerDifference[axis])/centerDifference[axis];
  var translation = Voy.Vector2.zero();
  translation[axis] = force*direction;

  var bounciness = Math.min(this[0].getBounciness(), this[1].getBounciness());

  if(!this[0].isStatic()) {
    this[0].getPosition().add(translation);
    this[0].getVelocity()[axis] = direction*bounciness;
  }

  if(!this[1].isStatic()) {
    this[1].getPosition().subtract(translation);
    this[1].getVelocity()[axis] = direction*-1*bounciness;
  }
};
