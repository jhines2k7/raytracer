'use strict';

module.exports = class PointLight {
  constructor(position, intensity) {
    this.intensity = intensity;
    this.position = position;
  }
};