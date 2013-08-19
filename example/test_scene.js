function TestScene(componentRegistry) {
  Voy.Scene.call(this, componentRegistry);

  this.addChild(EntityFactory.createPlayer());
  this.addChild(EntityFactory.createZombie());
  this.addChild(EntityFactory.createZombie());
  this.addChild(EntityFactory.createZombie());
  this.addChild(EntityFactory.createZombie());
  this.addChild(EntityFactory.createZombie());

  this.clearColor = 'rgb(200, 200, 200)';
}

TestScene.prototype = Object.create(Voy.Scene.prototype);
