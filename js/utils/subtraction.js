'use strict';

const Vector = require('../vector');

module.exports = (a, b) => {
  return new Vector(a.x - b.x, a.y - b.y, a.z - b.z);
};