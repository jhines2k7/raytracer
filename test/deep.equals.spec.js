'use strict';

const expect = require('chai').expect;
const deepEquals = require('../js/utils/deep_equals');
const Point = require('../js/point');
const Vector = require('../js/vector');

describe('Utility method for determining if two objects are equal', () => {
  describe('deepEquals returns true if the values for the x, y, and z properties of two points are equal ', () => {
    it('should return true if pointA and pointB have the same values', () => {
      let pointA = new Point(3.5, 2.5, 4.5);
      let pointB = new Point(3.5, 2.5, 4.5);

      expect(deepEquals(pointA, pointB)).to.equal(true);
    });

    it('should return false if vectorA and vectorB have different values', () => {
      let vectorA = new Vector(3.5, 2.5, 4.5);
      let vectorB = new Vector(3.6, 2.6, 4.5);

      expect(deepEquals(vectorA, vectorB)).to.equal(false);
    });
  });
});