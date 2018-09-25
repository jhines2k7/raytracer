'use strict';

const expect = require('chai').expect;
const createMatrix = require('../js/utils/matrix_utils').createMatrix;
const matrixMultiply = require('../js/utils/matrix_utils').matrixMultiply;

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
});