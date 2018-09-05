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

  it('when constructed should create a two dimensional array of pixels that each have the color red', () => {
    let canvas = new Canvas(2, 2, new Color(1, 0, 0));

    for(let i = 0; i < 2; i++) {
      for(let j = 0; j < 2; j++) {
        expect(canvas.pixels[i][j].red).to.equal(1);
        expect(canvas.pixels[i][j].green).to.equal(0);
        expect(canvas.pixels[i][j].blue).to.equal(0);
      }
    }
  });

  it('when constructed should create a two dimensional array of pixels that each have the color blue', () => {
    let width = 10, height = 10;
    let canvas = new Canvas(width, height, new Color(0, 0, 1));

    for(let i = 0; i < width; i++) {
      for(let j = 0; j < height; j++) {
        expect(canvas.pixels[i][j].red).to.equal(0);
        expect(canvas.pixels[i][j].green).to.equal(0);
        expect(canvas.pixels[i][j].blue).to.equal(1);
      }
    }
  });

  it('calls writePixel to set the color of a pixel on the canvas', () => {
    let canvas = new Canvas(3, 2, new Color(0, 0, 1));

    canvas.writePixel(0, 2, new Color(0, 1, 0));

    expect(canvas.pixels[0][0].red).to.equal(0);
    expect(canvas.pixels[0][0].green).to.equal(0);
    expect(canvas.pixels[0][0].blue).to.equal(1);

    expect(canvas.pixels[0][2].red).to.equal(0);
    expect(canvas.pixels[0][2].green).to.equal(1);
    expect(canvas.pixels[0][2].blue).to.equal(0);
  });
});