Voy.Sprite = function(imageName, position) {
  this.position = position ? position : Voy.Vector2.zero();
  Voy.Layer.call(this, 'sprite');
  this.imageName = imageName;
};

Voy.Sprite.prototype = Object.create(Voy.Layer.prototype);

Voy.Sprite.prototype.initialize = function() {
  var assets = this.getScene().assets;
  this.image = assets.images[this.imageName];
  delete this.imageName;
};

Voy.Sprite.prototype.draw = function(canvas) {
  canvas.drawImage(this.position, this.image);
};
