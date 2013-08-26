Voy.Sprite = function(imageName, position) {
  this.position = position ? position : Voy.Vector2.zero();
  Voy.Layer.call(this, 'sprite');
  if(imageName) this.imageName = imageName;
};

Voy.Sprite.prototype = Object.create(Voy.Layer.prototype);

Voy.Sprite.prototype.initialize = function() {
  if(this.imageName) {
    this.image = this.getImage(this.imageName);
    delete this.imageName;
  }
};

Voy.Sprite.prototype.getImage = function(shortPath) {
  var assets = this.getScene().assets;
  var image = assets.images[shortPath];
  return image;
}

Voy.Sprite.prototype.draw = function(canvas) {
  canvas.drawImage(this.image, this.position);
};
