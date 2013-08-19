Voy.Vector2 = function(component0, component1) {
  this[0] = component0;
  this[1] = component1;
};

Voy.Vector2.prototype.add = function(vector) {
  var result = Voy.Vector2.add(this, vector);
  this.set(result);
};

Voy.Vector2.prototype.multiply = function(factor) {
  var result = Voy.Vector2.multiply(this, factor);
  this.set(result);
};

Voy.Vector2.prototype.divide = function(divisor) {
  var result = Voy.Vector2.divide(this, divisor);
  this.set(result);
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

Voy.Vector2.prototype.getLength = function() {
  var squareSum = Math.pow(this[0], 2) + Math.pow(this[1], 2);
  return Math.sqrt(squareSum);
};

Voy.Vector2.prototype.normalize = function() {
  this.divide(this.getLength());
};

Voy.Vector2.add = function(vector1, vector2) {
  var result = new Voy.Vector2(
    vector1[0] + vector2[0],
    vector1[1] + vector2[1]
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
