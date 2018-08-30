'use strict';

const expect = require('chai').expect;
const Color = require('../js/color');

describe('Colors have', () => {
  it('red, green, and blue properties', () => {
    let color = new Color(-0.5, 0.4, 1.7);

    expect(color.red).to.equal(-0.5);
    expect(color.green).to.equal(0.4);
    expect(color.blue).to.equal(1.7);
  })
});
