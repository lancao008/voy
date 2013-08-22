Voy.CircleCollider = function(radius) {
  Voy.Collider.call(this);
  this.radius = radius;
};

Voy.CircleCollider.prototype = Object.create(Voy.Collider.prototype);
