function TestScene(componentRegistry) {
  Voy.Scene.call(this, componentRegistry);

  this.addChild(EntityFactory.createPlayer());
  this.addChild(EntityFactory.createZombie(196));
  this.addChild(EntityFactory.createZombie(250));
  this.addChild(EntityFactory.createWall(400, 500));

  this.clearColor = 'rgb(200, 200, 200)';
}

TestScene.prototype = Object.create(Voy.Scene.prototype);
