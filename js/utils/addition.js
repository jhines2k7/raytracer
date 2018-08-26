const Point = require('../point');
const Vector = require('../vector');

module.exports = (a, b) => {
  let tuple = {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z,
    w: a.w + b.w
  };

  if(tuple.w === 1) {
    return new Point(tuple.x, tuple.y, tuple.z);
  } else {
    return new Vector(tuple.x, tuple.y, tuple.z);
  }
};