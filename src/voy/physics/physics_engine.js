Voy.PhysicsEngine = function(componentFeeder) {
  this.bodies = [];
  this.colliders = [];

  componentFeeder.on('add', this.addComponent.bind(this));
  componentFeeder.on('remove', this.removeComponent.bind(this));
  this.collisionDetector = new Voy.CollisionDetector();
}

Voy.PhysicsEngine.prototype.addComponent = function(component) {
  var list = this.getComponentList(component);
  list.push(component);
};

Voy.PhysicsEngine.prototype.getComponentList = function(component) {
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
  return list;
}

Voy.PhysicsEngine.prototype.removeComponent = function(component) {
  var list = this.getComponentList(component);
  var index = list.indexOf(component);
  if(index === -1) throw new Error('Cannot remove.');
  list.splice(index, 1);
};

Voy.PhysicsEngine.prototype.update = function(timeDelta) {
  this.simulate(timeDelta);
  this.handleCollisions();
};

Voy.PhysicsEngine.prototype.simulate = function(timeDelta) {
  this.bodies.forEach(function(body) {
    if(!body.simulate) console.log(body);
    body.simulate(timeDelta);
  }.bind(this));
};

Voy.PhysicsEngine.prototype.handleCollisions = function() {
  this.collisionDetector.update(this.colliders);
  this.collisionDetector.collisions.forEach(function(collision) {
    if(collision.isPhysical()) collision.resolve();
    collision.notify();
  });
};

Voy.PhysicsEngine.prototype.resetForces = function() {
  this.bodies.forEach(function(body) {
    body.resetForce();
  }.bind(this));
};
