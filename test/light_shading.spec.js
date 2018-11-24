'use strict';

const expect = require('chai').expect;
const Sphere = require('../js/sphere');
const Point = require('../js/point');
const Vector = require('../js/vector');
const lightShadingUtils = require('../js/utils/light_shading_utils');
const normalAt = lightShadingUtils.normalAt;
const normalize = require('../js/utils/normalize');
const transformations = require('../js/utils/transformations');
const translation = transformations.translation;

describe('Light and Shading', () => {
  it('the normal on a sphere at a point on the x-axis', () => {
    let sphere = new Sphere();

    let normal = normalAt(sphere, new Point(1, 0, 0));

    expect(normal.x).to.equal(1);
    expect(normal.y).to.equal(0);
    expect(normal.z).to.equal(0);
  });

  it('the normal on a sphere at a point on the y-axis', () => {
    let sphere = new Sphere();

    let normal = normalAt(sphere, new Point(0, 1, 0));

    expect(normal.x).to.equal(0);
    expect(normal.y).to.equal(1);
    expect(normal.z).to.equal(0);
  });

  it('the normal on a sphere at a point on the z-axis', () => {
    let sphere = new Sphere();

    let normal = normalAt(sphere, new Point(0, 0, 1));

    expect(normal.x).to.equal(0);
    expect(normal.y).to.equal(0);
    expect(normal.z).to.equal(1);
  });

  it('the normal on a sphere at a non-axial point', () => {
    let sphere = new Sphere();

    let normal = normalAt(sphere, new Point(Math.sqrt(3)/3, Math.sqrt(3)/3, Math.sqrt(3)/3));

    expect(normal.x).to.equal(Math.sqrt(3)/3);
    expect(normal.y).to.equal(Math.sqrt(3)/3);
    expect(normal.z).to.equal(Math.sqrt(3)/3);
  });

  it('the normal is a normalized vector', () => {
    let sphere = new Sphere();

    let normal = normalAt(sphere, new Point(Math.sqrt(3)/3, Math.sqrt(3)/3, Math.sqrt(3)/3));

    let normalizedVector = normalize(new Vector(Math.sqrt(3)/3, Math.sqrt(3)/3, Math.sqrt(3)/3));

    expect(normal.x).to.equal(normalizedVector.x);
    expect(normal.y).to.equal(normalizedVector.y);
    expect(normal.z).to.equal(normalizedVector.z);
  });

  it('computing the normal on a translated sphere', () => {
    let sphere = new Sphere();

    sphere.transformation = translation(0, 1, 0);

    //let normal = normalAt
  });
});