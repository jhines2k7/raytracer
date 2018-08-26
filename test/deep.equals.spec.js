'use strict';

const expect = require('chai').expect;
const deepEquals = require('../js/utils/deep_equals');
const Point = require('../js/point');
const Vector = require('../js/vector');

describe('Utility method for determining if two objects are equal', () => {
  describe('deepEquals returns true if the values for the x, y, and z properties of two points are equal ', () => {
    it('', () => {
      let pointA = new Point(3.5, 2.5, 4.5);
      let pointB = new Point(3.5, 2.5, 4.5);

      expect(deepEquals(pointA, pointB)).to.equal(true);
    });
  });
});