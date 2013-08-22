Voy.RectangleCollider = function() {
  Voy.Collider.call(this);
  this.size = new Voy.Vector2(50, 50);
};

Voy.RectangleCollider.prototype = Object.create(Voy.Collider.prototype);

Voy.RectangleCollider.prototype.getVertices = function() {
  var position = this.entity.getWorldPosition();
  var halfSize = Voy.Vector2.multiply(this.size, 0.5);

  var vertices = [
    new Voy.Vector2(position[0]-halfSize[0], position[1]+halfSize[1]),
    new Voy.Vector2(position[0]+halfSize[0], position[1]+halfSize[1]),
    new Voy.Vector2(position[0]-halfSize[0], position[1]-halfSize[1]),
    new Voy.Vector2(position[0]+halfSize[0], position[1]-halfSize[1]),
  ];

  return vertices;
};

Voy.RectangleCollider.prototype.project = function(axis) {
  var vertices = this.getVertices();
  var min = axis.dot(vertices[0]);
  var max = min;
  var projection;
  for(var i=1; 4>i; i++) {
    projection = axis.dot(vertices[i]);
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
