Voy.AssetManager = function() {
  this.setupLoader('images', new Voy.ImageLoader());
  this.setupLoader('texts', new Voy.TextLoader());
//  this.setupLoader('sounds', Voy.SoundLoader);
  this.activeLoadersCount = 0;
};

Voy.AssetManager.prototype = Object.create(Voy.EventEmitter);

Voy.AssetManager.prototype.setupLoader = function(propertyName, loader) {
  loader.on('started', this.loaderStarted.bind(this));
  loader.on('completed', this.loaderCompleted.bind(this));
  this[propertyName] = loader;
};

Voy.AssetManager.prototype.loaderStarted = function() {
  if(this.activeLoadersCount == 0) this.emit('loadingStarted');
  this.activeLoadersCount++;
};

Voy.AssetManager.prototype.loaderCompleted = function() {
  this.activeLoadersCount--;
  if(this.activeLoadersCount == 0) this.emit('loadingCompleted');
};
