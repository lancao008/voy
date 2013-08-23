Voy.ImageLoader = function() {
  Voy.Loader.call(this);
};

Voy.ImageLoader.prototype = Object.create(Voy.Loader.prototype);

Voy.ImageLoader.prototype.load = function(path) {
  var image = new Image();
  image.onload = function() {
    this.loaded(path, image);
  }.bind(this);
  image.src = path;
};
