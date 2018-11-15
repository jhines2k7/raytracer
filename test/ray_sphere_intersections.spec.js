'use strict';

const expect = require('chai').expect;
const Point = require('../js/point');
const Vector = require('../js/vector');
const Ray = require('../js/ray');
const intersectionUtils = require('../js/utils/intersection_utils');
const position = intersectionUtils.position;
const intersect = intersectionUtils.intersect;
const intersections = intersectionUtils.intersections;
const hit = intersectionUtils.hit;
const transformRay = intersectionUtils.transformRay;
const Sphere = require('../js/sphere');
const Intersection = require('../js/intersection');
const transformationUtils = require('../js/utils/transformations');
const translation = transformationUtils.translation;
const scaling = transformationUtils.scaling;

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

    let intersections = intersect(sphere, ray);

    expect(intersections.length).to.equal(2);
    expect(intersections[0].timeValueOfIntersection).to.equal(4);
    expect(intersections[1].timeValueOfIntersection).to.equal(6);
  });

  it('a ray intersects a sphere at a tangent', () => {
    let ray = new Ray(new Point(0, 1, -5), new Vector(0, 0, 1));

    let sphere = new Sphere();

    let intersections = intersect(sphere, ray);

    expect(intersections.length).to.equal(2);
    expect(intersections[0].timeValueOfIntersection).to.equal(5);
    expect(intersections[1].timeValueOfIntersection).to.equal(5);
  });

  it('a ray misses a sphere', () => {
    let ray = new Ray(new Point(0, 2, -5), new Vector(0, 0, 1));

    let sphere = new Sphere();

    let intersections = intersect(sphere, ray);

    expect(intersections.length).to.equal(0);
  });

  it('a ray originates inside a sphere', () => {
    let ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1));

    let sphere = new Sphere();

    let intersections = intersect(sphere, ray);

    expect(intersections.length).to.equal(2);
    expect(intersections[0].timeValueOfIntersection).to.equal(-1);
    expect(intersections[1].timeValueOfIntersection).to.equal(1);
  });

  it('a sphere is behind a ray', () => {
    let ray = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1));

    let sphere = new Sphere();

    let intersections = intersect(sphere, ray);

    expect(intersections.length).to.equal(2);
    expect(intersections[0].timeValueOfIntersection).to.equal(-6);
    expect(intersections[1].timeValueOfIntersection).to.equal(-4);
  });

  it('an intersection encapsulates t and object', () => {
    let sphere = new Sphere();

    let intersection = new Intersection(3.5, sphere);

    expect(intersection.timeValueOfIntersection).to.equal(3.5);
    expect(intersection.intersectedObject.constructor.name).to.equal('Sphere');
  });

  it('aggregating intersections', () => {
    let sphere = new Sphere();
    let i1 = new Intersection(1, sphere);
    let i2 = new Intersection(2, sphere);

    let xs = intersections(i1, i2);

    expect(xs.length).to.equal(2);
    expect(xs[0].timeValueOfIntersection).to.equal(1);
    expect(xs[1].timeValueOfIntersection).to.equal(2);
  });

  it('intersect sets the object on the intersection', () => {
    let r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
    let s = new Sphere();

    let xs = intersect(s, r);

    expect(xs.length).to.equal(2);
    expect(xs[0].intersectedObject.constructor.name).to.equal('Sphere');
    expect(xs[1].intersectedObject.constructor.name).to.equal('Sphere');
  });

  it('the hit, when all intersections have positive timeValueOfIntersection', () => {
    let s = new Sphere();
    let i1 = new Intersection(1, s);
    let i2 = new Intersection(2, s);

    let xs = intersections(i1, i2);

    let h = hit(xs);

    expect(h.timeValueOfIntersection).to.equal(1);
  });

  it('the hit, when some intersections have negative timeValueOfIntersection', () => {
    let s = new Sphere();
    let i1 = new Intersection(-1, s);
    let i2 = new Intersection(2, s);

    let xs = intersections(i1, i2);

    let h = hit(xs);

    expect(h.timeValueOfIntersection).to.equal(2);
  });

  it('the hit, when all intersections have negative timeValueOfIntersection', () => {
    let s = new Sphere();
    let i1 = new Intersection(-2, s);
    let i2 = new Intersection(-1, s);

    let xs = intersections(i1, i2);

    let h = hit(xs);

    expect(h).to.equal(null);
  });

  it('the hit, is always the lowest non-negative intersection', () => {
    let s = new Sphere();
    let i1 = new Intersection(5, s);
    let i2 = new Intersection(7, s);
    let i3 = new Intersection(-3, s);
    let i4 = new Intersection(2, s);

    let xs = intersections(i1, i2, i3, i4);

    let h = hit(xs);

    expect(h.timeValueOfIntersection).to.equal(2);
  });

  it('translating a ray', () => {
    let r = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0));

    let translationMatrix = translation(3, 4, 5);

    let r2 = transformRay(r, translationMatrix, 'translation');

    expect(r2.origin.x).to.equal(4);
    expect(r2.origin.y).to.equal(6);
    expect(r2.origin.z).to.equal(8);

    expect(r2.direction.x).to.equal(0);
    expect(r2.direction.y).to.equal(1);
    expect(r2.direction.z).to.equal(0);
  });

  it('scaling a ray', () => {
    let r = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0));

    let scalingMatrix = scaling(2, 3, 4);

    let r2 = transformRay(r, scalingMatrix, 'scaling');

    expect(r2.origin.x).to.equal(2);
    expect(r2.origin.y).to.equal(6);
    expect(r2.origin.z).to.equal(12);

    expect(r2.direction.x).to.equal(0);
    expect(r2.direction.y).to.equal(3);
    expect(r2.direction.z).to.equal(0);
  });
});