'use strict';

const expect = require('chai').expect;
const Color = require('../js/color');

describe('Colors have', () => {
  it('red, green, and blue properties', () => {
    let color = new Color(-0.5, 0.4, 1.7);

    expect(color.red).to.equal(-0.5);
    expect(color.green).to.equal(0.4);
    expect(color.blue).to.equal(1.7);
  });

  it('returns a color value for each color when colors are (-0.5, 0.4, 1.7)', () => {
    let color = new Color(-0.5, 0.4, 1.7);

    expect(color.redValue).to.equal(0);
    expect(color.greenValue).to.equal(102);
    expect(color.blueValue).to.equal(255);
  });

  it('returns a color value for each color when colors are (0.5, 0.4, 1.7)', () => {
    let color = new Color(0.5, 0.4, 1.7);

    expect(color.redValue).to.equal(128);
    expect(color.greenValue).to.equal(102);
    expect(color.blueValue).to.equal(255);
  })
});
