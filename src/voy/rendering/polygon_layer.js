Voy.PolygonLayer = function(color, points) {
  Voy.Component.call(this, 'layer');
  this.color = color;
  this.points = points;
};

Voy.PolygonLayer.prototype = Object.create(Voy.Component.prototype);

Voy.PolygonLayer.prototype.draw = function(canvas) {
  canvas.drawPolygon(this.points, this.color);
};
