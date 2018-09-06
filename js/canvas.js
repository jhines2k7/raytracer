'use strict';

module.exports = class Canvas {
  constructor(width, height, backgroundColor) {
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;

    this.pixels = new Array(height);

    for(let i = 0; i < height; i++) {
      let row = new Array(width);
      
      for(let column = 0; column < width; c++) {
        row[column] = backgroundColor;
      }
      
      this.pixels[i] = row;      
    }
  }

  writePixel(x, y, color) {
    this.pixels[x][y] = color;
  }
};
