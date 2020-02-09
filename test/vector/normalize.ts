import test from 'ava';
import { normalize } from '../../src/vector';

test('normalize - 2', t => {
  t.deepEqual(normalize([3, 4]), [3 / 5, 4 / 5]);
});

test('normalize - zero', t => {
  t.deepEqual(normalize([0, 0]), [0, 0]);
});
