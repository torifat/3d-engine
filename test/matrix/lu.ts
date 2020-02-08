import test from 'ava';
import { lu } from '../../src/matrix';

test('lu - 1', t => {
  const mat1 = [
    [1, 4, -3],
    [-2, 8, 5],
    [3, 4, 7],
  ];

  const u = [
    [1, 4, -3],
    [0, 16, -1],
    [0, 0, 15.5],
  ];

  t.deepEqual(lu(mat1), {
    l: [
      [1, 0, 0],
      [-2, 1, 0],
      [3, -0.5, 1],
    ],
    u,
  });
  t.deepEqual(lu(mat1, true), { u, l: undefined });
});

test('lu - 2', t => {
  const mat1 = [
    [2, 4, -4],
    [1, -4, 3],
    [-6, -9, 5],
  ];

  const u = [
    [2, 4, -4],
    [0, -6, 5],
    [0, 0, -4.5],
  ];

  t.deepEqual(lu(mat1), {
    l: [
      [1, 0, 0],
      [0.5, 1, 0],
      [-3, -0.5, 1],
    ],
    u,
  });
  t.deepEqual(lu(mat1, true), { u, l: undefined });
});

test('lu - 3', t => {
  const mat1 = [
    [2, -1, -2],
    [-4, 6, 3],
    [-4, -2, 8],
  ];

  t.deepEqual(lu(mat1), {
    l: [
      [1, 0, 0],
      [-2, 1, 0],
      [-2, -1, 1],
    ],
    u: [
      [2, -1, -2],
      [0, 4, -1],
      [0, 0, 3],
    ],
  });
});
