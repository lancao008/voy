Voy.Entity = function() {
  Voy.EntityContainer.call(this);

  this.components = [];
  this.tags = [];

  this.localPosition = Voy.Vector2.zero();
  this.localRotation = 0;

  var components = Array.prototype.slice.call(arguments);
  components.forEach(function(component) {
    this.addComponent(component);
  }.bind(this));
};

Voy.Entity.prototype = Object.create(Voy.EntityContainer.prototype);

Voy.Entity.prototype.getScene = function() {
  return this.parent.getScene();
};

Voy.Entity.prototype.setup = function() {
  this.components.forEach(function(component) {
    component.setup();
  });
  Voy.EntityContainer.prototype.setup.call(this);
};

Voy.Entity.prototype.initialize = function() {
  this.components.forEach(function(component) {
    component.initialize();
  });
  Voy.EntityContainer.prototype.initialize.call(this);
};

Voy.Entity.prototype.addTag = function(tag) {
  this.tags.push(tag);
};

Voy.Entity.prototype.hasTag = function(tag) {
  var index = this.tags.indexOf(tag);
  return index !== -1;
};

Voy.Entity.prototype.notify = function() {
  var args = Array.prototype.slice.call(arguments);
  var type = args.shift();
  this.components.forEach(function(component) {
    if(component[type]) component[type].apply(component, args);
  });
};

Voy.Entity.prototype.addComponent = function(component) {
  if(this[component.type]) throw new Error('Already got a component of type "' + component.type + '".');
  this[component.type] = component;
  this.components.push(component);
  component.entity = this;
}

Voy.Entity.prototype.getPosition = function() {
  return Voy.Vector2.add(this.parent.getPosition(), this.localPosition);
};

Voy.Entity.prototype.getRotation = function() {
  return this.parent.getRotation()+this.localRotation;
};

Voy.Entity.prototype.update = function(timeDelta) {
  this.components.forEach(function(component) {
    if(component.update) component.update(timeDelta);
  });
  this.updateChildren(timeDelta);
};
