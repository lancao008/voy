EntityFactory = {
  createPlayer: function() {
    var radius = 25;
    var a = new Voy.CircleCollider(radius);
    a.name = 'player collider';

    var player = new Voy.Entity(
      new Voy.RigidBody(),
      a,
      new PlayerInput(),
      new Voy.CircleLayer('green', radius)
    );
    player.position = new Voy.Vector2(50, 290);
    return player;
  },
  createPond: function() {
    var radius = 100;
    var a = new Voy.CircleCollider(radius);
    a.name = 'pond collider';

    var pond = new Voy.Entity(
      a,
      new CollisionSnitch(),
      new Voy.CircleLayer('blue', radius)
    );
    pond.position = new Voy.Vector2(420, 200);
    return pond;
  },
  createZombie: function(x) {
    var a = new Voy.RectangleCollider();
    a.name = 'zombie collider' + x;

    var zombie = new Voy.Entity(
      new Voy.RigidBody(),
      a,
      new Voy.RectangleLayer('red', new Voy.Vector2(50, 50))
    );
    zombie.position = new Voy.Vector2(x, 300);
    return zombie;
  },
  createWall: function(x, y) {
    var a = new Voy.RectangleCollider();
    a.name = 'wall collider' + x;

    var wall = new Voy.Entity(
      new Voy.RigidBody({ static: true }),
      a,
      new Voy.RectangleLayer('grey', new Voy.Vector2(50, 50))
    );
    wall.position = new Voy.Vector2(x, y);
    return wall;
  },
  createHotzone: function(x, y) {
    var hotzone = new Voy.Entity(
      new Voy.RectangleCollider(),
      new CollisionSnitch(),
      new Voy.RectangleLayer('pink', new Voy.Vector2(50, 50))
    );
    hotzone.position = new Voy.Vector2(x, y);
    return hotzone;
  }
};
