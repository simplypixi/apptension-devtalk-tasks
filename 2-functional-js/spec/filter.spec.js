import {filter} from '../src/first.js';

describe('filter:', () => {
  const divisibleBy3 = (x) => {
    if (x % 3 === 0) {
      return true;
    }
    return false;
  };

  it('filters simple functions over arrays', function() {
    expect(filter(divisibleBy3, [1, 3, 5, 6])).toEqual([3, 6]);
  });
})