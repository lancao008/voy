function PointTest(name) {
  Snitch.TestCase.call(this, name);
}

PointTest.prototype = Object.create(Snitch.TestCase.prototype);
PointTest.prototype.constructor = PointTest;

PointTest.prototype['test rotate'] = function() {
  var point = new Voy.Point(4, 2);
  var rotationPoint = new Voy.Point(2, 2);
  point.rotate(rotationPoint, Math.PI/4 + Math.PI/8);

  this.confirmInDelta(2.77, point[0], 0.01);
  this.confirmInDelta(3.85, point[1], 0.01);
};
