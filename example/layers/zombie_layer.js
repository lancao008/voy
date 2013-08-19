function ZombieLayer() {
  Voy.Component.call(this, 'layer');
}

ZombieLayer.prototype = Object.create(Voy.Component.prototype);

ZombieLayer.prototype.initialize = function() {
  var collider = this.entity.getComponent('collider');
  this.size = collider.size;
};

ZombieLayer.prototype.draw = function(canvas) {
  canvas.drawRectangle(this.entity.position, this.size, 'red');
};
