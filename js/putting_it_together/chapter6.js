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
const position = intersectionUtils.position;
const PointLight = require('../point_light');
const lightShadingUtils = require('../utils/light_shading_utils');
const normalAt = lightShadingUtils.normalAt;
const lighting = lightShadingUtils.lighting;
const negate = require('../utils/negate');

let rayOrigin = new Point(0, 0, -5);
let wallZ = 10;
let wallSize = 7;
let canvasPixels = 1500;
let pixelSize = wallSize / canvasPixels;
let half = wallSize / 2;
let canvas = new Canvas(canvasPixels, canvasPixels, new Color(0, 0, 0));
let sphere = new Sphere();
sphere.material.color = new Color(0, 0, 1);
sphere.material.shininess = 50;

let pointLight = new PointLight(new Point(-10, 10, -10), new Color(1, 1, 1));

// cast a ray at each pixel on the canvas
for(let y = 0; y < canvasPixels; y++) {
  // compute the world y coordinate (top = +half, bottom = -half)
  let worldY = half - pixelSize * y;

  for(let x = 0; x < canvasPixels; x++) {
    // compute the world x coordinate (left = -half, right = half)
    let worldX = (half * -1) + pixelSize * x;

    // describe the point on the wall the ray will target
    let pointOnWall = new Point(worldX, worldY, wallZ);

    let ray = new Ray(rayOrigin, normalize(subtract(pointOnWall, rayOrigin)));

    let intersections = intersect(sphere, ray);

    if(hit(intersections)) {
      let intersection = hit(intersections);

      let point = position(ray, intersection.timeValueOfIntersection);
      let normal = normalAt(intersection.intersectedObject, point);
      let eyeVector = negate(ray.direction);

      let color = lighting(intersection.intersectedObject.material, pointLight, point, eyeVector, normal);

      canvas.writePixel(x, y, color);
    }
  }
}

let FILE_PATH = './';
let FILE_NAME = 'raytraced_sphere.ppm';
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