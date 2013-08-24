function Matrix2Test(name) {
  Snitch.TestCase.call(this, name);
}

Matrix2Test.prototype = Object.create(Snitch.TestCase.prototype);
Matrix2Test.prototype.constructor = Matrix2Test;

Matrix2Test.prototype['test vector multiplication'] = function() {
  var matrix = new Voy.Matrix2(
    3, 6,
    2, -7
  );
  var vector = new Voy.Vector2(2, 3);
  var resultVector = Voy.Matrix2.multiply(matrix, vector);

  this.confirmEqual(24, resultVector[0]);
  this.confirmEqual(-17, resultVector[1]);
};

Matrix2Test.prototype['test rotation'] = function() {
  var angle = Math.PI/4;
  var matrix = Voy.Matrix2.rotation(angle);

  var point = new Voy.Point(4, 0);
  var resultVector = Voy.Matrix2.multiply(matrix, point);

  var delta = 0.01;
  this.confirmInDelta(2.83, resultVector[0], delta);
  this.confirmInDelta(2.83, resultVector[1], delta);
};
