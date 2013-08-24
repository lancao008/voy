function EntityTest(name) {
  Snitch.TestCase.call(this, name);
}

EntityTest.prototype = Object.create(Snitch.TestCase.prototype);
EntityTest.prototype.constructor = EntityTest;

EntityTest.prototype['test tags'] = function() {
  var entity = new Voy.Entity();
  entity.addTag('player');

  this.confirmTrue(entity.hasTag('player'));
  this.refuteTrue(entity.hasTag('enemy'));

  entity.addTag('friend');
  this.confirmTrue(entity.hasTag('player'));
  this.confirmTrue(entity.hasTag('friend'));
  this.refuteTrue(entity.hasTag('enemy'));
};
