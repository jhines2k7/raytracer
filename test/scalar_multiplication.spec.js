'use strict';

const expect = require('chai').expect;
const Vector = require('../js/vector');
const multiplyByScalar = require('../js/utils/scalar_multiplication');

describe('Multiplying a vector by a scalar', () => {
  it('given a vector multiply by scalar returns a vector', () => {
    let vector = multiplyByScalar(3.5, new Vector(1, -2, -3));

    expect(vector.constructor.name).to.equal('Vector');
  });

  it('given a vector (1, -2, 3) multiply by scalar 3.5 returns a vector (3.5, -7.0, 10.5)', () => {
    let vector = multiplyByScalar(3.5, new Vector(1, -2, 3));

    expect(vector.x).to.equal(3.5);
    expect(vector.y).to.equal(-7.0);
    expect(vector.z).to.equal(10.5);
    expect(vector.w).to.equal(0);
  });
});