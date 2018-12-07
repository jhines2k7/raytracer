'use strict';
const Point = require('../point');
const Vector = require('../vector');
const normalize = require('../utils/normalize');
const subtract = require('../utils/subtraction');
const inverse = require('../utils/matrix_utils').inverse;
const multiply = require('../utils/matrix_utils').matrixVectorMultiply;
const transpose = require('../utils/matrix_utils').transpose;
const dot = require('../utils/dot_product');
const scalarMultiplication = require('../utils/scalar_multiplication');
const Color = require('../color');

function normalAt(sphere, worldPoint) {
  let worldPointVector = [worldPoint.x, worldPoint.y, worldPoint.z, 1];
  let objectPoint = multiply(worldPointVector, inverse(sphere.transformation.matrix));

  let objectNormal = subtract(new Point(objectPoint[0], objectPoint[1], objectPoint[2]), new Point(0, 0, 0));

  let objectNormalVector = [objectNormal.x, objectNormal.y, objectNormal.z, 1];
  let worldNormal = multiply(objectNormalVector, transpose(inverse(sphere.transformation.matrix)));

  let resultVector = new Vector(worldNormal[0], worldNormal[1], worldNormal[2]);
  resultVector.w = 0;

  return normalize(resultVector);
}

function reflect(vector, normal) {
  let dotProduct = dot(vector, normal) * 2;

  let scaledNormalDotProduct = scalarMultiplication(dotProduct, normal);

  return subtract(vector, scaledNormalDotProduct);
}

function lighting(material, light, position, eyeVector, normalVector) {
  return new Color(1.9, 1.9, 1.9);
}

module.exports = {
  normalAt,
  reflect,
  lighting
};