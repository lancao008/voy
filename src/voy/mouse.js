Voy.Mouse = function(canvasElement) {
  this.position = Voy.Vector2.zero();
  canvasElement.addEventListener('mousedown', this.press.bind(this));
  document.addEventListener('mousemove', this.move.bind(this));
  this.canvasElement = canvasElement;
  this.clicked = false;
};

Voy.Mouse.prototype.press = function() {
  this.clicked = true;
};

Voy.Mouse.prototype.reset = function() {
  this.clicked = false;
};

Voy.Mouse.initialize = function(canvas) {
  this.instance = new Voy.Mouse(canvas);
};

Voy.Mouse.getInstance = function() {
  return this.instance;
};

Voy.Mouse.prototype.move = function(event) {
  this.position[0] = event.x-this.canvasElement.offsetLeft+document.body.scrollLeft;
  this.position[1] = event.y-this.canvasElement.offsetTop+document.body.scrollTop;
};
