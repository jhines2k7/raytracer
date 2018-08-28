'use strict';

const expect = require('chai').expect;
const Vector = require('../js/vector');
const dotProduct = require('../js/utils/dot_product');

describe('The dot product of two vectors', () => {
  it('given a vector (1, 2, 3) and a vector (2, 3, 4) the dot product is 20', () => {
    let dot = dotProduct(new Vector(1, 2, 3), new Vector(2, 3, 4));

    expect(dot).to.equal(20);
  })
});