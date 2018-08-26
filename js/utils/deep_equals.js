'use strict';

const isEqual = require('../js/utils/is_equal');

module.exports = (a, b) => {
  return isEqual(a.x, b.x) && isEqual(a.y, b.y) && isEqual(a.z, b.z);
};