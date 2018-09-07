'use strict';

module.exports = class Color {
  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;

    if(this.red < 0) {
      this.redValue = 0;
    } else {
      this.redValue = this.red >= 1 ? 255 : Math.ceil(this.red * 255);
    }

    if(this.green < 0) {
      this.greenValue = 0;
    } else {
      this.greenValue = this.green >= 1 ? 255 : Math.ceil(this.green * 255);
    }

    if(this.blue < 0) {
      this.blueValue = 0;
    } else {
      this.blueValue = this.blue >= 1 ? 255 :  Math.ceil(this.blue * 255);
    }
  }
};