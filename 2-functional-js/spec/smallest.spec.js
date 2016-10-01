import {smallestReduce} from '../src/second.js';
import {smallestFilter} from '../src/second.js';
import {smallestMap} from '../src/second.js';

describe('smallest:', () => {
  it('return smallest number from array', function() {
    expect(smallestReduce([1, 2, 3, 4])).toEqual(1);
    expect(smallestReduce([1, 2, -4, -3])).toEqual(-4);
    expect(smallestReduce([1, 2, 3.14, .1, 1.5])).toEqual(.1);

    expect(smallestFilter([1, 2, 3, 4])).toEqual(1);
    expect(smallestFilter([1, 2, -4, -3])).toEqual(-4);
    expect(smallestFilter([1, 2, 3.14, .1, 1.5])).toEqual(.1);

    // expect(smallestMap([1, 2, 3, 4])).toEqual(1);
    // expect(smallestMap([1, 2, -4, -3])).toEqual(-4);
    // expect(smallestMap([1, 2, 3.14, .1, 1.5])).toEqual(.1);
  });

  it('return null for empty array', function() {
    expect(smallestReduce([])).toEqual(null);

    expect(smallestFilter([])).toEqual(null);

    // expect(smallestMap([])).toEqual(null);
  });

  it('return null if array doesn\'t contain number', function() {
    expect(smallestReduce(['a', 'b', {a: 'c'}, null, ['d']])).toEqual(null);

    expect(smallestFilter(['a', 'b', {a: 'c'}, null, ['d']])).toEqual(null);

    // expect(smallestMap(['a', 'b', {a: 'c'}, null, ['d']])).toEqual(null);
  });

  it('return smallest number for array of different types', function() {
    expect(smallestReduce([7, 'a', 'b', 3, {a: 'c'}, [1, 3, 6]])).toEqual(3);
  });
});