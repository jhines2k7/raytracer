'use strict';

module.exports = class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = 1;
  }
}
