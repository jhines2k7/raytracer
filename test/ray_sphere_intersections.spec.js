'use strict';

const expect = require('chai').expect;
const Point = require('../js/point');
const Vector = require('../js/vector');
const Ray = require('../js/ray');
const intersectionUtils = require('../js/utils/intersection_utils');
const position = intersectionUtils.position;
const Sphere = require('../js/sphere');

describe('Ray and sphere intersections', () => {
  it('creating and querying a ray', () => {
    let origin = new Point(1, 2, 3);
    let direction = new Vector(4, 5, 6);

    let ray = new Ray(origin, direction);

    expect(ray.origin.x).to.equal(1);
    expect(ray.origin.y).to.equal(2);
    expect(ray.origin.z).to.equal(3);

    expect(ray.direction.x).to.equal(4);
    expect(ray.direction.y).to.equal(5);
    expect(ray.direction.z).to.equal(6);
  });

  it('computing a point from a distance', () => {
    let ray = new Ray(new Point(2, 3, 4), new Vector(1, 0, 0));
    let p1 = position(ray, 0);

    expect(p1.x).to.equal(2);
    expect(p1.y).to.equal(3);
    expect(p1.z).to.equal(4);

    let p2 = position(ray, 1);
    expect(p2.x).to.equal(3);
    expect(p2.y).to.equal(3);
    expect(p2.z).to.equal(4);

    let p3 = position(ray, -1);
    expect(p3.x).to.equal(1);
    expect(p3.y).to.equal(3);
    expect(p3.z).to.equal(4);

    let p4 = position(ray, 2.5);
    expect(p4.x).to.equal(4.5);
    expect(p4.y).to.equal(3);
    expect(p4.z).to.equal(4);
  });

  it('a ray intersects a sphere at two points', () => {
    let ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));

    let sphere = new Sphere();

    let intersections = intersects(sphere, ray);

    expect(intersections.length).to.equal(2);
    expect(intersections[0]).to.equal(4);
    expect(intersections[1]).to.equal(6);

  });
});