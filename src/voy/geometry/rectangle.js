Voy.Rectangle = function(position, size, rotation) {
  Voy.Polygonic.call(this, position, rotation);
  if(!size) throw new Error('Rectangle needs size.');
  this.size = size;
};

Voy.Rectangle.prototype = Object.create(Voy.Polygonic.prototype);

Voy.Rectangle.prototype.contains = function(point) {
  var result = (
    this.position[0] <= point[0] &&
    this.position[0] + this.size[0] > point[0] &&
    this.position[1] <= point[1] &&
    this.position[1] + this.size[1] > point[1]
  );
  return result;
};

Voy.Rectangle.prototype.getVertices = function() {
  var halfSize = Voy.Vector2.multiply(this.size, 0.5);

  var vertices = [
    new Voy.Point(this.position[0]-halfSize[0], this.position[1]-halfSize[1]),
    new Voy.Point(this.position[0]+halfSize[0], this.position[1]-halfSize[1]),
    new Voy.Point(this.position[0]-halfSize[0], this.position[1]+halfSize[1]),
    new Voy.Point(this.position[0]+halfSize[0], this.position[1]+halfSize[1]),
  ];

  if(this.rotation) {
    vertices.forEach(function(vertex) {
      vertex.rotate(this.position, this.rotation);
    }.bind(this));
  }

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
