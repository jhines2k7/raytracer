'use strict';

const expect = require('chai').expect;
const matrixUtils = require('../js/utils/matrix_utils');
const createMatrix = matrixUtils.createMatrix;
const matrixMultiply = matrixUtils.matrixMultiply;
const matrixVectorMultiply = matrixUtils.matrixVectorMultiply;
const identityMatrix = matrixUtils.identityMatrix;
const transpose = matrixUtils.transpose;
const determinant2x2 = matrixUtils.determinant2x2;
const submatrix = matrixUtils.submatrix;
const minor = matrixUtils.minor;
const cofactor = matrixUtils.cofactor;
const determinant = matrixUtils.determinant;
const isInvertible = matrixUtils.isInvertible;
const inverse = matrixUtils.inverse;
const isEqual = require('../js/utils/is_equal');

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

  it("matrixVectorMultiply accepts an array and a 4 x 4 matrix and returns an array of length 4", () => {
    let fourByFourMatrix = createMatrix(4, 4);

    let resultMatrix = matrixVectorMultiply(new Array(4), fourByFourMatrix);

    expect(resultMatrix.length = 4)
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

    let matrix = matrixVectorMultiply([1, 2, 3, 1], fourByFourMatrix);

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

  it('testing an invertible matrix for invertability', () => {
    let A = createMatrix(4, 4);

    A[0][0] = 6;
    A[0][1] = 4;
    A[0][2] = 4;
    A[0][3] = 4;
    A[1][0] = 5;
    A[1][1] = 5;
    A[1][2] = 7;
    A[1][3] = 6;
    A[2][0] = 4;
    A[2][1] = -9;
    A[2][2] = 3;
    A[2][3] = -7;
    A[3][0] = 9;
    A[3][1] = 1;
    A[3][2] = 7;
    A[3][3] = -6;

    expect(determinant(A)).to.equal(-2120);
    expect(isInvertible(A)).to.equal(true);
  });

  it('testing a non-invertible matrix for invertibility', () => {
    let A = createMatrix(4, 4);

    A[0][0] = -4;
    A[0][1] = 2;
    A[0][2] = -2;
    A[0][3] = -3;
    A[1][0] = 9;
    A[1][1] = 6;
    A[1][2] = 2;
    A[1][3] = 6;
    A[2][0] = 0;
    A[2][1] = -5;
    A[2][2] = 1;
    A[2][3] = -5;
    A[3][0] = 0;
    A[3][1] = 0;
    A[3][2] = 0;
    A[3][3] = 0;

    expect(determinant(A)).to.equal(0);
    expect(isInvertible(A)).to.equal(false);
  });

  it('calculating the inverse of a matrix', () => {
    let A = createMatrix(4, 4);

    A[0][0] = -5;
    A[0][1] = 2;
    A[0][2] = 6;
    A[0][3] = -8;
    A[1][0] = 1;
    A[1][1] = -5;
    A[1][2] = 1;
    A[1][3] = 8;
    A[2][0] = 7;
    A[2][1] = 7;
    A[2][2] = -6;
    A[2][3] = -7;
    A[3][0] = 1;
    A[3][1] = -3;
    A[3][2] = 7;
    A[3][3] = 4;

    let inverseA = inverse(A);
    let determinantA = determinant(A);
    let cofactorA23 = cofactor(A, 2, 3);
    let cofactorA32 = cofactor(A, 3, 2);

    expect(determinantA).to.equal(532);
    expect(cofactorA23).to.equal(-160);
    expect(inverseA[3][2]).to.equal(-160/532);
    expect(cofactorA32).to.equal(105);
    expect(inverseA[2][3]).to.equal(105/532);

    expect(isEqual(inverseA[0][0], 0.21805)).to.equal(true);
    expect(isEqual(inverseA[0][1], 0.45113)).to.equal(true);
    expect(isEqual(inverseA[0][2], 0.24060)).to.equal(true);
    expect(isEqual(inverseA[0][3], -0.04511)).to.equal(true);
    expect(isEqual(inverseA[1][0], -0.80827)).to.equal(true);
    expect(isEqual(inverseA[1][1], -1.45677)).to.equal(true);
    expect(isEqual(inverseA[1][2], -0.44361)).to.equal(true);
    expect(isEqual(inverseA[1][3], 0.52068)).to.equal(true);
    expect(isEqual(inverseA[2][0], -0.07895)).to.equal(true);
    expect(isEqual(inverseA[2][1], -0.22368)).to.equal(true);
    expect(isEqual(inverseA[2][2], -0.05263)).to.equal(true);
    expect(isEqual(inverseA[2][3], 0.19737)).to.equal(true);
    expect(isEqual(inverseA[3][0], -0.52256)).to.equal(true);
    expect(isEqual(inverseA[3][1], -0.81391)).to.equal(true);
    expect(isEqual(inverseA[3][2], -0.30075)).to.equal(true);
    expect(isEqual(inverseA[3][3], 0.30639)).to.equal(true);
  });

  it('calculating the inverse of another matrix', () => {
    let A = createMatrix(4, 4);

    A[0][0] = 8;
    A[0][1] = -5;
    A[0][2] = 9;
    A[0][3] = 2;
    A[1][0] = 7;
    A[1][1] = 5;
    A[1][2] = 6;
    A[1][3] = 1;
    A[2][0] = -6;
    A[2][1] = 0;
    A[2][2] = 9;
    A[2][3] = 6;
    A[3][0] = -3;
    A[3][1] = 0;
    A[3][2] = -9;
    A[3][3] = -4;

    let inverseA = inverse(A);

    expect(isEqual(inverseA[0][0], -0.15385)).to.equal(true);
    expect(isEqual(inverseA[0][1], -0.15385)).to.equal(true);
    expect(isEqual(inverseA[0][2], -0.28205)).to.equal(true);
    expect(isEqual(inverseA[0][3], -0.53846)).to.equal(true);
    expect(isEqual(inverseA[1][0], -0.07692)).to.equal(true);
    expect(isEqual(inverseA[1][1], 0.12308)).to.equal(true);
    expect(isEqual(inverseA[1][2], 0.02564)).to.equal(true);
    expect(isEqual(inverseA[1][3], 0.03077)).to.equal(true);
    expect(isEqual(inverseA[2][0], 0.35897)).to.equal(true);
    expect(isEqual(inverseA[2][1], 0.35897)).to.equal(true);
    expect(isEqual(inverseA[2][2], 0.43590)).to.equal(true);
    expect(isEqual(inverseA[2][3], 0.92308)).to.equal(true);
    expect(isEqual(inverseA[3][0], -0.69231)).to.equal(true);
    expect(isEqual(inverseA[3][1], -0.69231)).to.equal(true);
    expect(isEqual(inverseA[3][2], -0.76923)).to.equal(true);
    expect(isEqual(inverseA[3][3], -1.92308)).to.equal(true);
  });

  it('calculating the inverse of a third matrix', () => {
    let A = createMatrix(4, 4);

    A[0][0] = 9;
    A[0][1] = 3;
    A[0][2] = 0;
    A[0][3] = 9;
    A[1][0] = -5;
    A[1][1] = -2;
    A[1][2] = -6;
    A[1][3] = -3;
    A[2][0] = -4;
    A[2][1] = 9;
    A[2][2] = 6;
    A[2][3] = 4;
    A[3][0] = -7;
    A[3][1] = 6;
    A[3][2] = 6;
    A[3][3] = 2;

    let inverseA = inverse(A);

    expect(isEqual(inverseA[0][0], -0.04074)).to.equal(true);
    expect(isEqual(inverseA[0][1], -0.07778)).to.equal(true);
    expect(isEqual(inverseA[0][2], 0.14444)).to.equal(true);
    expect(isEqual(inverseA[0][3], -0.22222)).to.equal(true);
    expect(isEqual(inverseA[1][0], -0.07778)).to.equal(true);
    expect(isEqual(inverseA[1][1], 0.03333)).to.equal(true);
    expect(isEqual(inverseA[1][2], 0.36667)).to.equal(true);
    expect(isEqual(inverseA[1][3], -0.33333)).to.equal(true);
    expect(isEqual(inverseA[2][0], -0.02901)).to.equal(true);
    expect(isEqual(inverseA[2][1], -0.14630)).to.equal(true);
    expect(isEqual(inverseA[2][2], -0.10926)).to.equal(true);
    expect(isEqual(inverseA[2][3], 0.12963)).to.equal(true);
    expect(isEqual(inverseA[3][0], 0.17778)).to.equal(true);
    expect(isEqual(inverseA[3][1], 0.06667)).to.equal(true);
    expect(isEqual(inverseA[3][2], -0.26667)).to.equal(true);
    expect(isEqual(inverseA[3][3], 0.33333)).to.equal(true);
  });

  xit('multiply product by its inverse', () => {
    let A = createMatrix(4, 4);
    A[0][0] = 3;
    A[0][1] = -9;
    A[0][2] = 7;
    A[0][3] = 3;
    A[1][0] = 3;
    A[1][1] = -8;
    A[1][2] = 2;
    A[1][3] = -9;
    A[2][0] = -4;
    A[2][1] = 4;
    A[2][2] = 4;
    A[2][3] = 1;
    A[3][0] = -6;
    A[3][1] = 5;
    A[3][2] = -1;
    A[3][3] = 1;

    let B = createMatrix(4, 4);
    B[0][0] = 8;
    B[0][1] = 2;
    B[0][2] = 2;
    B[0][3] = 2;
    B[1][0] = 3;
    B[1][1] = -1;
    B[1][2] = 7;
    B[1][3] = 0;
    B[2][0] = 7;
    B[2][1] = 0;
    B[2][2] = 5;
    B[2][3] = 4;
    B[3][0] = 6;
    B[3][1] = -2;
    B[3][2] = 0;
    B[3][3] = 5;

    let C = matrixMultiply(A, B);

    expect(matrixMultiply(C, inverse(B))).deep.equal(A);
  });
});