Voy.Game = function() {
  this.componentRegistry = new Voy.ComponentRegistry();

  this.assets = new Voy.AssetManager();

  this.renderer = new Voy.Renderer();

  this.physics = new Voy.PhysicsEngine(
    new Voy.ComponentFeeder(this.componentRegistry, 'rigidBody', 'collider')
  );

  Voy.Keyboard.initialize();
};

Voy.Game.prototype.getCanvasElement = function() {
  return this.renderer.getCanvasElement();
};

Voy.Game.prototype.run = function() {
  this.tick();
};

Voy.Game.prototype.tick = function(timestamp) {
  var timeDelta = this.lastTickAt ? timestamp - this.lastTickAt : 0;
  this.update(timeDelta);
  this.lastTickAt = timestamp;
  this.scheduleNextTick();
};

Voy.Game.prototype.update = function(timeDelta) {
  if(this.scene.completed) this.changeScene(this.getNextScene());
  this.scene.update(timeDelta);
  this.physics.update(timeDelta);
  this.renderer.render(this.scene);
};

Voy.Game.prototype.scheduleNextTick = function() {
  requestAnimationFrame(this.tick.bind(this));
};

Voy.Game.prototype.changeScene = function(scene) {
  if(this.scene) this.scene.exit();

  scene.assets = this.assets;
  scene.renderer = this.renderer;
  scene.componentRegistry = this.componentRegistry;

  scene.setup();
  scene.initialize();
  this.scene = scene;
};
