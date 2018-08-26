const expect = require('chai').expect;
const subtract = require('../js/utils/subtraction');
const Point = require('../js/point');

describe('Subtracting two points', () => {
  it('given two points subtract creates a vector', () => {
    let a = subtract(new Point(1, 2, 3), new Point(4, 5, 6  ));

    expect(a.constructor.name).to.equal('Vector');
  });

  it('given a point (3, 2, 1) and a point (5, 6, 7) subtract creates a vector (-2, -4, -6, 0)', () => {
    let a = subtract(new Point(3, 2, 1), new Point(5, 6, 7));

    expect(a.x).to.equal(-2);
    expect(a.y).to.equal(-4);
    expect(a.z).to.equal(-6);
    expect(a.w).to.equal(0);
  });
});