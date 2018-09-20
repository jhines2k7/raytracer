'use strict';

const fs = require('fs');

const normalize = require('../utils/normalize');

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
let velocity = normalize(new Vector(1, 1.8, 0)) * 11.25;
let projectile = new Projectile(start, velocity);

let simulator = new Simulator();

let canvas = new Canvas(900, 550, new Color(0, 0, 0));

let simulatedProjectile = simulator.tick(world, projectile);

while(simulatedProjectile.position.y >= 0) {
  simulatedProjectile = simulator.tick(world, simulatedProjectile);
}

let FILE_PATH = './';
let FILE_NAME = 'projectile.ppm';

fs.unlink(FILE_PATH + FILE_NAME, (err) => {
  if(err) throw err;

  console.log('ppm file was deleted');
});

fs.writeFile(FILE_PATH + FILE_NAME, canvas.canvasToPpm(), (err) => {
  if(err) {
    return console.log(err);
  }

  console.log('ppm file was saved successfully!');
});