Voy.Sprite = function(imageName) {
  Voy.Component.call(this, 'layer');
  this.imageName = imageName;
  this.flippedHorizontally = true;
};

Voy.Sprite.prototype = Object.create(Voy.Component.prototype);

Voy.Sprite.prototype.initialize = function() {
  var assets = this.getScene().assets;
  this.image = assets.images[this.imageName];
  delete this.imageName;
};

Voy.Sprite.prototype.draw = function(canvas) {
  canvas.save();
  if(this.flippedHorizontally) canvas.flipHorizontally();
  canvas.drawImage(Voy.Vector2.zero(), this.image);
  canvas.restore();
};
