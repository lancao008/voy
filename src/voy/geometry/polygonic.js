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

Voy.Polygonic.prototype.project = function(axis) {
  var vertices = this.getVertices();
  var min = axis.getDotProduct(vertices[0]);
  var max = min;
  var projection;
  for(var i=1; vertices.length>i; i++) {
    projection = axis.getDotProduct(vertices[i]);
    if(projection < min) {
      min = projection;
    }
    else if(projection > max) {
      max = projection;
    }
  }
  projection = new Voy.Projection(min, max);
  return projection;
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

Voy.Polygonic.prototype.getNormals = function() {
  var lineSegments = this.getLineSegments();
  var normals = [];
  lineSegments.forEach(function(lineSegment) {
    var normal = lineSegment.getPointsDifference().getPerpendicular().getNormalized();
    normals.push(normal)
  });
  return normals;
};
