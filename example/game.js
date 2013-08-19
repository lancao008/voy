function Game() {
  Voy.Game.call(this);
  this.renderer.updateResolution(800, 600);
  this.scene = new TestScene(this.componentRegistry);
}

Game.prototype = Object.create(Voy.Game.prototype);
