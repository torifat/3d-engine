export type Matrix = Array<Array<number>>;

// Internal helpers
function rows(matrix: Matrix) {
  return matrix.length;
}

function columns(matrix: Matrix) {
  return matrix.length ? matrix[0].length : 0;
}

function assertSquareMatrix(matrix: Matrix) {
  const rCount = rows(matrix);
  const cCount = columns(matrix);

  if (rCount !== cCount) {
    throw new Error(
      `Need a square matrix to perform this operation! ${rCount} != ${cCount}`,
    );
  }
}

function create(
  rows: number,
  columns: number,
  value: (row: number, column: number) => number,
) {
  const output = [[]];
  for (let r = 0; r < rows; ++r) {
    output[r] = [];
    for (let c = 0; c < columns; ++c) {
      output[r][c] = value(r, c);
    }
  }
  return output;
}

// Public APIs
export const empty = (rows: number, columns: number = rows) =>
  create(rows, columns, () => 0);

export const identity = (size: number) =>
  create(size, size, (row, col) => (row === col ? 1 : 0));

export const copy = (matrix: Matrix) =>
  create(rows(matrix), columns(matrix), (row, column) => matrix[row][column]);

// https://www.mathsisfun.com/algebra/matrix-multiplying.html
// TODO: Add support for multiple arguments using divide and conquer
export function multiply(left: Matrix, right: Matrix): Matrix {
  const rRows = rows(right);
  const lCols = columns(left);

  if (lCols !== rRows) {
    throw new Error(
      `Columns of left Matrix must be equal to rows of right Matrix! ${lCols} != ${rRows}`,
    );
  }

  const lRows = rows(left);
  const rCols = columns(right);

  const output = empty(0);
  // Output Matrix left.rows x right.cols
  for (let r = 0; r < lRows; ++r) {
    output[r] = [];

    for (let c = 0; c < rCols; ++c) {
      let total = 0;
      for (let i = 0; i < lCols; ++i) {
        total += left[r][i] * right[i][c];
      }
      output[r][c] = total;
    }
  }

  return output;
}

// https://www.mathsisfun.com/algebra/matrix-determinant.html
export function determinant(matrix: Matrix) {
  const { u } = lu(matrix, true);
  const size = rows(matrix);
  let r = 1;
  for (let i = 0; i < size; ++i) {
    r *= u[i][i];
  }
  return Math.round(r);
}

// LU decomposition
// Gaussian elimination & shortcut - https://www.youtube.com/watch?v=UlWcofkUDDU
export function lu(
  matrix: Matrix,
  onlyU: boolean = false,
): {
  l?: Matrix;
  u: Matrix;
} {
  assertSquareMatrix(matrix);
  const size = rows(matrix);
  const l = onlyU ? undefined : identity(size);
  const u = copy(matrix);

  for (let c = 0; c < size - 1; ++c) {
    for (let r = c + 1; r < size; ++r) {
      const f = -u[r][c] / u[c][c];
      if (!onlyU) {
        l[r][c] = -f;
      }
      for (let i = c; i < size; ++i) {
        u[r][i] += f * u[c][i];
      }
    }
  }

  return { l, u };
}
