Voy.ComponentRegistry = function() { };

Voy.ComponentRegistry.prototype = Object.create(Voy.EventEmitter);

Voy.ComponentRegistry.prototype.add = function(component) {
  this.emit('add', component);
};

Voy.ComponentRegistry.prototype.remove = function(component) {
  this.emit('remove', component);
};
