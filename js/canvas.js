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
    this.pixels[y][x] = color;
  }

  pixelAt(x, y) {
    return this.pixels[y][x];
  }

  canvasToPpm() {
    let ppmString = `P3\n${this.width} ${this.height}\n255\n`;

    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        ppmString += `${this.pixels[j][i].redValue} ${this.pixels[j][i].greenValue} ${this.pixels[j][i].blueValue}`;

        if(j !== this.width - 1) ppmString += ' ';
      }

      ppmString += '\n';
    }

    return ppmString;
  }
};
