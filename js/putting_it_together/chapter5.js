'use strict';

const fs = require('fs');

const Point = require('../point');
const Vector = require('../vector');
const Color = require('../color');
const Canvas = require('../canvas');
const Sphere = require('../sphere');
const Ray = require('../ray');
const transformations = require('../utils/transformations');
const translation = transformations.translation;
const rotationZ = transformations.rotationZ;
const scaling = transformations.scaling;
const transform = transformations.transform;
const matrixMultiply = require('../utils/matrix_utils').matrixMultiply;

let canvas = new Canvas(900, 900, new Color(0, 0, 0));
let sphere = new Sphere();
sphere.transform = scaling(2, 2, 2);

const RED = new Color(1, 0, 0);

// cast a ray at each pixel on the canvas
for(let row = 0; row < canvas.width; row++) {
  for(let column = 0; column < canvas.height; column++) {
    let ray = new Ray(new Point(row, column, 0), new Vector(0, 0, 1));
  }
}

let FILE_PATH = './';
let FILE_NAME = 'rays_cast_at_sphere.ppm';
let FILE = FILE_PATH + FILE_NAME;

if(fs.existsSync(FILE)) {
  fs.unlink(FILE, (err) => {
    if(err) throw err;

    console.log('ppm file was deleted');
  });
}

fs.writeFile(FILE, canvas.canvasToPpm(), (err) => {
  if(err) {
    return console.log(err);
  }

  console.log('ppm file was created and saved successfully!');
});