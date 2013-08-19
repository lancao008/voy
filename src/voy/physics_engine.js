Voy.PhysicsEngine = function(componentFeeder) {
  this.bodies = [];

  componentFeeder.on('add', this.addBody.bind(this));
}

Voy.PhysicsEngine.prototype.addBody = function(body) {
  this.bodies.push(body);
};

Voy.PhysicsEngine.prototype.update = function() {
  this.bodies.forEach(function(body) {
    body.getPosition().add(body.velocity)
  }.bind(this));
};
