Voy.Canvas = function() {
  this.scale = 1;
  this.element = document.createElement('canvas');
  this.context = this.element.getContext('2d');

  this.updateResolution(640, 480);
};

Voy.Canvas.prototype.updateResolution = function(width, height) {
  this.element.width = width;
  this.element.height = height;
};

Voy.Canvas.prototype.drawCircle = function(position, radius, color) {
  if(color) this.context.fillStyle = color;

  this.context.beginPath();
  this.context.arc(position[0], position[1], radius, 0, Math.PI*2, true);
  this.context.closePath();
  this.context.fill();
};

Voy.Canvas.prototype.clear = function(color) {
  this.context.fillStyle = color;
  this.context.fillRect(0, 0, this.element.width, this.element.height);
};
