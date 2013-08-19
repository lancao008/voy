Voy.ComponentFeeder = function(componentRegistry, types) {
  var arguments = Array.prototype.slice.call(arguments);
  var componentRegistry = arguments.shift();

  this.types = arguments;

  componentRegistry.on('add', this.checkAdd.bind(this));
  componentRegistry.on('remove', this.checkRemove.bind(this));
};

Voy.ComponentFeeder.prototype = Object.create(Voy.EventEmitter);

Voy.ComponentFeeder.prototype.checkAdd = function(component) {
  if(this.matches(component)) this.emit('add', component);
};

Voy.ComponentFeeder.prototype.checkRemove = function(component) {
  if(this.matches(component)) this.emit('remove', component);
};

Voy.ComponentFeeder.prototype.matches = function(component) {
  return this.types.indexOf(component.type) != -1;
};
