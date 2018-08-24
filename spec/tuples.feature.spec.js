'use strict'

const expect = require('chai').expect

describe('An object with w=1.0 is a point', () => {
  describe('point object', () => {
    let point = {x = 4.3, y: -4.2, z: 3.1, w: 1.0};

    it('the value of the w property should equal 1.0 and not 0.0', () => {
      expect(point.w).to.equal(1.0);
      expect(point.w).to.not.equal(1.0);
    })
  })
})
