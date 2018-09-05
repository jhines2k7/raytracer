'use strict';

const chai = require('chai'),
  spies = require('chai-spies');

chai.use(spies);

const sandbox = chai.spy.sandbox();

const expect = chai.expect;

const Canvas = require('../js/canvas');
const Color = require('../js/color');

describe('Creating a canvas', () => {
  it('should have width, height and background color properties', () => {
    let canvas = new Canvas(10, 20, new Color(0, 0, 0));

    expect(canvas.width).to.equal(10);
    expect(canvas.height).to.equal(20);
    expect(canvas.backgroundColor.red).to.equal(0);
    expect(canvas.backgroundColor.green).to.equal(0);
    expect(canvas.backgroundColor.blue).to.equal(0);
  });

  it('when constructed, writePixel should be called for each pixel on the canvas', () => {
    let canvas = new Canvas(2, 2, new Color(1, 0, 0));

    sandbox.on(canvas, ['writePixel']);

    expect(canvas.writePixel).to.have.been.called.exactly(4);
  });
});