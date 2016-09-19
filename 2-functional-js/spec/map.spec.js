import {map} from '../src/first.js';

describe('map:', () => {
  const times2 = (x) => x * 2;

  it('maps simple functions over arrays', function() {
    expect(map(times2, [1, 2, 3, 4])).toEqual([2, 4, 6, 8]);
  });
})