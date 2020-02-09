import test from 'ava';
import { empty } from '../../src/matrix';

test('empty - 0', t => {
  t.deepEqual(empty(0), [[]]);
});

test('empty - 1', t => {
  t.deepEqual(empty(1), [[0]]);
});

test('empty - 2x3', t => {
  t.deepEqual(empty(2, 3), [
    [0, 0, 0],
    [0, 0, 0],
  ]);
});

test('empty - 3', t => {
  t.deepEqual(empty(3), [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});

test('empty - 4', t => {
  t.deepEqual(empty(4), [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
});
