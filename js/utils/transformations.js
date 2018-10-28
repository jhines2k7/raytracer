'use strict';

const matrixVectorMultiply = require('../utils/matrix_utils').matrixVectorMultiply;
const Point = require('../point');

function translation(x, y, z) {
  return [
    [1, 0, 0, x],
    [0, 1, 0, y],
    [0, 0, 1, z],
    [0, 0, 0, 1]
  ]
}

function scaling(x, y, z) {
  return [
    [x, 0, 0, 0],
    [0, y, 0, 0],
    [0, 0, z, 0],
    [0, 0, 0, 1]
  ]
}

function rotationX(radians) {
  return [
    [1,         0,                0,                0],
    [0, Math.cos(radians), Math.sin(radians) * -1,  0],
    [0, Math.sin(radians), Math.cos(radians),       0],
    [0,         0,                0,                1]
  ]
}

function rotationY(radians) {
  return [
    [Math.cos(radians),       0, Math.sin(radians), 0],
    [       0,                1,        0,          0],
    [Math.sin(radians) * -1,  0, Math.cos(radians), 0],
    [       0,                0,        0,          1]
  ]
}

function rotationZ(radians) {
  return [
    [Math.cos(radians),  Math.sin(radians) * -1,  0, 0],
    [Math.sin(radians),  Math.cos(radians),       0, 0],
    [       0,                  0,                1, 0],
    [       0,                  0,                0, 1]
  ]
}

function shearing(proportions) {
  return [
    [1, proportions.xy, proportions.xz, 0],
    [proportions.yx, 1, proportions.yz, 0],
    [proportions.zx, proportions.zy, 1, 0],
    [     0,              0,         0, 1]
  ]
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