EntityFactory = {
  createPlayer: function() {
    var a = new Voy.RectangleCollider();
    a.name = 'player collider';

    var player = new Voy.Entity(
      new Voy.RigidBody(),
      a,
      new PlayerInput(),
      new PlayerLayer()
    );
    player.position = new Voy.Vector2(250, 190);
    return player;
  },
  createZombie: function() {
    var zombie = new Voy.Entity(
      new Voy.RigidBody(),
      new Voy.RectangleCollider(),
      new ZombieLayer()
    );
    zombie.position = new Voy.Vector2(100+300*Math.random(), 300);
    return zombie;
  }
};
