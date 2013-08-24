function EntityContainerTest(name) {
  Snitch.TestCase.call(this, name);
}

EntityContainerTest.prototype = Object.create(Snitch.TestCase.prototype);
EntityContainerTest.prototype.constructor = EntityContainerTest;

EntityContainerTest.prototype['test find with tag'] = function() {
  var entityContainer = new Voy.EntityContainer();
  var parent = new Voy.Entity();
  parent.addTag('my_parent');

  var child = new Voy.Entity();
  child.addTag('my_child');

  parent.addChild(child);
  entityContainer.addChild(parent);

  var entity = entityContainer.findEntityWithTag('john');
  this.refuteTruthy(entity);

  entity = parent.findEntityWithTag('my_child');
  this.confirmEqual(child, entity);

  entity = entityContainer.findEntityWithTag('my_child');
  this.confirmEqual(entity, child);
};
