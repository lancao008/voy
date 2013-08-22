Voy.Polygon = function(position) {
  Voy.Shape.call(this, position);
};

Voy.Polygon.prototype = Object.create(Voy.Shape);

Voy.Polygon.prototype.getClosestPoint = function(circle) {
  if(!(circle instanceof Voy.Circle)) throw new Error('Voy.Polygon#getClosestPoint only supports circles at the moment.');
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
