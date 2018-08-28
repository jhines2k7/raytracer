'use strict'

module.exports = class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = 0;
  }

  cross(vector) {
    return new Vector(this.y * vector.z - this.z * vector.y,
                      this.z * vector.x - this.x * vector.z,
                      this.x * vector.y - this.y * vector.x
      )
  }
};
