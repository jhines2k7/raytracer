'use strict';

const Vector = require('../vector');

module.exports = (scalar, vector) => {
  return new Vector(vector.x / scalar, vector.y / scalar, vector.z / scalar);
};