'use strict';

const add = require('./addition');
const multiply = require('./scalar_multiplication');
const subtract = require('./subtraction');
const Point = require('../point');
const dot = require('./dot_product');
const Intersection = require('../intersection');

function position(ray, time) {
  return add(ray.origin, multiply(time, ray.direction));
}

function intersect(sphere, ray) {
  let sphereToRay = subtract(ray.origin, new Point(0, 0, 0));

  let a = dot(ray.direction, ray.direction);
  let b = 2 * dot(ray.direction, sphereToRay);
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
  return intersections.reduce((prev, curr) => {
    return prev.timeValueOfIntersection < curr.timeValueOfIntersection ? prev : curr;
  });
}

module.exports = {
  position,
  intersect,
  intersections,
  hit
};