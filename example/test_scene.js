function TestScene(componentRegistry) {
  Voy.Scene.call(this, componentRegistry);
  this.clearColor = 'rgb(200, 200, 200)';
}

TestScene.prototype = Object.create(Voy.Scene.prototype);

TestScene.prototype.initialize = function() {
  this.addChild(EntityFactory.createPlayer());

  var levelData = JSON.parse(this.assets.texts.levels)[1];
  levelData.walls.forEach(function(wallData) {
    var position = new Voy.Point(wallData.position[0], wallData.position[1]);
    var size = new Voy.Vector2(wallData.size[0], wallData.size[1]);
    var rotation = wallData.rotation;

    console.log(wallData);

    this.addChild(EntityFactory.createWall(position, size, rotation));
  }.bind(this));
};
