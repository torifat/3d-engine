export type Vector = Array<number>;

function assertSameDimensions(left: Vector, right: Vector) {
  if (left.length !== right.length) {
    throw new Error(
      `Dimension of both vectors needs to be same! ${left.length} != ${right.length}`,
    );
  }
}

function reduceVectors<T>(
  left: Vector,
  right: Vector,
  reducer: (acc: T, lValue: number, rValue: number) => T,
  initial: T,
) {
  assertSameDimensions(left, right);
  return left.reduce<T>((acc, l, i) => reducer(acc, l, right[i]), initial);
}

function concatVectors(
  left: Vector,
  right: Vector,
  fn: (lValue: number, rValue: number) => number,
) {
  return reduceVectors(left, right, (acc, l, r) => acc.concat(fn(l, r)), []);
}

// Public APIs
export const add = (left: Vector, right: Vector) =>
  concatVectors(left, right, (l, r) => l + r);

export const subtract = (left: Vector, right: Vector) =>
  concatVectors(left, right, (l, r) => l - r);

// https://www.mathsisfun.com/algebra/vectors-dot-product.html
export const dot = (left: Vector, right: Vector) =>
  reduceVectors(left, right, (acc, l, r) => acc + l * r, 0);

// https://www.mathsisfun.com/algebra/vectors-cross-product.html
export function cross(left: Vector, right: Vector) {
  assertSameDimensions(left, right);
  if (left.length !== 3) {
    throw new Error('Only support cross product for 3 dimensional vectors!');
  }

  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}
