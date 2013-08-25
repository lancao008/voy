Voy.Layer = function(type) {
  if(!type) type = 'layer';
  Voy.Component.call(this, type);
  this.drawable = true;
  this.opacity = 1;
  this.flippedHorizontally = false;
};

Voy.Layer.prototype = Object.create(Voy.Component.prototype);

Voy.Layer.prototype.prepareAndDraw = function(canvas) {
  if(this.flippedHorizontally) canvas.flipHorizontally();
  if(this.opacity !== 1) canvas.applyOpacity(this.opacity);
  this.draw(canvas);
};
