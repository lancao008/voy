Voy.Rectangle = function(position, size) {
  this.position = position;
  if(!size) throw new Error('Rectangle needs size.');
  this.size = size;
};

Voy.Rectangle.prototype.constructor = Voy.Rectangle;

Voy.Rectangle.prototype.contains = function(point) {
  var result = (
    this.position[0] <= point[0] &&
    this.position[0] + this.size[0] > point[0] &&
    this.position[1] <= point[1] &&
    this.position[1] + this.size[1] > point[1]
  );
  return result;
};

Voy.Rectangle.prototype.overlaps = function(rectangle) {
  if(!(rectangle instanceof Voy.Rectangle)) throw new Error("Voy.Rectangle#overlaps only supports Voy.Rectangle objects for now.");

  //console.log(this.position[0], '<=',rectangle.position[0] + rectangle.size[0]);
  //console.log(this.position[0] + this.size[0], '>', rectangle.position[0]);

  return (
    this.position[0] < rectangle.position[0] + rectangle.size[0] &&
    this.position[0] + this.size[0] > rectangle.position[0] &&
    this.position[1] < rectangle.position[1] + rectangle.size[1] &&
    this.position[1] + this.size[1] > rectangle.position[1]
  );
};
