function Game() {
  Voy.Game.call(this);

  this.renderer.updateResolution(800, 600);

  this.assets.images.prefix = './images';

  var scene = new LoadingScene();
  this.changeScene(scene);
}

Game.prototype = Object.create(Voy.Game.prototype);

Game.prototype.getNextScene = function() {
  var scene = new TestScene();
  return scene;
};
