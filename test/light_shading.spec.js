'use strict';

const expect = require('chai').expect;
const Sphere = require('../js/sphere');
const Point = require('../js/point');
const Vector = require('../js/vector');
const lightShadingUtils = require('../js/utils/light_shading_utils');
const normalAt = lightShadingUtils.normalAt;
const reflect = lightShadingUtils.reflect;
const lighting = lightShadingUtils.lighting;
const normalize = require('../js/utils/normalize');
const transformations = require('../js/utils/transformations');
const translation = transformations.translation;
const scaling = transformations.scaling;
const rotationZ = transformations.rotationZ;
const isEqual = require('../js/utils/is_equal');
const matrixMultiply = require('../js/utils/matrix_utils').matrixMultiply;
const matrixTypes = require('../js/utils/matrix_types');
const PointLight = require('../js/point_light');
const Color = require('../js/color');
const Material = require('../js/material');

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

    let normal = normalAt(sphere, new Point(0, 1.70711, -0.70711));

    expect(isEqual(normal.x, 0)).to.equal(true);
    expect(isEqual(normal.y, 0.70711)).to.equal(true);
    expect(isEqual(normal.z, -0.70711)).to.equal(true);
  });

  it('computing the normal on a transformed sphere', () => {
    let sphere = new Sphere();

    sphere.transformation = {
      matrix: matrixMultiply(scaling(1, 0.5, 1).matrix, rotationZ(Math.PI/5).matrix),
      matrixType: matrixTypes.MULTIPLE
    };

    let normal = normalAt(sphere, new Point(0, Math.sqrt(2)/2, (-1 * Math.sqrt(2))/2));

    expect(isEqual(normal.x, 0)).to.equal(true);
    expect(isEqual(normal.y, 0.97014)).to.equal(true);
    expect(isEqual(normal.z, -0.24254)).to.equal(true);
  });

  it('reflecting a vector approaching at 45 degrees', () => {
    let v = new Vector(1, -1, 0);
    let n = new Vector(0, 1, 0);

    let r = reflect(v, n);

    expect(r.x).to.equal(1);
    expect(r.y).to.equal(1);
    expect(r.z).to.equal(0);
  });

  it('reflecting a vector off a slanted surface', () => {
    let vector = new Vector(0, -1, 0);
    let normal = new Vector(Math.sqrt(2)/2, Math.sqrt(2)/2, 0);

    let r = reflect(vector, normal);

    expect(isEqual(r.x, 1)).to.equal(true);
    expect(isEqual(r.y, 0)).to.equal(true);
    expect(isEqual(r.z, 0)).to.equal(true);
  });

  it('a point light has position and intensity', () => {
    let intensity = new Color(1, 1, 1);
    let position = new Point(0, 0, 0);

    let light = new PointLight(intensity, position);

    expect(light.intensity.redValue).to.equal(255);
    expect(light.intensity.greenValue).to.equal(255);
    expect(light.intensity.blueValue).to.equal(255);

    expect(light.position.x).to.equal(0);
    expect(light.position.y).to.equal(0);
    expect(light.position.z).to.equal(0);
  });

  it('the default material', () => {
    let m = new Material();

    expect(m.color.redValue).to.equal(255);
    expect(m.color.greenValue).to.equal(255);
    expect(m.color.blueValue).to.equal(255);
    expect(m.ambient).to.equal(0.1);
    expect(m.diffuse).to.equal(0.9);
    expect(m.specular).to.equal(0.9);
    expect(m.shininess).to.equal(200);
  });

  it('a sphere has a default material', () => {
    let s = new Sphere();

    expect(JSON.stringify(s.material)).to.equal(JSON.stringify(new Material()));
  });

  it('a sphere may be assigned a material', () => {
    let s = new Sphere();

    let m = new Material();
    m.ambient = 1;

    s.material = m;

    expect(JSON.stringify(s.material)).to.equal(JSON.stringify(m));
  });
});

describe('Lighting: ', () => {
  let material = new Material();
  let position = new Point(0, 0, 0);

  it('lighting with the eye between the light and the surface', () => {
    let eyeVector = new Vector(0, 0, -1);
    let normalVector = new Vector(0, 0, -1);

    let pointLight = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1));

    let color = lighting(material, pointLight, position, eyeVector, normalVector);

    expect(color.red).to.equal(1.9);
    expect(color.green).to.equal(1.9);
    expect(color.blue).to.equal(1.9);
  });

  it('lighting with the eye between light and surface, eye offset 45 degrees', () => {
    let eyeVector = new Vector(0, Math.sqrt(2)/2, (-1*Math.sqrt(2))/2);
    let normalVector = new Vector(0, 0, -1);

    let pointLight = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1));

    let color = lighting(material, pointLight, position, eyeVector, normalVector);

    expect(color.red).to.equal(1.0);
    expect(color.green).to.equal(1.0);
    expect(color.blue).to.equal(1.0);
  });

  it('lighting with the eye opposite surface, light offset 45 degrees', () => {
    let eyeVector = new Vector(0, 0, -1);
    let normalVector = new Vector(0, 0, -1);

    let pointLight = new PointLight(new Point(0, 10, -10), new Color(1, 1, 1));

    let color = lighting(material, pointLight, position, eyeVector, normalVector);

    expect(isEqual(color.red), 0.7634).to.equal(true);
    expect(isEqual(color.green), 0.7634).to.equal(true);
    expect(isEqual(color.blue), 0.7634).to.equal(true);
  });

  it('lighting with the eye in the path of the reflection vector', () => {
    let eyeVector = new Vector(0, (-1*Math.sqrt(2))/2, (-1*Math.sqrt(2))/2);
    let normalVector = new Vector(0, 0, -1);

    let pointLight = new PointLight(new Point(0, 10, -10), new Color(1, 1, 1));

    let color = lighting(material, pointLight, position, eyeVector, normalVector);

    expect(isEqual(color.red), 1.6364).to.equal(true);
    expect(isEqual(color.green), 1.6364).to.equal(true);
    expect(isEqual(color.blue), 1.6364).to.equal(true);
  });

  it('lighting with the light behind the surface', () => {
    let eyeVector = new Vector(0, 0, -1);
    let normalVector = new Vector(0, 0, -1);

    let pointLight = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1));

    let color = lighting(material, pointLight, position, eyeVector, normalVector);

    expect(isEqual(color.red), 0.1).to.equal(true);
    expect(isEqual(color.green), 0.1).to.equal(true);
    expect(isEqual(color.blue), 0.1).to.equal(true);
  });
});