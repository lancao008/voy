function CollisionSnitch() {
  Voy.Component.call(this, 'collisionSnitch');
}

CollisionSnitch.prototype = Object.create(Voy.Component.prototype);

CollisionSnitch.prototype.collided = function() {
  console.log('collision!');
};
