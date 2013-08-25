Voy.CircleLayer = function(color, radius) {
  Voy.Layer.call(this, 'circleLayer');
  this.color = color;
  this.radius = radius;
};

Voy.CircleLayer.prototype = Object.create(Voy.Layer.prototype);

Voy.CircleLayer.prototype.draw = function(canvas) {
  canvas.drawCircle(Voy.Vector2.zero(), this.radius, this.color);
};
