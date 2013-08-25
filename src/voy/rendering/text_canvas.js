Voy.TextCanvas = function(context) {
  this.context = context;
  context.textBaseline = 'middle';
  this.color = 'blue';
};

Voy.TextCanvas.prototype.setAlign = function(align) {
  this.context.textAlign = align;
};

Voy.TextCanvas.prototype.setFont = function(font) {
  this.context.font = font;
};

Voy.TextCanvas.prototype.draw = function(text, position) {
  this.context.fillStyle = this.color;
  if(!position) position = Voy.Point.zero();
  this.context.fillText(text, position[0], position[1]);
};
