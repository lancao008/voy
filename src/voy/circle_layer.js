Voy.CircleLayer = function(color, radius) {
  Voy.Component.call(this, 'layer');
  this.color = color;
  this.radius = radius;
};

Voy.CircleLayer.prototype = Object.create(Voy.Component.prototype);

Voy.CircleLayer.prototype.draw = function(canvas) {
  canvas.drawCircle(this.entity.position, this.radius, this.color);
};
