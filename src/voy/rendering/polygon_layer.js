Voy.PolygonLayer = function(color, points) {
  Voy.Layer.call(this, 'polygonLayer');
  this.color = color;
  this.points = points;
};

Voy.PolygonLayer.prototype = Object.create(Voy.Layer.prototype);

Voy.PolygonLayer.prototype.draw = function(canvas) {
  canvas.drawPolygon(this.points, this.color);
};
