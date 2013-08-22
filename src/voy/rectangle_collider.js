Voy.RectangleCollider = function() {
  Voy.PolygonCollider.call(this);
  this.size = new Voy.Vector2(50, 50);
};

Voy.RectangleCollider.prototype = Object.create(Voy.PolygonCollider.prototype);

Voy.RectangleCollider.prototype.getVertices = function() {
  var position = this.entity.getPosition();
  var halfSize = Voy.Vector2.multiply(this.size, 0.5);

  var vertices = [
    new Voy.Vector2(position[0]-halfSize[0], position[1]-halfSize[1]),
    new Voy.Vector2(position[0]+halfSize[0], position[1]-halfSize[1]),
    new Voy.Vector2(position[0]-halfSize[0], position[1]+halfSize[1]),
    new Voy.Vector2(position[0]+halfSize[0], position[1]+halfSize[1]),
  ];

  return vertices;
};

Voy.RectangleCollider.prototype.project = function(axis) {
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

Voy.RectangleCollider.prototype.getLineSegments = function() {
  var vertices = this.getVertices();
  var lineSegments = [
    new Voy.LineSegment(vertices[0], vertices[1]),
    new Voy.LineSegment(vertices[1], vertices[3]),
    new Voy.LineSegment(vertices[3], vertices[2]),
    new Voy.LineSegment(vertices[2], vertices[0])
  ];
  return lineSegments;
};
