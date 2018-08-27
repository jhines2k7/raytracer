'use strict';

const Point = require('../point');
const Vector = require('../vector');

module.exports = (a) => {
  if(a.w === 1) {
    return new Point(a.x * -1, a.y * -1, a.z * -1);
  } else {
    return new Vector(a.x * -1, a.y * -1, a.z * -1);
  }
};