Voy.CollisionDetector = function() { };

Voy.CollisionDetector.prototype.update = function(colliders) {
  this.reset();

  colliders.forEach(function(collider1) {
    colliders.forEach(function(collider2) {
      if(collider1 != collider2 && !this.pairAlreadyTested(collider1, collider2) && collider1.checkCollision(collider2)) {
        this.registerCollision(collider1, collider2);
      }
      this.testedPairs.push([collider1, collider2]);
    }.bind(this));
  }.bind(this));
};

Voy.CollisionDetector.prototype.reset = function() {
  this.testedPairs = [];
  this.collisions = [];
};

Voy.CollisionDetector.prototype.registerCollision = function(collider1, collider2) {
  var collision = new Voy.Collision(collider1.entity, collider2.entity);
  this.collisions.push(collision);
};

Voy.CollisionDetector.prototype.pairAlreadyTested = function(collider1, collider2) {
  var testedPair;
  for(var i=0; this.testedPairs.length>i; i++) {
    testedPair = this.testedPairs[i];
    if(
      (testedPair[0] == collider1 && testedPair[1] == collider2) ||
      (testedPair[0] == collider2 && testedPair[1] == collider1)
    ) return true;
  }
};
