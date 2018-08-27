'use strict';

const expect = require('chai').expect;
const Vector = require('../js/vector');
const normalize = require('../js/utils/normalize');

describe('Normalizing a vector', () => {
  it('returns a vector', () => {
    let vector = normalize(new Vector(4, 0, 0));

    expect(vector.constructor.name).to.equal('Vector');
  });

  it('(4, 0, 0) creates a vector (1, 0, 0)', () => {
    let vector = normalize(new Vector(4, 0, 0));

    expect(vector.x).to.equal(1);
    expect(vector.y).to.equal(0);
    expect(vector.z).to.equal(0);
    expect(vector.w).to.equal(0);
  });

  it('(1, 2, 3) creates a vector (0.26726, 0.53452, 0.80178)', () => {
    let vector = normalize(new Vector(1, 2, 3));

    expect(vector.x).to.equal(1 / Math.sqrt(14));
    expect(vector.y).to.equal(2 / Math.sqrt(14));
    expect(vector.z).to.equal(3 / Math.sqrt(14));
    expect(vector.w).to.equal(0);
  })
});