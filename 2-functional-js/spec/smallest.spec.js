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
})