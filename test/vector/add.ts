import test from 'ava';
import { add } from '../../src/vector';

test('add - 2', t => {
  t.deepEqual(add([12, 2], [4, 5]), [16, 7]);
});

test('add - 4', t => {
  t.deepEqual(add([3, 3, 3, 3], [1, 2, 3, 4]), [4, 5, 6, 7]);
});
