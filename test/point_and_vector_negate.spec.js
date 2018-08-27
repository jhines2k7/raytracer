'use strict';

const Point = require('../js/point');
const Vector = require('../js/vector');
const expect = require('chai').expect;
const negate = require('../js/utils/negate');

describe('Negating points and vectors', () => {
  it('given a point negate returns a point', () => {
    let a = negate(new Point(1, -2, -3));

    expect(a.constructor.name).to.equal('Point');
  });

  it('given a vector negate returns a vector', () => {
    let a = negate(new Vector(1, -2, -3));

    expect(a.constructor.name).to.equal('Vector');
  });

  it('given a point (1, -2, -3) negate returns a point (-1, 2, 3)', () => {
    let a = negate(new Point(1, -2, -3));

    expect(a.x).to.equal(-1);
    expect(a.y).to.equal(2);
    expect(a.z).to.equal(3);
    expect(a.w).to.equal(1);
  });

  it('given a vector (-4, -5, -3) negate returns a vector (4, 5, 3)', () => {
    let a = negate(new Vector(-4, -5, -3));

    expect(a.x).to.equal(4);
    expect(a.y).to.equal(5);
    expect(a.z).to.equal(3);
    expect(a.w).to.equal(0);
  });
});