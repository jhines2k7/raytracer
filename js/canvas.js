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

  pixelAt(x, y) {
    return this.pixels[y][x];
  }

  canvasToPpm() {
    let header = `P3\n${this.width} ${this.height}\n255\n`;
    let ppmString = '';
    let pixelData = '';
    const MAX_LINE_LENGTH = 70;

    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        pixelData += `${this.pixels[j][i].redValue} ${this.pixels[j][i].greenValue} ${this.pixels[j][i].blueValue}`;

        if(j !== this.width - 1) pixelData += ' ';
      }

      ppmString += `${this.splitPixelData(pixelData, MAX_LINE_LENGTH)}\n`;

      pixelData = ''
    }

    return header + ppmString;
  }

  splitPixelData(pixelData, maxLineLength) {
    let splitPixelData = '';
    let pixelValues = '', charsProcessedSoFar = 0;

    if(pixelData.length > maxLineLength) {
      for(let i = 0; i < pixelData.length;) {
        pixelValues = '';

        while(pixelData.charAt(i) !== ' ' && i < pixelData.length) {
          pixelValues += pixelData.charAt(i);
          i++;
          charsProcessedSoFar++;
        }

        charsProcessedSoFar++;
        i++;

        if(charsProcessedSoFar > maxLineLength) {
          splitPixelData = splitPixelData.substring(0, splitPixelData.length - 1);
          splitPixelData += `\n${pixelValues}`;
          charsProcessedSoFar = 0;
        } else {
          splitPixelData += `${pixelValues}`;
        }

        if(i < pixelData.length) {
          splitPixelData += ' ';
        }
      }
    } else {
      return pixelData;
    }

    return splitPixelData;
  }
};
