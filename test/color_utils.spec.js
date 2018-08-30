'use strict';

const expect = require('chai').expect;
const addColors = require('../js/utils/color_utils').addColors;
const subtractColors = require('../js/utils/color_utils').subtractColors;
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

    expect(color.red).to.equal(0.2);
    expect(color.green).to.equal(0.5);
    expect(color.blue).to.equal(0.5);
  });
});