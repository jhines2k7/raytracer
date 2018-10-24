'use strict';

const expect = require('chai').expect;
const transformations = require('../js/utils/transformations');
const translation = transformations.translation;
const transform = transformations.transform;
const Point = require('../js/point');

it('multiplying by a translation matrix', () => {
  let translationMatrix = translation(5, -3, 2);
  let p = new Point(-3, 4, 5);
  let transformed = transform(translationMatrix, p);

  expect(transformed.x).to.equal(2);
  expect(transformed.y).to.equal(1);
  expect(transformed.z).to.equal(7);
});