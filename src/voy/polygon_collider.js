Voy.PolygonCollider = function() {
  Voy.Collider.call(this);
};

Voy.PolygonCollider.prototype = Object.create(Voy.Collider.prototype);

Voy.PolygonCollider.prototype.getClosestPoint = function(circleCollider) {
  if(!(circleCollider instanceof Voy.CircleCollider)) throw new Error('Voy.PolygonCollider#getClosestEdge only supports circle colliders at the moment.');
  var lineSegments = this.getLineSegments();
  var lineSegment, shortestDistance, distance, point, closestPoint;
  var circlePosition = circleCollider.getPosition();

  for(var i=0; lineSegments.length>i; i++) {

    lineSegment = lineSegments[i];
    point = lineSegment.getClosestPoint(circlePosition);
    distance = point.getSquaredDistanceToPoint(circlePosition);
    if(!shortestDistance || distance < shortestDistance) {
      shortestDistance = distance;
      closestPoint = point;
    }
  }

  return closestPoint;
};
