'use strict';

const expect = require('chai').expect;
const matrixUtils = require('../js/utils/matrix_utils');
const createMatrix = matrixUtils.createMatrix;
const matrixMultiply = matrixUtils.matrixMultiply;
const matrixMultiplySpecial = matrixUtils.matrixMultiplySpecial;
const identityMatrix = matrixUtils.identityMatrix;
const transpose = matrixUtils.transpose;
const determinant2x2 = matrixUtils.determinant2x2;
const submatrix = matrixUtils.submatrix;
const minor = matrixUtils.minor;
const cofactor = matrixUtils.cofactor;
const determinant = matrixUtils.determinant;

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

  it('should transpose an identity matrix', () => {
    let transposedIdentity = transpose(identityMatrix);

    expect(transposedIdentity[0][0]).to.equal(identityMatrix[0][0]);
    expect(transposedIdentity[0][1]).to.equal(identityMatrix[0][1]);
    expect(transposedIdentity[0][2]).to.equal(identityMatrix[0][2]);
    expect(transposedIdentity[0][3]).to.equal(identityMatrix[0][3]);
    expect(transposedIdentity[1][0]).to.equal(identityMatrix[1][0]);
    expect(transposedIdentity[1][1]).to.equal(identityMatrix[1][1]);
    expect(transposedIdentity[1][2]).to.equal(identityMatrix[1][2]);
    expect(transposedIdentity[1][3]).to.equal(identityMatrix[1][3]);
    expect(transposedIdentity[2][0]).to.equal(identityMatrix[2][0]);
    expect(transposedIdentity[2][1]).to.equal(identityMatrix[2][1]);
    expect(transposedIdentity[2][2]).to.equal(identityMatrix[2][2]);
    expect(transposedIdentity[2][3]).to.equal(identityMatrix[2][3]);
    expect(transposedIdentity[3][0]).to.equal(identityMatrix[3][0]);
    expect(transposedIdentity[3][1]).to.equal(identityMatrix[3][1]);
    expect(transposedIdentity[3][2]).to.equal(identityMatrix[3][2]);
    expect(transposedIdentity[3][3]).to.equal(identityMatrix[3][3]);
  });

  it('should calculate the determinant of a 2 x 2 matrix and equal 17', () => {
    let matrix = createMatrix(2, 2);

    matrix[0][0] = 1;
    matrix[0][1] = 5;
    matrix[1][0] = -3;
    matrix[1][1] = 2;

    let matrixDeterminant = determinant2x2(matrix);

    expect(matrixDeterminant).to.equal(17);
  });

  it('should calculate the determinant of a 2 x 2 matrix and equal -12', () => {
    let matrix = createMatrix(2, 2);

    matrix[0][0] = -3;
    matrix[0][1] = 1;
    matrix[1][0] = -3;
    matrix[1][1] = 5;

    let matrixDeterminant = determinant2x2(matrix);

    expect(matrixDeterminant).to.equal(-12);
  });

  it('should create a 2 X 2 submatrix from a 3 x 3 matrix', () => {
    let matrix = createMatrix(3, 3);

    matrix[0][0] = 1;
    matrix[0][1] = 5;
    matrix[0][2] = 0;
    matrix[1][0] = -3;
    matrix[1][1] = 2;
    matrix[1][2] = 7;
    matrix[2][0] = 0;
    matrix[2][1] = 6;
    matrix[2][2] = -3;

    let submatrixOfMatrix = submatrix(matrix, 0, 2);

    expect(submatrixOfMatrix[0][0]).to.equal(-3);
    expect(submatrixOfMatrix[0][1]).to.equal(2);
    expect(submatrixOfMatrix[1][0]).to.equal(0);
    expect(submatrixOfMatrix[1][1]).to.equal(6);
  });

  it('should create a 3 x 3 submatrix from a 4 x 4 matrix', () => {
    let matrix = createMatrix(4, 4);

    matrix[0][0] = -6;
    matrix[0][1] = 1;
    matrix[0][2] = 1;
    matrix[0][3] = 6;
    matrix[1][0] = -8;
    matrix[1][1] = 5;
    matrix[1][2] = 8;
    matrix[1][3] = 6;
    matrix[2][0] = -1;
    matrix[2][1] = 0;
    matrix[2][2] = 8;
    matrix[2][3] = 2;
    matrix[3][0] = -7;
    matrix[3][1] = 1;
    matrix[3][2] = -1;
    matrix[3][3] = 1;

    let submatrixOfMatrix = submatrix(matrix, 2, 1);

    expect(submatrixOfMatrix[0][0]).to.equal(-6);
    expect(submatrixOfMatrix[0][1]).to.equal(1);
    expect(submatrixOfMatrix[0][2]).to.equal(6);
    expect(submatrixOfMatrix[1][0]).to.equal(-8);
    expect(submatrixOfMatrix[1][1]).to.equal(8);
    expect(submatrixOfMatrix[1][2]).to.equal(6);
    expect(submatrixOfMatrix[2][0]).to.equal(-7);
    expect(submatrixOfMatrix[2][1]).to.equal(-1);
    expect(submatrixOfMatrix[2][2]).to.equal(1);
  });

  it('calculating the minor of a 3x3 matrix', () => {
    let A = createMatrix(3, 3);

    A[0][0] = 3;
    A[0][1] = 5;
    A[0][2] = 0;
    A[1][0] = 2;
    A[1][1] = -1;
    A[1][2] = -7;
    A[2][0] = 6;
    A[2][1] = -1;
    A[2][2] = 5;

    let B  = submatrix(A, 1, 0);

    let determinantB = determinant2x2(B);

    let minorA = minor(A, 1, 0);

    expect(determinantB).to.equal(minorA);
  });

  it('calculating the cofactor of a 3x3 matrix', () => {
    let A = createMatrix(3, 3);

    A[0][0] = 3;
    A[0][1] = 5;
    A[0][2] = 0;
    A[1][0] = 2;
    A[1][1] = -1;
    A[1][2] = -7;
    A[2][0] = 6;
    A[2][1] = -1;
    A[2][2] = 5;

    let minorA = minor(A, 0, 0);
    let cofactorA = cofactor(A, 0, 0);

    expect(minorA).to.equal(cofactorA);

    let minorB = minor(A, 1, 0);
    let cofactorB = cofactor(A, 1, 0);

    expect(minorB * -1).to.equal(cofactorB);
  });

  it('calculating the determinant of a 3x3 matrix', () => {
    let A = createMatrix(3, 3);

    A[0][0] = 1;
    A[0][1] = 2;
    A[0][2] = 6;
    A[1][0] = -5;
    A[1][1] = 8;
    A[1][2] = -4;
    A[2][0] = 2;
    A[2][1] = 6;
    A[2][2] = 4;

    let cofactorA = cofactor(A, 0, 0);
    let cofactorB = cofactor(A, 0, 1);
    let cofactorC = cofactor(A, 0, 2);
    let determinantA = determinant(A);

    expect(cofactorA).to.equal(56);
    expect(cofactorB).to.equal(12);
    expect(cofactorC).to.equal(-46);
    expect(determinantA).to.equal(-196);
  });

  it('calculating the determinant of a 4x4 matrix', () => {
    let A = createMatrix(4, 4);

    A[0][0] = -2;
    A[0][1] = -8;
    A[0][2] = 3;
    A[0][3] = 5;
    A[1][0] = -3;
    A[1][1] = 1;
    A[1][2] = 7;
    A[1][3] = 3;
    A[2][0] = 1;
    A[2][1] = 2;
    A[2][2] = -9;
    A[2][3] = 6;
    A[3][0] = -6;
    A[3][1] = 7;
    A[3][2] = 7;
    A[3][3] = -9;

    let cofactorA = cofactor(A, 0, 0);
    let cofactorB = cofactor(A, 0, 1);
    let cofactorC = cofactor(A, 0, 2);
    let cofactorD = cofactor(A, 0, 3);
    let determinantA = determinant(A);

    expect(cofactorA).to.equal(690);
    expect(cofactorB).to.equal(447);
    expect(cofactorC).to.equal(210);
    expect(cofactorD).to.equal(51);
    expect(determinantA).to.equal(-4071);
  });
});