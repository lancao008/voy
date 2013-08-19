Voy.ComponentFeeder = function(componentRegistry, type) {
  this.type = type;

  componentRegistry.on('add', this.checkAdd.bind(this));
  componentRegistry.on('remove', this.checkRemove.bind(this));
};

Voy.ComponentFeeder.prototype = Object.create(Voy.EventEmitter);

Voy.ComponentFeeder.prototype.checkAdd = function(component) {
  if(component.type == this.type) this.emit('add', component);
};

Voy.ComponentFeeder.prototype.checkRemove = function(component) {
  if(component.type == this.type) this.emit('remove', component);
};
