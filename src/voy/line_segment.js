Voy.LineSegment = function(point0, point1) {
  this[0] = point0;
  this[1] = point1;
};

Voy.LineSegment.prototype.getLength = function() {
  var pointsDifference = this.getPointsDifference();
  return pointsDifference.getLength();
};

Voy.LineSegment.prototype.getLengthSquared = function() {
  var pointsDifference = this.getPointsDifference();
  return pointsDifference.getLengthSquared();
};

Voy.LineSegment.prototype.getPointsDifference = function() {
  return Voy.Vector2.subtract(this[1], this[0]);
};

Voy.LineSegment.prototype.toString = function() {
  return this[0].toString() + ", " + this[1].toString();
};

Voy.LineSegment.prototype.getClosestPoint = function(point) {
  var lengthSquared = this.getLengthSquared();
  if(lengthSquared == 0) return this[0];

  var pointsDifference = this.getPointsDifference();
  var pointToLineSegmentStart = Voy.Vector2.subtract(point, this[0]);
  var progress = pointsDifference.getDotProduct(pointToLineSegmentStart)/lengthSquared;

  //console.log('progress:', progress);
  if(progress < 0) return this[0];
  if(progress > 1) return this[1];

  var projection = Voy.Vector2.add(
    this[0],
    Voy.Vector2.multiply(pointsDifference, progress)
  )
  var projection = projection.toPoint();
  return projection;
};
