'use strict';

const PointLight = require('./point_light');
const Point = require('./point');
const Sphere = require('./sphere');
const Color = require('./color');
const scaling = require('../js/utils/transformations').scaling;

module.exports = class World {
  constructor() {
    let sphereOne = new Sphere();
    sphereOne.material.color = new Color(0.8, 1.0, 0.6);
    sphereOne.material.diffuse = 0.7;
    sphereOne.material.specular = 0.2;

    let sphereTwo = new Sphere();
    sphereTwo.transformation = scaling(0.5, 0.5, 0.5);

    this.objects = [sphereOne, sphereTwo];
    this.light = new PointLight(new Point(-10, 10, -10), new Color(1, 1, 1));
  }
};