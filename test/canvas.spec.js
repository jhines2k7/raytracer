'use strict';

const expect = require('chai').expect;
const Canvas = require('../js/canvas');
const Color = require('../js/color');

describe('Creating a canvas', () => {
  it('should have width, height and background color properties', () => {
    let canvas = new Canvas(10, 20, new Color(0, 0, 0));

    expect(canvas.width).to.equal(10);
    expect(canvas.height).to.equal(20);
    expect(canvas.backgroundColor).to.equal(10);
  });
});
