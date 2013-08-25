Voy.CircleLayer = function(radius, color) {
  if(!color) color = 'blue';
  Voy.Layer.call(this, 'circleLayer');
  this.color = color;
  this.radius = radius;
};

Voy.CircleLayer.prototype = Object.create(Voy.Layer.prototype);

Voy.CircleLayer.prototype.draw = function(canvas) {
  canvas.drawCircle(this.radius, this.color);
};
