'use strict'

const expect = require('chai').expect
const Point = require('../js/point')
const Vector = require('../js/vector')

describe('Points and vectors', () => {
  describe('A point object', () => {
    let point = new Point(4.3, 4.2, 3.1);

    it('should contain a w property with a value equal to 1.0 and not 0.0', () => {
      expect(point.x).to.equal(4.3);
      expect(point.y).to.equal(4.2);
      expect(point.z).to.equal(3.1);
      expect(point.w).to.equal(1.0);
      expect(point.w).to.not.equal(0.0);
    })
  })
	
  describe('A vector object', () => {
    let vector = new Vector(4.3, -4.2, 3.1);

    it('should contain a w property with a value equal to 0.0 and not 1.0', () => {
      expect(vector.x).to.equal(4.3);
      expect(vector.y).to.equal(-4.2);
      expect(vector.z).to.equal(3.1);
      expect(vector.w).to.equal(0.0);
      expect(vector.w).to.not.equal(1.0);
    })
  })
})
