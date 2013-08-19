Voy.PhysicsEngine = function(componentFeeder) {
  this.bodies = [];
  this.colliders = [];

  componentFeeder.on('add', this.addComponent.bind(this));
  this.collisionDetector = new Voy.CollisionDetector();
}

Voy.PhysicsEngine.prototype.addComponent = function(component) {
  var list;
  switch(component.type) {
    case 'rigidBody':
    list = this.bodies;
    break
    case 'collider':
    list = this.colliders;
    break;
    default:
    throw new Error('Unknown component type.');
    break;
  }
  list.push(component);
};

Voy.PhysicsEngine.prototype.update = function(timeDelta) {
  this.simulate(timeDelta);
  this.handleCollisions();
};

Voy.PhysicsEngine.prototype.simulate = function(timeDelta) {
  this.bodies.forEach(function(body) {
    body.force.truncate(body.maxForce);

    body.velocity.add(
      Voy.Vector2.multiply(body.force, timeDelta)
    );
    body.velocity.multiply(1-body.drag);
    body.velocity.truncate(body.maxSpeed);

    body.getPosition().add(
      Voy.Vector2.multiply(body.velocity, timeDelta)
    );

    body.force = Voy.Vector2.zero();
  }.bind(this));
};

Voy.PhysicsEngine.prototype.handleCollisions = function() {
  this.collisionDetector.update(this.colliders);
  this.collisionDetector.collisions.forEach(function(collision) {
    collision.resolve();
  });
};
