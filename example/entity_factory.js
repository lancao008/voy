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
    player.localPosition = new Voy.Vector2(220, 145);
    return player;
  },
  createPond: function() {
    var radius = 100;
    var a = new Voy.CircleCollider(radius);
    a.name = 'pond collider';

    var pond = new Voy.Entity(
      new Voy.RigidBody(),
      a,
      new Voy.CircleLayer('blue', radius)
    );
    pond.localPosition = new Voy.Vector2(400, 200);
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
    zombie.localPosition = new Voy.Vector2(x, 200);
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
    wall.localPosition = new Voy.Vector2(x, y);
    return wall;
  },
  createHotzone: function(x, y) {
    var hotzone = new Voy.Entity(
      new Voy.RectangleCollider(),
      new CollisionSnitch(),
      new Voy.RectangleLayer('pink', new Voy.Vector2(50, 50))
    );
    hotzone.localPosition = new Voy.Vector2(x, y);
    return hotzone;
  }
};
