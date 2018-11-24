'use strict';

let identityMatrix = require('../js/utils/matrix_utils').identityMatrix;

module.exports = class Sphere{
  constructor(transformation = identityMatrix) {
    this.transformation = transformation;
  }
};