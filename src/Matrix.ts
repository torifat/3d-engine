// Row Major
export class Matrix {
  rows: number;
  cols: number;

  constructor(public data: Array<Array<number>>) {
    this.rows = data.length;
    this.cols = data.length ? data[0].length : 0;
  }

  static identity(size: number) {
    const output = [];
    for (let i = 0; i < size; ++i) {
      output[i] = [];
      for (let j = 0; j < size; ++j) {
        output[i][j] = i === j ? 1 : 0;
      }
    }
    return new this(output);
  }

  // https://www.mathsisfun.com/algebra/matrix-multiplying.html
  multiply(other: Matrix) {
    const { rows, cols, data } = other;
    if (cols !== this.rows) {
      throw new Error(
        `Columns of left Matrix must be equal to rows of right Matrix! ${this.cols} != ${rows}`,
      );
    }

    const output = [];
    // Output Matrix left.rows x right.cols
    for (let rowIdx = 0; rowIdx < this.rows; ++rowIdx) {
      output[rowIdx] = [];

      for (let colIdx = 0; colIdx < cols; ++colIdx) {
        let total = 0;
        for (let idx = 0; idx < this.cols; ++idx) {
          total += this.data[rowIdx][idx] * data[idx][colIdx];
        }
        output[rowIdx][colIdx] = total;
      }
    }

    return new Matrix(output);
  }

  // https://www.mathsisfun.com/algebra/matrix-determinant.html
  determinant() {
    if (this.rows !== this.cols) {
      throw new Error(
        `Only square Matrices can have determinant! ${this.rows} != ${this.cols}`,
      );
    }
  }

  toString() {
    let output = '';
    for (let i = 0; i < this.rows; ++i) {
      for (let j = 0; j < this.cols; ++j) {
        output += `${this.data[i][j]}\t`;
      }
      output += '\n';
    }
    return output;
  }
}
