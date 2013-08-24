Voy.Polygon = function(position, points, rotation) {
  Voy.Polygonic.call(this, position, rotation);
  if(!points || !points.length) throw new Error('Polygon needs points.');
  this.points = points;
};

Voy.Polygon.prototype = Object.create(Voy.Polygonic.prototype);

Voy.Polygon.prototype.getLocalVertices = function() {
  var vertices = [];
  this.points.forEach(function(point) {
    vertices.push(point.clone());
  });
  return vertices;
};

Voy.Polygon.prototype.getLineSegments = function() {
  var vertices = this.getVertices();
  var lineSegments = [];
  for(var i=0; vertices.length-1>i; i++) {
    lineSegments.push(new Voy.LineSegment(vertices[i], vertices[i+1]));
  }
  lineSegments.push(new Voy.LineSegment(vertices[i], vertices[0]));
  return lineSegments;
};
