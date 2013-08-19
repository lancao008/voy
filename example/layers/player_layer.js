function PlayerLayer() {
  Voy.Component.call(this, 'layer');
}

PlayerLayer.prototype = Object.create(Voy.Component.prototype);

PlayerLayer.prototype.draw = function(canvas) {
  canvas.drawCircle(this.entity.position, 10, 'red');
};
