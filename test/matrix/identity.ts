import test from 'ava';
import { identity } from '../../src/matrix';

test('identity - 0', t => {
  t.deepEqual(identity(0), [[]]);
});

test('identity - 1', t => {
  t.deepEqual(identity(1), [[1]]);
});

test('identity - 3', t => {
  t.deepEqual(identity(3), [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]);
});

test('identity - 4', t => {
  t.deepEqual(identity(4), [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ]);
});
