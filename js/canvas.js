'use strict';

module.exports = class Canvas {
  constructor(width, height, backgroundColor) {
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;

    this.pixels = new Array(width);

    for(let i = 0; i < height; i++) {
      this.pixels[i] = new Array(width);

      for(let j = 0; j < width; j++) {
        this.pixels[i][j] = backgroundColor;
      }
    }
  }
};