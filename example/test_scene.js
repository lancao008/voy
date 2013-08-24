function TestScene(componentRegistry) {
  Voy.Scene.call(this, componentRegistry);
  this.clearColor = 'rgb(200, 200, 200)';
}

TestScene.prototype = Object.create(Voy.Scene.prototype);

TestScene.prototype.initialize = function() {
  this.addChild(EntityFactory.createPlayer());
  this.addChild(EntityFactory.createWall(330, 200));
  this.addChild(EntityFactory.createZombie(500));
  this.addChild(EntityFactory.createZombie(700));
  this.addChild(EntityFactory.createHotzone(100, 100));
  this.addChild(EntityFactory.createPond(100, 100));
};
