Voy.CollisionDetector = function() { };

Voy.CollisionDetector.prototype.update = function(colliders) {
  this.reset();

  colliders.forEach(function(collider1) {
    colliders.forEach(function(collider2) {
      if(collider1 != collider2) {
        if(!this.pairAlreadyTested(collider1, collider2)) {
          var collision = Voy.CollisionDetector.test(collider1, collider2);
          if(collision) this.collisions.push(collision);
          this.testedPairs.push([collider1, collider2]);
        }
      }
    }.bind(this));
  }.bind(this));
};

Voy.CollisionDetector.prototype.reset = function() {
  this.testedPairs = [];
  this.collisions = [];
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

Voy.CollisionDetector.test = function(collider1, collider2) {
  // TODO: Change implementation so that we don't have to calculate all axes up front?
  var axes = this.getNormals(collider1, collider2);
  var axis, projection1, projection2;
  var smallestOverlap, overlap, smallestOverlapAxis;

  for(var i=0; axes.length>i; i++) {
    axis = axes[i];
    projection1 = collider1.project(axis);
    projection2 = collider2.project(axis);
    if(!projection1.overlaps(projection2)) {
      return false;
    } else {
      overlap = projection1.getOverlap(projection2);
      if(!smallestOverlap || overlap < smallestOverlap) {
        smallestOverlap = overlap;
        smallestOverlapAxis = axis;
      }
    }
  }

  var separation = Voy.Vector2.multiply(Voy.Vector2.normalize(smallestOverlapAxis), smallestOverlap);

  var centerDifference = Voy.Vector2.subtract(collider1.getPosition(), collider2.getPosition());
  if(separation.dot(centerDifference) < 0) separation.negate();

  var collision = new Voy.Collision(collider1.entity, collider2.entity, separation);
  return collision;
};

Voy.CollisionDetector.getNormals = function(collider1, collider2) {
  if(collider1 instanceof Voy.RectangleCollider && collider2 instanceof Voy.RectangleCollider) {
    return [Voy.Vector2.up(), Voy.Vector2.right()];
  } else {
    throw new Error('Sorry, we only support rectangle-rectangle collision at the moment. Stay tuned for more!');
  }
};
