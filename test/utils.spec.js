'use strict';

const expect = require('chai').expect;
const equal = require('../js/utils/equal');

describe('Utility method for comparing floating point numbers', () => {
  describe('Two floating point numbers', () => {
    it('are considered equal if their difference is less than 0.00001 when a = 2.12345 and b = 2.12345', () => {
      let a = 2.12345;
      let b = 2.12345;

      expect(equal(a, b)).to.equal(true);
    });

    it('are considered equal if their difference is less than 0.00001 when a = 2.1234566 and b = 2.1234567', () => {
      let a = 2.1234566;
      let b = 2.1234567;

      expect(equal(a, b)).to.equal(true);
    });

    it('are considered not equal if their difference is less than 0.00001 when a = 2.12345 and b = 2.12346', () => {
      let a = 2.12345;
      let b = 2.12346;

      expect(equal(a, b)).to.equal(false);
    });

    it('are considered not equal if their difference is greater than 0.00001', () => {
      let a = 1.12345;
      let b = 1.12356;

      expect(equal(a, b)).to.equal(false);
    });
  })
});
