'use strict';

const Color = require('../../js/color');

function addColors(colorA, colorB) {
  return new Color(colorA.red + colorB.red, colorA.green + colorB.green, colorA.blue + colorB.blue);
}

function subtractColors(colorA, colorB) {
  return new Color(colorA.red - colorB.red, colorA.green - colorB.green, colorA.blue - colorB.blue);
}

module.exports = {addColors, subtractColors};