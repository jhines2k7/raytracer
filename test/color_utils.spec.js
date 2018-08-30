'use strict';

const expect = require('chai').expect;
const colorUtils = require('../js/utils/color_utils');
const addColors = colorUtils.addColors;
const subtractColors = colorUtils.subtractColors;
const multiplyByScalar = colorUtils.multiplyByScalar;
const hadamardProduct = colorUtils.hadamardProduct;
const Color = require('../js/color');

describe('Adding colors', () => {
  it('addColor should return a color', () => {
    let color = addColors(new Color(0.9, 0.6, 0.75), new Color(0.7, 0.1, 0.25));

    expect(color.constructor.name).to.equal('Color');
  });

  it('given a color (0.9, 0.6, 0.75) and a color (0.7, 0.1, 0.25) addColors should return a color (1.6, 0.7, 1.0)', () => {
    let color = addColors(new Color(0.9, 0.6, 0.75), new Color(0.7, 0.1, 0.25));

    expect(color.red).to.equal(1.6);
    expect(color.green).to.equal(0.7);
    expect(color.blue).to.equal(1.0);
  });
});

describe('Subtracting colors', () => {
  it('subtractColors should return a color', () => {
    let color = subtractColors(new Color(0.9, 0.6, 0.75), new Color(0.7, 0.1, 0.25));

    expect(color.constructor.name).to.equal('Color');
  });

  it('given a color (0.9, 0.6, 0.75) and a color (0.7, 0.1, 0.25) subtractColors should return a color (0.2, 0.5, 0.5)', () => {
    let color = subtractColors(new Color(0.9, 0.6, 0.75), new Color(0.7, 0.1, 0.25));

    expect(parseFloat(color.red.toFixed(1))).to.equal(0.2);
    expect(color.green).to.equal(0.5);
    expect(color.blue).to.equal(0.5);
  });
});

describe('Multiplying by scalar colors', () => {
  it('subtractColors should return a color', () => {
    let color = multiplyByScalar(2, new Color(0.9, 0.6, 0.75));

    expect(color.constructor.name).to.equal('Color');
  });

  it('given a color (0.2, 0.3, 0.4) and a scalar multiplyByScalar should return a color (0.4, 0.6, 0.8)', () => {
    let color = multiplyByScalar(2, new Color(0.2, 0.3, 0.4));

    expect(color.red).to.equal(0.4);
    expect(color.green).to.equal(0.6);
    expect(color.blue).to.equal(0.8);
  });
});

describe('Hadamard prodcut', () => {
  it('hadamardProduct should return a color', () => {
    let color = hadamardProduct(new Color(1, 0.2, 0.4), new Color(0.9, 1, 0.1));

    expect(color.constructor.name).to.equal('Color');
  });

  it('given a color (1, 0.2, 0.4) and a color (0.9, 1, 0.1) hadamardProdcut should return a color (0.9, 0.2, 0.04)', () => {
    let color = hadamardProduct(new Color(1, 0.2, 0.4), new Color(0.9, 1, 0.1));

    expect(color.red).to.equal(0.9);
    expect(color.green).to.equal(0.2);
    expect(parseFloat(color.blue.toFixed(2))).to.equal(0.04);
  });
});