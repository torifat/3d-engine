export type Vector = Array<number>;

function assertSameDimensions(left: Vector, right: Vector) {
  if (left.length !== right.length) {
    throw new Error(
      `Dimension of both vectors needs to be same! ${left.length} != ${right.length}`,
    );
  }
}

function zip(
  left: Vector,
  right: Vector,
  fn: (lValue: number, rValue: number) => number,
) {
  assertSameDimensions(left, right);
  return left.reduce((acc, l, i) => acc.concat(fn(l, right[i])), []);
}

// Public APIs
export const add = (left: Vector, right: Vector) =>
  zip(left, right, (l, r) => l + r);

export const subtract = (left: Vector, right: Vector) =>
  zip(left, right, (l, r) => l - r);
