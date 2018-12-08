'use strict';

const fs = require('fs');

const Point = require('../point');
const Color = require('../color');
const Canvas = require('../canvas');
const Sphere = require('../sphere');
const Ray = require('../ray');
const normalize = require('../utils/normalize');
const subtract = require('../utils/subtraction');
const intersectionUtils = require('../utils/intersection_utils');
const intersect = intersectionUtils.intersect;
const hit = intersectionUtils.hit;

let rayOrigin = new Point(0, 0, -5);
let wallZ = 10;
let wallSize = 7;
let canvasPixels = 500;
let pixelSize = wallSize / canvasPixels;
let half = wallSize / 2;
let canvas = new Canvas(canvasPixels, canvasPixels, new Color(0, 0, 0));
let sphere = new Sphere();

const RED = new Color(1, 0, 0);

// cast a ray at each pixel on the canvas
for(let y = 0; y < canvasPixels; y++) {
  // compute the world y coordinate (top = +half, bottom = -half)
  let worldY = half - pixelSize * y;

  for(let x = 0; x < canvasPixels; x++) {
    // compute the world x coordinate (left = -half, right = half)
    let worldX = (half * -1) + pixelSize * x;

    // describe the point on the wall the ray will target
    let position = new Point(worldX, worldY, wallZ);

    let ray = new Ray(rayOrigin, normalize(subtract(position, rayOrigin)));

    let intersections = intersect(sphere, ray);

    if(hit(intersections)) {
      canvas.writePixel(x, y, RED);
    }
  }
}

let FILE_PATH = './';
let FILE_NAME = 'shadow.ppm';
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