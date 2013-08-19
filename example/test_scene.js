function TestScene(componentRegistry) {
  Voy.Scene.call(this, componentRegistry);

  var player = EntityFactory.createPlayer();
  this.addChild(player);

  this.clearColor = 'rgb(200, 200, 200)';
}

TestScene.prototype = Object.create(Voy.Scene.prototype);
