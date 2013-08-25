Voy.Renderer = function() {
  this.canvas = new Voy.Canvas();
};

Voy.Renderer.prototype.render = function(scene) {
  if(scene.clearColor) this.canvas.clear(scene.clearColor);
  this.drawChildren(scene);
};

Voy.Renderer.prototype.getCanvasElement = function() {
  return this.canvas.element;
};

Voy.Renderer.prototype.updateResolution = function(width, height) {
  this.canvas.updateResolution(width, height);
};

Voy.Renderer.prototype.drawEntity = function(entity) {
  this.canvas.save();

  this.canvas.translate(entity.localPosition);
  if(entity.localRotation) this.canvas.rotate(entity.localRotation);

  entity.components.forEach(function(component) {
    if(component.drawable) component.prepareAndDraw(this.canvas);
  }.bind(this));
  this.drawChildren(entity);
  this.canvas.restore();
};

Voy.Renderer.prototype.drawChildren = function(entityContainer) {
  entityContainer.children.forEach(function(child) {
    this.drawEntity(child);
  }.bind(this));
};
