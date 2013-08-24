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
  var rigidBody1 = collider1.getRigidBody();
  var rigidBody2 = collider2.getRigidBody();
  if(rigidBody1 && rigidBody2 && rigidBody1.static && rigidBody2.static) return null;

  var shape1 = collider1.getShape();
  var shape2 = collider2.getShape();

  if(shape1 instanceof Voy.Circle && shape2 instanceof Voy.Circle) return this.testCircle(collider1, collider2);

  var axes = this.getNormals(shape1, shape2);
  var axis, projection1, projection2;
  var smallestOverlap, overlap, smallestOverlapAxis;

  for(var i=0; axes.length>i; i++) {
    axis = axes[i];
    projection1 = shape1.project(axis);
    projection2 = shape2.project(axis);
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
  if(separation.getDotProduct(centerDifference) < 0) separation.negate();

  var collision = new Voy.Collision(collider1.entity, collider2.entity, separation);
  return collision;
};

Voy.CollisionDetector.testCircle = function(collider1, collider2) {
  var centerDifference = Voy.Vector2.subtract(collider1.getPosition(), collider2.getPosition());
  var centerDifferenceLength = centerDifference.getLength();
  if(centerDifferenceLength < collider1.getRadius()+collider2.getRadius()) {
    var separation = Voy.Vector2.multiply(Voy.Vector2.normalize(centerDifference), collider1.getRadius()+collider2.getRadius()-centerDifferenceLength);
    var collision = new Voy.Collision(collider1.entity, collider2.entity, separation);
    return collision;
  }
};

Voy.CollisionDetector.getNormals = function(shape1, shape2) {
  if(shape1 instanceof Voy.Rectangle && shape2 instanceof Voy.Rectangle) {
    return this.getRectangleRectangleNormals(shape1, shape2);
  } else {
    var shape1IsCircle = shape1 instanceof Voy.Circle;
    var shape2IsCircle = shape2 instanceof Voy.Circle;
    if(shape1IsCircle && shape2IsCircle) throw new Error('I cannot find axes for two circles.');
    var eitherIsCircle = shape1IsCircle || shape2IsCircle;

    if(eitherIsCircle) {
      var circle, polygon;
      if(shape1IsCircle) {
        circle = shape1;
        polygon = shape2;
      } else {
        circle = shape2;
        polygon = shape1;
      }
      return [this.getCirclePolygonNormal(circle, polygon)];
    } else {
      return this.getPolygonicPolygonicNormals(shape1, shape2);
    }
  }
};

Voy.CollisionDetector.getPolygonicPolygonicNormals = function(polygonic1, polygonic2) {
  var axes = polygonic1.getNormals();
  axes = axes.concat(polygonic2.getNormals());
  return axes;
};

Voy.CollisionDetector.getRectangleRectangleNormals = function(rectangle1, rectangle2) {
  var rotation1 = rectangle1.rotation;
  var rotation2 = rectangle2.rotation;

  var up = Voy.Vector2.up();
  var right = Voy.Vector2.right();

  if(rotation1 == rotation2) {
    if(rotation1 == 0) {
      return [up, right];
    } else {
      up.rotate(rotation1);
      right.rotate(rotation2);
      return [up, right];
    }
  } else {
    var up1 = up.clone();
    up1.rotate(rotation1);
    var right1 = right.clone();
    right1.rotate(rotation1);

    var up2 = up.clone();
    up2.rotate(rotation2);
    var right2 = right.clone();
    right2.rotate(rotation2);

    var normals = [up1, right1, up2, right2];
    return normals;
  }
};

Voy.CollisionDetector.getCirclePolygonNormal = function(circle, polygon) {
  var closestPoint = polygon.getClosestPoint(circle);
  var pointCircleDifference = Voy.Vector2.subtract(closestPoint, circle.position);
  return pointCircleDifference.getNormalized();
};
