'use strict';

const Point = require('../js/point');
const Vector = require('../js/vector');
const add = require('../js/utils/addition');
const expect = require('chai').expect;

describe('Utility method for vector and point addition', () => {
  it('should return a point when a vector and a point are added together', () => {
    let a = add(new Point(1.5, 2.5, 3.5), new Vector(5.1, 1.3, 3.2));

    expect(a.constructor.name).to.equal('Point');
  });

  it('should return a vector when a vector and a vector are added together', () => {
    let a = add(new Vector(1.5, 2.5, 3.5), new Vector(5.1, 1.3, 3.2));

    expect(a.constructor.name).to.equal('Vector');
  });

  it('should return a point with the values of x: 6.6, y: 3.8, z: 6.7, w: 1', () => {
    let a = add(new Point(1.5, 2.5, 3.5), new Vector(5.1, 1.3, 3.2));

    expect(a.x).to.equal(6.6);
    expect(a.y).to.equal(3.8);
    expect(a.z).to.equal(6.7);
    expect(a.w).to.equal(1);
  });

  it('should return a vector with the values of x: 4.6, y: 6.8, z: 7.7, w: 0', () => {
    let a = add(new Vector(2.5, 2.5, 4.5), new Vector(2.1, 4.3, 3.2));

    expect(a.x).to.equal(4.6);
    expect(a.y).to.equal(6.8);
    expect(a.z).to.equal(7.7);
    expect(a.w).to.equal(0);
  });
});