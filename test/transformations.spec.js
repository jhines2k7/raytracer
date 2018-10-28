'use strict';

const expect = require('chai').expect;
const transformations = require('../js/utils/transformations');
const translation = transformations.translation;
const transform = transformations.transform;
const scaling = transformations.scaling;
const rotationX = transformations.rotationX;
const rotationY = transformations.rotationY;
const rotationZ = transformations.rotationZ;
const shearing = transformations.shearing;
const inverse = require('../js/utils/matrix_utils').inverse;
const Point = require('../js/point');
const Vector = require('../js/vector');
const isEqual = require('../js/utils/is_equal');

describe('Matrix transformations', () => {
  it('multiplying by a translation matrix', () => {
    let translationMatrix = translation(5, -3, 2);
    let p = new Point(-3, 4, 5);
    let transformed = transform(translationMatrix, p);

    expect(transformed.x).to.equal(2);
    expect(transformed.y).to.equal(1);
    expect(transformed.z).to.equal(7);
  });

  it('multiplying by the inverse of a translation matrix', () => {
    let translationMatrix = translation(5, -3, 2);
    let translationInverse = inverse(translationMatrix);
    let p = new Point(-3, 4, 5);
    let transformed = transform(translationInverse, p);

    expect(transformed.x).to.equal(-8);
    expect(transformed.y).to.equal(7);
    expect(transformed.z).to.equal(3);
  });

  it('translation does not affect vectors', () => {
    let translationMatrix = translation(5, -3, 2);
    let p = new Vector(-3, 4, 5);
    let transformed = transform(translationMatrix, p);

    expect(transformed.x).to.equal(-3);
    expect(transformed.y).to.equal(4);
    expect(transformed.z).to.equal(5);
  });

  it('a scaling matrix applied to a point', () => {
    let scalingMatrix = scaling(2, 3, 4);
    let p = new Point(-4, 6, 8);
    let transformed = transform(scalingMatrix, p);

    expect(transformed.x).to.equal(-8);
    expect(transformed.y).to.equal(18);
    expect(transformed.z).to.equal(32);
  });

  it('a scaling matrix applied to a vector', () => {
    let scalingMatrix = scaling(2, 3, 4);
    let p = new Vector(-4, 6, 8);
    let transformed = transform(scalingMatrix, p);

    expect(transformed.x).to.equal(-8);
    expect(transformed.y).to.equal(18);
    expect(transformed.z).to.equal(32);
  });

  it('multiplying by the inverse of a scaling matrix', () => {
    let scalingMatrix = scaling(2, 3, 4);
    let invertedScaling = inverse(scalingMatrix);
    let p = new Point(-4, 6, 8);
    let transformed = transform(invertedScaling, p);

    expect(transformed.x).to.equal(-2);
    expect(transformed.y).to.equal(2);
    expect(transformed.z).to.equal(2);
  });

  it('reflection is scaling by a negative value', () => {
    let scalingMatrix = scaling(-1, 1, 1);
    let p = new Point(2, 3, 4);
    let transformed = transform(scalingMatrix, p);

    expect(transformed.x).to.equal(-2);
    expect(transformed.y).to.equal(3);
    expect(transformed.z).to.equal(4);
  });

  it('rotating a point around the x-axis', () => {
    let p = new Point(0, 1, 0);

    let halfQuarterMatrix = rotationX(Math.PI / 4);
    let fullQuarterMatrix = rotationX(Math.PI / 2);

    let rotatedHalfQuarter = transform(halfQuarterMatrix, p);
    let rotatedFullQuarter = transform(fullQuarterMatrix, p);

    expect(isEqual(rotatedHalfQuarter.x, 0)).to.equal(true);
    expect(isEqual(rotatedHalfQuarter.y, Math.sqrt(2) / 2)).to.equal(true);
    expect(isEqual(rotatedHalfQuarter.z, Math.sqrt(2) / 2)).to.equal(true);

    expect(isEqual(rotatedFullQuarter.x, 0)).to.equal(true);
    expect(isEqual(rotatedFullQuarter.y, 0)).to.equal(true);
    expect(isEqual(rotatedFullQuarter.z, 1)).to.equal(true);
  });

  it('inverse of an x-rotation rotates in the opposite direction', () => {
    let p = new Point(0, 1, 0);

    let halfQuarterMatrix = rotationX(Math.PI / 4);
    let halfQuarterInverse = inverse(halfQuarterMatrix);

    let rotatedHalfQuarterInverse = transform(halfQuarterInverse, p);

    expect(isEqual(rotatedHalfQuarterInverse.x, 0)).to.equal(true);
    expect(isEqual(rotatedHalfQuarterInverse.y, Math.sqrt(2) / 2)).to.equal(true);
    expect(isEqual(rotatedHalfQuarterInverse.z, (Math.sqrt(2) / 2) * -1)).to.equal(true);
  });

  it('rotating a point around the y-axis', () => {
    let p = new Point(0, 0, 1);

    let halfQuarterMatrix = rotationY(Math.PI / 4);
    let fullQuarterMatrix = rotationY(Math.PI / 2);

    let rotatedHalfQuarter = transform(halfQuarterMatrix, p);
    let rotatedFullQuarter = transform(fullQuarterMatrix, p);

    expect(isEqual(rotatedHalfQuarter.x, Math.sqrt(2) / 2)).to.equal(true);
    expect(isEqual(rotatedHalfQuarter.y, 0)).to.equal(true);
    expect(isEqual(rotatedHalfQuarter.z, Math.sqrt(2) / 2)).to.equal(true);

    expect(isEqual(rotatedFullQuarter.x, 1)).to.equal(true);
    expect(isEqual(rotatedFullQuarter.y, 0)).to.equal(true);
    expect(isEqual(rotatedFullQuarter.z, 0)).to.equal(true);
  });

  it('rotating a point around the z-axis', () => {
    let p = new Point(0, 1, 0);

    let halfQuarterMatrix = rotationZ(Math.PI / 4);
    let fullQuarterMatrix = rotationZ(Math.PI / 2);

    let rotatedHalfQuarter = transform(halfQuarterMatrix, p);
    let rotatedFullQuarter = transform(fullQuarterMatrix, p);

    expect(isEqual(rotatedHalfQuarter.x, -1 * (Math.sqrt(2)) / 2)).to.equal(true);
    expect(isEqual(rotatedHalfQuarter.y, Math.sqrt(2) / 2)).to.equal(true);
    expect(isEqual(rotatedHalfQuarter.z, 0)).to.equal(true);

    expect(isEqual(rotatedFullQuarter.x, -1)).to.equal(true);
    expect(isEqual(rotatedFullQuarter.y, 0)).to.equal(true);
    expect(isEqual(rotatedFullQuarter.z, 0)).to.equal(true);
  });

  it('shearing transformation moves x in proportion to y', () => {
    let proportions = {
      xy: 1,
      xz: 0,
      yx: 0,
      yz: 0,
      zx: 0,
      zy: 0
    };

    let shearingMatrix = shearing(proportions);

    let p = new Point(2, 3, 4);

    let shearedXInProportionToY = transform(shearingMatrix, p);

    expect(shearedXInProportionToY.x).to.equal(5);
    expect(shearedXInProportionToY.y).to.equal(3);
    expect(shearedXInProportionToY.z).to.equal(4);
  });

  it('shearing transformation moves x in proportion to z', () => {
    let proportions = {
      xy: 0,
      xz: 1,
      yx: 0,
      yz: 0,
      zx: 0,
      zy: 0
    };

    let shearingMatrix = shearing(proportions);

    let p = new Point(2, 3, 4);

    let shearedXInProportionToZ = transform(shearingMatrix, p);

    expect(shearedXInProportionToZ.x).to.equal(6);
    expect(shearedXInProportionToZ.y).to.equal(3);
    expect(shearedXInProportionToZ.z).to.equal(4);
  });

  it('shearing transformation moves y in proportion to x', () => {
    let proportions = {
      xy: 0,
      xz: 0,
      yx: 1,
      yz: 0,
      zx: 0,
      zy: 0
    };

    let shearingMatrix = shearing(proportions);

    let p = new Point(2, 3, 4);

    let shearedYInProportionToX = transform(shearingMatrix, p);

    expect(shearedYInProportionToX.x).to.equal(2);
    expect(shearedYInProportionToX.y).to.equal(5);
    expect(shearedYInProportionToX.z).to.equal(4);
  });

  it('shearing transformation moves y in proportion to z', () => {
    let proportions = {
      xy: 0,
      xz: 0,
      yx: 0,
      yz: 1,
      zx: 0,
      zy: 0
    };

    let shearingMatrix = shearing(proportions);

    let p = new Point(2, 3, 4);

    let shearedYInProportionToZ = transform(shearingMatrix, p);

    expect(shearedYInProportionToZ.x).to.equal(2);
    expect(shearedYInProportionToZ.y).to.equal(7);
    expect(shearedYInProportionToZ.z).to.equal(4);
  });

  it('shearing transformation moves z in proportion to x', () => {
    let proportions = {
      xy: 0,
      xz: 0,
      yx: 0,
      yz: 0,
      zx: 1,
      zy: 0
    };

    let shearingMatrix = shearing(proportions);

    let p = new Point(2, 3, 4);

    let shearedZInProportionToX = transform(shearingMatrix, p);

    expect(shearedZInProportionToX.x).to.equal(2);
    expect(shearedZInProportionToX.y).to.equal(3);
    expect(shearedZInProportionToX.z).to.equal(6);
  });

  it('shearing transformation moves z in proportion to y', () => {
    let proportions = {
      xy: 0,
      xz: 0,
      yx: 0,
      yz: 0,
      zx: 0,
      zy: 1
    };

    let shearingMatrix = shearing(proportions);

    let p = new Point(2, 3, 4);

    let shearedZInProportionToY = transform(shearingMatrix, p);

    expect(shearedZInProportionToY.x).to.equal(2);
    expect(shearedZInProportionToY.y).to.equal(3);
    expect(shearedZInProportionToY.z).to.equal(7);
  });
});
