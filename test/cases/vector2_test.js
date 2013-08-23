function Vector2Test(name) {
  Snitch.TestCase.call(this, name);
}

Vector2Test.prototype = Object.create(Snitch.TestCase.prototype);
Vector2Test.prototype.constructor = Vector2Test;

Vector2Test.prototype['test add'] = function() {
  var vector1 = new Voy.Vector2(2, 2);
  var vector2 = new Voy.Vector2(-3, 3);

  var result = Voy.Vector2.add(vector1, vector2);
  this.confirmEqual(-1, result[0]);
  this.confirmEqual(5, result[1]);
};
