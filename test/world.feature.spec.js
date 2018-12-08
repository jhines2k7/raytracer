'use strict';

'use strict';

const expect = require('chai').expect;
const World = require('../js/world');
const PointLight = require('../js/point_light');
const Color = require('../js/color');
const Sphere = require('../js/sphere');
const Point = require('../js/point');
const scaling = require('../js/utils/transformations').scaling;

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
});