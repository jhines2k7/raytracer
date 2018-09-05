'use strict';

const chai = require('chai'),
  spies = require('chai-spies');

const should = require('chai').should();

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

  it('when constructed should create a two dimensional array of pixels with a width of 2 and a height of 3', () => {
    let canvas = new Canvas(2, 3, new Color(0, 0, 0));

    expect(canvas.pixels[0].length).to.equal(2);
    expect(canvas.pixels[1].length).to.equal(2);
    expect(canvas.pixels[2].length).to.equal(2);
  });

  it('when constructed should create a two dimensional array of pixels with a width of 3 and a height of 2', () => {
    let canvas = new Canvas(3, 2, new Color(0, 0, 0));

    expect(canvas.pixels[0].length).to.equal(3);
    expect(canvas.pixels[1].length).to.equal(3);
  });

  // it('when constructed, writePixel should be called for each pixel on the canvas', () => {
  //   let canvas = new Canvas(2, 2, new Color(1, 0, 0));
  //
  //   sandbox.on(canvas, ['writePixel']);
  //
  //   expect(canvas.writePixel).to.have.been.called.exactly(4);
  // });
});