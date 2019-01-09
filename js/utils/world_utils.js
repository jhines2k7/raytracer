'use strict';

const intersectionUtils = require('../utils/intersection_utils');
const intersect = intersectionUtils.intersect;

function intersectWorld(world, ray) {
  let intersections = [];

  for(let i = 0; i < world.objects.length; i++) {
    let object = world.objects[i];

    intersections.push(...intersect(object, ray));
  }

  return intersections.sort((a, b) => {
    return a.timeValueOfIntersection - b.timeValueOfIntersection;
  });
}

function precomputeComputations() {

}

module.exports = {
  intersectWorld
};