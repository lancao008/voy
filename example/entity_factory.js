EntityFactory = {
  createPlayer: function() {
    var player = new Voy.Entity(
      new Voy.RigidBody(),
      new PlayerInput(),
      new PlayerLayer()
    );
    player.position.add(new Voy.Vector2(20, 20));
    return player;
  }
};
