'use strict';

module.exports = class Canvas {
  constructor(width, height, backgroundColor) {
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;

    this.pixels = new Array(width);

    for(let i = 0; i < width; i++) {
      let row = new Array(height);
      
      for(let column = 0; column < height; column++) {
        row[column] = backgroundColor;
      }
      
      this.pixels[i] = row;
    }
  }

  writePixel(x, y, color) {
    this.pixels[x][y] = color;
  }
};
