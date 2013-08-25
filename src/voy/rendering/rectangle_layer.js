Voy.RectangleLayer = function(color, size) {
  Voy.Layer.call(this, 'rectangleLayer');
  this.color = color;
  this.size = size;
};

Voy.RectangleLayer.prototype = Object.create(Voy.Layer.prototype);

Voy.RectangleLayer.prototype.draw = function(canvas) {
  canvas.drawRectangle(Voy.Vector2.zero(), this.size, this.color);
};
