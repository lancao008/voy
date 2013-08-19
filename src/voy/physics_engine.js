Voy.PhysicsEngine = function(componentFeeder) {
  this.bodies = [];

  componentFeeder.on('add', this.addBody.bind(this));
}

Voy.PhysicsEngine.prototype.addBody = function(body) {
  this.bodies.push(body);
};

Voy.PhysicsEngine.prototype.update = function(timeDelta) {
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
