'use strict';

const matrixUtils = require('../utils/matrix_utils');
const inverse = matrixUtils.inverse;
const identityMatrix = matrixUtils.identityMatrix;

let invertedIdentityMatrix = inverse(identityMatrix);
