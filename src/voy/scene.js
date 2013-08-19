Voy.Scene = function(componentRegistry) {
  Voy.EntityContainer.call(this);
  this.componentRegistry = componentRegistry;
};

Voy.Scene.prototype = Object.create(Voy.EntityContainer.prototype);

Voy.Scene.prototype.addChild = function(entity) {
  Voy.EntityContainer.prototype.addChild.call(this, entity);
  this.registerComponents(entity);
};

Voy.Scene.prototype.registerComponents = function(entity) {
  entity.components.forEach(function(component) {
    this.componentRegistry.add(component);
  }.bind(this));

  entity.children.forEach(function(child) {
    this.registerComponents(child);
  }.bind(this));
};

Voy.Scene.prototype.removeChild = function() {
  throw new Error('Muhaha, you cannot remove children from the scene. They are to remain in the scene for all perpetuity.');
};

Voy.Scene.prototype.update = function(timeDelta) {
  this.children.forEach(function(child) {
    child.update();
  });
};
