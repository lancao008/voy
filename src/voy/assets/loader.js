Voy.Loader = function() {
  this.paths = [];
  this.prefix = '';
  this.suffix = '';
};

Voy.Loader.prototype = Object.create(Voy.EventEmitter);

Voy.Loader.prototype.add = function(shortPath) {
  if(this.paths.length == 0) this.emit('started');
  this.paths.push(shortPath);
  var fullPath = this.getFullPath(shortPath);
  this.load(fullPath)
};

Voy.Loader.prototype.loaded = function(fullPath, asset) {
  var shortPath = this.getShortPath(fullPath);
  this[shortPath] = asset;

  var index = this.paths.indexOf(shortPath);
  if(index == -1) throw new Error('Cannot find asset (' + fullPath + ') in list of currently downloading assets.');

  this.paths.splice(index, 1);
  if(this.paths.length == 0) this.emit('completed');
};

Voy.Loader.prototype.getFullPath = function(shortPath) {
  return this.prefix + '/' + shortPath + this.suffix;
};

Voy.Loader.prototype.getShortPath = function(fullPath) {
  var pathWithoutPrefix = fullPath.substring(this.prefix.length+1);
  var shortPath = pathWithoutPrefix.substring(0, pathWithoutPrefix.length-this.suffix.length);
  return shortPath;
};
