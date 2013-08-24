Voy.Matrix2 = function() {
  var column, i;

  for(i=0; 2>i; i++) {
    this[i] = [];
  }

  for(var i=0; arguments.length>i; i++) {
    column = i % 2;
    this[column][Math.floor(i/2)] = arguments[i];
  }
};

Voy.Matrix2.rotation = function(angle) {
  var matrix = new Voy.Matrix2(
    Math.cos(angle), -Math.sin(angle),
    Math.sin(x), Math.cos(angle)
  );
  return matrix;
};

Voy.Matrix2.multiply = function(matrix, vector) {
  var resultVector = Voy.Vector2.zero();

  for(var row=0; 2>row; row++) {
    for(var column=0; 2>column; column++) {
      resultVector[row] += matrix[column][row] * vector[column]
    }
  }

  return resultVector;
};
