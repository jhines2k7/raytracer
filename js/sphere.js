'use strict';

let identityMatrix = require('../js/utils/matrix_utils').identityMatrix;

module.exports = class Sphere{
  constructor(transform = identityMatrix) {
    this.transform = transform;
  }
};