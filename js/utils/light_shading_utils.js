'use strict';
const Point = require('../point');
const normalize = require('../utils/normalize');
const subtract = require('../utils/subtraction');

function normalAt(sphere, point) {
  return normalize(subtract(point, new Point(0, 0, 0)));
}

module.exports = {
  normalAt
};