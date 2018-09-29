'use strict';

const expect = require('chai').expect;
const matrixUtils = require('../js/utils/matrix_utils');
const createMatrix = matrixUtils.createMatrix;
const matrixMultiply = matrixUtils.matrixMultiply;
const matrixMultiplySpecial = matrixUtils.matrixMultiplySpecial;
const identityMatrix = matrixUtils.identityMatrix;
const transpose = matrixUtils.transpose;

describe("matrix utility functions", () => {
  it("createMatrix should accept a width and height parameters of 4 and return a 4 x 4 matrix", () => {
    let matrix = createMatrix(4, 4);

    expect(matrix.length).to.equal(4);
    expect(matrix[0].length).to.equal(4);
  });

  it("createMatrix should accept a width and height parameters of 3 and return a 3 x 3 matrix", () => {
    let matrix = createMatrix(3, 3);

    expect(matrix.length).to.equal(3);
    expect(matrix[0].length).to.equal(3);
  });

  it("createMatrix creates a 4 x 4 matrix and we can get and set matrix values", () => {
    let matrix = createMatrix(4, 4);

    matrix[0][0] = 1;
    matrix[0][1] = 2;
    matrix[0][2] = 3;
    matrix[0][3] = 4;
    matrix[1][0] = 5.5;
    matrix[1][1] = 6.5;
    matrix[1][2] = 7.5;
    matrix[1][3] = 8.5;
    matrix[2][0] = 9;
    matrix[2][1] = 10;
    matrix[2][2] = 11;
    matrix[2][3] = 12;
    matrix[3][0] = 13.5;
    matrix[3][1] = 14.5;
    matrix[3][2] = 15.5;
    matrix[3][3] = 16.5;

    expect(matrix[0][0]).to.equal(1);
    expect(matrix[0][3]).to.equal(4);
    expect(matrix[1][0]).to.equal(5.5);
    expect(matrix[1][2]).to.equal(7.5);
    expect(matrix[2][2]).to.equal(11);
    expect(matrix[3][0]).to.equal(13.5);
    expect(matrix[3][2]).to.equal(15.5);
  });

  it("multiplyMatrix accepts two 4 x 4 matrices and returns a 4 x 4 matrix", () => {
    let matrixA = createMatrix(4, 4);
    let matrixB = createMatrix(4, 4);

    matrixA[0][0] = 1;
    matrixA[0][1] = 2;
    matrixA[0][2] = 3;
    matrixA[0][3] = 4;
    matrixA[1][0] = 2;
    matrixA[1][1] = 3;
    matrixA[1][2] = 4;
    matrixA[1][3] = 5;
    matrixA[2][0] = 3;
    matrixA[2][1] = 4;
    matrixA[2][2] = 5;
    matrixA[2][3] = 6;
    matrixA[3][0] = 4;
    matrixA[3][1] = 5;
    matrixA[3][2] = 6;
    matrixA[3][3] = 7;

    matrixB[0][0] = 0;
    matrixB[0][1] = 1;
    matrixB[0][2] = 2;
    matrixB[0][3] = 4;
    matrixB[1][0] = 1;
    matrixB[1][1] = 2;
    matrixB[1][2] = 4;
    matrixB[1][3] = 8;
    matrixB[2][0] = 2;
    matrixB[2][1] = 4;
    matrixB[2][2] = 8;
    matrixB[2][3] = 16;
    matrixB[3][0] = 4;
    matrixB[3][1] = 8;
    matrixB[3][2] = 16;
    matrixB[3][3] = 32;

    let matrix = matrixMultiply(matrixA, matrixB);

    expect(matrix.length).to.equal(4);
    expect(matrix[0].length).to.equal(4);
  });

  it("multiplyMatrix accepts two 4 x 4 matrices and returns a 4 x 4 matrix", () => {
    let matrixA = createMatrix(4, 4);
    let matrixB = createMatrix(4, 4);

    matrixA[0][0] = 1;
    matrixA[0][1] = 2;
    matrixA[0][2] = 3;
    matrixA[0][3] = 4;
    matrixA[1][0] = 2;
    matrixA[1][1] = 3;
    matrixA[1][2] = 4;
    matrixA[1][3] = 5;
    matrixA[2][0] = 3;
    matrixA[2][1] = 4;
    matrixA[2][2] = 5;
    matrixA[2][3] = 6;
    matrixA[3][0] = 4;
    matrixA[3][1] = 5;
    matrixA[3][2] = 6;
    matrixA[3][3] = 7;

    matrixB[0][0] = 0;
    matrixB[0][1] = 1;
    matrixB[0][2] = 2;
    matrixB[0][3] = 4;
    matrixB[1][0] = 1;
    matrixB[1][1] = 2;
    matrixB[1][2] = 4;
    matrixB[1][3] = 8;
    matrixB[2][0] = 2;
    matrixB[2][1] = 4;
    matrixB[2][2] = 8;
    matrixB[2][3] = 16;
    matrixB[3][0] = 4;
    matrixB[3][1] = 8;
    matrixB[3][2] = 16;
    matrixB[3][3] = 32;

    let matrix = matrixMultiply(matrixA, matrixB);

    expect(matrix[0][0]).to.equal(24);
    expect(matrix[0][1]).to.equal(49);
    expect(matrix[0][2]).to.equal(98);
    expect(matrix[0][3]).to.equal(196);
    expect(matrix[1][0]).to.equal(31);
    expect(matrix[1][1]).to.equal(64);
    expect(matrix[1][2]).to.equal(128);
    expect(matrix[1][3]).to.equal(256);
    expect(matrix[2][0]).to.equal(38);
    expect(matrix[2][1]).to.equal(79);
    expect(matrix[2][2]).to.equal(158);
    expect(matrix[2][3]).to.equal(316);
    expect(matrix[3][0]).to.equal(45);
    expect(matrix[3][1]).to.equal(94);
    expect(matrix[3][2]).to.equal(188);
    expect(matrix[3][3]).to.equal(376);
  });

  it("matrixMultiplySpecial accepts an array and a 4 x 4 matrix and returns an array of length 4", () => {
    let fourByFourMatrix = createMatrix(4, 4);

    let matrix = matrixMultiplySpecial(new Array(4), fourByFourMatrix);

    expect(matrix.length = 4)
  });

  it("matrixMultiplySpecial accepts an array and a 4 x 4 matrix and returns an array of length 4", () => {
    let fourByFourMatrix = createMatrix(4, 4);

    fourByFourMatrix[0][0] = 1;
    fourByFourMatrix[0][1] = 2;
    fourByFourMatrix[0][2] = 3;
    fourByFourMatrix[0][3] = 4;
    fourByFourMatrix[1][0] = 2;
    fourByFourMatrix[1][1] = 4;
    fourByFourMatrix[1][2] = 4;
    fourByFourMatrix[1][3] = 2;
    fourByFourMatrix[2][0] = 8;
    fourByFourMatrix[2][1] = 6;
    fourByFourMatrix[2][2] = 4;
    fourByFourMatrix[2][3] = 1;
    fourByFourMatrix[3][0] = 0;
    fourByFourMatrix[3][1] = 0;
    fourByFourMatrix[3][2] = 0;
    fourByFourMatrix[3][3] = 1;

    let matrix = matrixMultiplySpecial([1, 2, 3, 1], fourByFourMatrix);

    expect(matrix[0]).to.equal(18);
    expect(matrix[1]).to.equal(24);
    expect(matrix[2]).to.equal(33);
    expect(matrix[3]).to.equal(1);
  });

  it('multiply a matrix by the identity', () => {
    let fourByFourMatrix = createMatrix(4, 4);

    fourByFourMatrix[0][0] = 0;
    fourByFourMatrix[0][1] = 1;
    fourByFourMatrix[0][2] = 2;
    fourByFourMatrix[0][3] = 4;
    fourByFourMatrix[1][0] = 1;
    fourByFourMatrix[1][1] = 2;
    fourByFourMatrix[1][2] = 4;
    fourByFourMatrix[1][3] = 8;
    fourByFourMatrix[2][0] = 2;
    fourByFourMatrix[2][1] = 4;
    fourByFourMatrix[2][2] = 8;
    fourByFourMatrix[2][3] = 16;
    fourByFourMatrix[3][0] = 4;
    fourByFourMatrix[3][1] = 8;
    fourByFourMatrix[3][2] = 16;
    fourByFourMatrix[3][3] = 32;

    let productOfIdentityMatrixMultiplication = matrixMultiply(fourByFourMatrix, identityMatrix);

    expect(fourByFourMatrix).deep.equal(productOfIdentityMatrixMultiplication);
  });

  it('should transpose a matrix', () => {
    let matrixA = createMatrix(4, 4);
    matrixA[0][0] = 0;
    matrixA[0][1] = 9;
    matrixA[0][2] = 3;
    matrixA[0][3] = 0;
    matrixA[1][0] = 9;
    matrixA[1][1] = 8;
    matrixA[1][2] = 0;
    matrixA[1][3] = 8;
    matrixA[2][0] = 1;
    matrixA[2][1] = 8;
    matrixA[2][2] = 5;
    matrixA[2][3] = 3;
    matrixA[3][0] = 0;
    matrixA[3][1] = 0;
    matrixA[3][2] = 5;
    matrixA[3][3] = 8;

    let matrixATransposed = createMatrix(4, 4);
    matrixATransposed[0][0] = 0;
    matrixATransposed[0][1] = 9;
    matrixATransposed[0][2] = 1;
    matrixATransposed[0][3] = 0;
    matrixATransposed[1][0] = 9;
    matrixATransposed[1][1] = 8;
    matrixATransposed[1][2] = 8;
    matrixATransposed[1][3] = 0;
    matrixATransposed[2][0] = 3;
    matrixATransposed[2][1] = 0;
    matrixATransposed[2][2] = 5;
    matrixATransposed[2][3] = 5;
    matrixATransposed[3][0] = 0;
    matrixATransposed[3][1] = 8;
    matrixATransposed[3][2] = 3;
    matrixATransposed[3][3] = 8;

    let transposed = transpose(matrixA);

    expect(transposed[0][0]).to.equal(matrixATransposed[0][0]);
    expect(transposed[0][1]).to.equal(matrixATransposed[0][1]);
    expect(transposed[0][2]).to.equal(matrixATransposed[0][2]);
    expect(transposed[0][3]).to.equal(matrixATransposed[0][3]);
    expect(transposed[1][0]).to.equal(matrixATransposed[1][0]);
    expect(transposed[1][1]).to.equal(matrixATransposed[1][1]);
    expect(transposed[1][2]).to.equal(matrixATransposed[1][2]);
    expect(transposed[1][3]).to.equal(matrixATransposed[1][3]);
    expect(transposed[2][0]).to.equal(matrixATransposed[2][0]);
    expect(transposed[2][1]).to.equal(matrixATransposed[2][1]);
    expect(transposed[2][2]).to.equal(matrixATransposed[2][2]);
    expect(transposed[2][3]).to.equal(matrixATransposed[2][3]);
    expect(transposed[3][0]).to.equal(matrixATransposed[3][0]);
    expect(transposed[3][1]).to.equal(matrixATransposed[3][1]);
    expect(transposed[3][2]).to.equal(matrixATransposed[3][2]);
    expect(transposed[3][3]).to.equal(matrixATransposed[3][3]);
  });
});