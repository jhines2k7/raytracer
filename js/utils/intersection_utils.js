'use strict';

const add = require('./addition');
const multiply = require('./scalar_multiplication');
const subtract = require('./subtraction');
const Point = require('../point');
const dot = require('./dot_product');

function position(ray, time) {
  return add(ray.origin, multiply(time, ray.direction));
}

function intersects(sphere, ray) {
  let sphereToRay = subtract(ray.origin - new Point(0, 0, 0));

  let a = dot(ray.direction, ray.direction);
  let b = 2 * dot(ray.direction, sphereToRay);
  let c = dot(sphereToRay, sphereToRay) - 1;

  let discriminant = b * b - 4 * a * c;

  if(discriminant < 0) {
    return [];
  } else if(discriminant === 1) {
    return [discriminant, discriminant];
  } else {
    let t1 = (-1 * b) - Math.sqrt(discriminant) / (2 * a);
    let t2 = (-1 * b) + Math.sqrt(discriminant) / (2 * a);

    if(t1 > t2) {
      return [t2, t1]
    }

    return [t1, t2];
  }
}

module.exports = {
  position,
  intersects
};