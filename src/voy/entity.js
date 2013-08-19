Voy.Entity = function() {
  Voy.EntityContainer.call(this);

  this.position = Voy.Vector2.zero();

  this.components = Array.prototype.slice.call(arguments);
  this.components.forEach(function(component) {
    component.entity = this;
  }.bind(this));
};

Voy.Entity.prototype = Object.create(Voy.EntityContainer.prototype);

Voy.Entity.prototype.initialize = function() {
  this.components.forEach(function(component) {
    component.initialize();
  });
};

Voy.Entity.prototype.getWorldPosition = function() {
  return Voy.Vector2.add(this.parent.getWorldPosition(), this.position);
};

Voy.Entity.prototype.getComponent = function(type) {
  var component;
  for(var i=0; this.components.length>i; i++) {
    component = this.components[i];
    if(component.type == type) return component;
  }
  throw new Error("Could not find component (" + type + ").");
};

Voy.Entity.prototype.update = function(timeDelta) {
  this.components.forEach(function(component) {
    if(component.update) component.update(timeDelta);
  });
  this.updateChildren(timeDelta);
};
