Voy.CircleLayer = function(color, radius) {
  Voy.Component.call(this, 'layer');
  this.color = color;
  this.radius = radius;
};

Voy.CircleLayer.prototype = Object.create(Voy.Component.prototype);

Voy.CircleLayer.prototype.draw = function(canvas) {
  canvas.drawCircle(Voy.Vector2.zero(), this.radius, this.color);
};
