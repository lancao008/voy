Voy.RectangleLayer = function(color, size) {
  Voy.Component.call(this, 'layer');
  this.color = color;
  this.size = size;
};

Voy.RectangleLayer.prototype = Object.create(Voy.Component.prototype);

Voy.RectangleLayer.prototype.draw = function(canvas) {
  canvas.drawRectangle(Voy.Vector2.zero(), this.size, this.color);
};
