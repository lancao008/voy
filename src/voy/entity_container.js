Voy.EntityContainer = function() {
  this.children = [];
};

Voy.EntityContainer.prototype.addChild = function(entity) {
  entity.parent = this;
  this.children.push(entity);
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
