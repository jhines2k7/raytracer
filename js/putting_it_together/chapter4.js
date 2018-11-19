'use strict';

const fs = require('fs');

const Point = require('../point');
const Color = require('../color');
const Canvas = require('../canvas');
const transformations = require('../utils/transformations');
const translation = transformations.translation;
const rotationZ = transformations.rotationZ;
const scaling = transformations.scaling;
const transform = transformations.transform;
const matrixMultiply = require('../utils/matrix_utils').matrixMultiply;

let canvas = new Canvas(900, 900, new Color(0, 0, 0));

/* 1 unit = 10 pixels, 90 units of world space from top to bottom and left
* to right, center @ (449, 449)
* draw points 50 pixels from top, bottom, left and right of canvas
* top(449, 50), bottom(449, 849), left(50, 449), right(849, 449),
*/

const ROTATIONS = [
  0,
  Math.PI/6,
  Math.PI/3,
  Math.PI/2,
  (2*Math.PI)/3,
  (5*Math.PI)/6,
  Math.PI,
  (7*Math.PI)/6,
  (4*Math.PI)/3,
  (3*Math.PI)/2,
  (5*Math.PI)/3,
  (11*Math.PI)/6,
];

const WHITE = new Color(1, 1, 1);
const GREEN = new Color(0, 1, 0);

for(let i = 0; i < ROTATIONS.length; i++) {
  // align our clock face along the y-axis (0, 1, 0)
  let point = new Point(0, 1, 0);

  // rotate
  let rotationMatrix = rotationZ(ROTATIONS[i]).matrix;

  // scale
  let scalingMatrix = scaling(canvas.width * 3/8, canvas.width * 3/8, 0).matrix;

  // translate
  let translationMatrix = translation(canvas.width / 2, canvas.height / 2, 0).matrix;

  // chain
  let chainedTransformations = matrixMultiply(matrixMultiply(translationMatrix, scalingMatrix), rotationMatrix);

  // transform
  let transformed = transform(chainedTransformations, point);

  let X = Math.abs(Math.ceil(transformed.x));
  let Y = Math.abs(Math.ceil(transformed.y));

  canvas.writePixel(X, Y, GREEN);
  canvas.writePixel(X - 1, Y, GREEN);
  canvas.writePixel(X + 1, Y, GREEN);
  canvas.writePixel(X, Y - 1, GREEN);
  canvas.writePixel(X, Y + 1, GREEN);
}

let FILE_PATH = './';
let FILE_NAME = 'clock.ppm';
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

