'use strict';

const matrixVectorMultiply = require('../utils/matrix_utils').matrixVectorMultiply;
const Point = require('../point');
const MATRIX_TYPES = require('./matrix_types');

function translation(x, y, z) {
  return {
    matrix: [
      [1, 0, 0, x],
      [0, 1, 0, y],
      [0, 0, 1, z],
      [0, 0, 0, 1]
    ],
    matrixType: MATRIX_TYPES.TRANSLATION
  }
}

function scaling(x, y, z) {
  return {
    matrix: [
      [x, 0, 0, 0],
      [0, y, 0, 0],
      [0, 0, z, 0],
      [0, 0, 0, 1]
    ],
    matrixType: MATRIX_TYPES.SCALING
  }
}

function rotationX(radians) {
  return {
    matrix: [
      [1,         0,                0,                0],
      [0, Math.cos(radians), Math.sin(radians) * -1,  0],
      [0, Math.sin(radians), Math.cos(radians),       0],
      [0,         0,                0,                1]
    ],
    matrixType: MATRIX_TYPES.ROTATION_X
  }
}

function rotationY(radians) {
  return {
    matrix: [
      [Math.cos(radians),       0, Math.sin(radians), 0],
      [       0,                1,        0,          0],
      [Math.sin(radians) * -1,  0, Math.cos(radians), 0],
      [       0,                0,        0,          1]
    ],
    matrixType: MATRIX_TYPES.ROTATION_Y
  }
}

function rotationZ(radians) {
  return {
    matrix: [
      [Math.cos(radians),  Math.sin(radians) * -1,  0, 0],
      [Math.sin(radians),  Math.cos(radians),       0, 0],
      [       0,                  0,                1, 0],
      [       0,                  0,                0, 1]
    ],
    matrixType: MATRIX_TYPES.ROTATION_Z
  }
}

function shearing(proportions) {
  return {
    matrix: [
      [1, proportions.xy, proportions.xz, 0],
      [proportions.yx, 1, proportions.yz, 0],
      [proportions.zx, proportions.zy, 1, 0],
      [     0,              0,         0, 1]
    ],
    matrixType: MATRIX_TYPES.SHEARING
  }
}

function transform(matrix, point) {
  let result = matrixVectorMultiply([point.x, point.y, point.z, point.w], matrix);

  return new Point(result[0], result[1], result[2]);
}

module.exports = {
  translation,
  transform,
  scaling,
  rotationX,
  rotationY,
  rotationZ,
  shearing
};