Voy.Entity = function() {
  Voy.EntityContainer.call(this);

  this.position = Voy.Vector2.zero();

  this.components = Array.prototype.slice.call(arguments);
  this.components.forEach(function(component) {
    this.addComponent(component);
  }.bind(this));
};

Voy.Entity.prototype = Object.create(Voy.EntityContainer.prototype);

Voy.Entity.prototype.initialize = function() {
  this.components.forEach(function(component) {
    component.initialize();
  });
};

Voy.Entity.prototype.addComponent = function(component) {
  if(this[component.type]) throw new Error('Already got a component of type "' + type + '".');
  this[component.type] = component;
  component.entity = this;
}

Voy.Entity.prototype.getWorldPosition = function() {
  return Voy.Vector2.add(this.parent.getWorldPosition(), this.position);
};

Voy.Entity.prototype.update = function(timeDelta) {
  this.components.forEach(function(component) {
    if(component.update) component.update(timeDelta);
  });
  this.updateChildren(timeDelta);
};
