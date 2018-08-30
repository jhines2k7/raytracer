'use strict';

const normalize = require('../utils/normalize');

const Simulator = require('./simulator');
const World = require('./world');
const Projectile = require('./projectile');
const Vector = require('../vector');
const Point = require('../point');

let gravity = new Vector(0, -0.1, 0);
let wind = new Vector(-0.01, 0, 0);
let world = new World(gravity, wind);

let position = new Point(0, 1, 0);
let velocity = normalize(new Vector(1, 1, 0));
let projectile = new Projectile(position, velocity);

let simulator = new Simulator();

let simulatedProjectile = simulator.tick(world, projectile);

let numTicks = 0;

while(simulatedProjectile.position.y >= 0) {
  console.log(`Projectile position: ${JSON.stringify(simulatedProjectile.position)}`);
  simulatedProjectile = simulator.tick(world, simulatedProjectile);

  numTicks++;
}

console.log(`\nProjectile simulator complete in ${numTicks} ticks`);