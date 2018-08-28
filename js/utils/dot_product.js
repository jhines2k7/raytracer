'use strict';

module.exports = (vectorA, vectorB) => {
  return vectorA.x * vectorB.x + vectorA.y * vectorB.y + vectorA.z * vectorB.z;
};