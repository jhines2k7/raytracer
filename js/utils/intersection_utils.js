'use strict';

const add = require('./addition');
const multiply = require('./scalar_multiplication');
const subtract = require('./subtraction');
const Point = require('../point');
const dot = require('./dot_product');
const Intersection = require('../intersection');
const Ray = require('../ray');
const transformationUtils = require('./transformations');
const transform = transformationUtils.transform;
const inverse = require('./matrix_utils').inverse;
const identityMatrix = require('./matrix_utils').identityMatrix;
const MATRIX_TYPES = require('./matrix_types');

function position(ray, time) {
  return add(ray.origin, multiply(time, ray.direction));
}

function intersect(sphere, ray) {
  let inversedTransformationMatrix = inverse(sphere.transformation.matrix);
  let ray2 = transformRay(ray, {matrix: inversedTransformationMatrix, matrixType: sphere.transformation.matrixType});
  let sphereToRay = subtract(ray2.origin, new Point(0, 0, 0));

  let a = dot(ray2.direction, ray2.direction);
  let b = 2 * dot(ray2.direction, sphereToRay);
  let c = dot(sphereToRay, sphereToRay) - 1;

  let discriminant = b * b - 4 * a * c;

  if(discriminant < 0) {
    return [];
  } else {
    let t1 = ((-1 * b) - Math.sqrt(discriminant)) / (2 * a);
    let t2 = ((-1 * b) + Math.sqrt(discriminant)) / (2 * a);

    if(t1 > t2) {
      return intersections(new Intersection(t2, sphere), new Intersection(t1, sphere))
    }

    return intersections(new Intersection(t1, sphere), new Intersection(t2, sphere));
  }
}

function intersections(...args) {
  return args;
}

function hit(intersections) {
  let nonNegativeIntersections = intersections.filter((intersection) => {
    return intersection.timeValueOfIntersection > 0;
  });

  if(nonNegativeIntersections.length > 0) {
    return nonNegativeIntersections.reduce((prev, curr) => {
      return prev.timeValueOfIntersection < curr.timeValueOfIntersection ? prev : curr;
    });
  } else {
    return null;
  }
}

function transformRay(ray, matrix) {
  if(matrix.matrixType === MATRIX_TYPES.TRANSLATION) {
    return new Ray(transform(matrix.matrix, ray.origin), ray.direction);
  } else if(matrix.matrixType === MATRIX_TYPES.SCALING) {
    return new Ray(transform(matrix.matrix, ray.origin), transform(matrix.matrix, ray.direction));
  } else {
    return new Ray(transform(identityMatrix.matrix, ray.origin), transform(identityMatrix.matrix, ray.direction));
  }
}

module.exports = {
  position,
  intersect,
  intersections,
  hit,
  transformRay
};