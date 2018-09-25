'use strict';

function createMatrix(columns, rows) {
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

module.exports = {createMatrix, matrixMultiply};