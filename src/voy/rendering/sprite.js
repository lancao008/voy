Voy.Sprite = function(imageName, position) {
  this.position = position ? position : Voy.Vector2.zero();
  Voy.Component.call(this, 'sprite');
  this.imageName = imageName;
  this.flippedHorizontally = false;
  this.opacity = 1;
};

Voy.Sprite.prototype = Object.create(Voy.Component.prototype);

Voy.Sprite.prototype.initialize = function() {
  var assets = this.getScene().assets;
  this.image = assets.images[this.imageName];
  delete this.imageName;
};

Voy.Sprite.prototype.draw = function(canvas) {
  if(this.flippedHorizontally) canvas.flipHorizontally();
  if(this.opacity !== 1) canvas.setOpacity(this.opacity);
  canvas.drawImage(this.position, this.image);
  if(this.opacity !== 1) canvas.setOpacity(1);
};
