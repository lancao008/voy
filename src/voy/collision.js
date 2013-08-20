Voy.Collision = function(collider0, collider1) {
  this[0] = collider0;
  this[1] = collider1;
};

Voy.Collision.prototype.resolve = function() {
  var centerDifference = Voy.Vector2.subtract(this[0].getWorldPosition(), this[1].getWorldPosition());
  var axis = Math.abs(centerDifference[0]) > Math.abs(centerDifference[1]) ? 0 : 1;
  var force = this[0].size[axis]/2 + this[0].size[axis]/2 - Math.abs(centerDifference[axis]);
  var direction = Math.abs(centerDifference[axis])/centerDifference[axis];
  var translation = Voy.Vector2.zero();
  translation[axis] = force*direction/2;

  var bounciness = Math.min(this[0].getBounciness(), this[1].getBounciness());
  this[0].getPosition().add(translation);
  this[0].getVelocity()[axis] = direction*bounciness;

  this[1].getPosition().subtract(translation);
  this[1].getVelocity()[axis] = direction*-1*bounciness;
};
