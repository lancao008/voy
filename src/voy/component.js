Voy.Component = function(type) {
  this.type = type;
}

Voy.Component.prototype.initialize = function() { };
Voy.Component.prototype.setup = function() { };

Voy.Component.prototype.getScene = function() {
  return this.entity.getScene();
};
