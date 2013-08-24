EntityFactory = {
  createPlayer: function() {
    var radius = 25;

    var player = new Voy.Entity(
      new Voy.RigidBody(),
      new Voy.CircleCollider(radius),
      new PlayerInput(),
      new Voy.CircleLayer('green', radius)
    );
    player.localPosition = new Voy.Vector2(220, 145);
    return player;
  },
  createPond: function() {
    var radius = 100;

    var pond = new Voy.Entity(
      new Voy.RigidBody(),
      new Voy.CircleCollider(radius),
      new Voy.CircleLayer('blue', radius)
    );
    pond.localPosition = new Voy.Vector2(400, 200);
    return pond;
  },
  createZombie: function(x) {
    var size = new Voy.Vector2(50, 50)
    var a = new Voy.RectangleCollider(size);
    a.name = 'zombie collider' + x;

    var zombie = new Voy.Entity(
      new Voy.RigidBody(),
      a,
      new Voy.RectangleLayer('red', size)
    );
    zombie.localPosition = new Voy.Vector2(x, 200);
    return zombie;
  },
  createWall: function(x, y) {
    var size = new Voy.Vector2(50, 50);

    var wall = new Voy.Entity(
      new Voy.RigidBody({ static: true }),
      new Voy.RectangleCollider(size),
      new Voy.RectangleLayer('grey', size)
    );
    wall.localPosition = new Voy.Vector2(x, y);
    return wall;
  },
  createHotzone: function(x, y) {
    var size = new Voy.Vector2(50, 50);

    var hotzone = new Voy.Entity(
      new Voy.RectangleCollider(size),
      new CollisionSnitch(),
      new Voy.RectangleLayer('pink', size)
    );
    hotzone.localPosition = new Voy.Vector2(x, y);
    return hotzone;
  }
};
