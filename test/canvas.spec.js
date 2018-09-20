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

    expect(canvas.pixels[0].length).to.equal(3);
    expect(canvas.pixels[1].length).to.equal(3);
  });

  it('when constructed should create a two dimensional array of pixels with a width of 3 and a height of 2', () => {
    let canvas = new Canvas(3, 2, new Color(0, 0, 0));

    expect(canvas.pixels[0].length).to.equal(2);
    expect(canvas.pixels[1].length).to.equal(2);
    expect(canvas.pixels[2].length).to.equal(2);
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

  it('calls pixelAt to return a pixel at the given x, y coordinates', () => {
    let canvas = new Canvas(3, 2, new Color(0, 0, 1));

    canvas.writePixel(0, 1, new Color(0, 1, 0));

    let pixelOne = canvas.pixelAt(0, 0);

    expect(pixelOne.red).to.equal(0);
    expect(pixelOne.green).to.equal(0);
    expect(pixelOne.blue).to.equal(1);

    let pixelTwo = canvas.pixelAt(0, 1);

    expect(pixelTwo.red).to.equal(0);
    expect(pixelTwo.green).to.equal(1);
    expect(pixelTwo.blue).to.equal(0);
  });

  it('calls writePixel to set the color of a pixel on the canvas with a background color of blue', () => {
    let canvas = new Canvas(3, 2, new Color(0, 0, 1));

    canvas.writePixel(0, 1, new Color(0, 1, 0));

    let pixelOne = canvas.pixelAt(0, 0);

    expect(pixelOne.red).to.equal(0);
    expect(pixelOne.green).to.equal(0);
    expect(pixelOne.blue).to.equal(1);

    let pixelTwo = canvas.pixelAt(0, 1);

    expect(pixelTwo.red).to.equal(0);
    expect(pixelTwo.green).to.equal(1);
    expect(pixelTwo.blue).to.equal(0);
  });


  it('calls writePixel to set the color of a pixel on the canvas with a background color of white', () => {
    let canvas = new Canvas(3, 2, new Color(1, 1, 1));

    canvas.writePixel(2, 1, new Color(0, 1, 0));

    let pixelOne = canvas.pixelAt(0, 0);

    expect(pixelOne.red).to.equal(1);
    expect(pixelOne.green).to.equal(1);
    expect(pixelOne.blue).to.equal(1);

    let pixelTwo = canvas.pixelAt(2, 1);

    expect(pixelTwo.red).to.equal(0);
    expect(pixelTwo.green).to.equal(1);
    expect(pixelTwo.blue).to.equal(0);
  });

  it('canvasToPpm returns a ppm formatted string for a 300 x 200 pixel canvas', () => {
    let canvas = new Canvas(300, 200, new Color(0, 0, 0));

    let ppmString = canvas.canvasToPpm();

    expect(ppmString.includes('P3\n300 200\n255')).to.equal(true);
  });

  it('canvasToPpm returns a ppm formatted string for a 350 x 250 pixel canvas', () => {
    let canvas = new Canvas(350, 250, new Color(0, 0, 0));

    let ppmString = canvas.canvasToPpm();

    expect(ppmString.includes('P3\n350 250\n255')).to.equal(true);
  });

  it('canvasToPpm returns a ppm formatted string with correct pixel data for a 5 x 3 canvas with a background color of green', () => {
    let canvas = new Canvas(5, 3, new Color(0, 1, 0));

    let ppmString = canvas.canvasToPpm();

    expect(ppmString).to.equal('P3\n5 3\n255\n0 255 0 0 255 0 0 255 0 0 255 0 0 255 0\n0 255 0 0 255 0 0 255 0 0 255 0 0 255 0\n0 255 0 0 255 0 0 255 0 0 255 0 0 255 0\n');
  });

  it('canvasToPpm returns a ppm formatted string with correct pixel data for a 5 x 3 canvas with a background color of red', () => {
    let canvas = new Canvas(5, 3, new Color(1, 0, 0));

    let ppmString = canvas.canvasToPpm();

    expect(ppmString).to.equal('P3\n5 3\n255\n255 0 0 255 0 0 255 0 0 255 0 0 255 0 0\n255 0 0 255 0 0 255 0 0 255 0 0 255 0 0\n255 0 0 255 0 0 255 0 0 255 0 0 255 0 0\n');
  });

  it('canvasToPpm returns a ppm formatted string with correct pixel data for a 5 x 3 canvas with a background color of black and red pixels at (0, 0), (4, 0), (1, 2), (2, 0), (2, 4)', () => {
    let canvas = new Canvas(5, 3, new Color(0, 0, 0));

    let red = new Color(1, 0, 0);

    canvas.writePixel(0, 0, red);
    canvas.writePixel(0, 4, red);
    canvas.writePixel(1, 2, red);
    canvas.writePixel(2, 0, red);
    canvas.writePixel(2, 4, red);

    let ppmString = canvas.canvasToPpm();

    expect(ppmString).to.equal('P3\n5 3\n255\n255 0 0 0 0 0 0 0 0 0 0 0 255 0 0\n0 0 0 0 0 0 255 0 0 0 0 0 0 0 0\n255 0 0 0 0 0 0 0 0 0 0 0 255 0 0\n');
  });

  it('pixel data lines do not exceed 70 characters', () => {
    let canvas = new Canvas(10, 2, new Color(1, 0.8, 0.6));

    let ppmString = canvas.canvasToPpm();

    expect(ppmString).to.equal('P3\n10 2\n255\n255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204\n' +
      '153 255 204 153 255 204 153 255 204 153 255 204 153\n' +
      '255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204\n' +
      '153 255 204 153 255 204 153 255 204 153 255 204 153\n')
  });

  it("Canvas::splitPixelData takes a line and adds a newline character at multiples of the given maximum length", () => {
    let canvas = new Canvas(2, 2, new Color(0,0,0));

    let pixelData = '255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204 153';

    const MAX_LENGTH = 70;
    
    let splitPixelData = canvas.splitPixelData(pixelData, MAX_LENGTH);

    expect(splitPixelData).to.equal('255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204\n153 255 204 153 255 204 153 255 204 153 255 204 153');
  });

  it("Canvas::splitPixelData takes a line and adds a newline character at multiples of the given maximum length when all pixel values are 0", () => {
    let canvas = new Canvas(2, 2, new Color(0,0,0));

    let pixelData = '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0';

    const MAX_LENGTH = 70;

    let splitPixelData = canvas.splitPixelData(pixelData, MAX_LENGTH);

    expect(splitPixelData).to.equal('0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0');
  });

  it("Canvas::splitPixelData returns an unsplit line if the line is less than maximum length", () => {
    let canvas = new Canvas(2, 2, new Color(0,0,0));

    let pixelData = '255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204';

    const MAX_LENGTH = 70;

    let splitPixelData = canvas.splitPixelData(pixelData, MAX_LENGTH);

    expect(splitPixelData).to.equal('255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204');
  });
});
