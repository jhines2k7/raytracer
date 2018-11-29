'use strict';

const Color = require('./color');

module.exports = class Material {
  constructor(color = new Color(1, 1, 1), ambient = 0.1, diffuse = 0.9, specular = 0.9, shininess = 200) {
    this.color = color;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.shininess = shininess;
  }
};