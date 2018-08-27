'use strict';

const expect = require('chai').expect;
const Vector = require('../js/vector');
const magnitude = require('../js/utils/magnitude');

describe('Magnitude of vector', () => {
  it('(1, 0, 0)', () => {
    let mag = magnitude(new Vector(1, 0, 0));

    expect(mag).to.equal(1);
  });

  it('(0, 1, 0)', () => {
    let mag = magnitude(new Vector(1, 0, 0));

    expect(mag).to.equal(1);
  });

  it('(0, 0, 1)', () => {
    let mag = magnitude(new Vector(1, 0, 0));

    expect(mag).to.equal(1);
  });

  it('(1, 2, 3)', () => {
    let mag = magnitude(new Vector(1, 2, 3));

    expect(mag).to.equal(Math.sqrt(14));
  });

  it('(-1, -2, -3)', () => {
    let mag = magnitude(new Vector(-1, -2, -3));

    expect(mag).to.equal(Math.sqrt(14));
  });
});