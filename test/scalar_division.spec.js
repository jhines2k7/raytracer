'use strict';

const expect = require('chai').expect;
const Vector = require('../js/vector');
const divideByScalar = require('../js/utils/scalar_division');

describe('Dividing a vector by a scalar', () => {
  it('given a vector divide by scalar returns a vector', () => {
    let vector = divideByScalar(3.5, new Vector(1, -2, -3));

    expect(vector.constructor.name).to.equal('Vector');
  });

  it('given a vector (1, -2, 3) divide by scalar 2 returns a vector (0.5, -1, 1.5)', () => {
    let vector = divideByScalar(2, new Vector(1, -2, 3));

    expect(vector.x).to.equal(0.5);
    expect(vector.y).to.equal(-1);
    expect(vector.z).to.equal(1.5);
    expect(vector.w).to.equal(0);
  });
});