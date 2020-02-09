import test from 'ava';
import { cross } from '../../src/vector';

test('cross', t => {
  t.deepEqual(cross([2, 3, 4], [5, 6, 7]), [-3, 6, -3]);
});

test('cross - error', t => {
  t.throws(
    () => {
      cross([1, 2], [3, 4]);
    },
    {
      message: 'Only support cross product for 3 dimensional vectors!',
    },
  );
});
