Voy.Rectangle = function(position, size) {
  Voy.Polygon.call(this, position);
  if(!size) throw new Error('Rectangle needs size.');
  this.size = size;
};

Voy.Rectangle.prototype = Object.create(Voy.Polygon.prototype);

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

  return (
    this.position[0] < rectangle.position[0] + rectangle.size[0] &&
    this.position[0] + this.size[0] > rectangle.position[0] &&
    this.position[1] < rectangle.position[1] + rectangle.size[1] &&
    this.position[1] + this.size[1] > rectangle.position[1]
  );
};


Voy.Rectangle.prototype.getVertices = function() {
  var halfSize = Voy.Vector2.multiply(this.size, 0.5);

  var vertices = [
    new Voy.Point(this.position[0]-halfSize[0], this.position[1]-halfSize[1]),
    new Voy.Point(this.position[0]+halfSize[0], this.position[1]-halfSize[1]),
    new Voy.Point(this.position[0]-halfSize[0], this.position[1]+halfSize[1]),
    new Voy.Point(this.position[0]+halfSize[0], this.position[1]+halfSize[1]),
  ];

  return vertices;
};

Voy.Rectangle.prototype.project = function(axis) {
  var vertices = this.getVertices();
  var min = axis.getDotProduct(vertices[0]);
  var max = min;
  var projection;
  for(var i=1; 4>i; i++) {
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

Voy.Rectangle.prototype.getLineSegments = function() {
  var vertices = this.getVertices();
  var lineSegments = [
    new Voy.LineSegment(vertices[0], vertices[1]),
    new Voy.LineSegment(vertices[1], vertices[3]),
    new Voy.LineSegment(vertices[3], vertices[2]),
    new Voy.LineSegment(vertices[2], vertices[0])
  ];
  return lineSegments;
};
