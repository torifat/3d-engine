import test from 'ava';
import { determinant } from '../../src/matrix';

test('determinant - 2', t => {
  const mat1 = [
    [3, 8],
    [4, 6],
  ];

  t.is(determinant(mat1), -14);
});

test('determinant - 3', t => {
  const mat1 = [
    [6, 1, 1],
    [4, -2, 5],
    [2, 8, 7],
  ];

  t.is(determinant(mat1), -306);
});

test('determinant - 2x3', t => {
  const mat1 = [
    [6, 1, 1],
    [4, -2, 5],
  ];

  t.throws(
    () => {
      determinant(mat1);
    },
    {
      message: 'Need a square matrix to perform this operation! 2 != 3',
    },
  );
});
