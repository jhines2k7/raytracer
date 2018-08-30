'use strict';

const expect = require('chai').expect;
const Simulator = require('../js/projectile/simulator');
const World = require('../js/projectile/world');
const Projectile = require('../js/projectile/projectile');
const Vector = require('../js/vector');
const Point = require('../js/point');
const normalize = require('../js/utils/normalize');

describe('Projectile simulator', () => {
  it('simulator tick function returns a projectile', () => {
    let gravity = new Vector(0, -0.1, 0);
    let wind = new Vector(-0.01, 0, 0);
    let world = new World(gravity, wind);

    let position = new Point(0, 1, 0);
    let velocity = normalize(new Vector(1, 1, 0));
    let projectile = new Projectile(position, velocity);

    let simulator = new Simulator();

    let simulatedProjectile = simulator.tick(world, projectile);

    expect(simulatedProjectile.constructor.name).to.equal('Projectile');
  });

  describe('given a world with gravity(0, -0.1, 0) and wind(-0.01, 0, 0)', () => {
    describe('and a projectile with position(0, 1, 0) and velocity(1, 1, 0)', () => {
      it('should return a projectile with position(1, 2, 0) and velocity(0.09, 0.9, 0) after one tick', () => {
        let gravity = new Vector(0, -0.1, 0);
        let wind = new Vector(-0.01, 0, 0);
        let world = new World(gravity, wind);

        let position = new Point(0, 1, 0);
        let velocity = normalize(new Vector(1, 1, 0));
        let projectile = new Projectile(position, velocity);

        let simulator = new Simulator();

        let simulatedProjectile = simulator.tick(world, projectile);

        expect(simulatedProjectile.position.x).to.equal(0.7071067811865475);
        expect(simulatedProjectile.position.y).to.equal(1.7071067811865475);
        expect(simulatedProjectile.position.z).to.equal(0);
        expect(simulatedProjectile.position.w).to.equal(1);

        expect(simulatedProjectile.velocity.x).to.equal(0.6971067811865475);
        expect(simulatedProjectile.velocity.y).to.equal(0.6071067811865475);
        expect(simulatedProjectile.velocity.z).to.equal(0);
        expect(simulatedProjectile.velocity.w).to.equal(0);
      })
    })
  })
});
