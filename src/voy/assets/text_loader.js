Voy.TextLoader = function() {
  Voy.Loader.call(this);
};

Voy.TextLoader.prototype = Object.create(Voy.Loader.prototype);

Voy.TextLoader.prototype.load = function(path) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readyState === 4)
      this.loaded(path, request.responseText);
  }.bind(this);
  request.open('GET', path);
  request.send();
};
