'use strict'

const expect = require('chai').expect

describe('An object with w = 1.0 is a point', () => {
  describe('A point object', () => {
    let point = {x: 4.3, y: -4.2, z: 3.1, w: 1.0};

    it('should contain a w property with a value equal to 1.0 and not 0.0', () => {
      expect(point.w).to.equal(1.0);
      expect(point.w).to.not.equal(0.0);
    })
  })
	
  describe('A vector object', () => {
    let vector = {x: 4.3, y: -4.2, z: 3.1, w: 0.0};

    it('should contain a w property with a value equal to 0.0 and not 1.0', () => {
      expect(vector.w).to.equal(0.0);
      expect(vector.w).to.not.equal(1.0);
    })
  })
})
