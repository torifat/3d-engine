import test from 'ava';
import { norm } from '../../src/vector';

test('norm - 2', t => {
  t.deepEqual(norm([6, 8]), 10);
  t.deepEqual(norm([4, -9]), Math.sqrt(97));
});
