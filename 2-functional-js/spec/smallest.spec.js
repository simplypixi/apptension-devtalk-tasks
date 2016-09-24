import {smallest} from '../src/second.js';

describe('smallest:', () => {
  it('return smallest number from array', function() {
    expect(smallest([1, 2, 3, 4])).toEqual(1);
    expect(smallest([1, 2, -4, -3])).toEqual(-4);
    expect(smallest([1, 2, 3.14, .1, 1.5])).toEqual(.1);
  });

  it('return null for empty array', function() {
    expect(smallest([])).toEqual(null);
  });

  it('return null if array doesn\'t contain number', function() {
    expect(smallest(['a', 'b', {a: 'c'}, null, ['d']])).toEqual(null);
  });

  it('return smallest number for array of different types', function() {
    expect(smallest([7, 'a', 'b', 3, {a: 'c'}, [1, 3, 6]])).toEqual(3);
  });
})