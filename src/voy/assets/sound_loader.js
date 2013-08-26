Voy.SoundLoader = function() {
  Voy.Loader.call(this);
};

Voy.SoundLoader.prototype = Object.create(Voy.Loader.prototype);

Voy.SoundLoader.prototype.load = function(path) {
  var audio = new Audio();
  var sound = new Voy.Sound(audio);
  audio.addEventListener('loadeddata', function() {
    this.loaded(path, sound);
  }.bind(this));
  audio.src = path;
};
