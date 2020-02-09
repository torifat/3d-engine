import test from 'ava';
import { dot } from '../../src/vector';

test('dot - 2.1', t => {
  t.deepEqual(dot([-6, 8], [5, 12]), 66);
});

test('dot - 2.2', t => {
  t.deepEqual(dot([-12, 16], [12, 9]), 0);
});

test('dot - 3', t => {
  t.deepEqual(dot([9, 2, 7], [4, 8, 10]), 122);
});

test('dot - different dimensions', t => {
  t.throws(
    () => {
      dot([1, 2], [3, 4, 5]);
    },
    {
      message: 'Dimension of both vectors needs to be same! 2 != 3',
    },
  );
});
