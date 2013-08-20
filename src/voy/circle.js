Voy.Circle = function(position, radius) {
  this.position = position;
  this.radius = radius;
};

Voy.Circle.prototype.overlaps = function(shape) {
  if(!(shape instanceof Voy.Circle)) throw new Error('Sorry, I only do circles at the moment.');
  var centerDistance = Voy.Vector2.subtract(shape.position, this.position).getLength();
  if(centerDistance < this.radius + shape.radius) {
    return true;
  }
};
