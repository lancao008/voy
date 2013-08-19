function PlayerInput() {
  Voy.Component.call(this, 'input');
  this.keyboard = Voy.Keyboard.getInstance();
}

PlayerInput.prototype = Object.create(Voy.Component.prototype);

PlayerInput.prototype.initialize = function() {
  this.rigidBody = this.entity.getComponent('rigidBody');
};

PlayerInput.prototype.update = function() {
  var direction = Voy.Vector2.zero();
  if(this.keyboard.keysPressed.right) direction[0] = 1;
  else if(this.keyboard.keysPressed.left) direction[0] = -1;
  if(this.keyboard.keysPressed.up) direction[1] = -1;
  else if(this.keyboard.keysPressed.down) direction[1] = 1;

  this.rigidBody.velocity = direction;
};
