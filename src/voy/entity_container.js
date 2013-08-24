Voy.EntityContainer = function() {
  this.children = [];
};

Voy.EntityContainer.prototype.addChild = function(entity) {
  entity.parent = this;
  this.children.push(entity);
};

Voy.EntityContainer.prototype.setup = function() {
  this.children.forEach(function(child) {
    child.setup();
  });
};

Voy.EntityContainer.prototype.initialize = function() {
  this.children.forEach(function(child) {
    child.initialize();
  });
};

Voy.EntityContainer.prototype.removeChild = function(entity) {
  var index = this.children.indexOf(entity);
  if(index == -1) throw new Error('Cannot remove child.');
  entity.parent = null;
  this.children.splice(index, 1);
};

Voy.EntityContainer.prototype.updateChildren = function(timeDelta) {
  this.children.forEach(function(child) {
    child.update(timeDelta);
  });
};

Voy.EntityContainer.prototype.findEntityWithTag = function(tag) {
  var child, grandChild;
  for(var i=0; this.children.length>i; i++) {
    child = this.children[i];
    if(child.hasTag(tag)) return child;
  }
  for(var i=0; this.children.length>i; i++) {
    child = this.children[i];
    grandChild = child.findEntityWithTag(tag);
    if(grandChild) return grandChild;
  }
};
