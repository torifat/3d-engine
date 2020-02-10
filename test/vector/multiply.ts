import test from 'ava';
import { multiply } from '../../src/vector';

test('multiply - 2', t => {
  t.deepEqual(multiply([7, 3], 3), [21, 9]);
});

test('multiply - 3', t => {
  t.deepEqual(multiply([9, 2, 7], 0.5), [4.5, 1, 3.5]);
});
