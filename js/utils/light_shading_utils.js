'use strict';
const Point = require('../point');
const Vector = require('../vector');
const normalize = require('../utils/normalize');
const subtract = require('../utils/subtraction');
const inverse = require('../utils/matrix_utils').inverse;
const multiply = require('../utils/matrix_utils').matrixVectorMultiply;
const transpose = require('../utils/matrix_utils').transpose;
const dot = require('../utils/dot_product');
const scalarMultiplication = require('../utils/scalar_multiplication');
const Color = require('../color');
const colorUtils = require('../utils/color_utils');
const hadamardProduct = colorUtils.hadamardProduct;
const multiplyByScalar = colorUtils.multiplyByScalar;
const addColors = colorUtils.addColors;
const negate = require('../utils/negate');

function normalAt(sphere, worldPoint) {
  let worldPointVector = [worldPoint.x, worldPoint.y, worldPoint.z, 1];
  let objectPoint = multiply(worldPointVector, inverse(sphere.transformation.matrix));

  let objectNormal = subtract(new Point(objectPoint[0], objectPoint[1], objectPoint[2]), new Point(0, 0, 0));

  let objectNormalVector = [objectNormal.x, objectNormal.y, objectNormal.z, 1];
  let worldNormal = multiply(objectNormalVector, transpose(inverse(sphere.transformation.matrix)));

  let resultVector = new Vector(worldNormal[0], worldNormal[1], worldNormal[2]);
  resultVector.w = 0;

  return normalize(resultVector);
}

function reflect(vector, normal) {
  let dotProduct = dot(vector, normal) * 2;

  let scaledNormalDotProduct = scalarMultiplication(dotProduct, normal);

  return subtract(vector, scaledNormalDotProduct);
}

function lighting(material, light, position, eyeVector, normalVector) {
  // combine the surface color with the light's color/intensity
  let effectiveColor = hadamardProduct(material.color, light.intensity);

  // find the direction to the light source
  let lightVector = normalize(subtract(light.position, position));

  // compute the ambient contribution
  let ambient = hadamardProduct(effectiveColor, material.ambient);

  // light_dot_normal represents the cosine of the angle between the
  // light vector and the normal vector. A negative number means the
  // light is on the other side of the surface
  let lightDotNormal = dot(lightVector, normalVector);

  let diffuse, specular;
  const BLACK = new Color(0, 0, 0);

  if(lightDotNormal < 0) {
    diffuse = BLACK;
    specular = BLACK;
  } else {
    //compute the diffuse contribution
    diffuse = hadamardProduct(effectiveColor, hadamardProduct(material.diffuse, lightDotNormal));

    // reflect_dot_eye represents the cosine of the angle between the
    // reflection vector and the eye vector. A negative number means the
    // light reflects away from the eye.
    let reflectVector = reflect(negate(lightVector), normalVector);

    let reflectDotEye = dot(reflectVector, eyeVector);

    if(reflectDotEye <= 0) {
      specular = BLACK;
    } else {
      let factor = Math.pow(reflectDotEye, material.shininess);

      specular = multiplyByScalar(multiplyByScalar(light.intensity, material.specular), factor);
    }
  }

  return addColors(addColors(ambient, diffuse), specular);
}

module.exports = {
  normalAt,
  reflect,
  lighting
};