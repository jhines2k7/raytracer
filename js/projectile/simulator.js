'use strict';

const add = require('../utils/addition');

const Projectile = require('./projectile');

module.exports = class Simulator {
  tick(world, projectile) {
    let position = add(projectile.position, projectile.velocity);
    let velocity = add(add(projectile.velocity, world.gravity), world.wind);

    return new Projectile(position, velocity);
  }
};