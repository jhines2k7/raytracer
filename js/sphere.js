'use strict';

const Material = require('../js/material');
const identityMatrix = require('../js/utils/matrix_utils').identityMatrix;

module.exports = class Sphere{
  constructor(transformation = identityMatrix, material = new Material()) {
    this.transformation = transformation;
    this.material = material;
  }
};