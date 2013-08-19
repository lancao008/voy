Voy.Vector2 = function(component0, component1) {
  this[0] = component0;
  this[1] = component1;
};

Voy.Vector2.prototype.add = function(vector) {
  var result = Voy.Vector2.add(this, vector);
  this.set(result);
};

Voy.Vector2.prototype.set = function(vector) {
  this[0] = vector[0];
  this[1] = vector[1];
};

Voy.Vector2.add = function(vector1, vector2) {
  var vector = new Voy.Vector2(
    vector1[0] + vector2[0],
    vector1[1] + vector2[1]
  );
  return vector;
};

Voy.Vector2.zero = function() {
  var vector = new Voy.Vector2(0, 0);
  return vector;
};
