Voy.Canvas = function() {
  this.scale = 1;
  this.element = document.createElement('canvas');
  this.context = this.element.getContext('2d');

  this.updateResolution(640, 480);
};

Voy.Canvas.prototype.updateResolution = function(width, height) {
  this.element.width = width;
  this.element.height = height;
  this.resolution = new Voy.Vector2(width, height);
};

Voy.Canvas.prototype.drawCircle = function(position, radius, color) {
  if(color) this.context.fillStyle = color;

  this.context.beginPath();
  this.context.arc(position[0], position[1], radius, 0, Math.PI*2, true);
  this.context.closePath();
  this.context.fill();
};

Voy.Canvas.prototype.translate = function(translation) {
  this.context.translate(translation[0], translation[1]);
};

Voy.Canvas.prototype.drawRectangle = function(position, size, color) {
  if(color) this.context.fillStyle = color;
  this.context.fillRect(position[0]-size[0]/2, position[1]-size[1]/2, size[0], size[1]);
};

Voy.Canvas.prototype.drawPolygon = function(points, color) {
  if(color) this.context.fillStyle = color;

  this.context.beginPath();
  this.context.moveTo(points[0][0], points[0][1]);
  for(var i=1; points.length>i; i++) {
    this.context.lineTo(points[i][0], points[i][1]);
  }
  this.context.lineTo(points[0][0], points[0][1]);
  this.context.closePath();
  this.context.fill();
};

Voy.Canvas.prototype.drawImage = function(position, image) {
  this.context.drawImage(image, position[0]-image.width/2, position[1]-image.height/2);
};

Voy.Canvas.prototype.clear = function(color) {
  this.context.fillStyle = color;
  this.context.fillRect(0, 0, this.element.width, this.element.height);
};

Voy.Canvas.prototype.flipHorizontally = function() {
  this.context.scale(-1, 1);
};

Voy.Canvas.prototype.save = function() {
  this.context.save();
};

Voy.Canvas.prototype.setOpacity = function(opacity) {
  this.context.globalAlpha = opacity;
};

Voy.Canvas.prototype.restore = function() {
  this.context.restore();
};

Voy.Canvas.prototype.rotate = function(angle) {
  this.context.rotate(angle);
};
