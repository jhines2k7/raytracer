'use strict';

const add = require('./addition');
const multiply = require('./scalar_multiplication');

function position(ray, time) {
  return add(ray.origin, multiply(time, ray.direction));
}

function intersects(sphere, ray) {
  let intersections = [];



  return intersections;
}

module.exports = {
  position
};