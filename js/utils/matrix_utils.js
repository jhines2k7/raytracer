'use strict';

const MATRIX_TYPES = require('./matrix_types');

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

function matrixVectorMultiply(vector, matrix) {
  let resultVector = [0, 0, 0, 0];
  let columnSum = 0;

  for(let row = 0; row < 4; row++) {
    for(let column = 0; column < 4; column++) {
      columnSum += matrix[row][column] * vector[column];
    }

    resultVector[row] = columnSum;

    columnSum = 0;
  }

  return resultVector;
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

const identityMatrix = {
  matrix: [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ],
  matrixType: MATRIX_TYPES.IDENTITY
};

function transpose(matrix) {
  let transposed = createMatrix(4, 4);

  for(let row = 0; row < 4; row++) {
    for(let column = 0; column < 4; column++) {
      transposed[row][column] = matrix[column][row];
    }
  }

  return transposed;
}

function determinant2x2(matrix) {
  return matrix[0][0] * matrix[1][1] - (matrix[1][0] * matrix[0][1]);
}

function submatrix(matrix, rowToExtract, colToExtract) {
  let submatrix = new Array(matrix.length - 1);
  let submatrixSize = submatrix.length;
  let rows = 0, cols = 0;

  for(let rowNum = 0; rowNum < matrix.length; rowNum++) {
    if(rowNum !== rowToExtract) {
      let row = new Array(submatrixSize);

      for(let columnNum = 0; columnNum < matrix.length; columnNum++) {
        if(columnNum !== colToExtract && columnNum < matrix.length) {
          row[cols] = matrix[rowNum][columnNum];
          cols++;
        }
      }

      submatrix[rows] = row;
      rows++;
      cols = 0;
    }
  }

  return submatrix;
}

function minor(matrix, rowToExtract, colToExtract) {
  let A = submatrix(matrix, rowToExtract, colToExtract);

  return determinant2x2(A);
}

function cofactor(matrix, rowToExtract, colToExtract) {
  let A;

  if(matrix.length > 3) {
    A = determinant(submatrix(matrix, rowToExtract, colToExtract));
  } else {
    A = minor(matrix, rowToExtract, colToExtract);
  }

  if((rowToExtract + colToExtract) % 2 !== 0) {
    return A * -1
  } else {
    return A;
  }
}

function determinant(matrix) {
  let matrixDeterminant = 0;

  for(let col = 0; col < matrix.length; col++) {
    matrixDeterminant += matrix[0][col] * cofactor(matrix, 0, col);
  }

  return matrixDeterminant;
}

function isInvertible(matrix) {
  return determinant(matrix) !== 0;
}

function inverse(matrix) {
  let cofactorMatrix = matrixOfCofactors(matrix);
  let transposedCofactorMatrix = transpose(cofactorMatrix);

  let matrixDeterminant = determinant(matrix);

  return divideCofactorMatrix(transposedCofactorMatrix, matrixDeterminant);
}

function matrixOfCofactors(matrix) {
  let cofactorMatrix = buildMatrix(4, 4);

  for(let row = 0; row < matrix.length; row++) {
    for(let col = 0; col < matrix.length; col++) {
      cofactorMatrix[row][col] = cofactor(matrix, row, col);
    }
  }

  return cofactorMatrix;
}

function divideCofactorMatrix(matrix, determinant) {
  let inverted = buildMatrix(4, 4);

  for(let row = 0; row < matrix.length; row++) {
    for(let col = 0; col < matrix.length; col++) {
      inverted[row][col] = matrix[row][col] / determinant;
    }
  }

  return inverted;
}

module.exports = {
  createMatrix,
  matrixMultiply,
  matrixVectorMultiply,
  identityMatrix,
  transpose,
  determinant2x2,
  submatrix,
  minor,
  cofactor,
  determinant,
  isInvertible,
  inverse
};