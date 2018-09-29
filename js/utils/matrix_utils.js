'use strict';

function createMatrix(rows, columns) {
  return buildMatrix(rows, columns);
}

function matrixMultiply(matrixA, matrixB) {
  let matrix = buildMatrix(4, 4);

  for(let row = 0; row < 4; row++) {
    for(let col = 0; col < 4; col++) {
      matrix[row][col] = matrixA[row][0] * matrixB[0][col] +
                          matrixA[row][1] * matrixB[1][col] +
                          matrixA[row][2] * matrixB[2][col] +
                          matrixA[row][3] * matrixB[3][col]
    }
  }

  return matrix;
}

function matrixMultiplySpecial(oneRowMatrix, fourByFourMatrix) {
  let matrix = [0, 0, 0, 0];
  let columnSum = 0;

  for(let row = 0; row < 4; row++) {
    for(let column = 0; column < 4; column++) {
      columnSum += fourByFourMatrix[row][column] * oneRowMatrix[column];
    }

    matrix[row] = columnSum;

    columnSum = 0;
  }

  return matrix;
}

function buildMatrix(rows, columns) {
  let matrix = new Array(columns);

  for(let i = 0; i < columns; i++) {
    let row = new Array(rows);

    for(let column = 0; column < rows; column++) {
      row[column] = 0;
    }

    matrix[i] = row;
  }

  return matrix;
}

const identityMatrix = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
];

function transpose(matrix) {
  let transposed = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  for(let row = 0; row < 4; row++) {
    for(let column = 0; column < 4; column++) {
      transposed[row][column] = matrix[column][row];
    }
  }

  return transposed;
}

function determinant(matrix) {
  return matrix[0][0] * matrix[1][1] - (matrix[1][0] * matrix[0][1]);
}

function submatrix(matrix, row, column) {
  let size = matrix.length - 1
  let submatrix = new Array(size);

  for(let columns = 0; columns < size; columns++) {
    for(let rows = 0; rows < size; rows++) {

    }
  }

  return submatrix;
}

module.exports = {createMatrix, matrixMultiply, matrixMultiplySpecial, identityMatrix, transpose, determinant, submatrix};