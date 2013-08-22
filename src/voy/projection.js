Voy.Projection = function(min, max) {
  this.min = min;
  this.max = max;
};

Voy.Projection.prototype.overlaps = function(projection) {
  //console.log('proj:', this.min, '-', this.max, ' og ', projection.min, projection.max);
  if(this.max <= projection.min) return false;
  if(this.min >= projection.max) return false;

  //console.log('yep');
  return true;
};

Voy.Projection.prototype.getOverlap = function(projection) {
  var min = Math.max(this.min, projection.min);
  var max = Math.min(this.max, projection.max);
  return max-min;
};
