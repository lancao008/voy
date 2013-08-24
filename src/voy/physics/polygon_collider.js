Voy.PolygonCollider = function(points) {
  Voy.Collider.call(this);
  this.shape = new Voy.Polygon(Voy.Point.zero(), points);
};

Voy.PolygonCollider.prototype = Object.create(Voy.Collider.prototype);
