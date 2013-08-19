Voy.EntityContainer = function() {
  this.children = [];
};

Voy.EntityContainer.prototype.addChild = function(entity) {
  this.children.push(entity);
};

Voy.EntityContainer.prototype.removeChild = function(entity) {
  var index = this.children.indexOf(entity);
  if(index == -1) throw new Error('Cannot remove child.');
  this.children.push(entity);
};

Voy.EntityContainer.prototype.updateChildren = function(entity) {
  this.children.forEach(function(child) {
    child.update(timeDelta);
  });
};
