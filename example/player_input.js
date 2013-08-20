function PlayerInput() {
  Voy.Component.call(this, 'input');
  this.keyboard = Voy.Keyboard.getInstance();
}

PlayerInput.prototype = Object.create(Voy.Component.prototype);

PlayerInput.prototype.initialize = function() {
  this.rigidBody = this.entity.rigidBody;
};

PlayerInput.prototype.update = function() {
  var force = Voy.Vector2.zero();
  if(this.keyboard.keysPressed.right) force[0] = 1;
  else if(this.keyboard.keysPressed.left) force[0] = -1;
  if(this.keyboard.keysPressed.up) force[1] = -1;
  else if(this.keyboard.keysPressed.down) force[1] = 1;

  force.multiply(this.rigidBody.maxForce);

  this.rigidBody.force.add(force);
};
