function PlayerLayer() {
  Voy.Component.call(this, 'layer');
}

PlayerLayer.prototype = Object.create(Voy.Component.prototype);

PlayerLayer.prototype.initialize = function() {
  var collider = this.entity.getComponent('collider');
  this.size = collider.size;
};

PlayerLayer.prototype.draw = function(canvas) {
  canvas.drawRectangle(this.entity.position, this.size, 'green');
};
