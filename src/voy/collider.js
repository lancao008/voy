Voy.Collider = function() {
  Voy.Component.call(this, 'collider');
};

Voy.Collider.prototype = Object.create(Voy.Component.prototype);

Voy.Collider.prototype.getPosition = function() {
  return this.entity.getPosition();
};
