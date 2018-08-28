'use strict';

const expect = require('chai').expect;
const Vector = require('../js/vector');

describe('Cross product of two vectors', () => {
  describe('given a vector (1, 2, 3) and a vector (2, 3, 4)', () => {
    it('then a x b returns a vector (-1, 2, -1)', () => {
      let a = new Vector(1, 2, 3);
      let b = new Vector(2, 3, 4);

      let crossProduct = a.cross(b);

      expect(crossProduct.x).to.equal(-1);
      expect(crossProduct.y).to.equal(2);
      expect(crossProduct.z).to.equal(-1);
    });

    it('then b x a returns a vector (1, -2, 1)', () => {
      let a = new Vector(1, 2, 3);
      let b = new Vector(2, 3, 4);

      let crossProduct = b.cross(a);

      expect(crossProduct.x).to.equal(1);
      expect(crossProduct.y).to.equal(-2);
      expect(crossProduct.z).to.equal(1);
    });
  })
});