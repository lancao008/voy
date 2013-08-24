Voy.Polygonic = function(position, rotation) {
  Voy.Shape.call(this, position);
  this.rotation = typeof(rotation) === 'undefined' ? 0 : rotation;
};

Voy.Polygonic.prototype = Object.create(Voy.Shape);

Voy.Polygonic.prototype.getVertices = function() {
  var vertices = this.getLocalVertices();

  vertices.forEach(function(vertex) {
    vertex.add(this.position);
  }.bind(this));

  if(this.rotation) {
    vertices.forEach(function(vertex) {
      vertex.rotate(this.position, this.rotation);
    }.bind(this));
  }

  return vertices;
};

Voy.Polygonic.prototype.getClosestPoint = function(circle) {
  if(!(circle instanceof Voy.Circle)) throw new Error('Voy.Polygonic#getClosestPoint only supports circles at the moment.');
  var lineSegments = this.getLineSegments();
  var lineSegment, shortestDistance, distance, point, closestPoint;

  for(var i=0; lineSegments.length>i; i++) {
    lineSegment = lineSegments[i];
    point = lineSegment.getClosestPoint(circle.position);
    distance = point.getSquaredDistanceToPoint(circle.position);
    if(!shortestDistance || distance < shortestDistance) {
      shortestDistance = distance;
      closestPoint = point;
    }
  }

  return closestPoint;
};
