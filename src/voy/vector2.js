Voy.Vector2 = function(component0, component1) {
  this[0] = component0;
  this[1] = component1;
};

Voy.Vector2.prototype.add = function(vector) {
  var result = Voy.Vector2.add(this, vector);
  this.set(result);
};

Voy.Vector2.prototype.subtract = function(vector) {
  var result = Voy.Vector2.subtract(this, vector);
  this.set(result);
};

Voy.Vector2.prototype.multiply = function(factor) {
  var result = Voy.Vector2.multiply(this, factor);
  this.set(result);
};

Voy.Vector2.prototype.toPoint = function() {
  var point = new Voy.Point(this[0], this[1]);
  return point;
};

Voy.Vector2.prototype.toString = function() {
  return "(" + this[0] + ", " + this[1] + ")";
};

Voy.Vector2.prototype.divide = function(divisor) {
  var result = Voy.Vector2.divide(this, divisor);
  this.set(result);
};

Voy.Vector2.prototype.getPerpendicular = function() {
  var vector = new Voy.Vector2(
    this[1]*-1,
    this[0]
  );
  return vector;
};

Voy.Vector2.prototype.set = function(vector) {
  this[0] = vector[0];
  this[1] = vector[1];
};

Voy.Vector2.prototype.truncate = function(maxLength) {
  var length = this.getLength();
  if(length && length > maxLength) {
    this.normalize();
    this.multiply(maxLength);
  }
};

Voy.Vector2.prototype.getDotProduct = function(vector) {
  var dotProduct = this[0]*vector[0] + this[1]*vector[1];
  return dotProduct;
};

Voy.Vector2.prototype.getLength = function() {
  return Math.sqrt(this.getLengthSquared());
};

Voy.Vector2.prototype.getLengthSquared = function() {
  return Math.pow(this[0], 2) + Math.pow(this[1], 2);
};

Voy.Vector2.prototype.normalize = function() {
  var vector = Voy.Vector2.normalize(this);
  this.set(vector);
};

Voy.Vector2.prototype.getNormalized = function() {
  var vector = Voy.Vector2.normalize(this);
  return vector;
};

Voy.Vector2.prototype.negate = function() {
  var vector = Voy.Vector2.negate(this);
  this.set(vector);
};

Voy.Vector2.add = function(vector1, vector2) {
  var result = new Voy.Vector2(
    vector1[0] + vector2[0],
    vector1[1] + vector2[1]
  );
  return result;
};

Voy.Vector2.subtract = function(vector1, vector2) {
  var result = new Voy.Vector2(
    vector1[0] - vector2[0],
    vector1[1] - vector2[1]
  );
  return result;
};

Voy.Vector2.multiply = function(vector, factor) {
  var result = new Voy.Vector2(
    vector[0]*factor,
    vector[1]*factor
  );
  return result;
};

Voy.Vector2.divide = function(vector, divisor) {
  var result = new Voy.Vector2(
    vector[0]/divisor,
    vector[1]/divisor
  );
  return result;
};

Voy.Vector2.zero = function() {
  var vector = new Voy.Vector2(0, 0);
  return vector;
};

Voy.Vector2.up = function() {
  var vector = new Voy.Vector2(0, 1);
  return vector;
};

Voy.Vector2.right = function() {
  var vector = new Voy.Vector2(1, 0);
  return vector;
};

Voy.Vector2.normalize = function(vector) {
  var vector = this.divide(vector, vector.getLength());
  return vector;
};

Voy.Vector2.negate = function(vector) {
  var vector = new Voy.Vector2(
    -vector[0],
    -vector[1]
  );
  return vector;
};
