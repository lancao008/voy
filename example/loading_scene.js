function LoadingScene() {
  Voy.Scene.call(this);
}

LoadingScene.prototype = Object.create(Voy.Scene.prototype);

LoadingScene.prototype.initialize = function() {
  this.assets.on('loadingCompleted', this.complete.bind(this));

  this.assets.images.add('footman.gif');
  this.assets.texts.add('levels');
};

LoadingScene.prototype.complete = function() {
  this.completed = true;
};
