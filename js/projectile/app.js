'use strict';

const fs = require('fs');

const normalize = require('../utils/normalize');
const multiplyByScalar = require('../utils/scalar_multiplication');

const Simulator = require('./simulator');
const World = require('./world');
const Projectile = require('./projectile');
const Vector = require('../vector');
const Point = require('../point');
const Canvas = require('../canvas');
const Color = require('../color');

let gravity = new Vector(0, -0.1, 0);
let wind = new Vector(-0.01, 0, 0);
let world = new World(gravity, wind);

let start = new Point(0, 1, 0);
let velocity = multiplyByScalar(11.25, normalize(new Vector(1, 1.8, 0)));
let projectile = new Projectile(start, velocity);

let simulator = new Simulator();

let canvas = new Canvas(900, 550, new Color(0, 0, 0));

let simulatedProjectile = simulator.tick(world, projectile);

const GREEN = new Color(0, 1, 0);
const RED = new Color(1, 0, 0);
const BLUE = new Color(0, 0, 1);

let canvasX = 0, canvasY = 0;

while(simulatedProjectile.position.y >= 0) {
  simulatedProjectile = simulator.tick(world, simulatedProjectile);

  console.log(JSON.stringify(simulatedProjectile));

  canvasX = Math.ceil(simulatedProjectile.position.x);
  canvasY = canvas.height - Math.ceil(simulatedProjectile.position.y);

  canvas.writePixel(canvasX, canvasY, BLUE);
  canvas.writePixel(canvasX - 1, canvasY, BLUE);
  canvas.writePixel(canvasX + 1, canvasY, BLUE);
  canvas.writePixel(canvasX, canvasY - 1, BLUE);
  canvas.writePixel(canvasX, canvasY + 1, BLUE);
}

let FILE_PATH = './';
let FILE_NAME = 'projectile.ppm';
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