import test from 'ava';
import { identity, multiply } from '../../src/matrix';

test('multiply - simple', t => {
  const mat1 = [[1, 2, 3]];
  const mat2 = [[4], [5], [6]];
  const mat3 = [[32]];

  t.deepEqual(multiply(mat1, mat2), mat3);
});

test('multiply - advance', t => {
  const mat1 = [
    [1, 2, 3],
    [4, 5, 6],
  ];

  const mat2 = [
    [7, 8],
    [9, 10],
    [11, 12],
  ];

  const mat3 = [
    [58, 64],
    [139, 154],
  ];

  t.deepEqual(multiply(mat1, mat2), mat3);
});

// A * B != B * A
test('multiply - not commutative', t => {
  const mat1 = [
    [1, 2],
    [3, 4],
  ];

  const mat2 = [
    [2, 0],
    [1, 2],
  ];

  const mat3 = [
    [4, 4],
    [10, 8],
  ];

  const mat4 = [
    [2, 4],
    [7, 10],
  ];

  t.deepEqual(multiply(mat1, mat2), mat3);
  t.deepEqual(multiply(mat2, mat1), mat4);
  t.notDeepEqual(mat3, mat4);
});

test('multiply - identity', t => {
  const mat1 = [
    [6, 4, 24],
    [1, -9, 8],
    [2, 5, 11],
  ];

  const mat2 = identity(3);

  t.deepEqual(multiply(mat1, mat2), mat1);
  t.deepEqual(multiply(mat2, mat1), mat1);
});

test('multiply - error', t => {
  const mat1 = [[1, 2, 3]];
  const mat2 = [[4], [5]];

  t.throws(
    () => {
      multiply(mat1, mat2);
    },
    {
      message:
        'Columns of left Matrix must be equal to rows of right Matrix! 3 != 2',
    },
  );
});
