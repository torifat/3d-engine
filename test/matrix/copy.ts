import test from 'ava';
import { copy } from '../../src/matrix';

test('copy', t => {
  const mat1 = [
    [1, 2, 3],
    [4, 5, 6],
  ];

  const mat2 = [
    [7, 8],
    [9, 10],
    [11, 12],
  ];

  const mat3 = copy(mat1);
  const mat4 = copy(mat2);

  t.not(mat1, mat3);
  t.deepEqual(mat1, mat3);

  t.not(mat2, mat4);
  t.deepEqual(mat2, mat4);
});
