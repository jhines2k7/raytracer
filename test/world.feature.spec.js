'use strict';

'use strict';

const expect = require('chai').expect;
const World = require('../js/world');
const PointLight = require('../js/point_light');
const Color = require('../js/color');
const Sphere = require('../js/sphere');
const Point = require('../js/point');
const scaling = require('../js/utils/transformations').scaling;
const Ray = require('../js/ray');
const Vector = require('../js/vector');
const intersectWorld = require('../js/utils/world_utils').intersectWorld;

describe('Building a world', () => {
  xit('creating a world', () => {
    let world = new World();

    expect(world.objects.length).to.equal(0);
    expect(world.light).to.equal(null);
  });

  it('the default world', () => {
    let light = new PointLight(new Point(-10, 10, -10), new Color(1, 1, 1));

    let s1 = new Sphere();
    s1.material.color = new Color(0.8, 1.0, 0.6);
    s1.material.diffuse = 0.7;
    s1.material.specular = 0.2;

    let s2 = new Sphere();
    s2.transformation = scaling(0.5, 0.5, 0.5);

    let world = new World();

    expect(JSON.stringify(world.light)).to.equal(JSON.stringify(light));
    expect(JSON.stringify(world.objects[0])).to.equal(JSON.stringify(s1));
    expect(JSON.stringify(world.objects[1])).to.equal(JSON.stringify(s2));
  });

  it('intersect the world with a ray', () => {
    let world = new World();

    let ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));

    let intersections = intersectWorld(world, ray);

    expect(intersections.length).to.equal(4);
    expect(intersections[0].timeValueOfIntersection).to.equal(4);
    expect(intersections[1].timeValueOfIntersection).to.equal(4.5);
    expect(intersections[2].timeValueOfIntersection).to.equal(5.5);
    expect(intersections[3].timeValueOfIntersection).to.equal(6);
  });
});