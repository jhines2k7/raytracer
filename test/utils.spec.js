'use strict'

const expect = require('chai').expect
const equal = require('../js/utils/equal')

describe('Utility method for comparing floating point numbers', () => {
  describe('Two floating point numbers', () => {
    let a = 2.12345;
    let b = 2.12346;

    let isEqual = equal(a, b);

    it('are considered equal if their difference is less than 0.00001', () => {
      expect(isEqual).to.equal(true);
    });
    
    a = 1.12345;
    b = 1.12356;

    isEqual = equal(a, b);

    it('are considered not equal if their difference is greater than 0.00001', () => {
      expect(isEqual).to.equal(false);
    });
  })
})
