'use strict';

const Vector = require('../vector');
const magnitude = require('./magnitude');

module.exports = (vector) => {
  return new Vector(vector.x / magnitude(vector),
    vector.y / magnitude(vector),
    vector.z / magnitude(vector));
};