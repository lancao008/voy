Voy.Projection = function(min, max) {
  this.min = min;
  this.max = max;
};

Voy.Projection.prototype.overlaps = function(projection) {
  if(this.max <= projection.min) return false;
  if(this.min >= projection.max) return false;

  return true;
};

Voy.Projection.prototype.getOverlap = function(projection) {
  var min = Math.max(this.min, projection.min);
  var max = Math.min(this.max, projection.max);
  return max-min;
};
