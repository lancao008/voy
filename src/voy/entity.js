Voy.Entity = function() {
  Voy.EntityContainer.call(this);

  this.components = [];

  this.localPosition = Voy.Vector2.zero();

  var components = Array.prototype.slice.call(arguments);
  components.forEach(function(component) {
    this.addComponent(component);
  }.bind(this));
};

Voy.Entity.prototype = Object.create(Voy.EntityContainer.prototype);

Voy.Entity.prototype.initialize = function() {
  this.components.forEach(function(component) {
    component.initialize();
  });
};

Voy.Entity.prototype.notify = function() {
  var arguments = Array.prototype.slice.call(arguments);
  var type = arguments.shift();
  this.components.forEach(function(component) {
    if(component[type]) component[type].apply(component, arguments);
  });
};

Voy.Entity.prototype.addComponent = function(component) {
  if(this[component.type]) throw new Error('Already got a component of type "' + type + '".');
  this[component.type] = component;
  this.components.push(component);
  component.entity = this;
}

Voy.Entity.prototype.getPosition = function() {
  return Voy.Vector2.add(this.parent.getPosition(), this.localPosition);
};

Voy.Entity.prototype.update = function(timeDelta) {
  this.components.forEach(function(component) {
    if(component.update) component.update(timeDelta);
  });
  this.updateChildren(timeDelta);
};
