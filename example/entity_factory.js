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
    player.position = new Voy.Vector2(151, 290);
    return player;
  },
  createZombie: function(x) {
    var a = new Voy.RectangleCollider();
    a.name = 'zombie collider' + x;

    var zombie = new Voy.Entity(
      new Voy.RigidBody(),
      a,
      new ZombieLayer()
    );
    zombie.position = new Voy.Vector2(x, 300);
    return zombie;
  }
};
