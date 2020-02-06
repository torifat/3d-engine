import test from 'ava';
import { Matrix } from '../src/Matrix';

test('identity', t => {
  const mat1 = new Matrix([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]);
  t.deepEqual(Matrix.identity(3), mat1);
});

test('multiply - simple', t => {
  const mat1 = new Matrix([[1, 2, 3]]);

  const mat2 = new Matrix([[4], [5], [6]]);

  const mat3 = new Matrix([[32]]);

  t.deepEqual(mat1.multiply(mat2), mat3);
});

test('multiply - advance', t => {
  const mat1 = new Matrix([
    [1, 2, 3],
    [4, 5, 6],
  ]);

  const mat2 = new Matrix([
    [7, 8],
    [9, 10],
    [11, 12],
  ]);

  const mat3 = new Matrix([
    [58, 64],
    [139, 154],
  ]);

  t.deepEqual(mat1.multiply(mat2), mat3);
});

test('multiply - not commutative', t => {
  const mat1 = new Matrix([
    [1, 2],
    [3, 4],
  ]);

  const mat2 = new Matrix([
    [2, 0],
    [1, 2],
  ]);

  const mat3 = new Matrix([
    [4, 4],
    [10, 8],
  ]);

  const mat4 = new Matrix([
    [2, 4],
    [7, 10],
  ]);

  t.deepEqual(mat1.multiply(mat2), mat3);
  t.deepEqual(mat2.multiply(mat1), mat4);
});

test('multiply - identity', t => {
  const mat1 = new Matrix([
    [6, 4, 24],
    [1, -9, 8],
    [2, 5, 11],
  ]);

  const mat2 = new Matrix([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]);

  t.deepEqual(mat1.multiply(mat2), mat1);
  t.deepEqual(mat2.multiply(mat1), mat1);
});
