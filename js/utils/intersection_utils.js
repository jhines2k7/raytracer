'use strict';

const add = require('./addition');
const multiply = require('./scalar_multiplication');

function position(ray, time) {
  return add(ray.origin, multiply(time, ray.direction));
}

module.exports = {
  position
};