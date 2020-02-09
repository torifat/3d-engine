import test from 'ava';
import { subtract } from '../../src/vector';

test('subtract - 2', t => {
  t.deepEqual(subtract([12, 2], [4, 5]), [8, -3]);
});

test('subtract - 4', t => {
  t.deepEqual(subtract([3, 3, 3, 3], [1, 2, 3, 4]), [2, 1, 0, -1]);
});
