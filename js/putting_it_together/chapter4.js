'use strict';

const fs = require('fs');

const Point = require('../point');
const Color = require('../color');
const Canvas = require('../canvas');
const transformations = require('../utils/transformations');
const translation = transformations.translation;
const rotationZ = transformations.rotationZ;
const transform = transformations.transform;
const matrixMultiply = require('../utils/matrix_utils').matrixMultiply();

let canvas = new Canvas(900, 900, new Color(0, 0, 0));

/* 1 unit = 10 pixels, 90 units of world space from top to bottom and left
* to right, center @ (449, 449)
* draw points 50 pixels from top, bottom, left and right of canvas
* top(449, 50), bottom(449, 849), left(50, 449), right(849, 449),
*/

const NUM_POINTS = 4;
const WHITE = new Color(1, 1, 1);

for(let i = 0; i <= NUM_POINTS; i++) {
  // start at the middle of the canvas
  let point = new Point(canvas.width / 2, canvas.height / 2, 0);

  // translate
  let translationMatrix = translation(canvas.width - 50, 0, 0);

  // rotate
  let rotationMatrix = rotationZ(i * Math.PI);

  let chainedTransformations = matrixMultiply(rotationMatrix, translationMatrix);

  // transform
  let transformed = transform(chainedTransformations, point);

  canvas.writePixel(transformed.x, transformed.y, WHITE);
  canvas.writePixel(transformed.x - 1, transformed.y, WHITE);
  canvas.writePixel(transformed.x + 1, transformed.y, WHITE);
  canvas.writePixel(transformed.x, transformed.y - 1, WHITE);
  canvas.writePixel(transformed.x, transformed.y + 1, WHITE);
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

